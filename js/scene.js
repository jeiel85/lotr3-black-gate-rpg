/**
 * Three.js Scene, Lighting, Atmospheric Fog, Cameras, and Raycasting
 */

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class SceneManager {
  constructor(canvasContainer, onUnitClicked) {
    this.container = canvasContainer;
    this.onUnitClicked = onUnitClicked;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Camera modes: 'free', 'cinematic', 'hero', 'rts'
    this.cameraMode = "free";
    this.cinematicTime = 0;
    this.cameraTargetPos = new THREE.Vector3(0, 18, 55);
    this.cameraLookAtPos = new THREE.Vector3(0, 4, 0);

    this.init();
  }

  init() {
    // 1. Scene & Volcanic Fog
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0e090b);
    this.scene.fog = new THREE.FogExp2(0x160a0d, 0.0085);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.5,
      600
    );
    this.camera.position.set(0, 22, 60);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.container.appendChild(this.renderer.domElement);

    // 4. OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.02; // Don't go below ground
    this.controls.minDistance = 6;
    this.controls.maxDistance = 180;
    this.controls.target.set(0, 4, 0);

    // 5. Lighting
    this.setupLighting();

    // 6. Event Listeners
    window.addEventListener("resize", () => this.onResize());
    this.renderer.domElement.addEventListener("pointerdown", (e) => this.onPointerDown(e));
  }

  setupLighting() {
    // Ambient Light (Eerie dark atmosphere)
    const ambientLight = new THREE.AmbientLight(0x2a1a1f, 1.4);
    this.scene.add(ambientLight);

    // Main Directional Light (Piercing sunlight through Mordor ash clouds)
    const sunLight = new THREE.DirectionalLight(0xffe8d6, 2.2);
    sunLight.position.set(45, 65, 35);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 180;
    sunLight.shadow.camera.left = -60;
    sunLight.shadow.camera.right = 60;
    sunLight.shadow.camera.top = 60;
    sunLight.shadow.camera.bottom = -60;
    sunLight.shadow.bias = -0.0005;
    this.scene.add(sunLight);

    // Volcanic ground bounce light (Ominous red upward glow)
    const bounceLight = new THREE.DirectionalLight(0xff2200, 1.2);
    bounceLight.position.set(0, -20, 0);
    this.scene.add(bounceLight);

    // Black Gate dramatic rim light
    const gateRim = new THREE.PointLight(0x7158e2, 2.5, 70);
    gateRim.position.set(0, 25, -25);
    this.scene.add(gateRim);
  }

  setCameraMode(mode, targetGroup = null) {
    this.cameraMode = mode;
    this.controls.enabled = mode === "free";

    if (mode === "hero") {
      // Behind Aragorn looking at the Black Gate
      this.cameraTargetPos.set(0, 5, 33);
      this.cameraLookAtPos.set(0, 6, -10);
    } else if (mode === "rts") {
      // Top-down tactical battlefield overview
      this.cameraTargetPos.set(0, 75, 45);
      this.cameraLookAtPos.set(0, 0, -5);
    } else if (mode === "focus" && targetGroup) {
      // Focus on clicked target
      const p = targetGroup.position;
      this.cameraTargetPos.set(p.x, p.y + 6, p.z + 14);
      this.cameraLookAtPos.set(p.x, p.y + 2, p.z);
    }
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onPointerDown(event) {
    // Only handle primary button clicks
    if (event.button !== 0) return;

    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    for (let hit of intersects) {
      let obj = hit.object;
      while (obj) {
        if (obj.userData && obj.userData.unitId) {
          this.onUnitClicked(obj.userData.unitId, obj.userData.rootGroup);
          return;
        }
        obj = obj.parent;
      }
    }
  }

  update(delta) {
    this.cinematicTime += delta;

    if (this.cameraMode === "cinematic") {
      // Dramatic dynamic cinematic tracking sweep
      const angle = this.cinematicTime * 0.12;
      const radius = 55 + Math.sin(this.cinematicTime * 0.2) * 15;
      const height = 18 + Math.cos(this.cinematicTime * 0.15) * 8;

      this.camera.position.x = Math.cos(angle) * radius;
      this.camera.position.z = Math.sin(angle) * radius * 0.85;
      this.camera.position.y = height;
      this.camera.lookAt(0, 4, 0);
    } else if (this.cameraMode === "hero" || this.cameraMode === "rts" || this.cameraMode === "focus") {
      // Smooth interpolation to target pos
      this.camera.position.lerp(this.cameraTargetPos, 0.05);
      const currentLookAt = new THREE.Vector3();
      this.camera.getWorldDirection(currentLookAt);
      this.controls.target.lerp(this.cameraLookAtPos, 0.05);
      this.camera.lookAt(this.controls.target);
    } else {
      this.controls.update();
    }
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
