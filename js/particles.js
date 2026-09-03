/**
 * Particle Effects System for Three.js
 * Embers, Volcanic Ash, Mount Doom Eruption, Magic Flash, Combat Sparks
 */

import * as THREE from "three";

export class ParticleSystem {
  constructor(scene) {
    this.scene = scene;
    this.particles = [];
    this.initEmbers();
    this.initAsh();
    this.initMountDoomPlume();
    this.initEyeOfSauronCorona();
  }

  // 1. Rising Volcanic Embers
  initEmbers() {
    const count = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const velocities = [];

    const emberColors = [
      new THREE.Color(0xff4500), // Orange Red
      new THREE.Color(0xffa500), // Orange
      new THREE.Color(0xff2200), // Deep Red
      new THREE.Color(0xffd700)  // Golden Spark
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 1] = Math.random() * 45;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 160;

      const col = emberColors[Math.floor(Math.random() * emberColors.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      scales[i] = Math.random() * 2.5 + 0.8;

      velocities.push({
        vx: (Math.random() - 0.5) * 0.05,
        vy: Math.random() * 0.12 + 0.04,
        vz: (Math.random() - 0.5) * 0.05,
        swaySpeed: Math.random() * 2 + 1
      });
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    const material = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.emberMesh = new THREE.Points(geometry, material);
    this.scene.add(this.emberMesh);
    this.emberVelocities = velocities;
  }

  // 2. Falling Volcanic Ash
  initAsh() {
    const count = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 180;
      positions[i * 3 + 1] = Math.random() * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 180;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 1.1,
      color: 0x4a4a4a,
      transparent: true,
      opacity: 0.6,
      depthWrite: false
    });

    this.ashMesh = new THREE.Points(geometry, material);
    this.scene.add(this.ashMesh);
  }

  // 3. Mount Doom Volcano Eruption Plume
  initMountDoomPlume() {
    const count = 450;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = [];

    const origin = { x: -55, y: 35, z: -80 };

    for (let i = 0; i < count; i++) {
      positions[i * 3] = origin.x + (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = origin.y + Math.random() * 40;
      positions[i * 3 + 2] = origin.z + (Math.random() - 0.5) * 6;

      const isFire = Math.random() < 0.4;
      if (isFire) {
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.3 + Math.random() * 0.4;
        colors[i * 3 + 2] = 0.0;
      } else {
        const dark = 0.1 + Math.random() * 0.15;
        colors[i * 3] = dark;
        colors[i * 3 + 1] = dark;
        colors[i * 3 + 2] = dark;
      }

      velocities.push({
        vx: (Math.random() - 0.5) * 0.2 + 0.1, // Drifting in wind
        vy: Math.random() * 0.25 + 0.15,
        vz: (Math.random() - 0.5) * 0.2,
        life: Math.random() * 60,
        maxLife: 60
      });
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 3.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.NormalBlending,
      depthWrite: false
    });

    this.plumeMesh = new THREE.Points(geometry, material);
    this.scene.add(this.plumeMesh);
    this.plumeVelocities = velocities;
    this.plumeOrigin = origin;
  }

  // 4. Eye of Sauron Corona Fiery Vortex
  initEyeOfSauronCorona() {
    const count = 350;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const angles = [];

    const center = { x: 28, y: 46, z: -65 };

    for (let i = 0; i < count; i++) {
      const radius = 2.5 + Math.random() * 3.5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 4.5;

      positions[i * 3] = center.x + Math.cos(angle) * radius;
      positions[i * 3 + 1] = center.y + height;
      positions[i * 3 + 2] = center.z + Math.sin(angle) * (radius * 0.6);

      colors[i * 3] = 1.0;
      colors[i * 3 + 1] = Math.random() * 0.6;
      colors[i * 3 + 2] = 0.0;

      angles.push({
        radius: radius,
        angle: angle,
        heightOffset: height,
        speed: (Math.random() * 0.04 + 0.02) * (Math.random() < 0.5 ? 1 : -1)
      });
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.eyeCoronaMesh = new THREE.Points(geometry, material);
    this.scene.add(this.eyeCoronaMesh);
    this.eyeCoronaAngles = angles;
    this.eyeCenter = center;
  }

  // Spawn Combat Sparks on Weapon Hits
  spawnHitSparks(position, count = 25, colorHex = 0xffaa00) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = position.x;
      positions[i * 3 + 1] = position.y + 1.2;
      positions[i * 3 + 2] = position.z;

      const angle = Math.random() * Math.PI * 2;
      const elev = (Math.random() - 0.2) * Math.PI;
      const speed = Math.random() * 0.35 + 0.15;

      velocities.push({
        vx: Math.cos(angle) * Math.cos(elev) * speed,
        vy: Math.sin(elev) * speed + 0.1,
        vz: Math.sin(angle) * Math.cos(elev) * speed,
        life: 0,
        maxLife: 25 + Math.random() * 10
      });
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 1.2,
      color: colorHex,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const sparkMesh = new THREE.Points(geometry, material);
    this.scene.add(sparkMesh);

    this.particles.push({
      mesh: sparkMesh,
      velocities: velocities,
      type: "sparks"
    });
  }

