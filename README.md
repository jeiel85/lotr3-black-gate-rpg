# 💍 The Lord of the Rings: The Return of the King
### 모란논 검은 문 앞 최후의 결전 (The Battle of the Black Gate - "For Frodo!") 3D RPG 쇼케이스

[![Live Demo](https://img.shields.io/badge/Live-Demo_Play_Now-e74c3c?style=for-the-badge&logo=googlechrome&logoColor=white)](https://jeiel85.github.io/lotr3-black-gate-rpg/)
[![Three.js](https://img.shields.io/badge/WebGL-Three.js_v0.160-00d2d3?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Web Audio API](https://img.shields.io/badge/Sound-Web_Audio_API-ffd32a?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

영화 **<반지의 제왕: 왕의 귀환>**의 절정인 **모란논 검은 문 앞 마지막 결전 ("For Frodo!")**을 대작 판타지 RPG(예: 월드 오브 워크래프트, 로스트아크)의 최상급 게임 화면 인터페이스로 구현한 3D 인터랙티브 웹 애플리케이션입니다.

---

## 🌐 라이브 데모 (Live Demo)
👉 **[https://jeiel85.github.io/lotr3-black-gate-rpg/](https://jeiel85.github.io/lotr3-black-gate-rpg/)**

---

## ✨ 핵심 기능 (Key Features)

### 1. 3D 시네마틱 전장 (Three.js & WebGL)
- **모란논의 검은 문 (The Black Gate of Mordor)**: 거대한 쌍둥이 감시탑(나르호스트, 카르호스트)과 흑철 성벽, 사우론의 붉은 룬.
- **바랏두르 & 사우론의 눈 (Barad-dûr & Eye of Sauron)**: 전장을 실시간으로 훑어보는 타오르는 3D 눈(시선 추적, 화염 코로나 소용돌이, 탐색 빔).
- **운명의 산 (Mount Doom)**: 지평선 너머 붉은 용암과 화산 연기 플룸 분출.
- **파티클 엔진**: 공중에 흩날리는 화산재, 솟구치는 용암 불씨(Embers), 마법 섬광, 무기 타격 스파크.
- **진영별 3D 절차적 모델**:
  - **서부 연합군**: 아라곤(안두릴 검신 발광, 왕실 망토), 백색의 간달프(지팡이 백색 광휘), 레골라스, 김리, 거대 독수리 과이히르, 곤도르 타워가드 방진, 로한 기병대
  - **모르도르 군세**: 중장갑 올로그하이 트롤, 나즈굴 & 펠비스트(공중 선회 날개짓), 오크 군단장 및 오크 대군, 하라드림 거대 전투코끼리(무마킬)

### 2. 대작 RPG 스타일 타겟 인스펙터 (Unit Frame)
- 전장의 모든 유닛과 건축물을 마우스로 직접 클릭하여 상태 확인:
  - **3D 아바타 & 등급 뱃지** ([신화], [전설], [정예] 등)
  - **실시간 HP / MP 게이지 바** 및 수치
  - **4대 주요 스탯** (공격력, 방어력, 치명타율, 전투력)
  - **원작 기반 버프 / 디버프 태그** (툴팁 설명 제공)
  - **톨킨 원작 로어(Lore) 및 영화 속 명대사**
  - **인터랙티브 액션**: `[🎯 시점 추적]`, `[⚔️ 스킬 시전]`, `[💬 명대사 (한국어 음성 합성)]`

### 3. 전술 스킬 핫바 (Action Bar 1~6)
- **[1] 안두릴의 일격**: 전방 신성 관통타 및 타격 이펙트
- **[2] 이스타리의 섬광**: 간달프의 지팡이에서 뿜어져 나오는 성스러운 백색 빛 폭발
- **[3] 로한의 돌격 나팔**: 웅장한 전쟁 호른과 함께 기병 쐐기 돌파
- **[4] 독수리 공습**: 과이히르의 나즈굴 펠비스트 공중 요격
- **[5] 불릿 타임**: 0.25배속 시네마틱 슬로우 모션
- **[6] 프로도를 위하여!**: 아라곤의 명대사 음성과 함께 전군 총돌격 & 사기 폭발

### 4. 웹 오디오 사운드 시스템 (Procedural Web Audio API)
- 곤도르와 로한의 웅장한 금관 나팔(War Horns)
- 심장을 울리는 전쟁 북소리(War Drums) 비트 루프
- 검격음, 마법 효과음, 괴수 포효

### 5. 다중 카메라 프리셋
- `자유 뷰 (Free)`: 마우스 좌클릭(회전), 우클릭(패닝), 휠(줌)
- `시네마틱 (Cinematic)`: 전장을 영화처럼 웅장하게 선회 비행
- `영웅 시점 (Hero)`: 아라곤의 등 뒤에서 검은 문을 응시하는 숄더뷰
- `RTS 지휘관 (Top)`: 전장 전체를 조망하는 전략 탑뷰

---

## 🛠️ 기술 스택 (Tech Stack)

- **3D Graphics**: Three.js (r160, ES Modules via importmap)
- **Audio**: Web Audio API & Web SpeechSynthesis
- **UI / Styling**: Semantic HTML5, CSS3 Glassmorphism, CSS Animations
- **Hosting / Deploy**: GitHub Pages & GitHub Actions
