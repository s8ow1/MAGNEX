(() => {
  // Whole-site 3D background. Renders once into a fixed, full-viewport
  // canvas placed behind every section (z-index -1 in style.css), instead
  // of being scoped to just the hero. Same wireframe "survey globe" +
  // orbiting satellite concept as before, but the deposit markers are now
  // read live from window.MAGNEX_DATA (populated by script.js) so every
  // tracked site across the whole country shows up as a pulsing marker,
  // not just a hardcoded handful.
  const canvas = document.getElementById("bgCanvas");
  if (!canvas || typeof THREE === "undefined") return;

  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0.6, 6.6);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  function size() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  // Wireframe globe = the survey region
  const globeGeo = new THREE.IcosahedronGeometry(2.1, 3);
  const globeMat = new THREE.MeshBasicMaterial({ color: 0x3c5b6f, wireframe: true, transparent: true, opacity: 0.4 });
  const globe = new THREE.Mesh(globeGeo, globeMat);
  scene.add(globe);

  // Faint solid core so the wireframe reads as a volume, not a cage
  const coreGeo = new THREE.IcosahedronGeometry(2.06, 2);
  const coreMat = new THREE.MeshBasicMaterial({ color: 0x0c2133, transparent: true, opacity: 0.55 });
  scene.add(new THREE.Mesh(coreGeo, coreMat));

  // Scattered background stars = the wider imaging field
  const starCount = 700;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const r = 8 + Math.random() * 14;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    starPos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
    starPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
    starPos[i*3+2] = r * Math.cos(phi);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({ color: 0x6d8494, size: 0.03, transparent: true, opacity: 0.55 });
  scene.add(new THREE.Points(starGeo, starMat));

  // Deposit markers on the globe surface — colour keyed to prospectivity
  // class (green/amber/blue), read live from the site dataset so every
  // tracked site nationwide appears, not a fixed hardcoded list.
  function classIndex(cls) {
    if (cls === "HIGH") return 0;
    if (cls === "MEDIUM") return 1;
    return 2;
  }
  function buildDeposits() {
    const flat = (window.MAGNEXAPI && window.MAGNEXAPI.allSitesFlat) ? window.MAGNEXAPI.allSitesFlat() : [];
    if (flat.length) return flat.map(s => ({ lat: s.lat, lng: s.lng, cls: classIndex(s.cls) }));
    // fallback if the dataset hasn't loaded yet
    return [
      { lat: 21.8, lng: 80.2, cls: 0 },
      { lat: 21.6, lng: 85.6, cls: 0 },
      { lat: 22.1, lng: 84.0, cls: 1 },
    ];
  }
  const deposits = buildDeposits();
  const classColor = [0x5fb98c, 0xd3a94f, 0x5f9ad3];

  function toSphere(lat, lng, radius) {
    // remap raw lat/lng (roughly spans mainland India) to a pleasant
    // spread across the visible hemisphere of the globe
    const phi = (90 - (lat - 8) * 3.1) * (Math.PI / 180);
    const theta = (lng - 76) * 5 * (Math.PI / 180);
    return new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }

  const markerGroup = new THREE.Group();
  const markerMeshes = [];
  deposits.forEach(d => {
    const pos = toSphere(d.lat, d.lng, 2.12);
    const geo = new THREE.SphereGeometry(0.05, 12, 12);
    const mat = new THREE.MeshBasicMaterial({ color: classColor[d.cls] });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(pos);
    markerGroup.add(mesh);
    markerMeshes.push({ mesh, phase: Math.random() * Math.PI * 2 });

    // faint glow ring
    const ringGeo = new THREE.RingGeometry(0.065, 0.09, 20);
    const ringMat = new THREE.MeshBasicMaterial({ color: classColor[d.cls], transparent: true, opacity: 0.45, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(pos);
    ring.lookAt(0,0,0);
    markerGroup.add(ring);
  });
  scene.add(markerGroup);

  // Orbiting satellite with a thin trailing ring = the imaging pass
  const satOrbit = new THREE.Group();
  satOrbit.rotation.x = 0.5;
  satOrbit.rotation.z = 0.15;
  scene.add(satOrbit);

  const orbitRingGeo = new THREE.RingGeometry(3.05, 3.06, 128);
  const orbitRingMat = new THREE.MeshBasicMaterial({ color: 0x6d8494, transparent: true, opacity: 0.3, side: THREE.DoubleSide });
  const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
  orbitRing.rotation.x = Math.PI / 2;
  satOrbit.add(orbitRing);

  const satGeo = new THREE.ConeGeometry(0.09, 0.22, 4);
  const satMat = new THREE.MeshBasicMaterial({ color: 0xe4e9ed });
  const sat = new THREE.Mesh(satGeo, satMat);
  sat.position.set(3.05, 0, 0);
  sat.rotation.z = Math.PI / 2;
  satOrbit.add(sat);

  size();
  window.addEventListener("resize", size);

  // Rebuild markers once the real dataset is confirmed ready (script.js
  // dispatches this after its own init), in case hero3d.js ran first.
  document.addEventListener("magnex:map-ready", () => {
    markerGroup.clear();
    markerMeshes.length = 0;
    buildDeposits().forEach(d => {
      const pos = toSphere(d.lat, d.lng, 2.12);
      const geo = new THREE.SphereGeometry(0.05, 12, 12);
      const mat = new THREE.MeshBasicMaterial({ color: classColor[d.cls] });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos);
      markerGroup.add(mesh);
      markerMeshes.push({ mesh, phase: Math.random() * Math.PI * 2 });
      const ringGeo = new THREE.RingGeometry(0.065, 0.09, 20);
      const ringMat = new THREE.MeshBasicMaterial({ color: classColor[d.cls], transparent: true, opacity: 0.45, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(0,0,0);
      markerGroup.add(ring);
    });
  }, { once: true });

  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += reduceMotion ? 0.0007 : 0.0026;

    globe.rotation.y = t * 1.3;
    markerGroup.rotation.y = t * 1.3;

    satOrbit.rotation.y = t * 2.1;

    markerMeshes.forEach(({mesh, phase}) => {
      const s = 1 + Math.sin(t * 6 + phase) * 0.35;
      mesh.scale.setScalar(s);
    });

    renderer.render(scene, camera);
  }
  animate();
})();