  // Spawn Holy White Burst for Gandalf
  spawnHolyBurst(position) {
    const count = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = position.x;
      positions[i * 3 + 1] = position.y + 2.5;
      positions[i * 3 + 2] = position.z;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const speed = Math.random() * 0.5 + 0.2;

      velocities.push({
        vx: Math.sin(phi) * Math.cos(theta) * speed,
        vy: Math.sin(phi) * Math.sin(theta) * speed,
        vz: Math.cos(phi) * speed,
        life: 0,
        maxLife: 35
      });
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 2.2,
      color: 0xffffff,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const burstMesh = new THREE.Points(geometry, material);
    this.scene.add(burstMesh);

    this.particles.push({
      mesh: burstMesh,
      velocities: velocities,
      type: "holy"
    });
  }

  update(delta) {
    const time = performance.now() * 0.001;

    // Update Embers
    if (this.emberMesh) {
      const positions = this.emberMesh.geometry.attributes.position.array;
      for (let i = 0; i < this.emberVelocities.length; i++) {
        const vel = this.emberVelocities[i];
        positions[i * 3] += vel.vx + Math.sin(time * vel.swaySpeed + i) * 0.03;
        positions[i * 3 + 1] += vel.vy;
        positions[i * 3 + 2] += vel.vz;

        if (positions[i * 3 + 1] > 50) {
          positions[i * 3 + 1] = 0;
          positions[i * 3] = (Math.random() - 0.5) * 160;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 160;
        }
      }
      this.emberMesh.geometry.attributes.position.needsUpdate = true;
    }

    // Update Ash
    if (this.ashMesh) {
      const pos = this.ashMesh.geometry.attributes.position.array;
      const len = pos.length / 3;
      for (let i = 0; i < len; i++) {
        pos[i * 3 + 1] -= 0.08;
        pos[i * 3] += Math.sin(time + i) * 0.02;
        if (pos[i * 3 + 1] < 0) {
          pos[i * 3 + 1] = 60;
        }
      }
      this.ashMesh.geometry.attributes.position.needsUpdate = true;
    }

    // Update Mount Doom Plume
    if (this.plumeMesh) {
      const pos = this.plumeMesh.geometry.attributes.position.array;
      for (let i = 0; i < this.plumeVelocities.length; i++) {
        const v = this.plumeVelocities[i];
        pos[i * 3] += v.vx;
        pos[i * 3 + 1] += v.vy;
        pos[i * 3 + 2] += v.vz;
        v.life += 0.5;

        if (v.life > v.maxLife || pos[i * 3 + 1] > 85) {
          v.life = 0;
          pos[i * 3] = this.plumeOrigin.x + (Math.random() - 0.5) * 6;
          pos[i * 3 + 1] = this.plumeOrigin.y;
          pos[i * 3 + 2] = this.plumeOrigin.z + (Math.random() - 0.5) * 6;
        }
      }
      this.plumeMesh.geometry.attributes.position.needsUpdate = true;
    }

    // Update Eye of Sauron Corona
    if (this.eyeCoronaMesh) {
      const pos = this.eyeCoronaMesh.geometry.attributes.position.array;
      for (let i = 0; i < this.eyeCoronaAngles.length; i++) {
        const item = this.eyeCoronaAngles[i];
        item.angle += item.speed;
        pos[i * 3] = this.eyeCenter.x + Math.cos(item.angle) * item.radius;
        pos[i * 3 + 1] = this.eyeCenter.y + item.heightOffset + Math.sin(time * 3 + i) * 0.3;
        pos[i * 3 + 2] = this.eyeCenter.z + Math.sin(item.angle) * (item.radius * 0.6);
      }
      this.eyeCoronaMesh.geometry.attributes.position.needsUpdate = true;
    }

    // Update temporary particles (sparks, magic)
    for (let p = this.particles.length - 1; p >= 0; p--) {
      const group = this.particles[p];
      const pos = group.mesh.geometry.attributes.position.array;
      let allDead = true;

      for (let i = 0; i < group.velocities.length; i++) {
        const v = group.velocities[i];
        if (v.life < v.maxLife) {
          allDead = false;
          pos[i * 3] += v.vx;
          pos[i * 3 + 1] += v.vy;
          pos[i * 3 + 2] += v.vz;
          if (group.type === "sparks") {
            v.vy -= 0.015; // Gravity
          }
          v.life += 1;
        }
      }

      const lifeRatio = 1 - (group.velocities[0].life / group.velocities[0].maxLife);
      group.mesh.material.opacity = Math.max(0, lifeRatio);
      group.mesh.geometry.attributes.position.needsUpdate = true;

      if (allDead) {
        this.scene.remove(group.mesh);
        group.mesh.geometry.dispose();
        group.mesh.material.dispose();
        this.particles.splice(p, 1);
      }
    }
  }
}
