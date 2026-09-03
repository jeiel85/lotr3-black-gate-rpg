/**
 * Main Application Entry Point
 * Integrates 3D Scene, Particle Effects, Procedural Models, RPG HUD, and Combat Engine.
 */

import * as THREE from "three";
import { SceneManager } from "./scene.js";
import { WorldBuilder } from "./models.js";
import { ParticleSystem } from "./particles.js";
import { CombatEngine } from "./combat.js";
import { UIManager } from "./ui.js";
import { UNITS_DATA } from "./unitsData.js";
import { soundEngine } from "./audio.js";

class App {
  constructor() {
    this.canvasContainer = document.getElementById("canvas-container");
    this.sceneManager = null;
    this.worldBuilder = null;
    this.particleSystem = null;
    this.combatEngine = null;
    this.uiManager = null;
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    // 1. Scene Manager
    this.sceneManager = new SceneManager(this.canvasContainer, (unitId, rootGroup) => {
      this.handleUnitSelected(unitId, rootGroup);
    });

    // 2. Particle System
    this.particleSystem = new ParticleSystem(this.sceneManager.scene);

    // 3. World & 3D Procedural Models
    this.worldBuilder = new WorldBuilder(this.sceneManager.scene);
    this.worldBuilder.buildAll();

    // 4. UI Manager
    this.uiManager = new UIManager(
      UNITS_DATA,
      (skillIdx) => this.combatEngine.castSkill(skillIdx),
      (camMode, targetGroup) => this.sceneManager.setCameraMode(camMode, targetGroup),
      (targetGroup) => this.sceneManager.setCameraMode("focus", targetGroup)
    );

    // 5. Combat Simulation Engine
    this.combatEngine = new CombatEngine(
      this.sceneManager,
      this.particleSystem,
      UNITS_DATA,
      (logHtml) => this.uiManager.appendCombatLog(logHtml),
      (ringProgress) => this.uiManager.updateRingProgress(ringProgress)
    );

    // Default select Aragorn on load
    setTimeout(() => {
      const aragornObj = this.worldBuilder.interactiveObjects.find(
        (obj) => obj.userData.unitId === "aragorn"
      );
      if (aragornObj) {
        this.handleUnitSelected("aragorn", aragornObj.userData.rootGroup);
      }
    }, 400);

    // Initial Welcome Log
    this.uiManager.appendCombatLog("<span class='log-sys'>⚔️ [모란논 검은 문 결전] 반지의 제왕 3 대작 RPG 전장이 전개되었습니다.</span>");
    this.uiManager.appendCombatLog("<span class='log-sys'>💡 3D 전장의 영웅, 오크, 트롤, 사우론의 눈, 검은 문을 마우스로 클릭하여 상태를 확인하세요.</span>");
    this.uiManager.appendCombatLog("<span class='log-sys'>⌨️ 숫자키 1~6번 또는 하단 핫바를 눌러 영웅 스킬을 시전할 수 있습니다.</span>");

    // Start Main Loop
    this.animate();
  }

  handleUnitSelected(unitId, rootGroup) {
    const unit = UNITS_DATA[unitId];
    if (!unit) return;

    // Set 3D target ring color based on faction
    let colorHex = 0x00d2d3;
    if (unit.faction === "west") {
      colorHex = unit.tier.includes("신화") ? 0xffd700 : 0x00d2d3;
    } else if (unit.faction === "mordor") {
      colorHex = unitId === "eye_of_sauron" ? 0xff1100 : 0xff4757;
    } else {
      colorHex = 0xff9f1a;
    }

    const radius = rootGroup.userData.selectionRadius || 3.0;
    this.worldBuilder.setTargetSelection(rootGroup, colorHex, radius);
    this.uiManager.selectUnit(unitId, rootGroup);

    soundEngine.init();
    soundEngine.playSwordClash();
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();

    // Update 3D components
    this.sceneManager.update(delta);
    this.worldBuilder.update(delta);
    this.particleSystem.update(delta);
    this.combatEngine.update(delta);

    // Update UI
    this.uiManager.updateTargetGauges();

    // Update Minimap
    const camDir = new THREE.Vector3();
    this.sceneManager.camera.getWorldDirection(camDir);
    this.uiManager.renderMinimap(this.sceneManager.camera.position, camDir);

    // Render Scene
    this.sceneManager.render();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new App();
});
