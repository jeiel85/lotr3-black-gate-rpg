/**
 * The Lord of the Rings: The Return of the King
 * Battle of the Black Gate (Morannon) - RPG Unit Database
 */

export const UNITS_DATA = {
  aragorn: {
    id: "aragorn",
    name: "아라곤 2세 엘레사르 (Aragorn II Elessar)",
    title: "곤도르의 정당한 왕 & 이실두르의 후계자",
    subtitle: "King of Gondor & Chieftain of the Dúnedain",
    faction: "west",
    factionName: "서부 연합군 (Host of the West)",
    tier: "신화 영웅 (Mythic Hero)",
    tierColor: "#ffd700",
    icon: "👑",
    level: 100,
    maxHp: 185000,
    hp: 185000,
    maxMp: 55000,
    mp: 55000,
    attack: 14850,
    defense: 11200,
    critRate: "42.5%",
    speed: "보통 (신속)",
    combatPower: "98,400",
    modelKey: "aragorn",
    position: { x: 0, y: 0, z: 25 },
    lore: "두네다인의 족장이자 곤도르의 왕권을 계승한 고귀한 혈통의 군주. 운명의 산으로 향하는 프로도와 샘에게 절대반지를 파괴할 마지막 시간을 벌어주기 위해, 절망적인 수적 열세 속에서도 연합군을 이끌고 모르도르의 검은 문 앞에 섰습니다. '프로도를 위하여!'를 외치며 망설임 없이 전군 최선두에서 적진으로 돌격합니다.",
    quote: "모두 자리를 지켜라! 인간의 용기가 꺾이고 친구를 버릴 날이 올지도 모르지만, 오늘은 아니다! 프로도를 위하여!",
    buffs: [
      { name: "안두릴의 불꽃 (Flame of the West)", icon: "🗡️", desc: "부러졌던 나르실이 다시 벼려진 신성한 검. 어둠을 가르고 주변 30m 아군의 공격력을 35% 증가시킵니다.", type: "buff" },
      { name: "왕의 귀환 (Return of the King)", icon: "👑", desc: "진정한 왕의 존재로 인해 주변 아군 전원은 공포/사기 저하에 완전 면역이 됩니다.", type: "buff" },
      { name: "엘렌딜의 가호", icon: "✨", desc: "치명타 공격 성공 시 주변 아군의 생명력을 8% 즉시 회복시킵니다.", type: "buff" }
    ],
    skills: [
      { id: "aragorn_slash", name: "안두릴의 일격", icon: "⚔️", cost: "MP 1,500", cd: "5초", desc: "서부의 불꽃 안두릴을 휘둘러 전방 적들에게 38,500의 신성 관통 피해를 가하고 2초간 기절시킵니다." },
      { id: "aragorn_charge", name: "프로도를 위하여!", icon: "🛡️", cost: "MP 4,500", cd: "30초", desc: "전설의 돌격 함성을 내질러 전군의 이동속도를 50%, 공격속도를 60% 폭증시킵니다." },
      { id: "aragorn_resolve", name: "왕의 결의", icon: "✨", cost: "MP 2,000", cd: "12초", desc: "자신과 아군에게 걸린 모르도르의 암흑 디버프를 즉각 해제하고 방어력을 40% 강화합니다." }
    ]
  },

  gandalf: {
    id: "gandalf",
    name: "백색의 간달프 (Gandalf the White)",
    title: "이스타리의 수장 & 비밀의 불의 사도",
    subtitle: "White Rider & Servant of the Secret Fire",
    faction: "west",
    factionName: "서부 연합군 (Host of the West)",
    tier: "신화 현자 (Mythic Avatar)",
    tierColor: "#ffffff",
    icon: "🧙‍♂️",
    level: 100,
    maxHp: 142000,
    hp: 142000,
    maxMp: 280000,
    mp: 280000,
    attack: 18900,
    defense: 8900,
    critRate: "35.0%",
    speed: "신속 (백마 섀도팩스)",
    combatPower: "99,200",
    modelKey: "gandalf",
    position: { x: -12, y: 0, z: 27 },
    lore: "모리아의 심연에서 발록을 처치하고 필멸의 한계를 벗어나 부활한 백색의 마법사. 아노르의 불꽃과 세 번째 요정 반지 나랴를 품고 있으며, 사우론의 암흑 주술과 나즈굴의 공포를 무력화하는 연합군의 강력한 빛의 수호자입니다.",
    quote: "어둠은 결코 빛을 이길 수 없다. 절망 속에서도 결코 희망의 끈을 놓아서는 안 된다!",
    buffs: [
      { name: "아노르의 불꽃 (Flame of Anor)", icon: "☀️", desc: "사우론의 어둠을 정화하는 눈부신 광휘. 아군이 받는 암흑 피해를 60% 경감합니다.", type: "buff" },
      { name: "나랴 - 불의 반지", icon: "💍", desc: "마르지 않는 용기와 희망의 불꽃을 피워 초당 마나 회복량을 대폭 증가시킵니다.", type: "buff" }
    ],
    skills: [
      { id: "gandalf_flash", name: "이스타리의 섬광", icon: "⚡", cost: "MP 3,200", cd: "6초", desc: "지팡이 끝에서 눈부신 백색 빛을 방출하여 전방 적군을 3초간 실명시키고 42,000의 마법 피해를 가합니다." },
      { id: "gandalf_barrier", name: "백색의 방벽", icon: "🔮", cost: "MP 6,000", cd: "25초", desc: "거대한 성스러운 빛의 돔을 전개하여 적의 원거리 투사체와 저주 마법을 100% 흡수합니다." },
      { id: "gandalf_smite", name: "글람드링의 심판", icon: "🗡️", cost: "MP 2,800", cd: "10초", desc: "고대 요정의 보검 글람드링에 마력을 실어 단일 적에게 54,000의 강력한 마법 베기를 시전합니다." }
    ]
  },

  legolas: {
    id: "legolas",
    name: "레골라스 그린리프 (Legolas Greenleaf)",
    title: "어둠숲의 왕자 & 숲의 명사수",
    subtitle: "Prince of the Woodland Realm",
    faction: "west",
    factionName: "서부 연합군 (Host of the West)",
    tier: "전설 궁수 (Legendary Archer)",
    tierColor: "#2ecc71",
    icon: "🏹",
    level: 95,
    maxHp: 98000,
    hp: 98000,
    maxMp: 42000,
    mp: 42000,
    attack: 16500,
    defense: 6800,
    critRate: "68.0%",
    speed: "매우 빠름 (경공)",
    combatPower: "86,500",
    modelKey: "legolas",
    position: { x: 12, y: 0, z: 27 },
    lore: "어둠숲 요정왕 스란두일의 아들이자 타의 추종을 불허하는 궁술과 감각을 지닌 신드라 요정. 멀리서 날아오는 화살과 나즈굴의 움직임을 읽어내며, 거대한 괴수의 약점을 정확히 저격합니다. 전장에서도 김리와 유쾌한 킬 카운트 경쟁을 즐깁니다.",
    quote: "김리, 지금까지 몇 놈이나 쓰러뜨렸지? 난 이미 42마리째야!",
    buffs: [
      { name: "요정의 명안 (Hawk Eyes)", icon: "👁️", desc: "사거리 제한 없는 정밀 조준. 치명타 배율이 250%로 증폭됩니다.", type: "buff" },
      { name: "바람의 도약", icon: "🍃", desc: "적의 근접 공격에 대한 회피율이 35% 증가합니다.", type: "buff" }
    ],
    skills: [
      { id: "legolas_rapid", name: "3연속 래피드 샷", icon: "🎯", cost: "MP 1,200", cd: "4초", desc: "찰나의 순간에 3발의 화살을 발사하여 단일 적에게 각각 18,500의 관통 피해를 입힙니다." },
      { id: "legolas_snipe", name: "거수 급소 저격", icon: "🏹", cost: "MP 3,500", cd: "18초", desc: "트롤이나 괴수의 약점을 정밀 저격하여 65,000의 치명타와 함께 지속 출혈을 유발합니다." }
    ]
  },

  gimli: {
    id: "gimli",
    name: "김리 (Gimli, Son of Glóin)",
    title: "에레보르의 용사 & 반짝이는 동굴의 군주",
    subtitle: "Lord of the Glittering Caves",
    faction: "west",
    factionName: "서부 연합군 (Host of the West)",
    tier: "전설 광전사 (Legendary Berserker)",
    tierColor: "#e67e22",
    icon: "🪓",
    level: 95,
    maxHp: 165000,
    hp: 165000,
    maxMp: 22000,
    mp: 22000,
    attack: 15200,
    defense: 14500,
    critRate: "38.0%",
    speed: "단단함",
    combatPower: "87,800",
    modelKey: "gimli",
    position: { x: 7, y: 0, z: 23 },
    lore: "글로인의 아들이자 드워프 종족의 자존심을 짊어진 불굴의 전사. 거대한 양날 배틀액스를 휘두르며 적의 중장갑 방어진을 박살 냅니다. 요정 레골라스와는 종족의 오랜 반목을 넘어 진정한 우정을 나누며 마지막 순간까지 등을 맞대고 싸웁니다.",
    quote: "요정과 나란히 싸우며 죽을 줄은 꿈에도 몰랐는데... 친구와 함께라면 어떨까?",
    buffs: [
      { name: "드워프의 강철 육체", icon: "🛡️", desc: "피해 감소 30%, 넉백 및 넘어짐 상태이상에 완전 면역.", type: "buff" },
      { name: "킬 카운트 경쟁", icon: "🔥", desc: "적을 처치할 때마다 15초간 공격력이 6%씩 중첩 (최대 10중첩).", type: "buff" }
    ],
    skills: [
      { id: "gimli_whirlwind", name: "양날 도끼 폭풍", icon: "🌪️", cost: "MP 800", cd: "5초", desc: "온몸을 회전시켜 주변 6m 안의 모든 오크들에게 32,000의 물리 광역 피해를 입힙니다." },
      { id: "gimli_smash", name: "에레보르의 분쇄타", icon: "💥", cost: "MP 1,500", cd: "12초", desc: "전방의 정예 몬스터를 바닥으로 내리찍어 방어구를 파괴하고 58,000의 파괴 피해를 입힙니다." }
    ]
  },

  gwaihir: {
    id: "gwaihir",
    name: "바람의 군주 과이히르 (Gwaihir the Windlord)",
    title: "만웨의 전령 & 거대 독수리의 제왕",
    subtitle: "King of the Great Eagles",
    faction: "west",
    factionName: "서부 연합군 (Host of the West)",
    tier: "전설 공중 제왕 (Legendary Aerial)",
    tierColor: "#00d2d3",
    icon: "🦅",
    level: 98,
    maxHp: 210000,
    hp: 210000,
    maxMp: 80000,
    mp: 80000,
    attack: 22000,
    defense: 9500,
    critRate: "45.0%",
    speed: "초고속 비행",
    combatPower: "94,100",
    modelKey: "gwaihir",
    position: { x: -18, y: 32, z: 12 },
    lore: "안개산맥의 거대 독수리 일족을 이끄는 왕. 가장 어두운 절망의 순간 하늘을 가르며 날아와 공중을 장악하고 있던 나즈굴의 펠비스트들을 급강하 습격하여 지상의 연합군을 위기에서 구해냅니다.",
    quote: "독수리들이 온다! 하늘의 폭풍이 모르도르의 썩은 날개들을 찢을 것이다!",
    buffs: [
      { name: "창공의 제왕", icon: "💨", desc: "공중 적 유닛에게 80% 추가 데미지를 가하며, 지상 원거리 공격을 50% 회피합니다.", type: "buff" }
    ],
    skills: [
      { id: "eagle_dive", name: "천공 급강하 강습", icon: "⚡", cost: "MP 3,000", cd: "8초", desc: "나즈굴 펠비스트를 향해 음속으로 내리꽂혀 56,000의 치명타를 입히고 공중에서 추락시킵니다." }
    ]
  },

  gondor_guard: {
    id: "gondor_guard",
    name: "곤도르 백색 탑의 정예 근위대 (Gondor Royal Phalanx)",
    title: "미나스 티리스의 방패 & 백색 나무의 수호자",
    subtitle: "Royal Citadel Phalanx Cohort",
    faction: "west",
    factionName: "서부 연합군 (Host of the West)",
    tier: "정예 방진 (Elite Phalanx)",
    tierColor: "#48dbfb",
    icon: "🛡️",
    level: 82,
    maxHp: 320000,
    hp: 320000,
    maxMp: 15000,
    mp: 15000,
    attack: 11200,
    defense: 18500,
    critRate: "18.0%",
    speed: "철벽 방진",
    combatPower: "78,200",
    modelKey: "gondor_regiment",
    position: { x: -16, y: 0, z: 20 },
    lore: "백색 나무 문장이 새겨진 거대한 강철 방패와 장창으로 무장한 곤도르 왕국의 최정예 보병 방진. 수만 마리의 오크 대군이 쏟아져도 꿈쩍도 않는 난공불락의 전선을 유지합니다.",
    quote: "곤도르의 전사들이여! 물러서지 마라! 백색의 탑을 위하여!",
    buffs: [
      { name: "불굴의 방진 (Shield Wall)", icon: "🛡️", desc: "전방에서 오는 모든 물리 및 돌격 피해를 60% 경감시킵니다.", type: "buff" }
    ],
    skills: [
      { id: "phalanx_brace", name: "장창 저지 태세", icon: "🗡️", cost: "MP 500", cd: "10초", desc: "돌격해오는 트롤과 오크 기병에게 반사 피해 200%를 입히며 즉시 넉백시킵니다." }
    ]
  },

  rohan_cavalry: {
    id: "rohan_cavalry",
    name: "로한의 왕실 기병대 (Riders of Rohan)",
    title: "리더마크의 돌격대 & 에오를의 후예",
    subtitle: "Royal Rohirrim Vanguard",
    faction: "west",
    factionName: "서부 연합군 (Host of the West)",
    tier: "정예 기병 (Elite Cavalry)",
    tierColor: "#1dd1a1",
    icon: "🐎",
    level: 85,
    maxHp: 280000,
    hp: 280000,
    maxMp: 20000,
    mp: 20000,
    attack: 14800,
    defense: 12000,
    critRate: "32.0%",
    speed: "고속 돌격",
    combatPower: "81,000",
    modelKey: "rohan_regiment",
    position: { x: 20, y: 0, z: 20 },
    lore: "펠렌노르 평원의 전설적인 돌격을 승리로 이끌었던 로한의 정예 기마군단. 빠른 기동력으로 오크 보병대의 측면을 유린하고 적 궁병진을 붕괴시킵니다.",
    quote: "돌격하라! 파멸을 향하여! 세상의 종말을 향하여! 데스!!",
    buffs: [
      { name: "로한의 돌격력", icon: "🏇", desc: "돌격 속도에 비례하여 충돌 데미지 최대 150% 증폭.", type: "buff" }
    ],
    skills: [
      { id: "rohirrim_charge", name: "에오를의 쐐기 돌격", icon: "⚔️", cost: "MP 1,000", cd: "15초", desc: "적 보병 전열을 꿰뚫고 지나가며 45,000의 돌파 물리 피해를 가합니다." }
    ]
  },

  eye_of_sauron: {
    id: "eye_of_sauron",
    name: "사우론의 눈 (The Eye of Sauron)",
    title: "암흑의 군주 & 절대반지의 주인",
    subtitle: "Lord of the Rings & Ruler of Mordor",
    faction: "mordor",
    factionName: "모르도르 (Forces of Sauron)",
    tier: "초월적 레이드 보스 (Supreme Raid Boss)",
    tierColor: "#ff3838",
    icon: "👁️‍🗨️",
    level: 120,
    maxHp: 9999999,
    hp: 9999999,
    maxMp: 9999999,
    mp: 9999999,
    attack: 99999,
    defense: 45000,
    critRate: "50.0%",
    speed: "고정 (바랏두르 요새 상공)",
    combatPower: "999,999",
    modelKey: "eye_of_sauron",
    position: { x: 28, y: 46, z: -65 },
    lore: "바랏두르 요새 최정상에서 불타오르는 사우론의 실체화된 사악한 의지. 지상 모든 생명체를 굴복시키는 공포의 시선을 전장에 투사하고 있으며, 모란논의 연합군에게 모든 주의를 빼앗긴 채 운명의 산으로 다가오는 호빗들의 존재를 눈치채지 못하고 있습니다.",
    quote: "나는 너를 보고 있다... 너희에게 희망은 없다. 모든 것은 내 발아래 굴복하리라.",
    buffs: [
      { name: "절대공포의 시선 (Gaze of Doom)", icon: "👁️", desc: "시선이 닿는 전장의 모든 적 유닛의 사기를 분쇄하고 공격력을 25% 감소시킵니다.", type: "debuff" },
      { name: "암흑 군세 광폭화", icon: "🩸", desc: "모든 모르도르 오크 및 트롤의 공격력을 50% 폭증시킵니다.", type: "buff" }
    ],
    skills: [
      { id: "eye_beam", name: "바랏두르의 지옥 광선", icon: "🔥", cost: "무제한", cd: "15초", desc: "타오르는 흑화염 빔을 지면에 내리꽂아 반경 25m 구역을 불바다로 만듭니다." }
    ]
  },

  black_gate: {
    id: "black_gate",
    name: "모란논의 검은 문 (The Black Gate of Mordor)",
    title: "모르도르의 난공불락 철벽 요새",
    subtitle: "Iron Fortress of Cirith Gorgor",
    faction: "mordor",
    factionName: "모르도르 (Forces of Sauron)",
    tier: "고대 거대 요새 (Colossal Citadel)",
    tierColor: "#7158e2",
    icon: "🏰",
    level: 100,
    maxHp: 5000000,
    hp: 5000000,
    maxMp: 0,
    mp: 0,
    attack: 0,
    defense: 99999,
    critRate: "0%",
    speed: "부동",
    combatPower: "500,000",
    modelKey: "black_gate",
    position: { x: 0, y: 0, z: -35 },
    lore: "제2시대 사우론이 키리스 고르고르의 좁은 계곡을 봉쇄하기 위해 축조한 거대한 강철 요새 관문. 흑철로 주조된 쐐기형 성벽과 두 개의 감시탑 '나르호스트'와 '카르호스트'가 버티고 있으며, 지금 문이 활짝 열리며 수만 마리의 오크 대군이 쏟아져 나오고 있습니다.",
    quote: "모르도르의 검은 문이 열렸다! 절망의 군세가 대지를 뒤덮는다!",
    buffs: [
      { name: "흑철 장벽", icon: "🛡️", desc: "모든 일반 물리 및 원거리 마법 공격 피해를 95% 흡수 및 굴절.", type: "buff" }
    ],
    skills: [
      { id: "gate_spawn", name: "오크 증원군 출격", icon: "🚪", cost: "없음", cd: "10초", desc: "문 안쪽에서 정예 오크 연대를 전장으로 지속 배치합니다." }
    ]
  },

  mount_doom: {
    id: "mount_doom",
    name: "운명의 산 (Mount Doom / Orodruin)",
    title: "절대반지가 벼려진 화산 & 종말의 심연",
    subtitle: "Mountain of Fire & Doom of Sauron",
    faction: "neutral",
    factionName: "원초적 자연 (World Monument)",
    tier: "천재지변 (Calamity Phenomenon)",
    tierColor: "#ff9f1a",
    icon: "🌋",
    level: 150,
    maxHp: 99999999,
    hp: 99999999,
    maxMp: 99999999,
    mp: 99999999,
    attack: 88888,
    defense: 99999,
    critRate: "100%",
    speed: "부동",
    combatPower: "999,999",
    modelKey: "mount_doom",
    position: { x: -55, y: 0, z: -80 },
    lore: "사우론이 절대반지를 주조했던 심연의 화산 오로드루인. 반지를 영원히 파괴할 수 있는 유일한 장소인 사마스 나우르가 위치해 있습니다. 현재 프로도와 샘이 용암 절벽에 도달했으며, 반지가 파괴되는 순간 바랏두르와 사우론의 모든 권능은 영원히 소멸할 것입니다.",
    quote: "절대반지가 용암 속으로 떨어지는 순간, 사우론의 시대는 끝난다.",
    buffs: [
      { name: "화산 폭발 (Volcanic Eruption)", icon: "🌋", desc: "전장에 지속적으로 유황 재와 불타는 운석을 낙하시킵니다.", type: "buff" }
    ],
    skills: [
      { id: "ring_destroy", name: "절대반지 파괴", icon: "💍", cost: "프로도의 결단", cd: "진척도 100%", desc: "사우론의 영혼을 영원히 소멸시키고 모르도르의 모든 건축물을 붕괴시킵니다." }
    ]
  },

  nazgul: {
    id: "nazgul",
    name: "나즈굴과 펠비스트 (Nazgûl on Fell Beast)",
    title: "아홉 반지의 망령 & 암흑의 날개",
    subtitle: "Ringwraith Winged Terror",
    faction: "mordor",
    factionName: "모르도르 (Forces of Sauron)",
    tier: "전설 공중 괴수 (Legendary Aerial)",
    tierColor: "#7d5fff",
    icon: "🐉",
    level: 96,
    maxHp: 195000,
    hp: 195000,
    maxMp: 95000,
    mp: 95000,
    attack: 19800,
    defense: 10500,
    critRate: "40.0%",
    speed: "선회 비행",
    combatPower: "91,500",
    modelKey: "nazgul",
    position: { x: 14, y: 28, z: -8 },
    lore: "사우론의 가장 끔찍한 하수인이자 아홉 인간 군주들이 타락한 불멸의 영체. 악취 나는 날개 달린 괴수 펠비스트를 타고 하늘을 선회하며 귀청을 찢는 비명으로 연합군의 전열을 붕괴시킵니다.",
    quote: "어떤 인간도 나를 죽일 수 없다! 너희의 영혼은 영원한 어둠 속에서 불타리라!",
    buffs: [
      { name: "죽음의 비명 (Dread Screech)", icon: "😱", desc: "비행 반경 40m 내 아군 지상군의 공격력과 사기를 20% 약화시킵니다.", type: "debuff" }
    ],
    skills: [
      { id: "nazgul_dive", name: "그림자 강습", icon: "🦅", cost: "MP 2,500", cd: "8초", desc: "공중에서 지상으로 급강하하여 독 묻은 발톱으로 지상 보병을 낚아채 48,000의 암흑 피해를 입힙니다." }
    ]
  },

  olog_hai: {
    id: "olog_hai",
    name: "중장갑 모르도르 트롤 (Armored Olog-hai)",
    title: "사우론이 개량한 파멸의 공성 거수",
    subtitle: "Black Gate Vanguard Breaker",
    faction: "mordor",
    factionName: "모르도르 (Forces of Sauron)",
    tier: "정예 공성 괴수 (Elite Behemoth)",
    tierColor: "#eb4d4b",
    icon: "👹",
    level: 90,
    maxHp: 480000,
    hp: 480000,
    maxMp: 12000,
    mp: 12000,
    attack: 21500,
    defense: 22000,
    critRate: "25.0%",
    speed: "육중한 파괴",
    combatPower: "89,000",
    modelKey: "olog_hai",
    position: { x: 0, y: 0, z: -8 },
    lore: "일반 동굴 트롤과 달리 햇빛에도 돌로 변하지 않도록 사우론이 암흑 주술과 흑철 판금으로 개량한 궁극의 생체 병기. 거대한 철퇴 한 방으로 곤도르 병사 수십 명을 날려버립니다.",
    quote: "그어어어억! 인간 놈들을 짓밟아라!",
    buffs: [
      { name: "흑철 판금 갑옷", icon: "🛡️", desc: "모든 일반 물리 및 관통 공격 피해를 50% 삭감.", type: "buff" }
    ],
    skills: [
      { id: "troll_smash", name: "대지 분쇄타", icon: "🔨", cost: "MP 1,000", cd: "7초", desc: "철퇴로 대지를 내리쳐 전방 10m에 지진 충격파를 발생시키고 42,000의 광역 피해를 줍니다." }
    ]
  },

  orc_warlord: {
    id: "orc_warlord",
    name: "모르도르 오크 군단장 (Orc Warlord)",
    title: "검은 문의 학살자 & 붉은 눈의 전위대장",
    subtitle: "Morannon Vanguard Chieftain",
    faction: "mordor",
    factionName: "모르도르 (Forces of Sauron)",
    tier: "영웅 지휘관 (Heroic Warlord)",
    tierColor: "#c0392b",
    icon: "🧌",
    level: 88,
    maxHp: 260000,
    hp: 260000,
    maxMp: 30000,
    mp: 30000,
    attack: 15800,
    defense: 13500,
    critRate: "32.0%",
    speed: "보통",
    combatPower: "82,500",
    modelKey: "orc_warlord",
    position: { x: -8, y: 0, z: -7 },
    lore: "사우론의 명령에 따라 수만 오크 군세를 통솔하는 잔혹한 지휘관. 피비린내 나는 군기와 채찍으로 도망치는 오크들을 처형하며 전선을 압박합니다.",
    quote: "도망치면 내가 먼저 목을 딴다! 전원 돌격해 살점을 뜯어먹어라!",
    buffs: [
      { name: "도살자의 군기", icon: "🚩", desc: "주변 30m 내 오크들의 공격속도를 25% 상승시킴.", type: "buff" }
    ],
    skills: [
      { id: "orc_whip", name: "피의 채찍질", icon: "🩸", cost: "MP 800", cd: "6초", desc: "사나운 채찍을 휘둘러 전방 아군 오크들을 광폭화시키고 적에게 22,000의 출혈 피해를 입힙니다." }
    ]
  },

  orc_infantry: {
    id: "orc_infantry",
    name: "모르도르 오크 군단 (Mordor Orc Horde)",
    title: "끝없이 몰려드는 어둠의 파도",
    subtitle: "Morannon Swarm Infantry",
    faction: "mordor",
    factionName: "모르도르 (Forces of Sauron)",
    tier: "일반 대군 (Mass Swarm)",
    tierColor: "#636e72",
    icon: "⚔️",
    level: 75,
    maxHp: 450000,
    hp: 450000,
    maxMp: 5000,
    mp: 5000,
    attack: 8200,
    defense: 7400,
    critRate: "12.0%",
    speed: "무리 지음",
    combatPower: "72,000",
    modelKey: "orc_regiment",
    position: { x: -16, y: 0, z: -14 },
    lore: "거친 굽은 칼과 흑철 가시 방패로 무장한 오크 군세. 개개의 무력은 떨어지지만 압도적인 수적 우위로 연합군을 포위하고 질식시킵니다.",
    quote: "살코기가 다시 메뉴판에 올라왔다!",
    buffs: [
      { name: "떼지어 몰려들기", icon: "👥", desc: "주변 오크 수가 많을수록 근접 공격력 중첩 증가.", type: "buff" }
    ],
    skills: [
      { id: "orc_rush", name: "광란의 인해전술", icon: "🗡️", cost: "없음", cd: "8초", desc: "광기를 품고 돌진하여 방어선을 흔들고 지속적인 난전을 유도합니다." }
    ]
  },

  mumakil: {
    id: "mumakil",
    name: "하라드림 거대 전투 코끼리 (Haradrim Mûmakil)",
    title: "남부의 괴수 & 움직이는 학살 요새",
    subtitle: "Colossal War Oliphaunt",
    faction: "mordor",
    factionName: "모르도르 (Forces of Sauron)",
    tier: "정예 공성 괴수 (Colossal Beast)",
    tierColor: "#d63031",
    icon: "🐘",
    level: 92,
    maxHp: 620000,
    hp: 620000,
    maxMp: 18000,
    mp: 18000,
    attack: 26000,
    defense: 19500,
    critRate: "20.0%",
    speed: "육중함",
    combatPower: "92,000",
    modelKey: "mumakil",
    position: { x: 26, y: 0, z: -18 },
    lore: "하라드 사막에서 끌고 온 집채만 한 거대 괴수. 등 위의 목조 망루에는 수십 명의 궁병이 탑승해 독화살을 퍼부으며, 발로 밟는 것만으로도 보병 방진을 산산조각 냅니다.",
    quote: "크아아아앙! (지면을 뒤흔드는 진동)",
    buffs: [
      { name: "거수의 가죽", icon: "🐘", desc: "경량 무기 공격 면역, 오직 정밀한 눈이나 복부 공격에만 피해를 입음.", type: "buff" }
    ],
    skills: [
      { id: "mumakil_stomp", name: "대지 진압 짓밟기", icon: "🦶", cost: "MP 1,500", cd: "12초", desc: "거대한 발로 바닥을 짓이겨 반경 12m 내 적 보병에게 52,000의 압도적 압사 피해를 가합니다." }
    ]
  }
};
