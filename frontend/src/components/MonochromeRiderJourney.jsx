import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Shield,
  Award,
  CheckCircle2,
  Gauge,
  Sparkles,
  Navigation,
  MessageCircle,
  Flag,
  Zap,
  Volume2
} from "lucide-react";

const DAYS_DATA = [
  {
    day: 1,
    title: "Mounting, Center of Gravity & Helmet Lock",
    location: "Safe Off-Road Training Compound (Khajaguda)",
    speed: 0,
    gear: "P (Park)",
    state: "standing",
    instructorTip: "Don't look down at your front tyre! Keep your chin up, shoulders relaxed, and feel where the scooter naturally balances.",
    learnedSkills: [
      "Center-stand & side-stand disengagement",
      "Ergonomic handlebar grip without wrist fatigue",
      "Safe kill-switch, ignition & kick-start protocols"
    ],
    milestone: "Zero Fear Groundwork"
  },
  {
    day: 2,
    title: "Micro-Throttle Rolling & Foot-Down Gliding",
    location: "Enclosed Flat Ground",
    speed: 8,
    gear: "D (Crawl)",
    state: "paddling",
    instructorTip: "Gently roll the throttle like turning a delicate doorknob — millimetre by millimetre. Keep both sneakers hovering 2 inches off the asphalt.",
    learnedSkills: [
      "Linear throttle response without jerky acceleration",
      "Progressive front & rear brake pressure distribution",
      "Walking-speed gliding with feet assisting balance"
    ],
    milestone: "Throttle Feathering"
  },
  {
    day: 3,
    title: "Feet Up! Straight-Line Equilibrium at 15 km/h",
    location: "Dedicated 100m Runway Lane",
    speed: 15,
    gear: "D (Cruising)",
    state: "feet_up",
    instructorTip: "Both feet up onto the floorboard! Once your wheels are turning at 15 km/h, the gyroscopic physics of the scooter will balance itself for you.",
    learnedSkills: [
      "Instant smooth foot lift without wobbling handlebars",
      "50-meter steady straight-line cruise without veering",
      "Smooth roll-to-stop with left foot down first"
    ],
    milestone: "First True Balance"
  },
  {
    day: 4,
    title: "Cone Slalom, Counter-Steering & 90° Turns",
    location: "Agility Obstacle Course",
    speed: 18,
    gear: "D (Agility)",
    state: "slalom",
    instructorTip: "Turn your head first toward where you want to go. Push forward gently on the left grip to initiate a smooth left lean.",
    learnedSkills: [
      "Gentle body-weight shift and counter-steering",
      "Weaving between 6 safety cones without touching feet",
      "Controlled 90-degree cornering around street corners"
    ],
    milestone: "Body-Machine Coordination"
  },
  {
    day: 5,
    title: "Incline Starts & Hill-Hold Without Rolling Back",
    location: "Khajaguda Gradient Flyover Ramp",
    speed: 12,
    gear: "D (Hill Hold)",
    state: "incline",
    instructorTip: "Clamp down on the rear brake tightly. Build throttle revs until you feel the engine pulling forward, then release the brake like a butter slice.",
    learnedSkills: [
      "Zero-roll-back starting on steep 15-degree slopes",
      "Dual brake coordination on downhill descents",
      "Emergency downhill full-stop test"
    ],
    milestone: "Gradient Mastery"
  },
  {
    day: 6,
    title: "The Dreaded RTO Figure-8 Track Simulation",
    location: "Marked RTO Test Track Template",
    speed: 14,
    gear: "D (Track)",
    state: "figure8",
    instructorTip: "Continuous, uninterrupted slow momentum is the secret. If you brake in the middle of the loop, you will drop your foot. Trust your lean.",
    learnedSkills: [
      "Official Telangana RTO 8-figure perimeter navigation",
      "Zero-foot-touch loop clearance under time limits",
      "Tight H-track reverse parking maneuver"
    ],
    milestone: "RTO 8-Track Cleared"
  },
  {
    day: 7,
    title: "First Public Road Entry & Signal Etiquette",
    location: "Janmabhoomi Colony to Khajaguda Main Road",
    speed: 25,
    gear: "D (Traffic)",
    state: "traffic_entry",
    instructorTip: "Your certified trainer is riding alongside with duplicate override controls. Check your right mirror, turn indicator on, shoulder-check, and merge.",
    learnedSkills: [
      "Safe merging from society gates onto main avenues",
      "Reading traffic signals, stop line compliance & zebra crossings",
      "Anticipating sudden auto-rickshaw lane shifts"
    ],
    milestone: "Real Road Debut"
  },
  {
    day: 8,
    title: "Speed Breakers, U-Turns & Roundabout Navigation",
    location: "Manikonda Junction to Lanco Hills Road",
    speed: 30,
    gear: "D (Urban)",
    state: "roundabout",
    instructorTip: "Release the throttle before the speed bump, glide over softly, then roll power back on. Never brake heavily right on the hump.",
    learnedSkills: [
      "Hyderabad-style high speed breaker clearance without bottoming out",
      "Clockwise and counter-clockwise multi-lane roundabouts",
      "Tight median U-turn execution in moving traffic"
    ],
    milestone: "Urban Fluency"
  },
  {
    day: 9,
    title: "Rush-Hour Defensive Riding & Blind-Spot Checks",
    location: "Khajaguda to Gachibowli Outer Ring Road Feeder",
    speed: 40,
    gear: "D (Highway)",
    state: "rush_hour",
    instructorTip: "Ride defensively: assume the car ahead does not see you. Maintain a 3-second safety envelope and keep your headlamp illuminated.",
    learnedSkills: [
      "40+ km/h sustained cruising in mixed 4-wheeler traffic",
      "Wet road skid prevention and high-speed emergency lane evade",
      "Night riding with LED beam focus and mirror glare reduction"
    ],
    milestone: "Road-Tested Veteran"
  },
  {
    day: 10,
    title: "Official RTO Mock Exam, Graduation & DL Pass!",
    location: "Kondapur RTO Exam Center Simulation",
    speed: 20,
    gear: "D (Victory)",
    state: "graduation",
    instructorTip: "Breathe easy! You have practiced every corner and slope 50 times. Run the track smoothly, collect your instructor sign-off, and celebrate!",
    learnedSkills: [
      "100% Mock RTO practical exam clearance under examiner scoring",
      "Complete road signs, rules of the road & theory test review",
      "Learn & Drive Graduation Certificate & permanent driving license pass"
    ],
    milestone: "Certified Independent Rider!"
  }
];

