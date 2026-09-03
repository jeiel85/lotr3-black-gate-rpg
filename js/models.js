/**
 * 3D Procedural Models & Environment for Battle of the Black Gate
 * Three.js procedural meshes for Aragorn, Gandalf, Legolas, Gimli, Trolls, Nazgûl, Eagles, Black Gate, Eye of Sauron, etc.
 */

import * as THREE from "three";

export class WorldBuilder {
  constructor(scene) {
    this.scene = scene;
    this.interactiveObjects = []; // Clickable meshes mapped to unit IDs
    this.animatedUnits = [];      // Objects with custom update loops (e.g. wings, cape, eye)
    this.targetRing = null;       // 3D Selection Ring
  }

  buildAll() {
    this.createTerrain();
    this.createBlackGate();
    this.createMountDoom();
    this.createBaradDurAndEye();
    this.createHeroes();
    this.createMordorForces();
    this.createRegiments();
    this.createSelectionRing();
  }

  // 1. Volcanic Mordor Terrain with Lava Veins
  createTerrain() {
    // Ground Plane
    const groundGeo = new THREE.PlaneGeometry(240, 240, 64, 64);
    groundGeo.rotateX(-Math.PI / 2);

    // Subtle craggy displacements
    const pos = groundGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      // Gentle slope upwards towards Black Gate & mountains
      let y = Math.sin(x * 0.05) * Math.cos(z * 0.05) * 1.2;
      if (z < -30) {
        y += Math.abs(z + 30) * 0.15;
      }
      pos.setY(i, y);
    }
    groundGeo.computeVertexNormals();

    // Procedural terrain texture using HTML Canvas
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    // Dark ash ground
    ctx.fillStyle = "#151314";
    ctx.fillRect(0, 0, 512, 512);

    // Jagged rock noise
    for (let i = 0; i < 6000; i++) {
      const px = Math.random() * 512;
      const py = Math.random() * 512;
      const gray = Math.floor(Math.random() * 40 + 20);
      ctx.fillStyle = `rgb(${gray}, ${gray * 0.9}, ${gray * 0.8})`;
      ctx.fillRect(px, py, 2, 2);
    }

