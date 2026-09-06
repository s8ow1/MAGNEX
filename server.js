// MAGNEX backend
// ---------------
// Serves the static frontend AND exposes POST /api/chat, which is the
// "connect API in the backend" piece: agent.js in the browser calls this
// same-origin endpoint, and THIS server (not the browser) holds the
// Anthropic API key and calls the real Anthropic Messages API. The key
// never ships to the client, unlike a static downloadable HTML file.
//
// Run:
//   cd backend
//   npm install
//   cp .env.example .env        # then put your real key in .env
//   npm start
// Then open http://localhost:3000 — the frontend and the API are served
// from the same origin, so agent.js's relative fetch("/api/chat") works
// with no extra configuration.

require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.MAGNEX_MODEL || "claude-sonnet-4-6";

app.use(express.json({ limit: "1mb" }));

// Serve the static site (index.html, style.css, script.js, hero3d.js, agent.js)
app.use(express.static(path.join(__dirname, "..")));

function buildSystemPrompt(sites) {
  const flattened = sites.map(s =>
    `${s.name} | ${s.stateName} / ${s.districtName} | prospectivity ${s.p}% (${s.cls}) | ` +
    `confidence ${s.c}% | production ${s.prod} | gap ${s.gap} | ore ${s.ore} | ` +
    `iron-oxide ${s.iron} | lithology ${s.lith} | drainage ${s.drain} | lineament ${s.line} | ` +
    `NDVI ${s.ndvi} | SWIR ${s.swir}`
  ).join("\n");

  return `You are the MAGNEX assistant, embedded on a manganese-exploration decision-support ` +
    `website (a Smart India Hackathon prototype for the Ministry of Steel). Answer questions ` +
    `about the tracked sites using ONLY the dataset below — every number you state must come ` +
    `from it, since the answer is shown next to the live map and analytics panels and must match. ` +
    `Explicitly remind the user, when relevant, that prospectivity/confidence/indicator values are ` +
    `ILLUSTRATIVE SAMPLE placeholders, not live satellite-derived figures. Keep answers concise ` +
    `(2-4 sentences). If the user names a specific tracked site, set focusSiteName to its exact name.\n\n` +
    `SITE DATASET:\n${flattened}\n\n` +
    `Respond ONLY with a JSON object of the shape {"text": string, "conf": number|null, ` +
    `"focusSiteName": string|null} and nothing else — no markdown, no code fences.`;
}

app.post("/api/chat", async (req, res) => {
  try {
    if (!ANTHROPIC_API_KEY) {
      return res.status(503).json({ error: "Server is missing ANTHROPIC_API_KEY. See backend/.env.example." });
    }
    const { message, sites } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Missing 'message' string in request body." });
    }
    if (!Array.isArray(sites)) {
      return res.status(400).json({ error: "Missing 'sites' array in request body." });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 500,
        system: buildSystemPrompt(sites),
        messages: [{ role: "user", content: message }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", response.status, errText);
      return res.status(502).json({ error: "Upstream Anthropic API error." });
    }

    const data = await response.json();
    const textBlock = (data.content || []).find(b => b.type === "text");
    const raw = textBlock ? textBlock.text : "{}";

    let parsed;
    try {
      parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
    } catch {
      // Model didn't return clean JSON — fall back to raw text so the
      // conversation still works instead of erroring out.
      parsed = { text: raw, conf: null, focusSiteName: null };
    }

    res.json({
      text: parsed.text || "I couldn't generate an answer for that.",
      conf: typeof parsed.conf === "number" ? parsed.conf : null,
      focusSiteName: parsed.focusSiteName || null
    });
  } catch (err) {
    console.error("Chat endpoint error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(PORT, () => {
  console.log(`MAGNEX server running at http://localhost:${PORT}`);
  if (!ANTHROPIC_API_KEY) {
    console.warn("WARNING: ANTHROPIC_API_KEY is not set — /api/chat will return 503 until it is. The frontend will still work by falling back to local dataset reasoning.");
  }
});
