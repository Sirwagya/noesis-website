export const trackMeta = [
  {
    id: "tech",
    label: "Tech",
    description:
      "Code sprints, open-source breakthroughs, and high-signal talks for builders who ship.",
    accentStart: "#40ffa7",
    accentEnd: "#0145f2",
    iconKey: "terminal",
    order: 1,
    mood: "luminous",
    parallaxPreset: "deep",
  },
  {
    id: "robotics",
    label: "Robotics",
    description:
      "Autonomy races and combat builds where hardware discipline meets split-second strategy.",
    accentStart: "#9a6cff",
    accentEnd: "#4de6e6",
    iconKey: "bot",
    order: 2,
    mood: "kinetic",
    parallaxPreset: "mid",
  },
  {
    id: "e-cell",
    label: "E-Cell",
    description:
      "Founder simulations, market pressure, and high-conviction decisions built for operators.",
    accentStart: "#260656",
    accentEnd: "#a580ca",
    iconKey: "rocket",
    order: 3,
    mood: "command",
    parallaxPreset: "mid",
  },
  {
    id: "e-sports",
    label: "E-Sports",
    description:
      "Tournament-intense game chapters driven by teamwork, precision, and clutch execution.",
    accentStart: "#c71b52",
    accentEnd: "#17506e",
    iconKey: "gamepad",
    order: 4,
    mood: "arena",
    parallaxPreset: "deep",
  },
  {
    id: "cultural",
    label: "Cultural",
    description:
      "Performance-first moments where stage energy, storytelling, and community define the finale.",
    accentStart: "#6a00ff",
    accentEnd: "#ff2f92",
    iconKey: "sparkles",
    order: 5,
    mood: "pulse",
    parallaxPreset: "soft",
  },
];

