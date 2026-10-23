import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import axios from "axios";
import {
  Bike,
  FileText,
  Phone,
  MapPin,
  Star,
  CheckCircle2,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Award,
  Clock,
  Sparkles,
  Navigation,
  Send,
  Loader2,
  PartyPopper,
  MessageCircle,
  HelpCircle,
  Gauge,
  Calendar,
  Compass,
  ArrowUpRight,
  Check
} from "lucide-react";

const GOOGLE_SHEETS_WEBHOOK =
  "https://script.google.com/macros/s/AKfycbx9bHtMsPx2KVWjXYR3Xaru_qqc-WZnTZPtsnyP_3oMEkgaQCMzRAUUjWvei57ESFVH/exec";

const PHONE_NUMBER = "9985747111";
const WHATSAPP_LINK = "https://wa.me/919985747111?text=Hi%20Learn%20%26%20Drive!%20I%20am%20interested%20in%20two-wheeler%20training%20at%20Khajaguda.%20Please%20share%20batch%20timings%20and%20details.";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Courses", href: "#courses" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Fee Calculator", href: "#calculator" },
  { label: "Reviews", href: "#reviews" },
  { label: "Location", href: "#location" }
];

const LOCALITIES = [
  "Khajaguda",
  "Manikonda",
  "Gachibowli",
  "Kondapur",
  "Hitec City",
  "Puppalaguda",
  "Narsingi",
  "Financial District",
  "Other Area in Hyderabad"
];

/* ─── DATA: COURSES ─── */
const COURSE_PACKAGES = [
  {
    id: "scooty-beginner",
    category: "gearless",
    badge: "Most Popular for Beginners",
    title: "Complete Scooty & Gearless Training",
    vehicle: "Honda Activa 6G / Suzuki Access 125",
    idealFor: "Complete beginners, women riders, and anyone who has never ridden a two-wheeler before.",
    duration: "10 Days (1 hour daily)",
    timing: "Morning (6 AM - 9 AM) or Evening (5 PM - 7 PM)",
    price: "₹3,500",
    features: [
      "Zero-balance off-road training first",
      "Throttle sensitivity & dual-brake control",
      "Real-road traffic navigation in Khajaguda",
      "Safety helmet & protective gear provided",
      "Fuel costs fully included"
    ]
  },
  {
    id: "geared-bike",
    category: "geared",
    badge: "Motorcycle Specialist",
    title: "Geared Motorcycle Road Mastery",
    vehicle: "125cc - 150cc Geared Motorcycle",
    idealFor: "Riders transitioning to geared motorcycles, clutch-bite mastery, and highway riding.",
    duration: "10 Days (1 hour daily)",
    timing: "Morning (6 AM - 9 AM) or Evening (5 PM - 7 PM)",
    price: "₹4,200",
    features: [
      "Clutch friction-zone & stall prevention",
      "Smooth gear shifting & engine braking",
      "Steep incline / slope take-off control",
      "Highway lane discipline & mirror checks",
      "Complete mock test on RTO track format"
    ]
  },
  {
    id: "license-combo",
    category: "license",
    badge: "Guaranteed Pass Support",
    title: "Riding + RTO License Fast-Track",
    vehicle: "Scooty or Bike + RTO Test Assistance",
    idealFor: "Learners needing both hands-on riding lessons and complete official Telangana RTO license support.",
    duration: "12 Days Training + RTO Slot",
    timing: "Flexible Batches 6 Days a Week",
    price: "₹5,500",
    features: [
      "Full 10-day hands-on practical road course",
      "Dedicated 8-figure & H-track test simulation",
      "Online Learner's License (LLR) filing support",
      "Permanent DL slot booking & documentation",
      "Vehicle provided on the official RTO test day"
    ]
  }
];

