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

export const UNSTOP_MAIN_URL =
  "https://unstop.com/college-fests/noesis-vedam-school-of-technology-439395";

const rawProgramItems = [
  {
    id: "scratch-that-code",
    title: "Scratch That Code",
    trackId: "tech-coding",
    tagline: "Sprintathon",
    description:
      "An 8-hour offline hackathon where teams build on a problem statement. A mid-way twist can shift the entire approach.",
    prizeText: "INR 50,000",
    entryType: "paid",
    priority: 10,
    source: "competition",
    registrationUrl:
      "https://unstop.com/hackathons/scratch-that-code-8-hour-hackathon-noesis-vedam-school-of-technology-1635489",
    details: {
      teamSize: "3 - 5 members",
      location:
        "Vedam Campus, 5th Floor, School of Engineering, Ajeenkya DY Patil University, Pune",
      date: "February 21, 2026",
      deadline: "February 21, 2026, 06:30 PM (CUT)",
      fee: "₹300",
      totalPrize: "₹50,000",
      prizes: ["1st Place: ₹25,000", "2nd Place: ₹15,000", "3rd Place: ₹10,000"],
      note: "Deadline listed in CUT on Unstop. Please verify local IST timing.",
    },
  },
  {
    id: "codeblitz",
    title: "CodeBlitz",
    trackId: "tech-coding",
    tagline: "ICPC Simulation",
    description:
      "Offline ICPC-style contest testing algorithmic speed and accuracy within a 3-hour window.",
    prizeText: "INR 45,000",
    entryType: "paid",
    priority: 9,
    source: "competition",
    registrationUrl:
      "https://unstop.com/hackathons/codeblitz-noesis-vedam-school-of-technology-1639000",
    details: {
      teamSize: "Individual participation",
      location: "Vedam Campus, Pune",
      date: "February 27, 2026",
      time: "05:30 AM - 08:30 AM (CUT)",
      deadline: "February 23, 2026, 06:30 PM",
      eligibility: "Undergraduate, Postgraduate, Engineering, Management, and other streams.",
      note: "Time listed in CUT on Unstop. Please verify local IST timing.",
    },
  },
  {
    id: "peek-a-code",
    title: "Peek-a-Code",
    trackId: "tech-coding",
    tagline: "Blind Coding Challenge",
    description:
      "How well do you know your syntax? Your monitor will be turned off. Rely entirely on memory, logic, and typing accuracy to write flawless code in the dark.",
    prizeText: "TBD",
    entryType: "paid",
    priority: 8,
    source: "competition",
    registrationUrl:
      "https://unstop.com/competitions/peek-a-code-blind-coding-competition-noesis-vedam-school-of-technology-1639249",
  },
  {
    id: "algoquest",
    title: "AlgoQuest",
    trackId: "tech-coding",
    tagline: "Coding Treasure Hunt",
    description:
      "A thrilling blend of logic puzzles and algorithmic challenges. Decipher clues, write functional code, and race against other teams to unlock the final treasure.",
    prizeText: "TBD",
    entryType: "paid",
    priority: 6,
    source: "competition",
    registrationUrl:
      "https://unstop.com/competitions/algoquest-coding-treasure-hunt-noesis-vedam-school-of-technology-1639249",
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
      "Got a disruptive startup idea? Pitch your business plan to our panel of judges. Demonstrate market viability, innovation, and financial strategy to secure the top spot.",
    prizeText: "TBD",
    entryType: "paid",
    priority: 10,
    source: "competition",
    registrationUrl:
      "https://unstop.com/competitions/build-or-bust-b-plan-challenge-noesis-vedam-school-of-technology-1639249",
  },
  {
    id: "frames-ahoy",
    title: "Frames Ahoy",
    trackId: "business",
    tagline: "UI/UX Competition",
    description:
      "A dedicated design battle evaluating your user research, wireframing, and interface design skills. Craft intuitive and visually stunning user experiences to win.",
    prizeText: "TBD",
    entryType: "paid",
    priority: 9,
    source: "competition",
    registrationUrl:
      "https://unstop.com/competitions/frames-ahoy-uiux-competition-noesis-vedam-school-of-technology-1639249",
  },
  {
    id: "vedam-stock-exchange",
    title: "VSX: Buy or Bail",
    trackId: "business",
    tagline: "Buy or Bail",
    description:
      "Stock market simulation where teams manage a virtual portfolio. A mid-event market twist tests risk strategy.",
    prizeText: "INR 10,000",
    entryType: "paid",
    priority: 8,
    source: "competition",
    registrationUrl:
      "https://unstop.com/competitions/vsx-buy-or-bail-stock-exchange-simulation-noesis-vedam-school-of-technology-1639218",
    details: {
      teamSize: "1 - 4 members",
      location: "Vedam Campus, Pune",
      date: "February 28, 2026",
      deadline: "February 23, 2026, 06:30 PM",
      totalPrize: "₹10,000",
      prizes: ["1st Place: ₹5,000", "2nd Place: ₹3,000", "3rd Place: ₹2,000"],
    },
  },
  {
    id: "minute-to-win-it",
    title: "Minute to Win It",
    trackId: "cultural",
    tagline: "60-Second Challenges",
    description:
      "Fast, fun, and chaotic. Compete in a series of tricky 60-second micro-challenges where every second counts!",
    prizeText: "TBD",
    entryType: "free",
    priority: 7,
    source: "event",
    registrationUrl:
      "https://unstop.com/events/minute-to-win-it-noesis-vedam-school-of-technology-1639249",
  },
  {
    id: "step-up-showdown",
    title: "House & Pop",
    trackId: "cultural",
    tagline: "Dance Competition",
    description:
      "Solo or group dance competition focused on House and Popping styles. Online qualifier leads to an offline finale.",
    prizeText: "INR 10,000",
    entryType: "free",
    priority: 10,
    source: "event",
    registrationUrl:
      "https://unstop.com/events/house-pop-dance-competition-noesis-vedam-school-of-technology-1639249",
    details: {
      teamSize: "1 - 8 members",
      stages:
        "Online qualifier: submit a 1-minute video by February 20, 2026. Grand finals: live offline performance on February 28, 2026.",
      deadline: "February 23, 2026, 06:30 PM",
      totalPrize: "₹10,000",
      prizes: ["1st Place: ₹5,000", "2nd Place: ₹3,000", "3rd Place: ₹2,000"],
    },
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
      "Drop into the battlegrounds. Squad up and survive against the best teams on campus in this ultimate E-sports showdown.",
    prizeText: "TBD",
    entryType: "paid",
    priority: 10,
    source: "competition",
    registrationUrl:
      "https://unstop.com/competitions/bgmi-noesis-vedam-school-of-technology-1639249",
  },
  {
    id: "chess",
    title: "No Scope/Lock-In - Chess",
    trackId: "esports",
    tagline: "Mind Games",
    description:
      "Structured chess tournament with rapid rounds and high-pressure tie-breakers.",
    prizeText: "INR 10,000",
    entryType: "paid",
    priority: 7,
    source: "competition",
    registrationUrl:
      "https://unstop.com/events/no-scopelock-in-chess-noesis-vedam-school-of-technology-1638846",
    details: {
      teamSize: "Individual participation",
      location: "Vedam Campus, Pune",
      date: "February 26, 2026",
      deadline: "February 23, 2026, 06:30 PM",
      format: "Rapid 10 minutes · Tie-breaker: 1 minute (Bullet)",
      totalPrize: "₹10,000",
      prizes: ["Winner: ₹5,000", "Runner Up: ₹3,000", "Second Runner Up: ₹2,000"],
    },
  },
  {
    id: "fifa",
    title: "FIFA",
    trackId: "esports",
    tagline: "Virtual Football",
    description:
      "Take to the virtual pitch. Prove your console gaming skills and tactical prowess in our knockout FIFA tournament.",
    prizeText: "TBD",
    entryType: "paid",
    priority: 8,
    source: "competition",
    registrationUrl:
      "https://unstop.com/competitions/fifa-noesis-vedam-school-of-technology-1639249",
  },
  {
    id: "tekken",
    title: "Tekken",
    trackId: "esports",
    tagline: "Fighting Game",
    description:
      "Master your combos and frame data in this intense 1v1 Tekken console fighting tournament.",
    prizeText: "TBD",
    entryType: "paid",
    priority: 7,
    source: "competition",
    registrationUrl:
      "https://unstop.com/competitions/tekken-noesis-vedam-school-of-technology-1639249",
  },
  {
    id: "run-robo-run",
    title: "Run Robo Run",
    trackId: "robotics",
    tagline: "RC Car Racing",
    description:
      "Rev your engines! Navigate custom-built RC bots and cars through a rigorous obstacle track in a high-speed time trial.",
    prizeText: "TBD",
    entryType: "paid",
    priority: 9,
    source: "competition",
    registrationUrl:
      "https://unstop.com/competitions/run-robo-run-rc-car-racing-noesis-vedam-school-of-technology-1639249",
  },
  {
    id: "roboclash",
    title: "Robo Clash",
    trackId: "robotics",
    tagline: "Control Wars",
    description:
      "Enter the arena for a classic Robo War. Build, control, and battle your custom machines against opponents to dominate the clash.",
    prizeText: "TBD",
    entryType: "paid",
    priority: 10,
    source: "competition",
    registrationUrl:
      "https://unstop.com/competitions/robo-clash-control-wars-noesis-vedam-school-of-technology-1639249",
  },
];

export const programItems = rawProgramItems.map((item) => ({
  ...item,
  registrationUrl: item.registrationUrl ?? UNSTOP_MAIN_URL,
}));

export const programTrackIds = trackMeta.map((track) => track.id);

export function getProgramItemsByTrack(trackId) {
  return programItems
    .filter((item) => item.trackId === trackId)
    .sort((a, b) => b.priority - a.priority || a.title.localeCompare(b.title));
}

export function getFeaturedProgramItem(trackId) {
  return getProgramItemsByTrack(trackId)[0] ?? null;
}