export default function MonochromeRiderJourney({ onEnrollDay }) {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const autoPlayTimerRef = useRef(null);

  const activeDay = DAYS_DATA[currentDayIndex];

  // Auto-play through all 10 days like an animated interactive story
  useEffect(() => {
    if (isPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentDayIndex((prev) => {
          if (prev >= DAYS_DATA.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3200);
    } else {
      clearInterval(autoPlayTimerRef.current);
    }
    return () => clearInterval(autoPlayTimerRef.current);
  }, [isPlaying]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        setCurrentDayIndex((prev) => Math.min(DAYS_DATA.length - 1, prev + 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentDayIndex((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const goToDay = (idx) => {
    setIsPlaying(false);
    setCurrentDayIndex(idx);
  };

  return (
    <section className="relative py-24 bg-[#06070A] text-white border-t border-b border-white/10 overflow-hidden hero-mesh">
      {/* Ambient Visual Road Glare */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-amber-400/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-4">
            <Zap size={14} className="fill-amber-400" />
            Interactive 2D Monochrome Riding Simulator
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white">
            See Exactly What You Learn From Day 1 to Day 10
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            Drag the scrub bar or click any day to inspect the exact maneuver, instructor radio coaching, and road milestone you will master.
          </p>
        </div>

        {/* ── 1. THE 2D MONOCHROME ANIMATED CANVAS VIEWPORT ── */}
        <div className="relative rounded-3xl border-2 border-white/15 bg-gradient-to-b from-[#0D0F17] via-[#090B11] to-[#06070A] p-4 sm:p-8 shadow-2xl overflow-hidden">
          {/* Top HUD: Speedometer, Gear, Day Badge, Play/Pause */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-20">
            <div className="flex items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider font-mono">
                Day {activeDay.day < 10 ? `0${activeDay.day}` : activeDay.day} of 10
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-white truncate max-w-md">
                {activeDay.title}
              </h3>
            </div>

            {/* Telemetry HUD & Controls */}
            <div className="flex items-center gap-4">
              {/* Speedometer Gauge Pill */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-zinc-300">
                <Gauge size={15} className="text-amber-400" />
                <span>Speed: <strong className="text-white text-sm">{activeDay.speed}</strong> km/h</span>
                <span className="text-zinc-500">|</span>
                <span className="text-amber-300 font-bold">{activeDay.gear}</span>
              </div>

              {/* Auto-Ride Play/Pause Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="btn-press flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
                title="Watch auto-animated walkthrough"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} className="fill-white" />}
                <span className="hidden sm:inline">{isPlaying ? "Pause Tour" : "Auto Tour"}</span>
              </button>
            </div>
          </div>

          {/* ── THE 2.5D PERSPECTIVE MONOCHROME ROAD SCENE ── */}
          <div className="relative w-full h-[360px] sm:h-[420px] my-6 rounded-2xl bg-[#090A10] border border-white/10 overflow-hidden flex items-center justify-center">
            {/* 3D Perspective Road Ground Grid */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1000 500"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="roadFade" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#090A10" stopOpacity="1" />
                  <stop offset="30%" stopColor="#141724" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0B0D14" stopOpacity="1" />
                </linearGradient>

                <linearGradient id="amberLaser" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#FBBF24" stopOpacity="1" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Horizon Line */}
              <line x1="0" y1="180" x2="1000" y2="180" stroke="#252A3D" strokeWidth="1" strokeDasharray="4 4" />

              {/* City Silhouette in Background for Road Days (Days 7-10) */}
              {activeDay.day >= 7 && (
                <g opacity="0.35" fill="#1C2133">
                  <rect x="80" y="100" width="40" height="80" />
                  <rect x="130" y="70" width="55" height="110" />
                  <rect x="200" y="120" width="35" height="60" />
                  <rect x="740" y="80" width="60" height="100" />
                  <rect x="820" y="110" width="45" height="70" />
                  <rect x="880" y="60" width="70" height="120" />
                  {/* Streetlight glow */}
                  <circle cx="280" cy="140" r="3" fill="#F59E0B" />
                  <circle cx="720" cy="140" r="3" fill="#F59E0B" />
                </g>
              )}

              {/* 3D Road Trapezoid */}
              <polygon points="380,180 620,180 950,500 50,500" fill="url(#roadFade)" stroke="#2D334A" strokeWidth="1.5" />

              {/* Center Dashed Lane Divider (Moving animation feel) */}
              <line
                x1="500"
                y1="180"
                x2="500"
                y2="500"
                stroke="url(#amberLaser)"
                strokeWidth="4"
                strokeDasharray="28 20"
                strokeDashoffset={activeDay.speed > 0 ? (activeDay.day * 15) : 0}
              />

              {/* Lateral Perspective Guide Lines */}
              <line x1="420" y1="180" x2="200" y2="500" stroke="#1F2436" strokeWidth="1" strokeDasharray="6 6" />
              <line x1="580" y1="180" x2="800" y2="500" stroke="#1F2436" strokeWidth="1" strokeDasharray="6 6" />

              {/* Day 4 & 6: Slalom Traffic Cones */}
              {(activeDay.day === 4 || activeDay.day === 6) && (
                <g>
                  {/* Cones drawn in technical monochrome with amber stripes */}
                  <polygon points="340,360 360,360 350,320" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1" />
                  <ellipse cx="350" cy="360" rx="14" ry="4" fill="#000" opacity="0.6" />

                  <polygon points="630,380 650,380 640,340" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1" />
                  <ellipse cx="640" cy="380" rx="14" ry="4" fill="#000" opacity="0.6" />

                  <polygon points="370,430 395,430 382,380" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1" />
                  <ellipse cx="382" cy="430" rx="16" ry="5" fill="#000" opacity="0.6" />
                </g>
              )}

              {/* Day 6: RTO 8-Track White Inscription On Ground */}
              {activeDay.day === 6 && (
                <g opacity="0.5" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeDasharray="8 6">
                  <ellipse cx="500" cy="270" rx="90" ry="40" />
                  <ellipse cx="500" cy="390" rx="150" ry="60" />
                  <text x="500" y="275" fill="#FFF" fontSize="14" fontWeight="bold" textAnchor="middle" fontStyle="italic">RTO 8-TRACK SIMULATION</text>
                </g>
              )}

              {/* Day 10: Checkered Finish Banner Line */}
              {activeDay.day === 10 && (
                <g>
                  <line x1="120" y1="460" x2="880" y2="460" stroke="#FFF" strokeWidth="10" strokeDasharray="20 20" />
                  <text x="500" y="445" fill="#F59E0B" fontSize="20" fontWeight="900" textAnchor="middle" letterSpacing="4">
                    ★ OFFICIAL RTO PASS & LICENSED ★
                  </text>
                </g>
              )}
            </svg>

            {/* ── THE 2D MONOCHROME HERO RIDER CHARACTER ── */}
            <div className="relative z-10 transition-all duration-700 ease-out flex flex-col items-center">
              {/* Rider Vector SVG in Pristine Technical Line Art */}
              <svg
                width="240"
                height="260"
                viewBox="0 0 240 260"
                className={`transform transition-all duration-700 ${
                  activeDay.state === "slalom"
                    ? "rotate-[-6deg] translate-x-[-12px]"
                    : activeDay.state === "incline"
                    ? "rotate-[-10deg] translate-y-[-10px]"
                    : activeDay.state === "graduation"
                    ? "scale-105"
                    : "rotate-0"
                }`}
              >
                <defs>
                  <filter id="glowMonochrome" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.8" />
                  </filter>
                </defs>

                {/* Ground Shadow */}
                <ellipse cx="120" cy="242" rx="72" ry="12" fill="#000000" opacity="0.75" />

                {/* SCOOTER CHASSIS (Monochrome Obsidian & Pure White Edges) */}
                {/* Rear Tyre */}
                <circle cx="62" cy="215" r="26" fill="#141722" stroke="#FFFFFF" strokeWidth="2.5" />
                <circle cx="62" cy="215" r="14" fill="#090A10" stroke="#687190" strokeWidth="1.5" />
                {/* Front Tyre */}
                <circle cx="178" cy="215" r="26" fill="#141722" stroke="#FFFFFF" strokeWidth="2.5" />
                <circle cx="178" cy="215" r="14" fill="#090A10" stroke="#687190" strokeWidth="1.5" />

                {/* Scooter Main Body & Floorboard */}
                <path
                  d="M 60 210 L 85 165 L 125 170 L 145 195 L 180 195 L 175 160 L 150 120 L 140 120 L 120 185 L 85 185 Z"
                  fill="#0D0F18"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                />

                {/* Handlebar & Instrument Visor */}
                <path d="M 148 120 L 144 95 L 130 95 L 155 95 L 150 120" stroke="#FFFFFF" strokeWidth="3" fill="none" />
                <circle cx="143" cy="95" r="7" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />

                {/* Front Headlamp Beam (Lights on in Day 7-10) */}
                {activeDay.day >= 7 && (
                  <polygon points="152,95 240,75 240,150 152,105" fill="#F59E0B" opacity="0.18" />
                )}

                {/* 2D MONOCHROME RIDER CHARACTER */}
                {/* Rider Legs */}
                {activeDay.state === "standing" ? (
                  // Day 1: Standing beside scooter with both feet down firmly
                  <g stroke="#FFFFFF" strokeWidth="2.5" fill="#171A26">
                    <path d="M 95 140 L 95 200 L 90 238 L 80 240" />
                    <path d="M 115 140 L 125 195 L 130 238 L 142 240" />
                  </g>
                ) : activeDay.state === "paddling" ? (
                  // Day 2: Skimming ground
                  <g stroke="#FFFFFF" strokeWidth="2.5" fill="#171A26">
                    <path d="M 98 140 L 92 185 L 80 230 L 70 234" />
                    <path d="M 112 140 L 120 185 L 135 230 L 145 234" />
                  </g>
                ) : (
                  // Day 3-10: Feet firmly tucked on floorboard
                  <g stroke="#FFFFFF" strokeWidth="2.5" fill="#171A26">
                    <path d="M 98 140 L 105 180 L 132 185" />
                    <rect x="125" y="180" width="18" height="8" rx="2" fill="#FFFFFF" />
                  </g>
                )}

                {/* Rider Torso & Technical Riding Jacket */}
                <path
                  d="M 85 145 L 98 105 L 132 110 L 120 152 Z"
                  fill="#1C2030"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                />
                {/* Jacket Zipper & Safety Harness Line */}
                <line x1="114" y1="108" x2="108" y2="148" stroke="#F59E0B" strokeWidth="2" />

                {/* Rider Arms */}
                {activeDay.state === "graduation" ? (
                  // Day 10: One arm high in the air giving a victory wave!
                  <g stroke="#FFFFFF" strokeWidth="2.5" fill="none">
                    <path d="M 124 112 L 144 95" /> {/* Right hand on throttle */}
                    <path d="M 100 110 L 80 75 L 75 50" /> {/* Left arm raised in victory */}
                    <circle cx="75" cy="48" r="6" fill="#F59E0B" stroke="#FFF" strokeWidth="2" />
                  </g>
                ) : (
                  // Regular dual-arm grip on handlebars
                  <g stroke="#FFFFFF" strokeWidth="2.5" fill="none">
                    <path d="M 102 112 L 125 105 L 142 95" />
                    <circle cx="142" cy="95" r="4" fill="#FFFFFF" />
                  </g>
                )}

                {/* Rider Helmet & Visor */}
                <g filter="url(#glowMonochrome)">
                  {/* Helmet Dome */}
                  <ellipse cx="112" cy="80" rx="17" ry="19" fill="#0A0B12" stroke="#FFFFFF" strokeWidth="2.5" />
                  {/* Tinted Aerodynamic Visor */}
                  <path
                    d="M 116 72 Q 130 80 125 90 L 115 88 Z"
                    fill="#F59E0B"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                  {/* Helmet Contour Accent */}
                  <path d="M 100 82 Q 108 68 122 72" stroke="#687190" strokeWidth="1.5" fill="none" />
                </g>
              </svg>

              {/* Dynamic Posture Label Pill */}
              <div className="mt-2 px-3 py-1 rounded-full bg-black/80 border border-white/20 text-[11px] font-mono text-zinc-300 flex items-center gap-1.5 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Rider Stance: <strong>{activeDay.state.toUpperCase()}</strong></span>
              </div>
            </div>

            {/* In-Canvas Milestone Stamp */}
            <div className="absolute top-4 right-4 bg-black/75 border border-white/15 px-3.5 py-2 rounded-xl backdrop-blur-md text-right">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                Target Milestone
              </span>
              <span className="text-xs font-bold text-white flex items-center justify-end gap-1 mt-0.5">
                <CheckCircle2 size={13} className="text-emerald-400" />
                {activeDay.milestone}
              </span>
            </div>
          </div>

          {/* ── 2. DAY 1 TO DAY 10 TIMELINE SCRUB BAR (EMIL KOWALSKI PHYSICS) ── */}
          <div className="pt-2 pb-6">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2.5">
              <span>SCRUB TIMELINE: DAY 01</span>
              <span className="text-amber-400 font-bold">CLICK OR DRAG ANY DAY</span>
              <span>DAY 10 (RTO PASS)</span>
            </div>

            {/* Stepper Buttons (1 to 10) */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {DAYS_DATA.map((d, index) => (
                <button
                  key={d.day}
                  onClick={() => goToDay(index)}
                  className={`btn-press py-3 rounded-2xl border text-center transition-all ${
                    currentDayIndex === index
                      ? "bg-amber-400 text-slate-950 font-black border-amber-400 shadow-lg shadow-amber-400/20 scale-105"
                      : currentDayIndex > index
                      ? "bg-white/10 text-white font-bold border-white/20"
                      : "bg-white/5 text-zinc-400 font-medium border-white/10 hover:border-white/30"
                  }`}
                >
                  <span className="block text-[10px] uppercase font-mono opacity-70">Day</span>
                  <span className="block text-sm sm:text-base font-bold leading-tight">{d.day}</span>
                </button>
              ))}
            </div>

            {/* Prev / Next Chevrons */}
            <div className="flex items-center justify-between mt-4">
              <button
                disabled={currentDayIndex === 0}
                onClick={() => goToDay(currentDayIndex - 1)}
                className="btn-press flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/15 text-xs font-semibold text-zinc-300 disabled:opacity-40 disabled:pointer-events-none hover:bg-white/5"
              >
                <ChevronLeft size={16} />
                <span>Previous Day</span>
              </button>

              <p className="text-xs text-zinc-500 font-mono hidden sm:block">
                Use Left / Right arrow keys on your keyboard to navigate
              </p>

              <button
                disabled={currentDayIndex === DAYS_DATA.length - 1}
                onClick={() => goToDay(currentDayIndex + 1)}
                className="btn-press flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/15 text-xs font-semibold text-zinc-300 disabled:opacity-40 disabled:pointer-events-none hover:bg-white/5"
              >
                <span>Next Day</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* ── 3. DETAILED COACHING BREAKDOWN FOR THE SELECTED DAY ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 border-t border-white/10">
            {/* Left: Instructor Radio Box (Authentic Khajaguda coaching) */}
            <div className="lg:col-span-6 bg-black/50 border border-white/15 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
                <Volume2 size={16} />
                <span>Instructor Radio Coaching • Senior Trainer Adarsh</span>
              </div>
              <p className="text-sm sm:text-base text-zinc-200 italic leading-relaxed font-serif pl-2 border-l-2 border-amber-400">
                "{activeDay.instructorTip}"
              </p>
              <p className="text-xs text-zinc-500 flex items-center gap-1.5 pt-1">
                <Navigation size={12} className="text-amber-400" />
                <span>Training Zone: <strong>{activeDay.location}</strong></span>
              </p>
            </div>

            {/* Right: Concrete Skills Mastered & CTA */}
            <div className="lg:col-span-6 bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider mb-2.5">
                  Day {activeDay.day} Competencies You Will Clear:
                </p>
                <div className="space-y-2">
                  {activeDay.learnedSkills.map((skill, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Enrollment Hook for this Day */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onEnrollDay(`Day ${activeDay.day}: ${activeDay.title}`)}
                  className="btn-press w-full sm:flex-1 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
                >
                  <Flag size={15} />
                  <span>Enroll Starting From Day {activeDay.day}</span>
                </button>

                <a
                  href={`https://wa.me/919985747111?text=Hi%20Learn%20%26%20Drive!%20I%20saw%20Day%20${activeDay.day}%20(${encodeURIComponent(activeDay.title)})%20on%20your%20interactive%20simulator.%20Can%20I%20join%20this%20batch%3F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press w-full sm:w-auto px-4 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <MessageCircle size={15} className="text-emerald-400" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
