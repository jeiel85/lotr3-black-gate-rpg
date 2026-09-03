/**
 * Combat Simulation & Floating RPG Damage Text System
 * Simulates active battles, damage calculation, floating numbers, and Ring of Power countdown.
 */

import * as THREE from "three";
import { soundEngine } from "./audio.js";

export class CombatEngine {
  constructor(sceneManager, particleSystem, unitsData, onCombatLog, onRingProgress) {
    this.sceneManager = sceneManager;
    this.particles = particleSystem;
    this.units = unitsData;
    this.onCombatLog = onCombatLog;
    this.onRingProgress = onRingProgress;

    this.ringProgress = 88.0; // Starts at 88% towards Mount Doom destruction
    this.isVictory = false;
    this.timeScale = 1.0;
    this.combatTimer = 0;

    this.damageContainer = document.getElementById("floating-damage-container");
  }

  update(delta) {
    const scaledDelta = delta * this.timeScale;
    this.combatTimer += scaledDelta;

    // Advance Ring of Power progress slowly
    if (!this.isVictory && this.ringProgress < 100) {
      this.ringProgress += scaledDelta * 0.35;
      this.onRingProgress(Math.min(100, this.ringProgress));

      if (this.ringProgress >= 100) {
        this.triggerOneRingDestruction();
      }
    }

    // Periodic automatic combat clashes
    if (this.combatTimer > 2.2) {
      this.combatTimer = 0;
      this.simulateBattleTick();
    }
  }

  simulateBattleTick() {
    const encounters = [
      {
        attacker: this.units.gimli,
        target: this.units.olog_hai,
        skill: "에레보르의 분쇄타",
        dmg: Math.floor(25000 + Math.random() * 8000),
        isCrit: Math.random() < 0.4
      },
      {
        attacker: this.units.legolas,
        target: this.units.mumakil,
        skill: "거수 급소 저격",
        dmg: Math.floor(18000 + Math.random() * 6000),
        isCrit: true
      },
      {
        attacker: this.units.olog_hai,
        target: this.units.gondor_guard,
        skill: "대지 분쇄타",
        dmg: Math.floor(14000 + Math.random() * 5000),
        isCrit: false
      },
      {
        attacker: this.units.gwaihir,
        target: this.units.nazgul,
        skill: "천공 급강하 강습",
        dmg: Math.floor(32000 + Math.random() * 10000),
        isCrit: Math.random() < 0.5
      }
    ];

    const pick = encounters[Math.floor(Math.random() * encounters.length)];
    this.applyDamage(pick.attacker, pick.target, pick.dmg, pick.isCrit, pick.skill);
  }

  applyDamage(attacker, target, damage, isCrit = false, skillName = null) {
    if (!target || target.hp <= 0) return;

    const actualDmg = isCrit ? Math.floor(damage * 1.5) : damage;
    target.hp = Math.max(0, target.hp - actualDmg);

    // Floating text position in 3D
    const pos = new THREE.Vector3(target.position.x, target.position.y + 3.0, target.position.z);
    this.spawnFloatingNumber(pos, actualDmg, isCrit, skillName);

    // Particles & SFX
    this.particles.spawnHitSparks(pos, isCrit ? 35 : 18, isCrit ? 0xffcc00 : 0xff4422);

    if (isCrit) {
      soundEngine.playSwordClash();
    }

    // Combat Log
    if (this.onCombatLog) {
      const critTag = isCrit ? `<span class="log-crit">[치명타!]</span> ` : "";
      const skillText = skillName ? `[${skillName}]으로 ` : "";
      const logMsg = `${attacker.name}이(가) ${skillText}${target.name}에게 ${critTag}<b class="${isCrit ? 'text-crit' : 'text-dmg'}">${actualDmg.toLocaleString()}</b>의 피해를 입혔습니다!`;
      this.onCombatLog(logMsg);
    }
  }

  spawnFloatingNumber(worldPos, damage, isCrit, label = null) {
    if (!this.damageContainer) return;

    // Convert 3D world position to 2D screen coordinates
    const screenPos = worldPos.clone().project(this.sceneManager.camera);
    const x = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-screenPos.y * 0.5 + 0.5) * window.innerHeight;

    // Off-screen check
    if (screenPos.z > 1) return;

    const elem = document.createElement("div");
    elem.className = `floating-dmg ${isCrit ? "crit" : ""}`;
    elem.style.left = `${x + (Math.random() - 0.5) * 40}px`;
    elem.style.top = `${y + (Math.random() - 0.5) * 30}px`;

    let content = "";
    if (label) {
      content += `<div class="dmg-skill-label">${label}</div>`;
    }
    content += `<div class="dmg-val">${isCrit ? "CRITICAL! " : ""}-${damage.toLocaleString()}</div>`;
    elem.innerHTML = content;

