(() => {
  const $ = id => document.getElementById(id);

  // Backend endpoint (see server.js). Same-origin relative path — works
  // once this frontend is served by the included Express server, which
  // proxies to the real Anthropic API using a server-side API key. If the
  // endpoint isn't reachable (e.g. these files are just opened directly
  // in a browser with no backend running), the widget transparently falls
  // back to the local deterministic dataset reasoning below, so it never
  // breaks — it just loses the free-form generative layer.
  const BACKEND_URL = "/api/chat";
  let backendAvailable = true;

  // ---- data flattening -----------------------------------------------
  function flatten() {
    if (window.MAGNEXAPI && window.MAGNEXAPI.allSitesFlat) return window.MAGNEXAPI.allSitesFlat();
    const data = window.MAGNEX_DATA || {};
    const out = [];
    Object.entries(data).forEach(([stKey, st]) => {
      Object.entries(st.districts).forEach(([dKey, d]) => {
        d.sites.forEach(s => out.push({ ...s, stateKey: stKey, stateName: st.name, districtKey: dKey, districtName: d.name }));
      });
    });
    return out;
  }

  function fmtSite(s) {
    return `${s.name} (${s.districtName}, ${s.stateName})`;
  }

  // ---- local deterministic fallback (used if the backend is offline) ----
  // Every answer here is computed straight from the dataset rendered on
  // the map/analytics panels — nothing free-form, so the numbers always
  // match what's on screen, and every answer carries the stored
  // model-confidence value as its accuracy figure.

  function bestSite(list) {
    return list.slice().sort((a,b)=>b.p-a.p)[0];
  }
  function worstSite(list) {
    return list.slice().sort((a,b)=>a.p-b.p)[0];
  }
  function avg(nums) {
    return nums.reduce((a,b)=>a+b,0) / nums.length;
  }

  function matchState(text, all) {
    const found = all.find(s => text.toLowerCase().includes(s.stateName.toLowerCase()));
    return found ? found.stateKey : null;
  }
  function matchDistrict(text, all) {
    const found = all.find(s => text.toLowerCase().includes(s.districtName.toLowerCase()));
    return found ? found.districtKey : null;
  }
  function matchSite(text, all) {
    return all.find(s => text.toLowerCase().includes(s.name.toLowerCase()));
  }

  function localRespond(raw) {
    const text = raw.trim();
    const all = flatten();
    if (!all.length) return { text: "The site dataset hasn't loaded yet — give it a second and try again.", conf: null };

    const lower = text.toLowerCase();
    const stateKey = matchState(text, all);
    const siteHit = matchSite(text, all);
    const districtKey = matchDistrict(text, all);

    if (siteHit) {
      const s = siteHit;
      return {
        text: `${s.name} sits in ${s.districtName}, ${s.stateName}. Prospectivity is ${s.p}% (class ${s.cls}), with production estimated at ${s.prod} against a ${s.gap} gap versus target. Supporting indicators: iron-oxide index ${s.iron}, lithology score ${s.lith}, NDVI ${s.ndvi}, SWIR response ${s.swir}.`,
        conf: s.c,
        focus: s
      };
    }

    if (/\b(best|highest|top|strongest)\b/.test(lower)) {
      let pool = all;
      if (stateKey) pool = pool.filter(s => s.stateKey === stateKey);
      if (districtKey) pool = pool.filter(s => s.districtKey === districtKey);
      const s = bestSite(pool);
      const scope = stateKey ? window.MAGNEXAPI.stateName(stateKey) : "the full dataset";
      return {
        text: `The strongest site in ${scope} is ${fmtSite(s)}, at ${s.p}% prospectivity (class ${s.cls}). It's the top performer out of ${pool.length} sites in that scope.`,
        conf: s.c,
        focus: s
      };
    }

    if (/\b(worst|lowest|weakest|risk|risky)\b/.test(lower)) {
      let pool = all;
      if (stateKey) pool = pool.filter(s => s.stateKey === stateKey);
      if (districtKey) pool = pool.filter(s => s.districtKey === districtKey);
      const s = worstSite(pool);
      const scope = stateKey ? window.MAGNEXAPI.stateName(stateKey) : "the full dataset";
      return {
        text: `The weakest site in ${scope} is ${fmtSite(s)}, at ${s.p}% prospectivity (class ${s.cls}) — the largest production gap there is ${s.gap}.`,
        conf: s.c,
        focus: s
      };
    }

    if (/\b(average|avg|overall|summary|how many|compare states?)\b/.test(lower)) {
      const byState = {};
      all.forEach(s => { (byState[s.stateKey] = byState[s.stateKey] || []).push(s); });
      const lines = Object.entries(byState).map(([key, list]) =>
        `${window.MAGNEXAPI.stateName(key)} averages ${avg(list.map(s=>s.p)).toFixed(1)}% over ${list.length} sites`
      );
      const leader = Object.entries(byState).sort((a,b)=>avg(b[1].map(s=>s.p))-avg(a[1].map(s=>s.p)))[0];
      return {
        text: `Across ${all.length} tracked sites in ${Object.keys(byState).length} states: ${lines.join("; ")}. ${window.MAGNEXAPI.stateName(leader[0])} currently leads on average prospectivity.`,
        conf: Math.round(avg(all.map(s=>s.c)))
      };
    }

    if (/\bproduction|output|tonnage|gap\b/.test(lower)) {
      let pool = all;
      if (stateKey) pool = pool.filter(s => s.stateKey === stateKey);
      const s = pool.slice().sort((a,b)=>parseInt(b.prod.replace(/[^\d]/g,""))-parseInt(a.prod.replace(/[^\d]/g,"")))[0];
      return {
        text: `${fmtSite(s)} has the highest recorded daily production in that scope at ${s.prod}, with a production gap of ${s.gap} against its estimated target.`,
        conf: s.c,
        focus: s
      };
    }

    if (/\bhow.*(work|calculat|model)|methodolog|accuracy mean|confidence mean\b/.test(lower)) {
      return {
        text: `Each site's prospectivity score is a placeholder standing in for a model that would combine spectral indicators (iron-oxide index, NDVI, SWIR response), structural indicators (lineament and drainage density) and lithology scoring. "Model confidence" is the model's own certainty in that score — it isn't the same as prospectivity itself. In this prototype those numbers are fixed sample values; a production version would recompute them from live satellite passes and validated occurrence data.`,
        conf: null
      };
    }

    if (stateKey) {
      const pool = all.filter(s => s.stateKey === stateKey);
      const best = bestSite(pool);
      return {
        text: `${window.MAGNEXAPI.stateName(stateKey)} has ${pool.length} tracked sites across ${new Set(pool.map(s=>s.districtKey)).size} districts. Best performer: ${fmtSite(best)} at ${best.p}%.`,
        conf: best.c,
        focus: best
      };
    }

    return {
      text: `I can answer from the site dataset — try asking things like "best site in Odisha", "compare Madhya Pradesh and Maharashtra", "how confident are you about Balaghat Site 01", or name a site directly.`,
      conf: null
    };
  }

  // ---- backend-backed generative answer --------------------------------
  async function backendRespond(q) {
    const payload = {
      message: q,
      // Same flattened dataset driving the map/analytics panels, so the
      // model's answers stay grounded in the real numbers on screen.
      sites: flatten()
    };
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("backend error " + res.status);
    const data = await res.json();
    // Expected shape from server.js: { text, conf, focusSiteName }
    let focus = null;
    if (data.focusSiteName) {
      focus = flatten().find(s => s.name === data.focusSiteName) || null;
    }
    return { text: data.text, conf: typeof data.conf === "number" ? data.conf : null, focus };
  }

  async function respond(q) {
    if (backendAvailable) {
      try {
        return await backendRespond(q);
      } catch (err) {
        backendAvailable = false; // stop retrying the network for this session
        console.warn("MAGNEX backend unavailable, using local dataset reasoning:", err.message);
      }
    }
    return localRespond(q);
  }

  // ---- widget wiring ------------------------------------------------
  function buildWidget() {
    const wrap = document.createElement("div");
    wrap.id = "magnexAgent";
    wrap.innerHTML = `
      <button id="agentToggle" class="agent-toggle" aria-label="Open MAGNEX assistant">
        <span class="agent-dot"></span> Ask MAGNEX
      </button>
      <div id="agentPanel" class="agent-panel hide">
        <div class="agent-head">
          <div><b>MAGNEX Agent</b><small>Backed by the live site dataset, with generative answers via the backend API</small></div>
          <button id="agentClose" aria-label="Close">×</button>
        </div>
        <div id="agentLog" class="agent-log"></div>
        <div id="agentTyping" class="agent-typing" style="display:none">MAGNEX is thinking…</div>
        <div class="agent-chips">
          <button class="chip" data-q="Best site in Odisha">Best site in Odisha</button>
          <button class="chip" data-q="Compare Madhya Pradesh and Maharashtra">Compare states</button>
          <button class="chip" data-q="What does model confidence mean?">What is confidence?</button>
        </div>
        <form id="agentForm" class="agent-form">
          <input id="agentInput" type="text" placeholder="Ask about a site, district or state…" autocomplete="off">
          <button type="submit">Ask</button>
        </form>
      </div>`;
    document.body.appendChild(wrap);

    const panel = $("agentPanel");
    $("agentToggle").addEventListener("click", () => {
      panel.classList.toggle("hide");
      if (!panel.classList.contains("hide") && !panel.dataset.greeted) {
        pushMsg("agent", "Hi — I'm the MAGNEX assistant. I reason over the live site dataset shown on this page (routed through the backend API when available), so answers stay grounded in the map and analytics panels. Ask me something.");
        panel.dataset.greeted = "1";
      }
    });
    $("agentClose").addEventListener("click", () => panel.classList.add("hide"));

    $("agentForm").addEventListener("submit", e => {
      e.preventDefault();
      const input = $("agentInput");
      const q = input.value.trim();
      if (!q) return;
      pushMsg("user", q);
      input.value = "";
      handleQuery(q);
    });

    document.querySelectorAll(".chip").forEach(chip => {
      chip.addEventListener("click", () => {
        pushMsg("user", chip.dataset.q);
        handleQuery(chip.dataset.q);
      });
    });
  }

  function pushMsg(who, text, conf) {
    const log = $("agentLog");
    const row = document.createElement("div");
    row.className = "agent-msg " + who;
    let confBadge = "";
    if (typeof conf === "number") {
      confBadge = `<span class="agent-conf">accuracy ${conf}%</span>`;
    }
    row.innerHTML = `<div class="agent-bubble">${text}</div>${confBadge}`;
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
  }

  function setBusy(busy) {
    $("agentTyping").style.display = busy ? "block" : "none";
    $("agentForm").querySelector("button").disabled = busy;
  }

  async function handleQuery(q) {
    setBusy(true);
    try {
      const result = await respond(q);
      pushMsg("agent", result.text, result.conf);
      if (result.focus && window.MAGNEXAPI && window.MAGNEXAPI.flyTo) {
        window.MAGNEXAPI.flyTo(result.focus.stateKey, result.focus.districtKey,
          window.MAGNEXAPI.sites(result.focus.stateKey, result.focus.districtKey).findIndex(s=>s.name===result.focus.name));
        const mapEl = document.getElementById("explore");
        if (mapEl) mapEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } finally {
      setBusy(false);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", buildWidget);
  else buildWidget();
})();
