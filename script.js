(() => {
  // ---------------------------------------------------------------------
  // SITE DATASET
  // Expanded to cover every major manganese-ore producing state in India
  // (Odisha, Madhya Pradesh, Maharashtra, Karnataka, Andhra Pradesh,
  // Jharkhand, Gujarat), based on published district-level occurrence data
  // (Gondite belt: Balaghat/Chhindwara/Jhabua/Nagpur/Bhandara; Kodurite &
  // Khondolite belt: Kalahandi/Koraput; laterite belt: Sambalpur/Balangir;
  // Dharwar belt: Uttara Kannada/Ballari/Chitradurga/Shivamogga; Kodurite
  // (Archaean) belt: Srikakulam/Vizianagaram; Singhbhum belt in Jharkhand;
  // Panchmahal in Gujarat). Coordinates are district-level approximations.
  // Prospectivity / confidence / indicator values remain ILLUSTRATIVE
  // SAMPLE placeholders, consistent with the rest of the prototype — they
  // are not derived from live satellite passes.
  // ---------------------------------------------------------------------
  const data = {
    mp: {
      name: "Madhya Pradesh",
      districts: {
        balaghat: {
          name: "Balaghat",
          sites: [
            {name:"Balaghat Site 01",lat:21.806,lng:80.188,p:78.4,c:91,prod:"2,450 t",ore:"Manganese ore",iron:"0.68",lith:"0.84",drain:"1.72 km/km²",line:"0.61",ndvi:"0.31",swir:"0.57",cls:"HIGH",gap:"550 t/day"},
            {name:"Balaghat Site 02",lat:21.790,lng:80.200,p:68.2,c:87,prod:"2,080 t",ore:"Manganese ore",iron:"0.61",lith:"0.77",drain:"1.48 km/km²",line:"0.54",ndvi:"0.34",swir:"0.51",cls:"MEDIUM",gap:"920 t/day"}
          ]
        },
        chhindwara: {
          name: "Chhindwara",
          sites: [
            {name:"Chhindwara Site 01",lat:22.057,lng:78.938,p:61.5,c:84,prod:"1,720 t",ore:"Manganese ore",iron:"0.56",lith:"0.71",drain:"1.31 km/km²",line:"0.49",ndvi:"0.37",swir:"0.46",cls:"MEDIUM",gap:"1,280 t/day"},
            {name:"Chhindwara Site 02",lat:22.080,lng:78.950,p:57.9,c:82,prod:"1,590 t",ore:"Manganese ore",iron:"0.52",lith:"0.68",drain:"1.25 km/km²",line:"0.45",ndvi:"0.39",swir:"0.43",cls:"MEDIUM",gap:"1,410 t/day"}
          ]
        },
        jabalpur: {
          name: "Jabalpur",
          sites: [
            {name:"Jabalpur Site 01",lat:23.181,lng:79.986,p:49.7,c:78,prod:"1,120 t",ore:"Manganese-bearing rock",iron:"0.44",lith:"0.63",drain:"1.10 km/km²",line:"0.39",ndvi:"0.42",swir:"0.38",cls:"LOW",gap:"1,880 t/day"}
          ]
        },
        jhabua: {
          name: "Jhabua",
          sites: [
            {name:"Jhabua Site 01",lat:22.767,lng:74.590,p:44.6,c:75,prod:"860 t",ore:"Manganese-bearing rock",iron:"0.40",lith:"0.58",drain:"1.02 km/km²",line:"0.35",ndvi:"0.45",swir:"0.34",cls:"LOW",gap:"1,540 t/day"}
          ]
        }
      }
    },
    od: {
      name: "Odisha",
      districts: {
        keonjhar: {
          name: "Keonjhar",
          sites: [
            {name:"Keonjhar Site 01",lat:21.628,lng:85.582,p:82.1,c:93,prod:"2,760 t",ore:"Manganese ore",iron:"0.73",lith:"0.88",drain:"1.83 km/km²",line:"0.66",ndvi:"0.29",swir:"0.62",cls:"HIGH",gap:"240 t/day"},
            {name:"Keonjhar Site 02",lat:21.650,lng:85.600,p:76.3,c:90,prod:"2,510 t",ore:"Manganese ore",iron:"0.69",lith:"0.83",drain:"1.71 km/km²",line:"0.63",ndvi:"0.30",swir:"0.59",cls:"HIGH",gap:"490 t/day"}
          ]
        },
        sundargarh: {
          name: "Sundargarh",
          sites: [
            {name:"Sundargarh Site 01",lat:22.116,lng:84.043,p:64.8,c:86,prod:"1,940 t",ore:"Manganese ore (Gondite)",iron:"0.59",lith:"0.75",drain:"1.42 km/km²",line:"0.52",ndvi:"0.35",swir:"0.49",cls:"MEDIUM",gap:"1,060 t/day"},
            {name:"Sundargarh Site 02",lat:22.130,lng:84.060,p:58.6,c:83,prod:"1,680 t",ore:"Manganese ore (Gondite)",iron:"0.54",lith:"0.70",drain:"1.34 km/km²",line:"0.47",ndvi:"0.38",swir:"0.45",cls:"MEDIUM",gap:"1,320 t/day"}
          ]
        },
        koraput: {
          name: "Koraput",
          sites: [
            {name:"Koraput Site 01",lat:18.813,lng:82.712,p:53.4,c:80,prod:"1,260 t",ore:"Manganese-bearing rock (Khondolite)",iron:"0.47",lith:"0.66",drain:"1.16 km/km²",line:"0.42",ndvi:"0.40",swir:"0.41",cls:"LOW",gap:"1,740 t/day"}
          ]
        },
        kalahandi: {
          name: "Kalahandi",
          sites: [
            {name:"Kalahandi Site 01",lat:19.913,lng:83.165,p:56.2,c:81,prod:"1,410 t",ore:"Manganese-bearing rock (Kodurite)",iron:"0.50",lith:"0.69",drain:"1.22 km/km²",line:"0.44",ndvi:"0.39",swir:"0.43",cls:"MEDIUM",gap:"1,360 t/day"}
          ]
        },
        sambalpur: {
          name: "Sambalpur",
          sites: [
            {name:"Sambalpur Site 01",lat:21.467,lng:83.973,p:47.9,c:76,prod:"980 t",ore:"Lateritic manganese ore",iron:"0.43",lith:"0.61",drain:"1.08 km/km²",line:"0.38",ndvi:"0.43",swir:"0.37",cls:"LOW",gap:"1,620 t/day"}
          ]
        }
      }
    },
    mh: {
      name: "Maharashtra",
      districts: {
        nagpur: {
          name: "Nagpur",
          sites: [
            {name:"Nagpur Site 01",lat:21.146,lng:79.088,p:74.9,c:89,prod:"2,340 t",ore:"Manganese ore (Gondite)",iron:"0.66",lith:"0.82",drain:"1.66 km/km²",line:"0.60",ndvi:"0.32",swir:"0.55",cls:"HIGH",gap:"620 t/day"},
            {name:"Nagpur Site 02",lat:21.170,lng:79.130,p:66.1,c:85,prod:"2,010 t",ore:"Manganese ore (Gondite)",iron:"0.60",lith:"0.76",drain:"1.46 km/km²",line:"0.53",ndvi:"0.35",swir:"0.50",cls:"MEDIUM",gap:"960 t/day"}
          ]
        },
        bhandara: {
          name: "Bhandara",
          sites: [
            {name:"Bhandara Site 01",lat:21.166,lng:79.654,p:69.7,c:87,prod:"2,150 t",ore:"Manganese ore (Gondite)",iron:"0.62",lith:"0.79",drain:"1.53 km/km²",line:"0.56",ndvi:"0.33",swir:"0.52",cls:"MEDIUM",gap:"860 t/day"}
          ]
        },
        ratnagiri: {
          name: "Ratnagiri",
          sites: [
            {name:"Ratnagiri Site 01",lat:16.994,lng:73.300,p:52.8,c:79,prod:"1,240 t",ore:"High-grade manganese ore",iron:"0.48",lith:"0.65",drain:"1.15 km/km²",line:"0.41",ndvi:"0.41",swir:"0.40",cls:"LOW",gap:"1,700 t/day"}
          ]
        }
      }
    },
    ka: {
      name: "Karnataka",
      districts: {
        uttarakannada: {
          name: "Uttara Kannada",
          sites: [
            {name:"Uttara Kannada Site 01",lat:14.802,lng:74.129,p:60.3,c:83,prod:"1,650 t",ore:"Manganese ore (Dharwar)",iron:"0.55",lith:"0.72",drain:"1.28 km/km²",line:"0.48",ndvi:"0.36",swir:"0.47",cls:"MEDIUM",gap:"1,300 t/day"}
          ]
        },
        ballari: {
          name: "Ballari",
          sites: [
            {name:"Ballari Site 01",lat:15.140,lng:76.921,p:63.5,c:85,prod:"1,830 t",ore:"Manganese ore (Dharwar)",iron:"0.57",lith:"0.74",drain:"1.36 km/km²",line:"0.50",ndvi:"0.34",swir:"0.48",cls:"MEDIUM",gap:"1,140 t/day"}
          ]
        },
        chitradurga: {
          name: "Chitradurga",
          sites: [
            {name:"Chitradurga Site 01",lat:14.230,lng:76.398,p:48.4,c:77,prod:"940 t",ore:"Manganese-bearing rock",iron:"0.42",lith:"0.60",drain:"1.05 km/km²",line:"0.37",ndvi:"0.44",swir:"0.36",cls:"LOW",gap:"1,590 t/day"}
          ]
        },
        shivamogga: {
          name: "Shivamogga",
          sites: [
            {name:"Shivamogga Site 01",lat:13.928,lng:75.568,p:45.1,c:75,prod:"780 t",ore:"Manganese-bearing rock",iron:"0.39",lith:"0.57",drain:"0.98 km/km²",line:"0.34",ndvi:"0.46",swir:"0.33",cls:"LOW",gap:"1,610 t/day"}
          ]
        }
      }
    },
    ap: {
      name: "Andhra Pradesh",
      districts: {
        srikakulam: {
          name: "Srikakulam",
          sites: [
            {name:"Srikakulam Site 01",lat:18.298,lng:83.897,p:55.7,c:80,prod:"1,380 t",ore:"Manganese ore (Kodurite)",iron:"0.49",lith:"0.67",drain:"1.19 km/km²",line:"0.43",ndvi:"0.40",swir:"0.42",cls:"MEDIUM",gap:"1,380 t/day"}
          ]
        },
        visakhapatnam: {
          name: "Visakhapatnam",
          sites: [
            {name:"Visakhapatnam Site 01",lat:17.686,lng:83.218,p:51.9,c:78,prod:"1,190 t",ore:"Manganese ore (Kodurite)",iron:"0.46",lith:"0.64",drain:"1.13 km/km²",line:"0.40",ndvi:"0.42",swir:"0.39",cls:"LOW",gap:"1,560 t/day"}
          ]
        },
        vizianagaram: {
          name: "Vizianagaram",
          sites: [
            {name:"Vizianagaram Site 01",lat:18.117,lng:83.411,p:46.8,c:76,prod:"860 t",ore:"Manganese-bearing rock",iron:"0.41",lith:"0.59",drain:"1.01 km/km²",line:"0.36",ndvi:"0.45",swir:"0.35",cls:"LOW",gap:"1,580 t/day"}
          ]
        }
      }
    },
    jh: {
      name: "Jharkhand",
      districts: {
        singhbhum: {
          name: "Singhbhum",
          sites: [
            {name:"Singhbhum Site 01",lat:22.556,lng:85.805,p:50.2,c:78,prod:"1,090 t",ore:"Manganese ore",iron:"0.45",lith:"0.63",drain:"1.09 km/km²",line:"0.39",ndvi:"0.43",swir:"0.38",cls:"LOW",gap:"1,610 t/day"}
          ]
        },
        dhanbad: {
          name: "Dhanbad",
          sites: [
            {name:"Dhanbad Site 01",lat:23.795,lng:86.430,p:41.6,c:73,prod:"620 t",ore:"Manganese-bearing rock",iron:"0.37",lith:"0.54",drain:"0.92 km/km²",line:"0.32",ndvi:"0.48",swir:"0.31",cls:"LOW",gap:"1,470 t/day"}
          ]
        }
      }
    },
    gj: {
      name: "Gujarat",
      districts: {
        panchmahal: {
          name: "Panchmahal",
          sites: [
            {name:"Panchmahal Site 01",lat:22.777,lng:73.614,p:43.9,c:74,prod:"710 t",ore:"Manganese-bearing rock",iron:"0.38",lith:"0.56",drain:"0.95 km/km²",line:"0.33",ndvi:"0.47",swir:"0.32",cls:"LOW",gap:"1,520 t/day"}
          ]
        }
      }
    }
  };

  // Expose the dataset + helpers so other scripts (agent.js, hero3d.js) can
  // reuse the exact same numbers shown on the map/analytics panels.
  window.MAGNEX_DATA = data;

  let map, markers = [], baseLayers = {}, selectedState = "", selectedDistrict = "", selectedSite = "";

  const $ = id => document.getElementById(id);
  const stateName = s => data[s]?.name || "";

  function resetSelect(el, label) {
    el.innerHTML = `<option value="">${label}</option>`;
  }

  function districts(state) {
    return data[state] ? Object.entries(data[state].districts) : [];
  }

  function sites(state, district) {
    return data[state]?.districts?.[district]?.sites || [];
  }

  function allSitesFlat() {
    const out = [];
    Object.entries(data).forEach(([stKey, st]) => {
      Object.entries(st.districts).forEach(([dKey, d]) => {
        d.sites.forEach(s => out.push({ ...s, stateKey: stKey, stateName: st.name, districtKey: dKey, districtName: d.name }));
      });
    });
    return out;
  }

  // shared helpers for agent.js / hero3d.js
  window.MAGNEXAPI = { stateName, districts, sites, allSitesFlat };

  function fillDistricts(state, select) {
    resetSelect(select, "Choose district");
    if (!state) { select.disabled = true; return; }
    districts(state).forEach(([id,d]) => {
      const o=document.createElement("option");
      o.value=id; o.textContent=d.name; select.appendChild(o);
    });
    select.disabled=false;
  }

  function fillSites(state, district, select) {
    resetSelect(select, "Choose site");
    if (!state || !district) { select.disabled=true; return; }
    sites(state,district).forEach((s,i) => {
      const o=document.createElement("option");
      o.value=String(i); o.textContent=s.name; select.appendChild(o);
    });
    select.disabled=false;
  }

  // -----------------------------------------------------------------------
  // ILLUSTRATIVE WEEKLY PRODUCTION MODEL
  // Turns each site's single "daily production" sample value into a full
  // 7-day illustrative curve, instead of one fixed static chart shared by
  // every site. The shape follows a typical open-cast mining production
  // cycle (ramp-up through the week, a Saturday peak from cleared backlog,
  // a lighter Sunday shift) plus a small per-site deterministic jitter so
  // every site's chart looks distinct but reproducible on reload. Still an
  // ILLUSTRATIVE / SAMPLE curve, not a live production feed.
  // -----------------------------------------------------------------------
  const WEEK_LABELS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const WEEKDAY_CURVE = [0.62, 0.74, 0.68, 0.86, 0.79, 0.95, 0.83]; // relative shape

  function hashSeed(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) { h = (h * 31 + str.charCodeAt(i)) >>> 0; }
    return h;
  }

  function weeklyProduction(site) {
    const base = parseInt(String(site.prod).replace(/[^\d]/g, ""), 10) || 1000;
    const seed = hashSeed(site.name);
    return WEEK_LABELS.map((label, i) => {
      const jitter = 1 + (((seed >> (i * 3)) % 13) - 6) / 100; // deterministic ±6%
      const value = Math.round(base * WEEKDAY_CURVE[i] * jitter);
      return { label, value };
    });
  }

  function renderWeeklyChart(site) {
    const bars = document.querySelectorAll("#weeklyChart .bar");
    const labels = document.querySelectorAll("#weeklyChart .barval");
    if (!bars.length) return;
    const week = weeklyProduction(site);
    const max = Math.max(...week.map(d => d.value));
    week.forEach((d, i) => {
      const pct = Math.max(6, Math.round((d.value / max) * 100));
      if (bars[i]) bars[i].style.setProperty("--h", pct + "%");
      if (labels[i]) labels[i].textContent = d.value.toLocaleString();
    });
    const caption = $("chartCaption");
    if (caption) {
      caption.textContent = `Illustrative weekly pattern for ${site.name}, generated from its ${site.prod}/day baseline using a typical open-cast weekday/weekend production cycle. Sample data — not a live feed.`;
    }
  }
  window.MAGNEXAPI.renderWeeklyChart = renderWeeklyChart;

  function showAnalytics(s, state, district) {
    if (!s) return;
    $("name").textContent=s.name;
    $("loc").textContent=`${data[state].name} • ${data[state].districts[district].name}`;
    $("prob").textContent=s.p+"%";
    $("conf").textContent=s.c+"%";
    $("prod").textContent=s.prod;
    $("ore").textContent=s.ore;
    $("iron").textContent=s.iron;
    $("lith").textContent=s.lith;
    $("drain").textContent=s.drain;
    $("line").textContent=s.line;
    $("ndvi").textContent=s.ndvi;
    $("swir").textContent=s.swir;
    $("pclass").textContent=s.cls;
    $("gap").textContent=s.gap;
    renderWeeklyChart(s);
  }
  window.MAGNEXAPI.showAnalytics = showAnalytics;

  function clearMarkers() {
    markers.forEach(m => map.removeLayer(m));
    markers=[];
  }

  function addMarker(s,state,district) {
    const color=s.p>=75 ? "#5fb98c" : s.p>=55 ? "#d3a94f" : "#5f9ad3";
    const m=L.circleMarker([s.lat,s.lng],{
      radius:9,fillColor:color,color:"#fff",weight:1,fillOpacity:.9,className:"site-marker"
    }).addTo(map);
    m.bindPopup(
      `<b>${s.name}</b><br>${data[state].name}, ${data[state].districts[district].name}`+
      `<br>Prospectivity: <b>${s.p}%</b><br>Confidence: ${s.c}%`
    );
    m.on("click",()=>{ showAnalytics(s,state,district); document.dispatchEvent(new CustomEvent("magnex:site-selected",{detail:{site:s,state,district}})); });
    markers.push(m);
  }

  function showAllSites() {
    clearMarkers();
    Object.entries(data).forEach(([state,st])=>{
      Object.entries(st.districts).forEach(([district,d])=>{
        d.sites.forEach(s=>addMarker(s,state,district));
      });
    });
  }
  window.MAGNEXAPI.showAllSites = () => { if(map) showAllSites(); };
  window.MAGNEXAPI.flyTo = (state,district,index)=>{
    if(!map) return;
    const s = sites(state,district)[Number(index)];
    if(!s) return;
    clearMarkers(); addMarker(s,state,district);
    map.setView([s.lat,s.lng],10);
    showAnalytics(s,state,district);
  };

  function showSelectedSite(state,district,index) {
    const s=sites(state,district)[Number(index)];
    if(!s) return;
    clearMarkers();
    addMarker(s,state,district);
    map.setView([s.lat,s.lng],9);
    $("mresult").classList.remove("hide");
    $("mresult").innerHTML=
      `<h3>${s.name}</h3>`+
      `<div class="row"><span>State</span><b>${data[state].name}</b></div>`+
      `<div class="row"><span>District</span><b>${data[state].districts[district].name}</b></div>`+
      `<div class="row"><span>Prospectivity</span><b>${s.p}%</b></div>`+
      `<div class="row"><span>Model confidence</span><b>${s.c}%</b></div>`+
      `<div class="row"><span>Class</span><b>${s.cls}</b></div>`;
    showAnalytics(s,state,district);
  }

  function wireSelectors() {
    $("ms").addEventListener("change",e=>{
      selectedState=e.target.value;
      fillDistricts(selectedState,$("md"));
      resetSelect($("msite"),"Choose site"); $("msite").disabled=true;
      $("mresult").classList.add("hide");
      showAllSites();
      if(selectedState) {
        const coords = {
          mp:[23.3,79.8], od:[20.6,84.3], mh:[20.0,78.5], ka:[14.6,75.6],
          ap:[17.8,83.2], jh:[23.1,86.0], gj:[22.8,73.6]
        }[selectedState] || [22.5,80];
        map.setView(coords,6);
      }
    });

    $("md").addEventListener("change",e=>{
      selectedDistrict=e.target.value;
      fillSites(selectedState,selectedDistrict,$("msite"));
      if(selectedDistrict){
        const arr=sites(selectedState,selectedDistrict);
        clearMarkers(); arr.forEach(s=>addMarker(s,selectedState,selectedDistrict));
        if(arr[0]) map.setView([arr[0].lat,arr[0].lng],9);
      }
    });

    $("msite").addEventListener("change",e=>{
      selectedSite=e.target.value;
      if(selectedSite!=="") showSelectedSite(selectedState,selectedDistrict,selectedSite);
    });

    $("as").addEventListener("change",e=>{
      fillDistricts(e.target.value,$("ad"));
      resetSelect($("asite"),"Choose site"); $("asite").disabled=true;
    });

    $("ad").addEventListener("change",e=>{
      const st=$("as").value, d=e.target.value;
      fillSites(st,d,$("asite"));
    });

    $("asite").addEventListener("change",e=>{
      const st=$("as").value,d=$("ad").value,i=e.target.value;
      if(i!=="") showAnalytics(sites(st,d)[Number(i)],st,d);
    });
  }

  function wireBaseLayerToggle() {
    const btns = document.querySelectorAll(".layerbtn");
    btns.forEach(btn=>{
      btn.addEventListener("click",()=>{
        const key = btn.dataset.layer;
        Object.entries(baseLayers).forEach(([k,layer])=>{
          if(k===key){ if(!map.hasLayer(layer)) map.addLayer(layer); }
          else { if(map.hasLayer(layer)) map.removeLayer(layer); }
        });
        btns.forEach(b=>b.classList.toggle("active", b===btn));
      });
    });
  }

  function init() {
    map=L.map("map",{zoomControl:true}).setView([22.5,80],5);

    // Base layer 1: standard OpenStreetMap
    baseLayers.street = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
      maxZoom:18,
      attribution:"&copy; OpenStreetMap contributors"
    });

    // Base layer 2: real satellite/aerial imagery (Esri World Imagery — public tile
    // service, no API key required). This is genuine satellite/aerial photography,
    // not an illustration.
    baseLayers.satellite = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { maxZoom:18, attribution:"Imagery &copy; Esri, Maxar, Earthstar Geographics" }
    );

    baseLayers.street.addTo(map);

    showAllSites();
    wireSelectors();
    wireBaseLayerToggle();

    $("exploreBtn").addEventListener("click",()=>{
      const active=$("exploreBtn").classList.toggle("active");
      $("exploreBtn").textContent=active ? "× Exit Explore Mode" : "＋ Explore any location";
      $("hint").textContent=active ? "Click anywhere on the map to place a pin." : "Choose a site or turn on Explore Mode.";
      if(active) $("mresult").classList.add("hide");
    });

    map.on("click",e=>{
      if(!$("exploreBtn").classList.contains("active")) return;
      clearMarkers();
      const m=L.marker(e.latlng).addTo(map);
      markers.push(m);
      m.bindPopup(`<b>Exploration point</b><br>Lat: ${e.latlng.lat.toFixed(5)}<br>Lng: ${e.latlng.lng.toFixed(5)}`).openPopup();
      $("mresult").classList.remove("hide");
      $("mresult").innerHTML=
        `<h3>New exploration point</h3>`+
        `<div class="row"><span>Latitude</span><b>${e.latlng.lat.toFixed(5)}</b></div>`+
        `<div class="row"><span>Longitude</span><b>${e.latlng.lng.toFixed(5)}</b></div>`;
    });

    showAnalytics(data.mp.districts.balaghat.sites[0],"mp","balaghat");
    document.dispatchEvent(new CustomEvent("magnex:map-ready"));
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init);
  else init();
})();