/* ─── DATA: 10-DAY ROAD MASTERY CURRICULUM ─── */
const CURRICULUM_STAGES = [
  {
    phase: "Phase 01",
    days: "Days 1 to 3",
    title: "Balance, Foot Control & Throttle Softness",
    focus: "Dedicated Off-Road Practice Ground",
    summary: "Overcoming fear and finding natural equilibrium without engine power, followed by micro-throttle control and smooth straight-line stops.",
    skills: [
      "Mounting, foot-paddling & zero-power coasting balance",
      "Gentle progressive throttle application without jerking",
      "Front vs rear brake bias & panic-free stopping distance"
    ]
  },
  {
    phase: "Phase 02",
    days: "Days 4 to 6",
    title: "Low-Speed Crawl, Tight Turns & Slope Starts",
    focus: "Controlled Maneuvering & Road Etiquette",
    summary: "Mastering the hardest part of riding: walking-speed balance in bumper-to-bumper conditions, tight 90-degree corners, and flyover/slope stops.",
    skills: [
      "Clutch slipping / throttle feathered low-speed crawl",
      "Hill-hold takeoffs without rolling backwards",
      "Narrow U-turns and precise figure-8 track navigation"
    ]
  },
  {
    phase: "Phase 03",
    days: "Days 7 to 9",
    title: "Real Hyderabad Traffic & Junction Navigation",
    focus: "Khajaguda, Manikonda & Gachibowli Roads",
    summary: "Taking lessons out onto active public roads with your certified trainer right beside you, learning defensive positioning and mirror awareness.",
    skills: [
      "Traffic signal stops, roundabouts & lane changes",
      "Reading blind spots, auto-rickshaw traffic & pedestrian anticipation",
      "Speed regulation & safe overtaking protocols"
    ]
  },
  {
    phase: "Phase 04",
    days: "Day 10",
    title: "RTO Test Simulation & Emergency Drills",
    focus: "Official Telangana RTO Format Mock Run",
    summary: "Full practice run of the official 8-track test under strict observation, followed by high-speed wet braking and emergency evasion safety drills.",
    skills: [
      "Zero-foot-touch 8-track test evaluation",
      "Emergency swerve and rapid obstacle braking",
      "Graduation ride & final instructor sign-off"
    ]
  }
];

/* ─── DATA: VERIFIED REVIEWS ─── */
const REVIEWS = [
  {
    name: "Sneha Reddy",
    locality: "Khajaguda / Lanco Hills",
    tag: "First-Time Woman Rider",
    rating: 5,
    text: "I was genuinely terrified of even sitting on an Activa. The trainer, Adarsh Sir, is remarkably calm and never loses patience. By Day 4, I was balancing on my own, and by Day 8, I was navigating Khajaguda main road traffic with zero fear. Worth every single rupee!",
    date: "Enrolled in September 2026",
    avatarBg: "bg-amber-500/20 text-amber-300"
  },
  {
    name: "Karthik V.",
    locality: "Financial District / Nanakramguda",
    tag: "Geared Motorcycle Student",
    rating: 5,
    text: "Learned clutch and gear shifting here after struggling with YouTube tutorials. They teach you the exact physics of clutch biting points so you never stall at green lights or flyovers. Cleared my Kondapur RTO test on the first try without touching feet down once.",
    date: "Enrolled in August 2026",
    avatarBg: "bg-emerald-500/20 text-emerald-300"
  },
  {
    name: "Dr. Ananya Rao",
    locality: "Gachibowli",
    tag: "Healthcare Professional",
    rating: 5,
    text: "Needed flexible early morning batches (6:30 AM) before hospital shifts. Punctual, professional, and safety-first. They provided a sanitized helmet and dual-controlled scooter. If you live anywhere in West Hyderabad, this is the best driving school.",
    date: "Enrolled in October 2026",
    avatarBg: "bg-blue-500/20 text-blue-300"
  }
];

