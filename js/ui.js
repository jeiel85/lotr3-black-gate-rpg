/**
 * AAA Fantasy RPG HUD & UI Manager
 * Handles Target Unit Frame Inspector, Minimap Radar, Hotbar, Combat Log, and Controls.
 */

import { soundEngine } from "./audio.js";

export class UIManager {
  constructor(unitsData, onSkillTrigger, onCameraChange, onFocusUnit) {
    this.units = unitsData;
    this.onSkillTrigger = onSkillTrigger;
    this.onCameraChange = onCameraChange;
    this.onFocusUnit = onFocusUnit;

    this.selectedUnit = null;
    this.selectedGroup = null;

    this.initDOMElements();
    this.setupEventListeners();
    this.setupMinimap();
  }

  initDOMElements() {
    this.inspectorPanel = document.getElementById("target-inspector");
    this.inspectorEmpty = document.getElementById("inspector-empty");
    this.inspectorContent = document.getElementById("inspector-content");

    this.unitIcon = document.getElementById("target-icon");
    this.unitName = document.getElementById("target-name");
    this.unitTitle = document.getElementById("target-title");
    this.unitTier = document.getElementById("target-tier");
    this.unitFaction = document.getElementById("target-faction");

    this.hpBarFill = document.getElementById("target-hp-fill");
    this.hpText = document.getElementById("target-hp-text");
    this.mpBarFill = document.getElementById("target-mp-fill");
    this.mpText = document.getElementById("target-mp-text");

    this.statAtk = document.getElementById("stat-atk");
    this.statDef = document.getElementById("stat-def");
    this.statCrit = document.getElementById("stat-crit");
    this.statPower = document.getElementById("stat-power");

    this.buffsList = document.getElementById("target-buffs");
    this.skillsList = document.getElementById("target-skills");
    this.unitLore = document.getElementById("target-lore");

    this.combatLog = document.getElementById("combat-log-body");
    this.ringProgressFill = document.getElementById("ring-progress-fill");
    this.ringProgressText = document.getElementById("ring-progress-text");

    this.btnFocusCam = document.getElementById("btn-focus-cam");
    this.btnCastSkill = document.getElementById("btn-cast-unit-skill");
    this.btnVoiceQuote = document.getElementById("btn-voice-quote");

    this.minimapCanvas = document.getElementById("minimap-canvas");
    this.minimapCtx = this.minimapCanvas.getContext("2d");
  }

  setupEventListeners() {
    // Hotbar buttons 1-6
    document.querySelectorAll(".skill-slot").forEach((slot) => {
      slot.addEventListener("click", () => {
        const slotIdx = parseInt(slot.dataset.slot, 10);
        this.triggerSkillSlot(slotIdx, slot);
      });
    });

    // Keyboard Shortcuts 1-6
    window.addEventListener("keydown", (e) => {
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 6) {
        const slot = document.querySelector(`.skill-slot[data-slot="${num}"]`);
        if (slot) this.triggerSkillSlot(num, slot);
      }
    });

