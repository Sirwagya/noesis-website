export const trackMeta = [
  {
    id: "tech-coding",
    label: "Tech",
    description: "Algorithm battles, rapid prototyping, and challenge-driven coding formats.",
    accentStart: "#5b8cff",
    accentEnd: "#8a3ffc",
    mood: "command",
    iconKey: "terminal",
    order: 1,
  },
  {
    id: "tech-talks",
    label: "Tech Talks",
    description: "Expert sessions on cutting-edge engineering, growth paths, and future-ready skills.",
    accentStart: "#16c4b8",
    accentEnd: "#5b8cff",
    mood: "pulse",
    iconKey: "mic",
    order: 2,
  },
  {
    id: "business",
    label: "Business",
    description: "Startup strategy, market simulation, and founder-style decision making.",
    accentStart: "#f59e0b",
    accentEnd: "#f97316",
    mood: "command",
    iconKey: "briefcase",
    order: 3,
  },
  {
    id: "cultural",
    label: "Cultural",
    description: "Performance, storytelling, and expression that power the festival vibe.",
    accentStart: "#ec4899",
    accentEnd: "#f43f5e",
    mood: "pulse",
    iconKey: "sparkles",
    order: 4,
  },
  {
    id: "esports",
    label: "Esports",
    description: "High-stakes competitive play, team tactics, and crowd-favorite game titles.",
    accentStart: "#a855f7",
    accentEnd: "#3b82f6",
    mood: "arena",
    iconKey: "gamepad",
    order: 5,
  },
  {
    id: "robotics",
    label: "Robotics",
    description: "Build, race, and battle autonomous and combat robots under real pressure.",
    accentStart: "#14b8a6",
    accentEnd: "#6366f1",
    mood: "arena",
    iconKey: "bot",
    order: 6,
  },
];