    // Glowing orange lava fissures
    ctx.strokeStyle = "#ff4500";
    ctx.lineWidth = 3;
    ctx.shadowColor = "#ff2200";
    ctx.shadowBlur = 8;
    for (let i = 0; i < 15; i++) {
      ctx.beginPath();
      let sx = Math.random() * 512;
      let sy = Math.random() * 512;
      ctx.moveTo(sx, sy);
      for (let j = 0; j < 5; j++) {
        sx += (Math.random() - 0.5) * 60;
        sy += (Math.random() - 0.5) * 60;
        ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }

    const groundTex = new THREE.CanvasTexture(canvas);
    groundTex.wrapS = THREE.RepeatWrapping;
    groundTex.wrapT = THREE.RepeatWrapping;
    groundTex.repeat.set(8, 8);

    const groundMat = new THREE.MeshStandardMaterial({
      map: groundTex,
      roughness: 0.9,
      metalness: 0.2
    });

    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Surrounding Mountain Peaks
    const rockGeo = new THREE.ConeGeometry(18, 45, 5);
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x1a1618, roughness: 0.95 });

    const mountainPositions = [
      { x: -90, z: -40, s: 1.4 },
      { x: -110, z: 0, s: 1.8 },
      { x: -95, z: 40, s: 1.5 },
      { x: 90, z: -40, s: 1.4 },
      { x: 110, z: 0, s: 1.9 },
      { x: 95, z: 40, s: 1.6 },
      { x: -60, z: -100, s: 2.2 },
      { x: 60, z: -100, s: 2.1 }
    ];

    mountainPositions.forEach(m => {
      const rock = new THREE.Mesh(rockGeo, rockMat);
      rock.position.set(m.x, 15 * m.s, m.z);
      rock.scale.set(m.s, m.s, m.s);
      rock.rotation.y = Math.random() * Math.PI;
      this.scene.add(rock);
    });
  }

  // 2. The Black Gate of Mordor (모란논의 검은 문)
  createBlackGate() {
    const gateGroup = new THREE.Group();
    gateGroup.position.set(0, 0, -35);

    const darkIronMat = new THREE.MeshStandardMaterial({
      color: 0x111114,
      metalness: 0.85,
      roughness: 0.35
    });

    const rustIronMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b1d,
      metalness: 0.7,
      roughness: 0.6
    });

    // Twin Spiked Watchtowers: Narchost & Carchost
    const towerGeo = new THREE.BoxGeometry(8, 38, 8);
    const towerSpikeGeo = new THREE.ConeGeometry(5, 14, 4);

    [-26, 26].forEach((xPos) => {
      const tower = new THREE.Mesh(towerGeo, darkIronMat);
      tower.position.set(xPos, 19, 0);
      tower.castShadow = true;
      gateGroup.add(tower);

      // Spired roof
      const spike = new THREE.Mesh(towerSpikeGeo, darkIronMat);
      spike.position.set(xPos, 44, 0);
      spike.rotation.y = Math.PI / 4;
      gateGroup.add(spike);

      // Spikes protruding from tower sides
      for (let y = 10; y < 35; y += 8) {
        const sideSpike = new THREE.Mesh(new THREE.ConeGeometry(1, 4, 4), darkIronMat);
        sideSpike.position.set(xPos + (xPos > 0 ? 4 : -4), y, 0);
        sideSpike.rotation.z = xPos > 0 ? -Math.PI / 2.5 : Math.PI / 2.5;
        gateGroup.add(sideSpike);
      }
    });

    // Massive Crenellated Iron Wall Ramparts
    const wallGeo = new THREE.BoxGeometry(46, 26, 6);
    const wall = new THREE.Mesh(wallGeo, rustIronMat);
    wall.position.set(0, 13, 0);
    gateGroup.add(wall);

    // Giant Double Gates (Slightly ajar, orcs marching through)
    const doorGeo = new THREE.BoxGeometry(10, 18, 1.5);
    const doorL = new THREE.Mesh(doorGeo, darkIronMat);
    doorL.position.set(-6, 9, 2);
    doorL.rotation.y = 0.35; // Ajar
    gateGroup.add(doorL);

    const doorR = new THREE.Mesh(doorGeo, darkIronMat);
    doorR.position.set(6, 9, 2);
    doorR.rotation.y = -0.35; // Ajar
    gateGroup.add(doorR);

    // Teeth/Spikes along the top of the wall
    for (let x = -20; x <= 20; x += 3.5) {
      const battleSpike = new THREE.Mesh(new THREE.ConeGeometry(1.2, 5, 4), darkIronMat);
      battleSpike.position.set(x, 28, 0);
      gateGroup.add(battleSpike);
    }

    // Glowing Red Eye of Sauron Insignia above the gate
    const runeGeo = new THREE.TorusGeometry(3, 0.4, 8, 24);
    const runeMat = new THREE.MeshBasicMaterial({ color: 0xff3300 });
    const runeMesh = new THREE.Mesh(runeGeo, runeMat);
    runeMesh.position.set(0, 22, 3.2);
    gateGroup.add(runeMesh);

    const runeCore = new THREE.Mesh(new THREE.SphereGeometry(1.2, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffaa00 }));
    runeCore.position.set(0, 22, 3.2);
    runeCore.scale.set(1, 1.8, 0.3);
    gateGroup.add(runeCore);

    this.scene.add(gateGroup);
    this.registerInteractive(gateGroup, "black_gate", 22);
  }

  // 3. Mount Doom (운명의 산)
  createMountDoom() {
    const doomGroup = new THREE.Group();
    doomGroup.position.set(-55, 0, -80);

    // Craggy volcanic cone
    const volcanoGeo = new THREE.ConeGeometry(28, 48, 16, 8, true);
    const pos = volcanoGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(pos, i);
      v.x += (Math.random() - 0.5) * 3;
      v.z += (Math.random() - 0.5) * 3;
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    volcanoGeo.computeVertexNormals();

    const volcanoMat = new THREE.MeshStandardMaterial({
      color: 0x1f1412,
      roughness: 0.95
    });

    const volcanoMesh = new THREE.Mesh(volcanoGeo, volcanoMat);
    volcanoMesh.position.y = 24;
    doomGroup.add(volcanoMesh);

    // Glowing Molten Lava Caldera at the top
    const craterGeo = new THREE.CylinderGeometry(8, 4, 3, 16);
    const craterMat = new THREE.MeshBasicMaterial({ color: 0xff3300 });
    const crater = new THREE.Mesh(craterGeo, craterMat);
    crater.position.y = 47;
    doomGroup.add(crater);

    // Red light casting upwards from caldera
    const volcanoLight = new THREE.PointLight(0xff3300, 3, 70);
    volcanoLight.position.set(0, 50, 0);
    doomGroup.add(volcanoLight);

    this.scene.add(doomGroup);
    this.registerInteractive(doomGroup, "mount_doom", 35);
  }

  // 4. Barad-dûr & The Flaming Eye of Sauron (바랏두르 & 사우론의 눈)
  createBaradDurAndEye() {
    const baradGroup = new THREE.Group();
    baradGroup.position.set(28, 0, -65);

    const darkTowerMat = new THREE.MeshStandardMaterial({
      color: 0x0a090c,
      roughness: 0.4,
      metalness: 0.8
    });

    // Tiered spiked tower body
    const baseTower = new THREE.Mesh(new THREE.CylinderGeometry(8, 14, 30, 8), darkTowerMat);
    baseTower.position.y = 15;
    baradGroup.add(baseTower);

    const midTower = new THREE.Mesh(new THREE.CylinderGeometry(5, 8, 25, 8), darkTowerMat);
    midTower.position.y = 35;
    baradGroup.add(midTower);

    // Crown: Two towering curved horns
    const hornGeo = new THREE.ConeGeometry(1.5, 16, 5);
    const hornL = new THREE.Mesh(hornGeo, darkTowerMat);
    hornL.position.set(-4.5, 52, 0);
    hornL.rotation.z = -0.18;
    baradGroup.add(hornL);

    const hornR = new THREE.Mesh(hornGeo, darkTowerMat);
    hornR.position.set(4.5, 52, 0);
    hornR.rotation.z = 0.18;
    baradGroup.add(hornR);

    // THE EYE OF SAURON
    const eyeGroup = new THREE.Group();
    eyeGroup.position.set(0, 46, 0);

    // Fiery outer glow sphere
    const eyeAuraGeo = new THREE.SphereGeometry(3.6, 24, 24);
    const eyeAuraMat = new THREE.MeshBasicMaterial({
      color: 0xff2200,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const eyeAura = new THREE.Mesh(eyeAuraGeo, eyeAuraMat);
    eyeAura.scale.set(1.4, 1.8, 0.7);
    eyeGroup.add(eyeAura);

    // Fiery iris
    const eyeCoreGeo = new THREE.SphereGeometry(2.6, 24, 24);
    const eyeCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.95
    });
    const eyeCore = new THREE.Mesh(eyeCoreGeo, eyeCoreMat);
    eyeCore.scale.set(1.2, 1.5, 0.8);
    eyeGroup.add(eyeCore);

    // Slit pupil (Vertical black cat-like slit)
    const pupilGeo = new THREE.CylinderGeometry(0.35, 0.35, 4.2, 12);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x050000 });
    const pupil = new THREE.Mesh(pupilGeo, pupilMat);
    pupil.position.z = 1.3;
    eyeGroup.add(pupil);

    // PointLight representing Sauron's fiery radiance
    const eyeLight = new THREE.PointLight(0xff4400, 4.5, 90);
    eyeLight.position.set(0, 0, 2);
    eyeGroup.add(eyeLight);

    // Spotlight beam searching the battlefield
    const spotLight = new THREE.SpotLight(0xff2200, 6, 120, Math.PI / 6, 0.5, 1);
    spotLight.position.set(0, 0, 2);
    spotLight.target.position.set(0, 0, 20); // Looking towards heroes
    this.scene.add(spotLight.target);
    eyeGroup.add(spotLight);

    baradGroup.add(eyeGroup);
    this.scene.add(baradGroup);

    // Register animated Eye
    this.animatedUnits.push({
      update: (time) => {
        // Eye pulses and looks around
        const s = 1.0 + Math.sin(time * 3) * 0.08;
        eyeAura.scale.set(1.4 * s, 1.8 * s, 0.7 * s);
        // Look angle sway
        eyeGroup.rotation.y = Math.sin(time * 0.6) * 0.45;
        eyeGroup.rotation.x = Math.sin(time * 0.4) * 0.15 + 0.1;
      }
    });

    this.registerInteractive(baradGroup, "eye_of_sauron", 28);
  }

  // 5. West Heroes: Aragorn, Gandalf, Legolas, Gimli, Eagles
  createHeroes() {
    this.createAragorn();
    this.createGandalf();
    this.createLegolas();
    this.createGimli();
    this.createGwaihirEagle();
  }

  createAragorn() {
    const group = new THREE.Group();
    group.position.set(0, 0, 25);

    // Materials
    const armorMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50, metalness: 0.9, roughness: 0.25 });
    const silverMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.95, roughness: 0.15 });
    const capeMat = new THREE.MeshStandardMaterial({ color: 0x7b1113, roughness: 0.8 }); // Crimson Royal Cape
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xd2a679, roughness: 0.7 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x1e1e1e, roughness: 0.9 });

    // Body / Torso with Royal Gondor Cuirass
    const torso = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.2, 1.0), armorMat);
    torso.position.y = 2.4;
    group.add(torso);

    // White Tree of Gondor silver chest crest
    const crest = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.4), silverMat);
    crest.position.set(0, 2.4, 0.52);
    group.add(crest);

    // Royal Cape
    const cape = new THREE.Mesh(new THREE.BoxGeometry(1.8, 3.2, 0.15), capeMat);
    cape.position.set(0, 2.2, -0.6);
    cape.rotation.x = 0.15;
    group.add(cape);

    // Head
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.9, 0.8), skinMat);
    head.position.set(0, 4.0, 0);
    group.add(head);

    // Long dark hair
    const hair = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.1, 0.9), hairMat);
    hair.position.set(0, 4.1, -0.1);
    group.add(hair);

    // King's Circlet (Winged Crown of Gondor)
    const crown = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.08, 8, 16), silverMat);
    crown.position.set(0, 4.3, 0);
    crown.rotation.x = Math.PI / 2;
    group.add(crown);

    // Legs
    const legL = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.8, 0.7), armorMat);
    legL.position.set(-0.45, 0.9, 0);
    group.add(legL);

    const legR = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.8, 0.7), armorMat);
    legR.position.set(0.45, 0.9, 0);
    group.add(legR);

    // Arms
    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.8, 0.5), armorMat);
    armL.position.set(-1.1, 2.4, 0.3);
    armL.rotation.x = 0.3;
    group.add(armL);

    // Right Arm holding Andúril
    const armR = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.8, 0.5), armorMat);
    armR.position.set(1.1, 2.4, 0.2);
    armR.rotation.x = -0.4;
    group.add(armR);

    // Andúril - Flame of the West (Gleaming Sword)
    const swordHilt = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.9), silverMat);
    swordHilt.position.set(1.1, 2.6, 1.0);
    swordHilt.rotation.x = Math.PI / 3;

    // Glowing Blade
    const bladeGeo = new THREE.BoxGeometry(0.18, 3.2, 0.05);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0xe0f7fa,
      emissive: 0x80deea,
      emissiveIntensity: 0.8,
      metalness: 0.95,
      roughness: 0.1
    });
    const swordBlade = new THREE.Mesh(bladeGeo, bladeMat);
    swordBlade.position.set(1.1, 3.8, 1.7);
    swordBlade.rotation.x = Math.PI / 3;

    // Point light on sword
    const swordGlow = new THREE.PointLight(0x80deea, 1.2, 8);
    swordGlow.position.set(1.1, 3.8, 1.7);
    group.add(swordGlow);

    group.add(swordHilt);
    group.add(swordBlade);

    this.scene.add(group);

    this.animatedUnits.push({
      update: (time) => {
        // Idle breathing and cape fluttering
        cape.rotation.x = 0.15 + Math.sin(time * 4) * 0.08;
        torso.position.y = 2.4 + Math.sin(time * 2) * 0.04;
        swordGlow.intensity = 1.0 + Math.sin(time * 5) * 0.4;
      }
    });

    this.registerInteractive(group, "aragorn", 5);
  }

  createGandalf() {
    const group = new THREE.Group();
    group.position.set(-12, 0, 27);

    const whiteRobeMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.6 });
    const silverMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.9 });
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xd2a679, roughness: 0.7 });

    // Flowing White Robe (Cone)
    const robe = new THREE.Mesh(new THREE.ConeGeometry(1.4, 3.4, 12), whiteRobeMat);
    robe.position.y = 1.7;
    group.add(robe);

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.45, 12, 12), skinMat);
    head.position.set(0, 3.6, 0);
    group.add(head);

    // Long white hair & flowing beard
    const beard = new THREE.Mesh(new THREE.ConeGeometry(0.4, 1.3, 8), whiteRobeMat);
    beard.position.set(0, 3.1, 0.35);
    beard.rotation.x = -0.25;
    group.add(beard);

    // Wizard Hat (Pointed Hat)
    const hatBrim = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.08, 16), whiteRobeMat);
    hatBrim.position.set(0, 3.9, 0);
    group.add(hatBrim);

    const hatCone = new THREE.Mesh(new THREE.ConeGeometry(0.65, 1.8, 12), whiteRobeMat);
    hatCone.position.set(-0.1, 4.7, -0.1);
    hatCone.rotation.z = 0.1;
    group.add(hatCone);

    // Istari Staff
    const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 4.8), silverMat);
    staff.position.set(1.1, 2.4, 0.5);
    group.add(staff);

    // Glowing Holy Crystal at staff tip
    const crystalGeo = new THREE.OctahedronGeometry(0.35);
    const crystalMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    crystal.position.set(1.1, 4.8, 0.5);
    group.add(crystal);

    // Holy Light
    const holyLight = new THREE.PointLight(0xffffff, 2.5, 14);
    holyLight.position.set(1.1, 4.8, 0.5);
    group.add(holyLight);

    this.scene.add(group);

    this.animatedUnits.push({
      update: (time) => {
        holyLight.intensity = 2.0 + Math.sin(time * 3.5) * 1.0;
        crystal.rotation.y = time * 2;
      }
    });

    this.registerInteractive(group, "gandalf", 5);
  }

  createLegolas() {
    const group = new THREE.Group();
    group.position.set(12, 0, 27);

    const elfGreenMat = new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.6 });
    const leatherMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.7 });
    const blondMat = new THREE.MeshStandardMaterial({ color: 0xf5cd79, roughness: 0.5 });
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xf8c291, roughness: 0.6 });

    // Slender Torso
    const torso = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.0, 0.8), elfGreenMat);
    torso.position.y = 2.4;
    group.add(torso);

    // Head & Long Blond Hair
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.8, 0.7), skinMat);
    head.position.set(0, 3.8, 0);
    group.add(head);

    const hair = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.4, 0.8), blondMat);
    hair.position.set(0, 3.6, -0.15);
    group.add(hair);

    // Legs
    const legL = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.8, 0.5), leatherMat);
    legL.position.set(-0.35, 0.9, 0);
    group.add(legL);

    const legR = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.8, 0.5), leatherMat);
    legR.position.set(0.35, 0.9, 0);
    group.add(legR);

    // Bow (Curved Torus Arc)
    const bowGeo = new THREE.TorusGeometry(1.3, 0.07, 8, 20, Math.PI * 0.9);
    const bowMat = new THREE.MeshStandardMaterial({ color: 0xd35400 });
    const bow = new THREE.Mesh(bowGeo, bowMat);
    bow.position.set(-0.8, 2.6, 0.7);
    bow.rotation.y = Math.PI / 2;
    group.add(bow);

    // Quiver on back with arrows
    const quiver = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.25, 2.0), leatherMat);
    quiver.position.set(0.3, 2.6, -0.6);
    quiver.rotation.z = 0.35;
    group.add(quiver);

    this.scene.add(group);
    this.registerInteractive(group, "legolas", 5);
  }

  createGimli() {
    const group = new THREE.Group();
    group.position.set(7, 0, 23);

    const dwarfArmorMat = new THREE.MeshStandardMaterial({ color: 0x7f8c8d, metalness: 0.85, roughness: 0.3 });
    const beardMat = new THREE.MeshStandardMaterial({ color: 0xa0522d, roughness: 0.8 }); // Red-brown beard
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.2 });

    // Sturdy Wide Torso
    const torso = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.6, 1.3), dwarfArmorMat);
    torso.position.y = 1.7;
    group.add(torso);

    // Broad Dwarven Helmet with horns
    const helmet = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.8, 8), dwarfArmorMat);
    helmet.position.set(0, 2.8, 0);
    group.add(helmet);

    // Huge braided beard
    const beard = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 0.5), beardMat);
    beard.position.set(0, 2.0, 0.6);
    group.add(beard);

    // Heavy Double-bladed Battle Axe
    const axeHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.8), dwarfArmorMat);
    axeHandle.position.set(1.3, 1.8, 0.4);
    axeHandle.rotation.x = -0.2;
    group.add(axeHandle);

    const bladeL = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.1, 0.06), goldMat);
    bladeL.position.set(0.9, 2.8, 0.4);
    group.add(bladeL);

    const bladeR = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.1, 0.06), goldMat);
    bladeR.position.set(1.7, 2.8, 0.4);
    group.add(bladeR);

    // Short Sturdy Legs
    const legL = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.0, 0.7), dwarfArmorMat);
    legL.position.set(-0.5, 0.5, 0);
    group.add(legL);

    const legR = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.0, 0.7), dwarfArmorMat);
    legR.position.set(0.5, 0.5, 0);
    group.add(legR);

    this.scene.add(group);
    this.registerInteractive(group, "gimli", 5);
  }

  // 6. Gwaihir - The Great Eagle
  createGwaihirEagle() {
    const eagleGroup = new THREE.Group();
    eagleGroup.position.set(-18, 32, 12);

    const featherMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.8 });
    const goldFeatherMat = new THREE.MeshStandardMaterial({ color: 0xcd853f, roughness: 0.7 });
    const beakMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.3 });

    // Eagle Body
    const body = new THREE.Mesh(new THREE.ConeGeometry(1.5, 5, 8), featherMat);
    body.rotation.x = Math.PI / 2.2;
    eagleGroup.add(body);

    // Head & Beak
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.9, 8, 8), goldFeatherMat);
    head.position.set(0, 0.5, 2.8);
    eagleGroup.add(head);

    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.4, 1.2, 4), beakMat);
    beak.position.set(0, 0.2, 3.6);
    beak.rotation.x = Math.PI / 2.3;
    eagleGroup.add(beak);

    // Wings (Wide flapping wings)
    const wingGeo = new THREE.BoxGeometry(5.5, 0.2, 2.4);

    const wingL = new THREE.Mesh(wingGeo, featherMat);
    wingL.position.set(-3.2, 0.2, 0.8);
    eagleGroup.add(wingL);

    const wingR = new THREE.Mesh(wingGeo, featherMat);
    wingR.position.set(3.2, 0.2, 0.8);
    eagleGroup.add(wingR);

    this.scene.add(eagleGroup);

    // Circling and flapping flight animation
    let angle = 0;
    this.animatedUnits.push({
      update: (time) => {
        angle += 0.015;
        eagleGroup.position.x = Math.cos(angle) * 35;
        eagleGroup.position.z = Math.sin(angle) * 25 + 5;
        eagleGroup.rotation.y = -angle + Math.PI / 2;

        // Wing flap
        const flap = Math.sin(time * 8) * 0.4;
        wingL.rotation.z = flap;
        wingR.rotation.z = -flap;
      }
    });

    this.registerInteractive(eagleGroup, "gwaihir", 7);
  }

  // 7. Mordor Forces: Armored Troll (Olog-hai), Nazgûl on Fell Beast, Orc Warlord, Mûmakil
  createMordorForces() {
    this.createOlogHaiTroll();
    this.createNazgulFellBeast();
    this.createOrcWarlord();
    this.createMumakil();
  }

  createOlogHaiTroll() {
    const trollGroup = new THREE.Group();
    trollGroup.position.set(0, 0, -8);

    const skinMat = new THREE.MeshStandardMaterial({ color: 0x47535e, roughness: 0.9 });
    const ironArmorMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, metalness: 0.8, roughness: 0.4 });

    // Hulking Muscular Torso
    const torso = new THREE.Mesh(new THREE.BoxGeometry(3.6, 4.2, 2.8), skinMat);
    torso.position.y = 4.2;
    trollGroup.add(torso);

    // Spiked Iron Chest Harness
    const chestPlate = new THREE.Mesh(new THREE.BoxGeometry(3.8, 2.5, 3.0), ironArmorMat);
    chestPlate.position.y = 4.5;
    trollGroup.add(chestPlate);

    // Spiked Iron Helmet
    const head = new THREE.Mesh(new THREE.SphereGeometry(1.4, 8, 8), skinMat);
    head.position.set(0, 6.6, 0.6);
    trollGroup.add(head);

    const helmet = new THREE.Mesh(new THREE.ConeGeometry(1.6, 2.0, 5), ironArmorMat);
    helmet.position.set(0, 7.5, 0.6);
    trollGroup.add(helmet);

    // Heavy Arms
    const armL = new THREE.Mesh(new THREE.BoxGeometry(1.2, 3.8, 1.2), skinMat);
    armL.position.set(-2.4, 4.0, 0.6);
    armL.rotation.x = 0.3;
    trollGroup.add(armL);

    // Right Arm holding Massive Spiked War Hammer
    const armR = new THREE.Mesh(new THREE.BoxGeometry(1.2, 3.8, 1.2), skinMat);
    armR.position.set(2.4, 4.0, 0.6);
    armR.rotation.x = -0.5;
    trollGroup.add(armR);

    const hammerHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 6.5), ironArmorMat);
    hammerHandle.position.set(2.4, 4.8, 2.4);
    hammerHandle.rotation.x = Math.PI / 3;
    trollGroup.add(hammerHandle);

    const hammerHead = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.8, 1.8), ironArmorMat);
    hammerHead.position.set(2.4, 7.2, 3.8);
    trollGroup.add(hammerHead);

    // Thick Sturdy Legs
    const legL = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.6, 1.6), skinMat);
    legL.position.set(-1.1, 1.3, 0);
    trollGroup.add(legL);

    const legR = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.6, 1.6), skinMat);
    legR.position.set(1.1, 1.3, 0);
    trollGroup.add(legR);

    this.scene.add(trollGroup);

    this.animatedUnits.push({
      update: (time) => {
        // Heavy breathing / menacing sway
        torso.position.y = 4.2 + Math.sin(time * 2) * 0.08;
        armR.rotation.x = -0.5 + Math.sin(time * 1.5) * 0.15;
      }
    });

    this.registerInteractive(trollGroup, "olog_hai", 8);
  }

  createNazgulFellBeast() {
    const group = new THREE.Group();
    group.position.set(14, 28, -8);

    const beastMat = new THREE.MeshStandardMaterial({ color: 0x1b1c1e, roughness: 0.7 });
    const wraithMat = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.95 });

    // Fell Beast Torso
    const torso = new THREE.Mesh(new THREE.ConeGeometry(1.8, 6, 8), beastMat);
    torso.rotation.x = Math.PI / 2.1;
    group.add(torso);

    // Long Serpentine Neck & Head
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 1.1, 4, 8), beastMat);
    neck.position.set(0, 1.2, 3.5);
    neck.rotation.x = Math.PI / 3;
    group.add(neck);

    const head = new THREE.Mesh(new THREE.ConeGeometry(0.8, 2.8, 6), beastMat);
    head.position.set(0, 2.4, 5.2);
    head.rotation.x = Math.PI / 2.2;
    group.add(head);

    // Wide Membranous Bat Wings
    const wingGeo = new THREE.BoxGeometry(7.5, 0.15, 3.5);

    const wingL = new THREE.Mesh(wingGeo, beastMat);
    wingL.position.set(-4.5, 0.4, 0.5);
    group.add(wingL);

    const wingR = new THREE.Mesh(wingGeo, beastMat);
    wingR.position.set(4.5, 0.4, 0.5);
    group.add(wingR);

    // The Nazgûl (Black-robed Ringwraith Rider)
    const wraith = new THREE.Mesh(new THREE.ConeGeometry(0.9, 2.4, 8), wraithMat);
    wraith.position.set(0, 1.6, 0.8);
    group.add(wraith);

    // Spiked Crown of the Witch-king / Ringwraith
    const crown = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.2, 5), new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.9 }));
    crown.position.set(0, 2.9, 0.8);
    group.add(crown);

    this.scene.add(group);

    // Circling flight
    let angle = Math.PI;
    this.animatedUnits.push({
      update: (time) => {
        angle += 0.012;
        group.position.x = Math.cos(angle) * 32 + 5;
        group.position.z = Math.sin(angle) * 22 - 10;
        group.rotation.y = -angle + Math.PI / 2;

        const flap = Math.sin(time * 5) * 0.35;
        wingL.rotation.z = flap;
        wingR.rotation.z = -flap;
      }
    });

    this.registerInteractive(group, "nazgul", 8);
  }

  createOrcWarlord() {
    const group = new THREE.Group();
    group.position.set(-8, 0, -7);

    const orcSkinMat = new THREE.MeshStandardMaterial({ color: 0x556b2f, roughness: 0.8 }); // Olive Drab Orc skin
    const spikedArmorMat = new THREE.MeshStandardMaterial({ color: 0x1e1e1e, metalness: 0.8, roughness: 0.4 });
    const redEyeMat = new THREE.MeshBasicMaterial({ color: 0xd63031 });

    // Torso
    const torso = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.2, 1.2), spikedArmorMat);
    torso.position.y = 2.2;
    group.add(torso);

    // Head with jagged jaw
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.0, 0.9), orcSkinMat);
    head.position.set(0, 3.6, 0.2);
    group.add(head);

    // Orc Standard Banner on Back (Red Eye of Sauron)
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 4.5), spikedArmorMat);
    pole.position.set(-0.6, 3.5, -0.6);
    group.add(pole);

    const banner = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.8), redEyeMat);
    banner.position.set(0, 4.5, -0.6);
    group.add(banner);

    // Curved Orc Scimitar
    const sword = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.6, 0.3), spikedArmorMat);
    sword.position.set(1.4, 2.4, 0.6);
    sword.rotation.x = 0.5;
    group.add(sword);

    // Legs
    const legL = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.6, 0.6), spikedArmorMat);
    legL.position.set(-0.45, 0.8, 0);
    group.add(legL);

    const legR = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.6, 0.6), spikedArmorMat);
    legR.position.set(0.45, 0.8, 0);
    group.add(legR);

    this.scene.add(group);
    this.registerInteractive(group, "orc_warlord", 5);
  }

  createMumakil() {
    const group = new THREE.Group();
    group.position.set(26, 0, -18);

    const elephantSkinMat = new THREE.MeshStandardMaterial({ color: 0x3d3532, roughness: 0.9 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.8 });
    const tuskMat = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.3 });

    // Colossal Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(5.5, 5.0, 8.5), elephantSkinMat);
    body.position.y = 5.5;
    group.add(body);

    // Head
    const head = new THREE.Mesh(new THREE.BoxGeometry(3.8, 3.5, 4.0), elephantSkinMat);
    head.position.set(0, 5.8, 5.2);
    group.add(head);

    // Trunk
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.4, 5.5), elephantSkinMat);
    trunk.position.set(0, 3.0, 7.2);
    trunk.rotation.x = -0.3;
    group.add(trunk);

    // Four Massive Curved Tusks with Spikes
    [
      { x: -1.6, y: 4.8, z: 6.8, rotZ: 0.15 },
      { x: 1.6, y: 4.8, z: 6.8, rotZ: -0.15 },
      { x: -2.2, y: 3.5, z: 6.2, rotZ: 0.25 },
      { x: 2.2, y: 3.5, z: 6.2, rotZ: -0.25 }
    ].forEach(t => {
      const tusk = new THREE.Mesh(new THREE.ConeGeometry(0.35, 5.5, 6), tuskMat);
      tusk.position.set(t.x, t.y, t.z);
      tusk.rotation.x = Math.PI / 2.8;
      tusk.rotation.z = t.rotZ;
      group.add(tusk);
    });

    // Four Massive Pillar Legs
    [
      { x: -2.0, z: -2.5 },
      { x: 2.0, z: -2.5 },
      { x: -2.0, z: 2.5 },
      { x: 2.0, z: 2.5 }
    ].forEach(l => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.3, 4.0), elephantSkinMat);
      leg.position.set(l.x, 2.0, l.z);
      group.add(leg);
    });

    // Multi-tier Wooden War Castle on Back
    const towerBase = new THREE.Mesh(new THREE.BoxGeometry(4.8, 2.8, 6.0), woodMat);
    towerBase.position.set(0, 9.4, 0);
    group.add(towerBase);

    // Red Haradrim Banners
    const redFlag = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.5), new THREE.MeshBasicMaterial({ color: 0xb71540 }));
    redFlag.position.set(0, 11.5, 2.5);
    group.add(redFlag);

    this.scene.add(group);

    this.animatedUnits.push({
      update: (time) => {
        // Slow lumbering gait
        body.position.y = 5.5 + Math.sin(time * 1.5) * 0.12;
        trunk.rotation.x = -0.3 + Math.sin(time * 2) * 0.15;
      }
    });

    this.registerInteractive(group, "mumakil", 10);
  }

  // 8. Army Regiments: Gondor Shield Wall, Rohan Cavalry, Mordor Orc Swarm
  createRegiments() {
    this.createGondorRegiment();
    this.createRohanRegiment();
    this.createOrcSwarmRegiment();
  }

  createGondorRegiment() {
    const group = new THREE.Group();
    group.position.set(-16, 0, 20);

    const shieldMat = new THREE.MeshStandardMaterial({ color: 0x718093, metalness: 0.9, roughness: 0.2 });
    const armorMat = new THREE.MeshStandardMaterial({ color: 0x2f3640, metalness: 0.8 });
    const spearMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.95 });

    // Grid of 3 ranks of 5 soldiers
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 5; c++) {
        const soldier = new THREE.Group();
        soldier.position.set((c - 2) * 1.6, 0, r * 1.4);

        // Body
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.8, 0.6), armorMat);
        body.position.y = 0.9;
        soldier.add(body);

        // Tower Shield (Front rank holds upright)
        if (r === 0) {
          const shield = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.7, 0.15), shieldMat);
          shield.position.set(0, 0.9, -0.45);
          soldier.add(shield);
        }

        // Long Upright Pike/Spear
        const spear = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.8), spearMat);
        spear.position.set(0.4, 1.9, 0);
        spear.rotation.x = -0.15;
        soldier.add(spear);

        group.add(soldier);
      }
    }

    this.scene.add(group);
    this.registerInteractive(group, "gondor_guard", 6);
  }

  createRohanRegiment() {
    const group = new THREE.Group();
    group.position.set(20, 0, 20);

    const horseMat = new THREE.MeshStandardMaterial({ color: 0x6d4c41, roughness: 0.8 });
    const riderMat = new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.6 });
    const lanceMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.9 });

    // 2 rows of 4 mounted riders
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 4; c++) {
        const mount = new THREE.Group();
        mount.position.set((c - 1.5) * 2.2, 0, r * 2.4);

        // Horse Body
        const hBody = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 2.4), horseMat);
        hBody.position.y = 1.3;
        mount.add(hBody);

        // Horse Head
        const hHead = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.0, 1.0), horseMat);
        hHead.position.set(0, 2.0, -1.2);
        mount.add(hHead);

        // Rider
        const rider = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.4, 0.6), riderMat);
        rider.position.set(0, 2.4, 0);
        mount.add(rider);

        // Lance lowered for charge
        const lance = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 4.2), lanceMat);
        lance.position.set(0.6, 2.2, -1.5);
        lance.rotation.x = Math.PI / 2.3;
        mount.add(lance);

        group.add(mount);
      }
    }

    this.scene.add(group);
    this.registerInteractive(group, "rohan_cavalry", 6);
  }

  createOrcSwarmRegiment() {
    const group = new THREE.Group();
    group.position.set(-16, 0, -14);

    const orcMat = new THREE.MeshStandardMaterial({ color: 0x3d3d3d, roughness: 0.9 });
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0x1e1e1e, metalness: 0.7 });

    // Hordes of hunched orcs
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 6; c++) {
        const orc = new THREE.Group();
        orc.position.set((c - 2.5) * 1.3 + (Math.random() - 0.5) * 0.4, 0, r * 1.2 + (Math.random() - 0.5) * 0.4);

        const body = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.3, 0.7), orcMat);
        body.position.y = 0.8;
        body.rotation.x = 0.2; // Hunched
        orc.add(body);

        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.4, 0.25), bladeMat);
        blade.position.set(0.5, 1.2, 0.4);
        blade.rotation.x = 0.6;
        orc.add(blade);

        group.add(orc);
      }
    }

    this.scene.add(group);
    this.registerInteractive(group, "orc_infantry", 6);
  }

  // 9. Interactive Object Registration
  registerInteractive(group, unitId, radius = 5) {
    // Attach unitId to all meshes in the group for raycaster detection
    group.traverse((child) => {
      if (child.isMesh) {
        child.userData = { unitId: unitId, rootGroup: group };
        this.interactiveObjects.push(child);
      }
    });
    group.userData = { unitId: unitId, rootGroup: group, selectionRadius: radius };
  }

  // 10. 3D Selection Ring
  createSelectionRing() {
    const ringGeo = new THREE.RingGeometry(2.0, 2.4, 32);
    ringGeo.rotateX(-Math.PI / 2);

    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });

    this.targetRing = new THREE.Mesh(ringGeo, ringMat);
    this.targetRing.visible = false;
    this.scene.add(this.targetRing);
  }

  setTargetSelection(rootGroup, colorHex = 0xffd700, radius = 2.4) {
    if (!rootGroup) {
      this.targetRing.visible = false;
      return;
    }
    this.targetRing.visible = true;
    this.targetRing.position.set(rootGroup.position.x, 0.08, rootGroup.position.z);
    this.targetRing.scale.set(radius / 2.4, 1, radius / 2.4);
    this.targetRing.material.color.setHex(colorHex);
  }

  update(delta) {
    const time = performance.now() * 0.001;

    // Pulse target ring
    if (this.targetRing && this.targetRing.visible) {
      this.targetRing.rotation.y = time * 1.5;
      const s = 1.0 + Math.sin(time * 6) * 0.06;
      this.targetRing.material.opacity = 0.75 + Math.sin(time * 6) * 0.2;
    }

    // Update all animated models
    this.animatedUnits.forEach(u => u.update(time));
  }
}
