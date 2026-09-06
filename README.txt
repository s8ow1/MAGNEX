MAGNEX - Web Files (v2)

Files
-----
index.html          : Main webpage
style.css           : All page styling (incl. whole-site 3D background, satellite toggle, AI agent widget)
script.js           : Nationwide site dataset, map, State -> District -> Site dropdowns, analytics, weekly-production chart
hero3d.js           : Three.js 3D scene rendered as a FIXED, FULL-PAGE background (not just the hero)
agent.js            : MAGNEX AI agent widget (bottom-right chat) — calls the backend API, with local fallback
backend/            : Node/Express backend that serves the site and proxies chat requests to the real Anthropic API
MAGNEX_COMPLETE_WORKING.html : Everything inlined into one file (static version — agent falls back to local reasoning since there's no backend to call)

Open index.html directly in a browser for the static experience (map, analytics,
chart, 3D background, and the agent's local dataset reasoning all work with no
server). To get the agent's real generative-AI answers, run the backend (below).


WHAT'S NEW IN THIS VERSION
---------------------------

1. Illustrative weekly production chart is now data-driven (script.js)
   Previously every site showed the exact same fixed bar chart. Now
   `weeklyProduction(site)` turns each site's own daily-production sample
   value into a distinct 7-day illustrative curve (a typical open-cast
   weekday/weekend production shape, plus a small deterministic per-site
   jitter so the pattern is stable across reloads but different per site).
   The chart re-renders automatically whenever you pick a different site
   in Explore Map or Analytics. Still illustrative/sample data, not a live
   production feed — the caption under the chart says so explicitly.

2. Nationwide manganese-ore site coverage (script.js + index.html)
   The dataset now covers every major manganese-ore producing state in
   India, based on published district-level occurrence data:
     - Madhya Pradesh   — Balaghat, Chhindwara, Jabalpur, Jhabua
     - Odisha           — Keonjhar, Sundargarh, Koraput, Kalahandi, Sambalpur
     - Maharashtra      — Nagpur, Bhandara, Ratnagiri
     - Karnataka        — Uttara Kannada, Ballari, Chitradurga, Shivamogga
     - Andhra Pradesh   — Srikakulam, Visakhapatnam, Vizianagaram
     - Jharkhand        — Singhbhum, Dhanbad
     - Gujarat          — Panchmahal
   That's 21 sites across 20 districts and 7 states, all selectable from
   the State -> District -> Site dropdowns and plotted on the map. Site
   coordinates are district-level approximations; prospectivity,
   confidence and indicator values remain ILLUSTRATIVE SAMPLE placeholders
   consistent with the original prototype — not derived from live
   satellite passes.

3. Whole-site 3D background (hero3d.js + style.css)
   The Three.js scene (wireframe survey globe, pulsing deposit markers,
   orbiting satellite) now renders into a single fixed, full-viewport
   canvas (#bgCanvas) placed behind EVERY section, not just the hero. The
   deposit markers are read live from the site dataset, so all 21 sites
   nationwide show up on the globe. Cards, panels and the header use
   translucent/glass backgrounds (backdrop-filter blur) so the 3D scene
   is visible as you scroll through the whole page, while text stays
   readable. Respects prefers-reduced-motion.

4. Real backend + Anthropic API connection (backend/server.js, agent.js)
   agent.js now POSTs each question to a same-origin `/api/chat` endpoint
   instead of only reasoning locally. backend/server.js is a small
   Express server that serves the static frontend AND implements that
   endpoint: it takes the user's question plus the same flattened site
   dataset shown on screen, calls the real Anthropic Messages API
   server-side (using an API key read from an environment variable, so it
   is never exposed to the browser), and returns a grounded answer. If
   the backend isn't running (e.g. you just open index.html with no
   server), agent.js automatically falls back to the original local
   deterministic dataset reasoning — the widget never breaks, it just
   loses the free-form generative layer.

   To run it:
     cd backend
     npm install
     cp .env.example .env      # then paste your real Anthropic API key into .env
     npm start
   Then open http://localhost:3000 (the backend serves the frontend too,
   so everything is same-origin and agent.js's relative fetch just works).


WHAT'S STILL A PLACEHOLDER
---------------------------
The prospectivity %, confidence %, and all indicator values (iron-oxide
index, NDVI, SWIR, etc.) are sample numbers, not computed from live
satellite passes — same as the original prototype. A production version
would need a real feature pipeline (e.g. Google Earth Engine) and a
trained/validated model behind those numbers, plus field-verified site
coordinates rather than district-level approximations.