export const programItems = [
  {
    id: "scratch-that-code",
    title: "Scratch that Code",
    trackId: "tech-coding",
    tagline: "Sprintathon",
    description:
      "8-hour hackathon sprint where innovation meets speed. Build, code, and ship under pressure.",
    prizeText: "INR 50,000",
    entryType: "paid",
    priority: 10,
    source: "competition",
  },
  {
    id: "codeblitz",
    title: "CodeBlitz",
    trackId: "tech-coding",
    tagline: "ICPC Simulation",
    description:
      "Competitive programming simulation with tight constraints, accuracy scoring, and leaderboard pressure.",
    prizeText: "INR 45,000",
    entryType: "paid",
    priority: 9,
    source: "competition",
  },
  {
    id: "peek-a-code",
    title: "Peek-a-Code",
    trackId: "tech-coding",
    tagline: "Blind Coding Challenge",
    description:
      "Solve coding challenges without relying on typical visual cues. Test memory and core logic skills.",
    prizeText: "INR 30,000",
    entryType: "paid",
    priority: 8,
    source: "competition",
  },
  {
    id: "minute-to-win-it",
    title: "Minute to Win It",
    trackId: "tech-coding",
    tagline: "60-Second Coding Competition",
    description:
      "Ultra-fast challenge rounds focused on rapid reasoning, coding speed, and calm execution.",
    prizeText: "INR 25,000",
    entryType: "paid",
    priority: 7,
    source: "competition",
  },
  {
    id: "algoquest",
    title: "AlgoQuest",
    trackId: "tech-coding",
    tagline: "Coding Treasure Hunt",
    description:
      "A clue-based algorithmic quest where each solved puzzle unlocks the next technical checkpoint.",
    prizeText: "INR 40,000",
    entryType: "paid",
    priority: 6,
    source: "competition",
  },
  {
    id: "tech-insiders-icpc-gsoc",
    title: "Tech Insiders",
    trackId: "tech-talks",
    tagline: "ICPC Finalists / GSoC Stories",
    description:
      "First-hand insights from finalists and open-source contributors on problem solving and growth.",
    prizeText: "Free Entry",
    entryType: "free",
    priority: 10,
    source: "event",
  },
  {
    id: "tech-insiders-ytd",
    title: "Tech Insiders",
    trackId: "tech-talks",
    tagline: "Year in Tech",
    description:
      "Trend-focused session on practical shifts in AI, product engineering, and career opportunities.",
    prizeText: "Free Entry",
    entryType: "free",
    priority: 8,
    source: "event",
  },
  {
    id: "build-or-bust",
    title: "Build or Bust",
    trackId: "business",
    tagline: "B-Plan Challenge",
    description:
      "Pitch startup plans to mentors, defend assumptions, and shape investor-ready narratives.",
    prizeText: "INR 50,000",
    entryType: "paid",
    priority: 10,
    source: "competition",
  },
  {
    id: "vedam-stock-exchange",
    title: "Vedam Stock Exchange",
    trackId: "business",
    tagline: "Buy or Bail",
    description:
      "Live market simulation with strategy rounds, risk analysis, and timed decision windows.",
    prizeText: "INR 35,000",
    entryType: "paid",
    priority: 8,
    source: "competition",
  },
  {
    id: "unplugged",
    title: "Unplugged",
    trackId: "cultural",
    tagline: "Jamming Session",
    description:
      "Collaborative acoustic jam celebrating live creativity, rhythm, and audience energy.",
    prizeText: "Free Entry",
    entryType: "free",
    priority: 8,
    source: "event",
  },
  {
    id: "spotlight",
    title: "Spotlight",
    trackId: "cultural",
    tagline: "Talent Show",
    description:
      "Open-stage showcase for cross-genre performances from music and dance to spoken word.",
    prizeText: "Free Entry",
    entryType: "free",
    priority: 9,
    source: "event",
  },
  {
    id: "stand-up-comedy",
    title: "Stand Up Comedy",
    trackId: "cultural",
    tagline: "Laugh Out Loud",
    description:
      "Curated stand-up segment featuring sharp sets, crowd work, and festival-night humor.",
    prizeText: "Free Entry",
    entryType: "free",
    priority: 7,
    source: "event",
  },
  {
    id: "step-up-showdown",
    title: "Step Up Showdown",
    trackId: "cultural",
    tagline: "Dance Competition",
    description:
      "Crew and solo dance face-off judged on choreography, stage control, and technical precision.",
    prizeText: "Free Entry",
    entryType: "free",
    priority: 10,
    source: "event",
  },
  {
    id: "after-hours",
    title: "After Hours",
    trackId: "cultural",
    tagline: "DJ Night",
    description:
      "Festival closing set with high-energy transitions, live visuals, and community celebration.",
    prizeText: "Free Entry",
    entryType: "free",
    priority: 6,
    source: "event",
  },
  {
    id: "bgmi",
    title: "BGMI",
    trackId: "esports",
    tagline: "Battle Royale",
    description:
      "Team-based tactical survival showdown with elimination rounds and championship final.",
    prizeText: "INR 30,000",
    entryType: "paid",
    priority: 10,
    source: "competition",
  },
  {
    id: "valorant",
    title: "Valorant",
    trackId: "esports",
    tagline: "Tactical FPS",
    description:
      "Precision, utility usage, and team coordination battles in structured tournament brackets.",
    prizeText: "INR 35,000",
    entryType: "paid",
    priority: 9,
    source: "competition",
  },
  {
    id: "chess",
    title: "Chess",
    trackId: "esports",
    tagline: "Mind Games",
    description:
      "Rapid-format strategic chess matches with leaderboard progression and knockout finals.",
    prizeText: "INR 20,000",
    entryType: "paid",
    priority: 7,
    source: "competition",
  },
  {
    id: "fifa",
    title: "FIFA",
    trackId: "esports",
    tagline: "Virtual Football",
    description:
      "Skill-driven football simulation cup featuring head-to-head eliminations and finals.",
    prizeText: "INR 25,000",
    entryType: "paid",
    priority: 8,
    source: "competition",
  },
  {
    id: "run-robo-run",
    title: "Run Robo Run",
    trackId: "robotics",
    tagline: "Robo Race",
    description:
      "Autonomous robot race challenge emphasizing design efficiency, control logic, and speed.",
    prizeText: "INR 40,000",
    entryType: "paid",
    priority: 9,
    source: "competition",
  },
  {
    id: "roboclash",
    title: "ROBOCLASH",
    trackId: "robotics",
    tagline: "Robo War",
    description:
      "Impact-focused bot combat arena where engineering durability meets tactical aggression.",
    prizeText: "INR 45,000",
    entryType: "paid",
    priority: 10,
    source: "competition",
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