export const programItems = [
  {
    id: "scratch-that-code",
    title: "Scratch that Code",
    trackId: "tech",
    tagline: "Build Sprint",
    description:
      "An 8-hour maker sprint where teams ideate, prototype, and deliver under hard time pressure.",
    prizeText: "INR 50,000",
    entryType: "paid",
    priority: 10,
    source: "competition",
    depthLayer: 3,
  },
  {
    id: "tech-insiders-open-source",
    title: "Tech Insiders",
    trackId: "tech",
    tagline: "Open Source Dispatch",
    description:
      "Candid stories from open-source contributors on shipping impact, collaboration, and growth.",
    prizeText: "Free Entry",
    entryType: "free",
    priority: 9,
    source: "event",
    depthLayer: 2,
  },
  {
    id: "codeblitz",
    title: "CodeBlitz",
    trackId: "tech",
    tagline: "Competitive Programming",
    description:
      "Constraint-heavy coding rounds that reward algorithmic precision, speed, and composure.",
    prizeText: "INR 45,000",
    entryType: "paid",
    priority: 8,
    source: "competition",
    depthLayer: 1,
  },
  {
    id: "peek-a-code",
    title: "Peek-a-Code",
    trackId: "tech",
    tagline: "Blind Logic",
    description:
      "Memory-led problem solving where participants code through challenge patterns with minimal cues.",
    prizeText: "INR 30,000",
    entryType: "paid",
    priority: 7,
    source: "competition",
    depthLayer: 3,
  },
  {
    id: "tech-insiders-ytd",
    title: "Tech Insiders",
    trackId: "tech",
    tagline: "Future Stack 2026",
    description:
      "A forward-looking breakdown of AI, engineering shifts, and career trajectories for builders.",
    prizeText: "Free Entry",
    entryType: "free",
    priority: 6,
    source: "event",
    depthLayer: 2,
  },
  {
    id: "minute-to-win-it",
    title: "Minute to Win It",
    trackId: "tech",
    tagline: "Speed Loop",
    description:
      "Rapid coding bursts that test reflexes, clarity of thought, and execution at extreme pace.",
    prizeText: "INR 25,000",
    entryType: "paid",
    priority: 5,
    source: "competition",
    depthLayer: 1,
  },
  {
    id: "algoquest",
    title: "AlgoQuest",
    trackId: "tech",
    tagline: "Treasure Logic",
    description:
      "A chained puzzle quest where each solved algorithmic gate unlocks the next hidden checkpoint.",
    prizeText: "INR 40,000",
    entryType: "paid",
    priority: 4,
    source: "competition",
    depthLayer: 2,
  },
  {
    id: "roboclash",
    title: "ROBOCLASH",
    trackId: "robotics",
    tagline: "Combat Arena",
    description:
      "Engineered bots enter the arena for durability-driven clashes and tactical impact rounds.",
    prizeText: "INR 45,000",
    entryType: "paid",
    priority: 10,
    source: "competition",
    depthLayer: 3,
  },
  {
    id: "run-robo-run",
    title: "Run Robo Run",
    trackId: "robotics",
    tagline: "Autonomy Race",
    description:
      "Autonomous racing format focused on control logic, pathing precision, and repeatable speed.",
    prizeText: "INR 40,000",
    entryType: "paid",
    priority: 8,
    source: "competition",
    depthLayer: 2,
  },
  {
    id: "build-or-bust",
    title: "Build or Bust",
    trackId: "e-cell",
    tagline: "Founder Arena",
    description:
      "Pitch and pressure-test venture theses with mentors through high-stakes founder simulations.",
    prizeText: "INR 50,000",
    entryType: "paid",
    priority: 10,
    source: "competition",
    depthLayer: 3,
  },
  {
    id: "vedam-stock-exchange",
    title: "Vedam Stock Exchange",
    trackId: "e-cell",
    tagline: "Market Sim",
    description:
      "Live trading scenarios with risk windows, volatile signals, and strategy-led decisions.",
    prizeText: "INR 35,000",
    entryType: "paid",
    priority: 8,
    source: "competition",
    depthLayer: 2,
  },
  {
    id: "valorant",
    title: "Valorant",
    trackId: "e-sports",
    tagline: "Tactical FPS",
    description:
      "Bracket-driven tactical battles where utility discipline and callouts define every round.",
    prizeText: "INR 35,000",
    entryType: "paid",
    priority: 10,
    source: "competition",
    depthLayer: 3,
  },
  {
    id: "bgmi",
    title: "BGMI",
    trackId: "e-sports",
    tagline: "Battle Royale",
    description:
      "Squad survival showdown with rotating circles, elimination pressure, and final-ring drama.",
    prizeText: "INR 30,000",
    entryType: "paid",
    priority: 9,
    source: "competition",
    depthLayer: 2,
  },
  {
    id: "fifa",
    title: "FIFA",
    trackId: "e-sports",
    tagline: "Virtual Football",
    description:
      "High-tempo football simulation cup featuring head-to-head brackets and crowd-heavy finals.",
    prizeText: "INR 25,000",
    entryType: "paid",
    priority: 7,
    source: "competition",
    depthLayer: 1,
  },
  {
    id: "chess",
    title: "Chess",
    trackId: "e-sports",
    tagline: "Rapid Masters",
    description:
      "Fast-format strategic matchups that reward opening prep, tactical reading, and endgame calm.",
    prizeText: "INR 20,000",
    entryType: "paid",
    priority: 6,
    source: "competition",
    depthLayer: 1,
  },
  {
    id: "step-up-showdown",
    title: "Step Up Showdown",
    trackId: "cultural",
    tagline: "Crew Faceoff",
    description:
      "A high-energy dance clash judged on choreography, timing precision, and stage command.",
    prizeText: "Free Entry",
    entryType: "free",
    priority: 10,
    source: "event",
    depthLayer: 3,
  },
  {
    id: "spotlight",
    title: "Spotlight",
    trackId: "cultural",
    tagline: "Stage Showcase",
    description:
      "Open-format performance chapter where vocal, dance, and spoken acts compete for crowd momentum.",
    prizeText: "Free Entry",
    entryType: "free",
    priority: 9,
    source: "event",
    depthLayer: 2,
  },
  {
    id: "unplugged",
    title: "Unplugged",
    trackId: "cultural",
    tagline: "Live Jam Circuit",
    description:
      "Collaborative music jam built on raw performance chemistry and audience-led energy.",
    prizeText: "Free Entry",
    entryType: "free",
    priority: 8,
    source: "event",
    depthLayer: 2,
  },
  {
    id: "stand-up-comedy",
    title: "Stand Up Comedy",
    trackId: "cultural",
    tagline: "Comedy Hour",
    description:
      "Sharp stand-up sets with tight crowd interaction, improv beats, and late-night festival vibe.",
    prizeText: "Free Entry",
    entryType: "free",
    priority: 7,
    source: "event",
    depthLayer: 1,
  },
  {
    id: "after-hours",
    title: "After Hours",
    trackId: "cultural",
    tagline: "Closing Set",
    description:
      "The final night chapter with live transitions, visual builds, and a full-community celebration.",
    prizeText: "Free Entry",
    entryType: "free",
    priority: 6,
    source: "event",
    depthLayer: 3,
  },
];

export const programTrackIds = trackMeta.map((track) => track.id);

export function getProgramItemsByTrack(trackId) {
  return programItems
    .filter((item) => item.trackId === trackId)
    .sort((a, b) => b.priority - a.priority || a.title.localeCompare(b.title));
}

export function getFeaturedProgramItem(trackId) {
  return getProgramItemsByTrack(trackId)[0] ?? null;
}