    // Camera Mode Selectors
    document.querySelectorAll(".cam-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".cam-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const mode = btn.dataset.mode;
        this.onCameraChange(mode, this.selectedGroup);
      });
    });

    // Sound / Music Toggles
    const btnBgm = document.getElementById("btn-bgm-toggle");
    if (btnBgm) {
      btnBgm.addEventListener("click", () => {
        const isPlaying = soundEngine.toggleBgm();
        btnBgm.classList.toggle("active", isPlaying);
        btnBgm.innerHTML = isPlaying ? "🎵 전장 군악 [ON]" : "🔇 전장 군악 [OFF]";
      });
    }

    const btnHorn = document.getElementById("btn-horn-call");
    if (btnHorn) {
      btnHorn.addEventListener("click", () => {
        soundEngine.init();
        soundEngine.playWarHorn(1.0);
        this.appendCombatLog("<span class='log-hero'>📯 곤도르와 로한의 전설적인 전쟁 나팔이 모란논 평원에 울려 퍼집니다!</span>");
      });
    }

    // Inspector Action Buttons
    if (this.btnFocusCam) {
      this.btnFocusCam.addEventListener("click", () => {
        if (this.selectedGroup) {
          this.onFocusUnit(this.selectedGroup);
        }
      });
    }

    if (this.btnCastSkill) {
      this.btnCastSkill.addEventListener("click", () => {
        if (this.selectedUnit && this.selectedUnit.skills && this.selectedUnit.skills.length > 0) {
          const sk = this.selectedUnit.skills[0];
          soundEngine.playSwordClash();
          this.appendCombatLog(`<span class="log-hero">[수동 시전]</span> ${this.selectedUnit.name}의 <b>[${sk.name}]</b> 발동!`);
        }
      });
    }

    if (this.btnVoiceQuote) {
      this.btnVoiceQuote.addEventListener("click", () => {
        if (this.selectedUnit && this.selectedUnit.quote) {
          soundEngine.playQuote(this.selectedUnit.quote);
          this.appendCombatLog(`<span class="log-quote">💬 "${this.selectedUnit.quote}"</span>`);
        }
      });
    }
  }

  triggerSkillSlot(slotIdx, slotElem) {
    if (slotElem.classList.contains("cooldown")) return;

    // Trigger visual cooldown animation
    slotElem.classList.add("cooldown");
    const overlay = slotElem.querySelector(".cooldown-overlay");
    if (overlay) overlay.style.height = "100%";

    this.onSkillTrigger(slotIdx);

    // Cooldown duration based on skill slot
    const cdTime = [5000, 7000, 15000, 10000, 3000, 25000][slotIdx - 1] || 5000;
    setTimeout(() => {
      slotElem.classList.remove("cooldown");
      if (overlay) overlay.style.height = "0%";
    }, cdTime);
  }

  selectUnit(unitId, rootGroup) {
    const unit = this.units[unitId];
    if (!unit) return;

    this.selectedUnit = unit;
    this.selectedGroup = rootGroup;

    // Show Inspector Panel
    this.inspectorEmpty.style.display = "none";
    this.inspectorContent.style.display = "block";

    // Bind Data
    this.unitIcon.textContent = unit.icon || "⚔️";
    this.unitName.textContent = unit.name;
    this.unitTitle.textContent = unit.title;
    this.unitTier.textContent = unit.tier;
    this.unitTier.style.color = unit.tierColor || "#ffd700";
    this.unitFaction.textContent = unit.factionName;
    this.unitFaction.className = `faction-badge ${unit.faction}`;

    this.statAtk.textContent = unit.attack.toLocaleString();
    this.statDef.textContent = unit.defense.toLocaleString();
    this.statCrit.textContent = unit.critRate;
    this.statPower.textContent = unit.combatPower;

    this.unitLore.textContent = unit.lore;

    // Render Buffs
    this.buffsList.innerHTML = "";
    if (unit.buffs && unit.buffs.length > 0) {
      unit.buffs.forEach((b) => {
        const badge = document.createElement("div");
        badge.className = `buff-tag ${b.type}`;
        badge.innerHTML = `<span class="buff-icon">${b.icon}</span> ${b.name}`;
        badge.title = b.desc;
        this.buffsList.appendChild(badge);
      });
    } else {
      this.buffsList.innerHTML = "<span class='no-buffs'>적용된 효과 없음</span>";
    }

    // Render Skills
    this.skillsList.innerHTML = "";
    if (unit.skills && unit.skills.length > 0) {
      unit.skills.forEach((s) => {
        const skItem = document.createElement("div");
        skItem.className = "unit-skill-card";
        skItem.innerHTML = `
          <div class="skill-card-head">
            <span class="sk-icon">${s.icon || "⚔️"}</span>
            <span class="sk-name">${s.name}</span>
            <span class="sk-cost">${s.cost}</span>
          </div>
          <div class="sk-desc">${s.desc}</div>
        `;
        this.skillsList.appendChild(skItem);
      });
    }

    this.updateTargetGauges();
  }

  updateTargetGauges() {
    if (!this.selectedUnit) return;
    const hpRatio = Math.max(0, Math.min(100, (this.selectedUnit.hp / this.selectedUnit.maxHp) * 100));
    const mpRatio = this.selectedUnit.maxMp > 0 ? (this.selectedUnit.mp / this.selectedUnit.maxMp) * 100 : 0;

    this.hpBarFill.style.width = `${hpRatio}%`;
    this.hpText.textContent = `${this.selectedUnit.hp.toLocaleString()} / ${this.selectedUnit.maxHp.toLocaleString()} (${hpRatio.toFixed(1)}%)`;

    this.mpBarFill.style.width = `${mpRatio}%`;
    this.mpText.textContent = `${this.selectedUnit.mp.toLocaleString()} / ${this.selectedUnit.maxMp.toLocaleString()}`;
  }

  updateRingProgress(percent) {
    if (this.ringProgressFill) {
      this.ringProgressFill.style.width = `${percent}%`;
    }
    if (this.ringProgressText) {
      this.ringProgressText.textContent = `${percent.toFixed(1)}%`;
    }
  }

  appendCombatLog(htmlMessage) {
    if (!this.combatLog) return;
    const item = document.createElement("div");
    item.className = "log-entry";
    item.innerHTML = htmlMessage;
    this.combatLog.appendChild(item);

    // Limit log lines
    if (this.combatLog.children.length > 40) {
      this.combatLog.removeChild(this.combatLog.firstChild);
    }
    this.combatLog.scrollTop = this.combatLog.scrollHeight;
  }

  setupMinimap() {
    this.minimapCanvas.width = 180;
    this.minimapCanvas.height = 180;
  }

  renderMinimap(cameraPos, cameraDir) {
    const ctx = this.minimapCtx;
    const w = 180;
    const h = 180;

    ctx.clearRect(0, 0, w, h);

    // Dark parchment background
    ctx.fillStyle = "#120f11";
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, w / 2 - 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#c8a165";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Map Coordinates translation (-90..90 to 0..180)
    const toMapX = (worldX) => (worldX + 90) * (w / 180);
    const toMapY = (worldZ) => (worldZ + 90) * (h / 180);

    // Draw Black Gate Wall line
    ctx.strokeStyle = "#4a3c31";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(toMapX(-30), toMapY(-35));
    ctx.lineTo(toMapX(30), toMapY(-35));
    ctx.stroke();

    // Draw Units
    for (let key in this.units) {
      const u = this.units[key];
      const mx = toMapX(u.position.x);
      const my = toMapY(u.position.z);

      if (u.faction === "west") {
        ctx.fillStyle = u.tier.includes("신화") ? "#ffd700" : "#00d2d3";
        ctx.beginPath();
        ctx.arc(mx, my, 3.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (u.faction === "mordor") {
        ctx.fillStyle = key === "eye_of_sauron" ? "#ff1100" : "#ff4d4d";
        ctx.beginPath();
        ctx.arc(mx, my, key === "eye_of_sauron" ? 5.5 : 3.0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Mount Doom
        ctx.fillStyle = "#ff9f1a";
        ctx.beginPath();
        ctx.arc(mx, my, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Draw Camera Position & FOV Cone
    const camX = toMapX(cameraPos.x);
    const camY = toMapY(cameraPos.z);

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(camX, camY, 3, 0, Math.PI * 2);
    ctx.fill();

    // Cone
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(camX, camY);
    ctx.lineTo(camX + cameraDir.x * 20 - cameraDir.z * 10, camY + cameraDir.z * 20 + cameraDir.x * 10);
    ctx.moveTo(camX, camY);
    ctx.lineTo(camX + cameraDir.x * 20 + cameraDir.z * 10, camY + cameraDir.z * 20 - cameraDir.x * 10);
    ctx.stroke();
  }
}