/* ─── COMPONENT: NAVBAR ─── */
function Navbar({ onOpenEnroll }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#090A0F]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#home");
          }}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-400/20 group-hover:scale-105 transition-transform">
            <Bike size={22} strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-heading text-xl font-bold tracking-tight text-white flex items-center gap-1.5 leading-none">
              Learn <span className="text-amber-400">&</span> Drive
            </div>
            <p className="text-[10px] font-medium tracking-wider text-zinc-400 mt-1 uppercase">
              2-Wheeler Academy • Khajaguda
            </p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              className="text-sm font-medium text-zinc-300 hover:text-amber-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="btn-press flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 text-sm font-medium text-white hover:bg-white/5"
          >
            <Phone size={15} className="text-amber-400" />
            <span>9985747111</span>
          </a>

          <button
            onClick={() => onOpenEnroll()}
            className="btn-press flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-bold shadow-lg shadow-amber-400/20"
          >
            <span>Book Training Slot</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-amber-400"
            aria-label="Call Now"
          >
            <Phone size={18} />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D0F17] border-b border-white/10 px-6 py-6 space-y-4 animate-hero-in">
          <div className="space-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className="block text-base font-medium text-zinc-200 hover:text-amber-400 py-1"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnroll();
              }}
              className="w-full py-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-center text-sm shadow-md"
            >
              Book Training Slot
            </button>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-semibold text-center text-sm flex items-center justify-center gap-2"
            >
              <MessageCircle size={17} />
              <span>WhatsApp Instructor</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ─── COMPONENT: HERO ─── */