    this.damageContainer.appendChild(elem);

    setTimeout(() => {
      if (elem.parentNode) elem.parentNode.removeChild(elem);
    }, 1400);
  }

  // Cast Hero Skills (Triggered by Hotbar 1~6)
  castSkill(skillIndex) {
    switch (skillIndex) {
      case 1: // Andúril Slash
        soundEngine.playSwordClash();
        soundEngine.playWarHorn(0.7);
        this.particles.spawnHitSparks(new THREE.Vector3(0, 0, 0), 60, 0x80deea);
        this.applyDamage(this.units.aragorn, this.units.olog_hai, 48000, true, "안두릴의 일격");
        this.onCombatLog(`<span class="log-hero">[영웅 스킬]</span> 아라곤이 <b>[안두릴의 일격]</b>을 시전하여 전방의 어둠을 가르고 강력한 신성 관통타를 날립니다!`);
        break;

      case 2: // Light of the Istari
        soundEngine.playMagicHoly();
        this.particles.spawnHolyBurst(new THREE.Vector3(-12, 0, 27));
        this.applyDamage(this.units.gandalf, this.units.nazgul, 52000, true, "이스타리의 섬광");
        this.onCombatLog(`<span class="log-hero">[신화 스킬]</span> 간달프가 <b>[이스타리의 섬광]</b>을 개방하여 전장을 눈부신 빛으로 뒤덮었습니다!`);
        break;

      case 3: // Horn of Rohan Charge
        soundEngine.playWarHorn(1.0);
        soundEngine.playQuote("돌격하라! 파멸을 향하여! 데스!!");
        this.applyDamage(this.units.rohan_cavalry, this.units.orc_infantry, 58000, true, "에오를의 쐐기 돌격");
        this.onCombatLog(`<span class="log-hero">[전술 호른]</span> 로한의 기병대가 돌격 나팔 소리와 함께 적 진형을 짓밟고 돌파합니다!`);
        break;

      case 4: // Eagle Strike
        soundEngine.playNazgulScreech();
        this.applyDamage(this.units.gwaihir, this.units.nazgul, 64000, true, "천공 급강하 습격");
        this.onCombatLog(`<span class="log-hero">[공중 지원]</span> 바람의 군주 과이히르가 창공에서 급강하하여 나즈굴의 펠비스트를 공중 분쇄합니다!`);
        break;

      case 5: // Cinematic Bullet-Time
        this.timeScale = this.timeScale === 1.0 ? 0.25 : 1.0;
        this.onCombatLog(`<span class="log-sys">[시간 조작]</span> ${this.timeScale < 1 ? "시네마틱 불릿 타임 (Slow-Motion 0.25x) 활성화" : "정상 시간 복귀 (1.0x)"}`);
        break;

      case 6: // "For Frodo!" Ultimate War Cry
        soundEngine.playWarHorn(1.0);
        soundEngine.playQuote("프로도를 위하여!", 0.95, 0.9);
        this.particles.spawnHolyBurst(new THREE.Vector3(0, 0, 25));
        this.applyDamage(this.units.aragorn, this.units.eye_of_sauron, 120000, true, "프로도를 위하여!");
        this.onCombatLog(`<span class="log-hero">[궁극의 결의]</span> 아라곤: <b>"프로도를 위하여!"</b> - 전 연합군이 사우론의 본진을 향해 전면 돌격을 감행합니다!`);
        break;
    }
  }

  triggerOneRingDestruction() {
    this.isVictory = true;
    soundEngine.playWarHorn(1.0);
    soundEngine.playMagicHoly();

    this.onCombatLog(`<span class="log-victory">🔥 [운명의 성취] 골룸과 함께 절대반지가 운명의 산 용암 속으로 떨어졌습니다!</span>`);
    this.onCombatLog(`<span class="log-victory">⚡ 바랏두르 요새가 무너져 내리고, 사우론의 눈이 영원히 소멸합니다! 서부의 승리입니다!</span>`);

    // Huge explosion of holy burst at Eye of Sauron position
    this.particles.spawnHolyBurst(new THREE.Vector3(28, 46, -65));
    this.particles.spawnHitSparks(new THREE.Vector3(28, 46, -65), 100, 0xffaa00);

    // Camera shake
    const cam = this.sceneManager.camera;
    let shakeCount = 0;
    const shakeInterval = setInterval(() => {
      cam.position.x += (Math.random() - 0.5) * 1.5;
      cam.position.y += (Math.random() - 0.5) * 1.5;
      shakeCount++;
      if (shakeCount > 25) clearInterval(shakeInterval);
    }, 40);
  }
}