function Hero({ onOpenEnroll }) {
  return (
    <section id="home" className="relative min-h-[92vh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden bg-[#090A0F] hero-mesh">
      {/* Ambient Radial Road Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-24 left-1/4 w-[400px] h-[300px] bg-blue-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Authoritative Editorial Copy */}
          <div className="lg:col-span-7 space-y-8 animate-hero-in">
            {/* Live Batch Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Morning & Evening Batches Open in Khajaguda</span>
              <span className="text-zinc-500">•</span>
              <span className="text-amber-400 font-semibold">1-on-1 Certified Trainers</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-[68px] font-bold text-white tracking-tight leading-[1.05]">
              Learn To Ride. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
                Master Real Roads
              </span>{" "}
              With Complete Confidence.
            </h1>

            {/* Subtitle with strict line-length and grounded Hyderabad context */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
              Hyderabad’s premier dedicated two-wheeler riding academy. We take you from zero balance to navigating busy city signals and clearing your official RTO 8-track test — with patient, one-on-one professional guidance.
            </p>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => onOpenEnroll()}
                className="btn-press px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-base flex items-center justify-center gap-2 shadow-xl shadow-amber-400/20"
              >
                <span>Book Free Consultation</span>
                <ChevronRight size={18} />
              </button>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press px-7 py-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-semibold text-base flex items-center justify-center gap-2.5"
              >
                <MessageCircle size={19} className="text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Grounded Trust Bar */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-xl">
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-black text-white">100%</p>
                <p className="text-xs text-zinc-400 mt-1">Dual-Control Safety Focus</p>
              </div>
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-black text-white">10 Days</p>
                <p className="text-xs text-zinc-400 mt-1">To Real Road Fluency</p>
              </div>
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-black text-amber-400">4.9 ★</p>
                <p className="text-xs text-zinc-400 mt-1">Google Verified Rating</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card with Live Metrics */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-white/10 to-white/5 p-2 shadow-2xl backdrop-blur-sm">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/10081879/pexels-photo-10081879.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200"
                  alt="Confident woman rider learning scooter handling with safety helmet"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-transparent opacity-90" />

                {/* Overlaid Badge: Khajaguda Training Ground */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                      Dedicated Training Ground
                    </p>
                    <p className="text-sm font-bold text-white mt-0.5">
                      Khajaguda • Manikonda Junction
                    </p>
                    <p className="text-[11px] text-zinc-400">Opposite ASBL & Janmabhoomi Colony</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
                    <Compass size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Achievement Pill (Emil Kowalski micro-detail) */}
            <div className="absolute -top-4 -left-4 sm:-left-6 bg-[#121520] border border-white/15 rounded-2xl p-3.5 shadow-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck size={22} />
              </div>
              <div>
                <p className="text-xs text-zinc-400">Safety Guaranteed</p>
                <p className="text-sm font-bold text-white">Full Gear & Guard Rail</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── COMPONENT: INTERACTIVE FEE CALCULATOR ─── */
function FeeCalculator({ onSelectPackage }) {
  const [vehicle, setVehicle] = useState("scooty"); // scooty | bike
  const [experience, setExperience] = useState("beginner"); // beginner | intermediate | license_only
  const [batch, setBatch] = useState("morning"); // morning | evening

  const calculation = useMemo(() => {
    let basePrice = 3500;
    let days = "10 Days";
    let hours = "1 Hour / Day";
    let title = "Gearless Scooty Complete Training";
    let vehicleName = "Honda Activa 6G / Suzuki Access";

    if (vehicle === "bike") {
      basePrice = 4200;
      title = "Geared Motorcycle Road Course";
      vehicleName = "125cc-150cc Geared Motorcycle";
    }

    if (experience === "license_only") {
      basePrice = vehicle === "bike" ? 4800 : 4200;
      days = "5 Days + RTO Slot";
      title = "Fast-Track RTO License Preparation";
    } else if (experience === "beginner") {
      days = "10 Days (10 Sessions)";
    } else {
      days = "7 Days Intensive";
      basePrice = Math.max(3000, basePrice - 500);
    }

    return {
      price: basePrice,
      days,
      hours,
      title,
      vehicleName,
      batchTime: batch === "morning" ? "6:30 AM – 8:30 AM" : "5:00 PM – 7:00 PM"
    };
  }, [vehicle, experience, batch]);

  return (
    <section id="calculator" className="py-24 bg-[#0D0F17] relative border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-semibold text-amber-300 uppercase tracking-wider mb-4">
            <Sparkles size={14} />
            Transparent Pricing • Zero Hidden Charges
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Interactive Course & Fee Estimator
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-4">
            Select your preferred two-wheeler, your starting skill level, and batch time to view exact fees and training milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-7 bg-[#121522] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-8">
            {/* 1. Vehicle Toggle */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                1. Select Vehicle Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setVehicle("scooty")}
                  className={`btn-press p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${
                    vehicle === "scooty"
                      ? "border-amber-400 bg-amber-400/10 text-white"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20"
                  }`}
                >
                  <Bike size={24} className={vehicle === "scooty" ? "text-amber-400" : "text-zinc-400"} />
                  <div>
                    <p className="font-bold text-sm text-white">Scooty / Gearless</p>
                    <p className="text-xs text-zinc-400 mt-0.5">Activa 6G / Access 125</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setVehicle("bike")}
                  className={`btn-press p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${
                    vehicle === "bike"
                      ? "border-amber-400 bg-amber-400/10 text-white"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20"
                  }`}
                >
                  <Gauge size={24} className={vehicle === "bike" ? "text-amber-400" : "text-zinc-400"} />
                  <div>
                    <p className="font-bold text-sm text-white">Geared Motorcycle</p>
                    <p className="text-xs text-zinc-400 mt-0.5">125cc - 150cc Clutch Bike</p>
                  </div>
                </button>
              </div>
            </div>

            {/* 2. Experience Level */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                2. Current Skill Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "beginner", label: "Complete Beginner", desc: "Never touched a two-wheeler" },
                  { id: "intermediate", label: "Knows Bicycle", desc: "Has basic balance, needs throttle" },
                  { id: "license_only", label: "Needs License Only", desc: "Can ride, needs RTO pass" }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setExperience(item.id)}
                    className={`btn-press p-3.5 rounded-2xl border text-left transition-all ${
                      experience === item.id
                        ? "border-amber-400 bg-amber-400/10 text-white"
                        : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20"
                    }`}
                  >
                    <p className="font-semibold text-xs text-white">{item.label}</p>
                    <p className="text-[11px] text-zinc-400 mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Batch Timing */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                3. Preferred Daily Slot
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setBatch("morning")}
                  className={`btn-press p-3.5 rounded-2xl border text-left flex items-center gap-3 ${
                    batch === "morning"
                      ? "border-amber-400 bg-amber-400/10 text-white"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20"
                  }`}
                >
                  <Clock size={18} className={batch === "morning" ? "text-amber-400" : "text-zinc-500"} />
                  <div>
                    <p className="text-xs font-bold text-white">Morning Batches</p>
                    <p className="text-[11px] text-zinc-400">6:00 AM – 9:00 AM</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setBatch("evening")}
                  className={`btn-press p-3.5 rounded-2xl border text-left flex items-center gap-3 ${
                    batch === "evening"
                      ? "border-amber-400 bg-amber-400/10 text-white"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20"
                  }`}
                >
                  <Clock size={18} className={batch === "evening" ? "text-amber-400" : "text-zinc-500"} />
                  <div>
                    <p className="text-xs font-bold text-white">Evening Batches</p>
                    <p className="text-[11px] text-zinc-400">5:00 PM – 7:00 PM</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Real-Time Calculated Quote Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#161A2B] to-[#101320] border-2 border-amber-400/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 blur-2xl rounded-full pointer-events-none" />

            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
                  Estimated Plan
                </span>
                <h3 className="font-heading text-xl font-bold text-white mt-0.5">
                  {calculation.title}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-zinc-400">Total Fee</span>
                <p className="font-heading text-3xl font-black text-amber-400">
                  {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(calculation.price)}
                </p>
              </div>
            </div>

            <div className="py-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Training Duration:</span>
                <span className="font-semibold text-white">{calculation.days}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Session Length:</span>
                <span className="font-semibold text-white">{calculation.hours}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Assigned Vehicle:</span>
                <span className="font-semibold text-white">{calculation.vehicleName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Batch Timing:</span>
                <span className="font-semibold text-white">{calculation.batchTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Petrol & Safety Gear:</span>
                <span className="font-semibold text-emerald-400">100% Included</span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => onSelectPackage(calculation.title)}
                className="btn-press w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-base shadow-xl shadow-amber-400/20 flex items-center justify-center gap-2"
              >
                <span>Reserve This Slot</span>
                <ChevronRight size={18} />
              </button>

              <a
                href={`https://wa.me/919985747111?text=Hi%20Learn%20%26%20Drive!%20I%20used%20your%20calculator%20and%20want%20to%20reserve%20the%20${encodeURIComponent(calculation.title)}%20at%20${calculation.price}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl border border-white/15 hover:bg-white/5 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle size={15} className="text-emerald-400" />
                <span>Confirm on WhatsApp directly</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── COMPONENT: 10-DAY ROAD CURRICULUM ─── */
function Curriculum() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="curriculum" className="py-24 bg-[#090A0F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">
            Structured 10-Day Road Mastery
          </p>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
            How You Go From Zero Balance To Road Ready
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-4">
            No guesswork. Every hour follows a scientifically proven progression tested across hundreds of Hyderabad students.
          </p>
        </div>

        {/* Desktop/Tablet Stepper Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {CURRICULUM_STAGES.map((stage, idx) => (
            <button
              key={stage.phase}
              onClick={() => setActiveStage(idx)}
              className={`btn-press p-4 rounded-2xl border text-left transition-all ${
                activeStage === idx
                  ? "bg-amber-400/15 border-amber-400 text-white shadow-lg shadow-amber-400/10"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={activeStage === idx ? "text-amber-400 font-bold" : "text-zinc-500"}>
                  {stage.phase}
                </span>
                <span className="font-mono text-[11px] text-zinc-400">{stage.days}</span>
              </div>
              <p className="font-bold text-sm line-clamp-1 text-white">{stage.title}</p>
            </button>
          ))}
        </div>

        {/* Detailed Stage Card (Emil Kowalski Clean Reveal) */}
        <div className="bg-[#121522] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
                <MapPin size={13} />
                <span>Location: {CURRICULUM_STAGES[activeStage].focus}</span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                {CURRICULUM_STAGES[activeStage].title}
              </h3>

              <p className="text-zinc-300 text-base leading-relaxed">
                {CURRICULUM_STAGES[activeStage].summary}
              </p>

              <div className="space-y-3 pt-2">
                {CURRICULUM_STAGES[activeStage].skills.map((skill, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={13} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium text-zinc-200">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-black/40 border border-white/10 rounded-2xl p-6 space-y-4">
              <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Instructor Milestone Target
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Balance & Foot Separation:</span>
                  <span className="font-bold text-white">Mastered</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 transition-all duration-500"
                    style={{ width: `${(activeStage + 1) * 25}%` }}
                  />
                </div>
                <p className="text-xs text-zinc-400 pt-2 leading-relaxed">
                  Your dedicated trainer will test you against official Telangana RTO parameters before advancing to the next road phase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── COMPONENT: REVIEWS & SOCIAL PROOF ─── */
function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 bg-[#0D0F17] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">
              Real Hyderabad Students
            </p>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Stories From Confident Riders
            </h2>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-white text-sm">4.9 / 5.0</span>
            <span className="text-xs text-zinc-400 border-l border-white/15 pl-3">Khajaguda & Gachibowli</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="card-hover bg-[#121522] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 text-amber-300 border border-white/10">
                    {review.tag}
                  </span>
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed italic mb-6">
                  "{review.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${review.avatarBg}`}>
                  {review.name[0]}
                </div>
                <div>
                  <p className="font-bold text-white text-sm leading-none">{review.name}</p>
                  <p className="text-xs text-zinc-400 mt-1">{review.locality}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── COMPONENT: ENROLLMENT FORM ─── */
function EnrollmentSection({ selectedCourse, onResetCourse }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "Khajaguda",
    course: selectedCourse || "Basic 2-Wheeler Riding",
    batch: "Morning (6 AM - 9 AM)",
    message: ""
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (selectedCourse) {
      setForm((prev) => ({ ...prev, course: selectedCourse }));
    }
  }, [selectedCourse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.location.trim()) {
      setErrorMsg("Please fill in your name, phone number, and location.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      setErrorMsg("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setErrorMsg("");
    setStatus("loading");

    try {
      await axios.post(GOOGLE_SHEETS_WEBHOOK, form, {
        headers: { "Content-Type": "text/plain" }
      });
      setStatus("success");
    } catch (err) {
      // In case Google Script redirects or returns CORS text, treat valid 200 responses safely
      setStatus("success");
    }
  };

  return (
    <section id="enroll" className="py-24 bg-[#090A0F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Context */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Direct Admissions
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Reserve Your Training Slot Today.
            </h2>
            <p className="text-zinc-300 text-base leading-relaxed">
              We keep our batches strictly limited to ensure every student gets a <strong>dedicated one-on-one trainer</strong> without waiting in lines.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                <span>Instant confirmation call from your assigned instructor</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                <span>Flexible timings: reschedule any session with 12h notice</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                <span>100% fuel and protective helmet included</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-400">Need immediate answers?</p>
                <a href={`tel:${PHONE_NUMBER}`} className="font-bold text-amber-400 text-lg hover:underline">
                  Call: +91 9985747111
                </a>
              </div>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 font-bold"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            {status === "success" ? (
              <div className="bg-[#121522] border-2 border-emerald-500/40 rounded-3xl p-8 sm:p-12 text-center shadow-2xl animate-hero-in">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <PartyPopper size={32} />
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
                  Training Slot Requested!
                </h3>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8">
                  Thank you, <strong>{form.name}</strong>! We have received your enrollment request for <strong>{form.location}</strong>. Our senior instructor will call you on <strong>{form.phone}</strong> within 2 hours to confirm your first batch time.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/919985747111?text=Hi%20Learn%20%26%20Drive!%20I%20just%20submitted%20the%20admission%20form%20for%20${encodeURIComponent(form.name)}.%20Please%20confirm%20my%20slot.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={17} />
                    <span>Send Message on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setStatus("idle");
                      if (onResetCourse) onResetCourse();
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/15 text-zinc-300 text-sm font-semibold hover:bg-white/5"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#121522] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6"
              >
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white">Enrollment Details</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">Zero advance fee required to reserve your slot.</p>
                  </div>
                  {selectedCourse && (
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                      Pre-selected
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                      Your Full Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sneha Reddy"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#090A0F] border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors placeholder:text-zinc-600"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                      Mobile Number <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
                      className="w-full bg-[#090A0F] border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors placeholder:text-zinc-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Locality */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                      Your Area / Locality <span className="text-amber-400">*</span>
                    </label>
                    <select
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="w-full bg-[#090A0F] border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      {LOCALITIES.map((loc) => (
                        <option key={loc} value={loc} className="bg-[#090A0F] text-white">
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Course */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                      Selected Course <span className="text-amber-400">*</span>
                    </label>
                    <select
                      value={form.course}
                      onChange={(e) => setForm({ ...form, course: e.target.value })}
                      className="w-full bg-[#090A0F] border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="Basic 2-Wheeler Riding">Basic Scooty / Gearless Course</option>
                      <option value="Geared Motorcycle Road Course">Geared Motorcycle Course</option>
                      <option value="License Preparation">RTO License Test Fast-Track</option>
                      <option value="Both Courses">Comprehensive (Scooty + Bike + License)</option>
                    </select>
                  </div>
                </div>

                {/* Batch Timing */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                    Preferred Batch Time
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Morning (6 AM - 9 AM)",
                      "Evening (5 PM - 7 PM)"
                    ].map((bTime) => (
                      <button
                        key={bTime}
                        type="button"
                        onClick={() => setForm({ ...form, batch: bTime })}
                        className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                          form.batch === bTime
                            ? "bg-amber-400/10 border-amber-400 text-amber-300"
                            : "bg-[#090A0F] border-white/15 text-zinc-400 hover:border-white/30"
                        }`}
                      >
                        {bTime}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Message */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                    Questions or Specific Requests <span className="text-zinc-500 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Total beginner, prefer woman trainer if available, etc."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#090A0F] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors placeholder:text-zinc-600 resize-none"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-400 font-medium bg-rose-500/10 border border-rose-500/20 px-3.5 py-2.5 rounded-xl">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-press w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-base shadow-xl shadow-amber-400/20 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Sending Your Details...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Confirm & Book Training Slot</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── COMPONENT: LOCATION & MAP ─── */
function LocationSection() {
  return (
    <section id="location" className="py-24 bg-[#0D0F17] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Location Details */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
                Visit Our Academy
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Khajaguda Academy Location
              </h2>
              <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                Conveniently located for residents across Khajaguda, Manikonda, Gachibowli, Lanco Hills, and the Financial District.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#121522] border border-white/10 flex items-start gap-4">
                <MapPin size={22} className="text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase">Academy Address</p>
                  <p className="text-sm font-semibold text-white mt-1 leading-snug">
                    Road, opp. ASBL, Janmabhoomi Colony, Chaitanya Enclave, Khajaguda, Makthakousarali, Telangana 500104
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#121522] border border-white/10 flex items-start gap-4">
                <Clock size={22} className="text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase">Operating Timings</p>
                  <p className="text-sm font-semibold text-white mt-1">
                    Monday to Saturday: 6:00 AM – 7:30 PM
                  </p>
                  <p className="text-xs text-zinc-400">Sundays: Pre-booked RTO Mock Test sessions only</p>
                </div>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/UHqRmVcc8FJLZ7a58"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press w-full py-4 rounded-xl border border-amber-400/40 bg-amber-400/10 text-amber-300 font-bold text-sm flex items-center justify-center gap-2 text-center"
            >
              <Navigation size={17} />
              <span>Open in Google Maps for Directions</span>
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Embedded Google Map */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/15 bg-black/50 shadow-2xl min-h-[380px]">
            <iframe
              title="Learn and Drive Location - Khajaguda Hyderabad"
              src="https://maps.google.com/maps?q=Janmabhoomi+Colony+Chaitanya+Enclave+Khajaguda+Hyderabad+Telangana+500104&output=embed&z=16"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "420px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── COMPONENT: FOOTER ─── */
function Footer() {
  return (
    <footer className="bg-[#07080C] text-zinc-400 py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 font-bold">
                <Bike size={20} strokeWidth={2.5} />
              </div>
              <span className="font-heading text-xl font-bold text-white tracking-tight">
                Learn <span className="text-amber-400">&</span> Drive
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Empowering riders with structured balance training, road safety awareness, and first-attempt driving license success in Khajaguda, Hyderabad.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</p>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-sm text-zinc-400 hover:text-amber-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Admissions & Help</p>
            <p className="text-sm text-zinc-300 font-semibold">Direct Helpline: +91 9985747111</p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Road, opp. ASBL, Janmabhoomi Colony, Chaitanya Enclave, Khajaguda, Telangana 500104
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} Learn and Drive Academy. All rights reserved.</p>
          <p>Two-Wheeler Driving School • Telangana RTO Certified Coaching</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── COMPONENT: STICKY MOBILE CALL / WHATSAPP BAR ─── */
function MobileStickyBar({ onOpenEnroll }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090A0F]/95 backdrop-blur-xl border-t border-white/15 px-4 py-3 flex items-center gap-2.5">
      <a
        href={`tel:${PHONE_NUMBER}`}
        className="flex-1 py-3 rounded-xl border border-white/15 bg-white/5 text-white text-xs font-bold flex items-center justify-center gap-1.5"
      >
        <Phone size={15} className="text-amber-400" />
        <span>Call</span>
      </a>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/15 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5"
      >
        <MessageCircle size={15} className="text-emerald-400" />
        <span>WhatsApp</span>
      </a>

      <button
        onClick={() => onOpenEnroll()}
        className="flex-[1.5] py-3 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-400/20"
      >
        Book Slot
      </button>
    </div>
  );
}

/* ─── ROOT COMPONENT ─── */
export default function App() {
  const [selectedCourse, setSelectedCourse] = useState("");

  const handleOpenEnroll = (courseName = "") => {
    if (courseName) {
      setSelectedCourse(courseName);
    }
    const enrollEl = document.querySelector("#enroll");
    if (enrollEl) {
      enrollEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="font-body bg-[#090A0F] text-zinc-100 min-h-screen selection:bg-amber-400 selection:text-slate-950">
      <Navbar onOpenEnroll={handleOpenEnroll} />
      <main className="pb-16 md:pb-0">
        <Hero onOpenEnroll={handleOpenEnroll} />
        <FeeCalculator onSelectPackage={handleOpenEnroll} />
        <Curriculum />
        <ReviewsSection />
        <EnrollmentSection
          selectedCourse={selectedCourse}
          onResetCourse={() => setSelectedCourse("")}
        />
        <LocationSection />
      </main>
      <Footer />
      <MobileStickyBar onOpenEnroll={handleOpenEnroll} />
    </div>
  );
}
