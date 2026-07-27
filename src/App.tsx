/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { 
  Building2, 
  Home, 
  DraftingCompass, 
  Trophy, 
  Compass, 
  ArrowRight, 
  Menu, 
  X, 
  Mail, 
  Phone, 
  MapPin,
  ChevronDown,
  Globe,
  Zap,
  ShieldCheck,
  Cpu,
  Users,
  Target,
  BarChart3,
  Video,
  UserCheck,
  Eye,
  Calculator,
  Download,
  Sun,
  Sparkles,
  LogOut,
  LogIn,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Info,
  Plug,
  Layers,
  Blocks,
  Droplet,
  Clock,
  ShieldAlert,
  Grid,
  ChevronRight
} from 'lucide-react';

import {
  signInWithGoogle,
  logoutUser,
  onAuthChange,
  saveInquiry,
  saveQuote,
  saveVastuRequest,
  isMockFirebase
} from './firebase';
import { Navbar } from './components/Navbar';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';

// Lazy-loaded Subpage & Heavy Component Imports
const OurStory = lazy(() => import('./pages/about/OurStory'));
const WhyChooseUs = lazy(() => import('./pages/about/WhyChooseUs'));
const Accreditations = lazy(() => import('./pages/about/Accreditations'));
const RealEstate = lazy(() => import('./pages/sectors/RealEstate'));
const HistoricalPlaces = lazy(() => import('./pages/sectors/HistoricalPlaces'));
const SportsCommunity = lazy(() => import('./pages/sectors/SportsCommunity'));
const Featured = lazy(() => import('./pages/projects/Featured'));
const Ongoing = lazy(() => import('./pages/projects/Ongoing'));
const Completed = lazy(() => import('./pages/projects/Completed'));
const Leadership = lazy(() => import('./pages/team/Leadership'));
const DepartmentHeads = lazy(() => import('./pages/team/DepartmentHeads'));
const JoinUs = lazy(() => import('./pages/team/JoinUs'));
const SectorHub = lazy(() => import('./components/SectorHub'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
    <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Loading...</span>
  </div>
);

// --- Constants & Types ---

const STATS = [
  { label: 'Excellence Years', value: '15+', icon: Globe },
  { label: 'Projects Completed', value: '250+', icon: Building2 },
  { label: 'Client Satisfaction', value: '98%', icon: Users },
  { label: 'Sq Ft Constructed', value: '12M+', icon: BarChart3 },
];

const PROCESS_STEPS = [
  {
    title: 'Consultation',
    desc: 'Deep dive into requirements, site analysis, and feasibility studies.',
    icon: Target
  },
  {
    title: 'Conceptualization',
    desc: 'Architectural blueprints and Vastu-compliant spatial planning.',
    icon: DraftingCompass
  },
  {
    title: 'Development',
    desc: 'Precision engineering and sustainable construction execution.',
    icon: Cpu
  },
  {
    title: 'Handover',
    desc: 'Quality assurance checks and final delivery of masterworks.',
    icon: ShieldCheck
  }
];

const VALUES = [
  {
    title: 'Innovation First',
    desc: 'We integrate cutting-edge technology and materials in every build.',
    icon: Zap
  },
  {
    title: 'Safety & Compliance',
    desc: 'Zero-compromise on structural integrity and safety standards.',
    icon: ShieldCheck
  },
  {
    title: 'Sustainability',
    desc: 'Eco-conscious designs that minimize environmental footprint.',
    icon: Globe
  },
  {
    title: 'Client Centricity',
    desc: 'Your vision is our blueprint. Transparent and collaborative process.',
    icon: Users
  
  }
];

const BRANDS = [
  { name: "Jai Club", logo: "https://www.jaipurclub.in/images/logo.png" },
  { name: "Mahima Group", logo: "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/logo-1-1.png" },
  { name: "SNG Group", logo: "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/logo-2.png" },
  { name: "Patrika Rajasthan", logo: "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/logo-3.png" },
  { name: "Wish Empire", logo: "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/logo-4.png" },
];

const TRANSPARENCY_FEATURES = [
  {
    title: 'Dedicated Manager',
    desc: 'Single point of contact for seamless communication and accountability.',
    icon: UserCheck
  },
  {
    title: '24/7 Surveillance',
    desc: 'Live camera access to your project site from anywhere in the world.',
    icon: Video
  },
  {
    title: 'Real-time Tracking',
    desc: 'Daily progress reports with high-resolution imagery and logs.',
    icon: Eye
  }
];

// --- Sub-components ---

const Counter = ({ value, suffix = "" }: { value: string, suffix?: string }) => {
  const numericValue = parseInt(value);
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || isNaN(numericValue)) return;
    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 1800;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Smooth ease-out cubic
      
      setCount(Math.floor(easedProgress * numericValue));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(numericValue);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, numericValue]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

const BrandTickerItem = ({ brand }: { brand: { name: string; logo: string }; key?: any }) => {
  const [imageError, setImageError] = useState(false);

  const initials = brand.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 3);

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-12 group/item cursor-default">
      <div className="h-14 w-32 flex items-center justify-center relative">
        {!imageError ? (
          <img 
            src={brand.logo} 
            alt={brand.name} 
            loading="lazy"
            decoding="async"
            className="h-full max-w-full object-contain filter grayscale opacity-40 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-700 hover:scale-110"
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 border border-zinc-200/85 rounded-xl shadow-sm group-hover/item:border-teal-300 group-hover/item:bg-teal-50/40 transition-all duration-500"
          >
            <div className="w-5 h-5 rounded-lg bg-teal-500 text-white font-sans font-black flex items-center justify-center text-[9px] uppercase tracking-tighter shadow-sm">
              {initials}
            </div>
            <span className="text-zinc-700 font-sans font-bold text-[10px] tracking-wider uppercase whitespace-nowrap">
              {brand.name}
            </span>
          </motion.div>
        )}
      </div>
      <span className="text-zinc-650 text-[10px] font-black tracking-[0.25em] uppercase group-hover/item:text-teal-600 transition-colors">
        {brand.name}
      </span>
    </div>
  );
};

const BrandsTicker = () => {
  return (
    <div className="py-20 bg-white border-y border-zinc-100 overflow-hidden whitespace-nowrap relative group">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex items-center gap-4">
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Prestigious Collaborations</h2>
        <div className="h-[1px] flex-grow bg-zinc-100" />
      </div>
      
      <div className="absolute left-0 top-0 w-48 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 w-48 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />
      
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="inline-block"
      >
        <div className="flex gap-24 items-center px-12">
          {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
            <BrandTickerItem key={i} brand={brand} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const PROJECTS = [
  { 
    title: 'Pt. Deen Dayal Upadhyay Hospital (300 Bedded)', 
    category: 'Hospital', 
    image: 'https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/Update_the_hospital_building_facade_202606161324.jpeg',
    location: 'Jaipur, RJ',
    Cost: '55 Cr'
  },
  { 
    title: 'SNG’s OZONE', 
    category: 'Residential', 
    image: 'https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/ozone1large-1-1.jpg',
    location: 'Sirsi Road, Jaipur',
    area: '1.8 acres'
  },
  { 
    title: 'RAJASTHAN PATRIKA', 
    category: 'Commercial', 
    image: 'https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/Picture1.png',
    location: 'Jhalana, Jaipur',
    Cost: '11 Cr'
  },
  { 
    title: 'Jaipur Club', 
    category: 'Commercial', 
    image: 'https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/1713608977IMG-20240320-WA0007.jpg',
    location: 'Jaipur',
    area: '40,000+ Sq Ft'
  },
  { 
    title: 'SMS Stadium', 
    category: 'Sports', 
    image: 'https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/01JP45MTBHKR09R5RW6P1VWK0N-w1024.jpg',
    location: 'Japiur, RJ',
    Project: 'sports complex'
  },
  { 
    title: 'Restoration of Amber Palace', 
    category: 'Historical', 
    image: 'https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/1687932017.jpg',
    location: 'Amber, Jaipur',
    Project: 'CONSERVATION, RESTORATION, PRESERVATION, MAINTENANCE'
  },
];

const QualitySection = () => {
  const standards = [
    { title: 'ISO 9001:2015', desc: 'Quality Management Systems' },
    { title: 'ISO 45001:2018', desc: 'Occupational Health & Safety' },
    { title: 'ISO 14001:2015', desc: 'Environmental Management' },
    { title: 'IGBC Lead', desc: 'Green Building Certifications' },
  ];

  return (
    <section className="py-12 bg-zinc-50 border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 grayscale opacity-40">
          {standards.map((s) => (
            <div key={s.title} className="text-center group hover:opacity-100 transition-opacity">
              <p className="text-xs font-black tracking-widest uppercase text-zinc-900">{s.title}</p>
              <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-tighter mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SERVICES_LIST = [
  "Architectural Design", "Structural Engineering", "Vastu Consultancy", "Interior Concept", "Project Management", "Construction Logistics", "Smart Home Integration", "Sustainable Building"
];

const SECTORS = [
  {
    id: 'commercial',
    title: 'Commercial',
    description: 'Modern corporate spaces and retail complexes designed for the future of business.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    icon: Building2
  },
  {
    id: 'residential',
    title: 'Residential',
    description: 'Ultra-luxury living spaces that blend comfort with avant-garde architectural design.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    icon: Home
  },
  {
    id: 'architectural',
    title: 'Architectural',
    description: 'Precision engineering meets visionary design in our structural masterpieces.',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop',
    icon: DraftingCompass
  },
  {
    id: 'sports',
    title: 'Sports Infratech',
    description: 'World-class sporting arenas and training facilities built to international standards.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2076&auto=format&fit=crop',
    icon: Trophy
  }
];

const OFFICIALS = [
  {
    name: 'Er Akhilesh Kumar Mittal',
    role: 'Director',
    image: 'https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/WhatsApp-Image-2026-02-21-at-6.17.51-PM-2-1.png',
    bio: "Er Akhilesh Kumar Mittal is a Director at Sanchar Infratech and a qualified Civil Engineer holding B.Tech and M.Tech degrees, complemented by expertise as an Astro Vastu Planner. He combines technical engineering precision with Vastu-compliant design principles, overseeing corporate strategy, project auditing, and financial compliance while ensuring structural integrity and holistic planning across all infrastructure developments.",
    experience: '25+ Years in Civil Engineering, Corporate Strategy & Astro Vastu Planning',
    focus: ['Civil Engineering', 'Astro Vastu Planning', 'Corporate Strategy', 'Financial Auditing'],
  
  },
  {
    name: 'Dr Pushpendra Kumar Mittal',
    role: 'Director',
    image: 'https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/WhatsApp-Image-2026-02-21-at-6.17.51-PM-1.png',
    bio: "Dr Pushpendra Kumar Mittal is a Director at Sanchar Infratech and a distinguished Urban Planner and Economist. He brings a unique blend of macro-level urban planning expertise and economic analysis to steer structural design and operations, shaping the strategic vision and premium standards of Sanchar's infrastructure developments.",
    experience: '18+ Years in Urban Planning, Economics & Infrastructure Leadership',
    focus: ['Urban Planning', 'Economic Strategy', 'Infrastructure Design', 'Project Operations'],
    
  },
  {
    name: 'Shri Manohar Kant',
    role: 'Advisor (Retd. IAS)',
    image: 'https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/02/Gemini_Generated_Image_x8zg3x8zg3x8zg3x-1.png',
    bio: "Shri Manohar Kant Ji serves as an Advisor at Sanchar Infratech, bringing the administrative rigor and governance experience of a retired IAS officer. He oversees complex site workflows, scheduling precision, and technical operations across the organization's infrastructure projects",
    experience: '25+ Years in Civil Administration & Construction Oversight',
    focus:['Governance & Compliance', 'On-site Workflow Optimization', 'Vendor Oversight']
  },
  {
    name: ' Mr Tanamaya Mittal',
    role: 'Director',
    image: 'https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/02/Gemini_Generated_Image_g0roc7g0roc7g0ro-1.png',
    bio: "Mr Tanmaya Mittal is a Director at Sanchar Infratech, contributing to the company's strategic growth and infrastructure development initiatives. He plays a key role in driving operational excellence and upholding the organization's commitment to quality and sustainability",
    experience: '5+ Years in Infrastructure Development & Strategic Management',
    focus:['Strategic Growth', 'Infrastructure Development', 'Operational Excellence'],
  }
];

// --- Components ---
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="/hero-bg.jpg"
          alt="Modern Corporate Building"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover opacity-50 mix-blend-luminosity brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/40 via-transparent to-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(159,197,233,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(159,197,233,0.05)_0%,transparent_50%)]" />
      </motion.div>

      {/* Floating Ambient Blur Blobs */}
      <motion.div 
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -50, 40, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none z-0"
      />
      <motion.div 
        animate={{
          x: [0, -80, 50, 0],
          y: [0, 70, -60, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-400/5 rounded-full blur-[130px] pointer-events-none z-0"
      />

      <motion.div style={{ opacity }} className="relative z-10 text-center px-6">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-teal-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-6"
        >
          Defining Global Horizons
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-white text-5xl md:text-9xl font-black tracking-tighter leading-none mb-8 font-sans"
        >
          SANCHAR <br /> 
          <span className="text-white/30 italic font-serif">INFRATECH</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-6"
        >
          <a href="#about" className="group flex items-center gap-2 bg-teal-500 text-white px-8 py-4 rounded-full font-bold tracking-widest uppercase text-xs transition-all hover:scale-105 active:scale-95 shadow-xl shadow-teal-900/20">
            Discover Our Legacy
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-teal-400/30"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const CORE_SERVICES = [
  {
    title: "Architecture",
    desc: "Innovative architectural design solutions for residential, commercial, and institutional projects.",
    icon: DraftingCompass
  },
  {
    title: "Urban Planning",
    desc: "Master planning, township development, and sustainable urban infrastructure.",
    icon: Target
  },
  {
    title: "PMC Services",
    desc: "End-to-end project planning, monitoring, and execution management.",
    icon: ShieldCheck
  },
  {
    title: "Turnkey Construction",
    desc: "Complete design-to-delivery construction solutions under one roof.",
    icon: Building2
  },
  {
    title: "Structural Engineering",
    desc: "Safe, efficient, and code-compliant structural design for every project.",
    icon: Cpu
  },
  {
    title: "MEP Engineering",
    desc: "Integrated mechanical, electrical, plumbing, and utility systems.",
    icon: Zap
  },
  {
    title: "Interior Design",
    desc: "Functional, modern, and aesthetically crafted interior spaces.",
    icon: Layers
  },
  {
    title: "Construction Supervision",
    desc: "Quality control, site management, and timely project execution.",
    icon: UserCheck
  },
  {
    title: "Quantity Surveying",
    desc: "Accurate estimation, cost planning, and contract administration.",
    icon: Calculator
  },
  {
    title: "Infrastructure Development",
    desc: "Roads, utilities, public infrastructure, and urban development projects.",
    icon: Compass
  },
  {
    title: "Environmental & Ecology",
    desc: "Sustainable environmental planning and ecological assessments.",
    icon: Globe
  },
  {
    title: "Heritage Conservation",
    desc: "Restoration, conservation, and adaptive reuse of heritage structures.",
    icon: Trophy
  },
  {
    title: "Landscape Design",
    desc: "Outdoor environments that blend aesthetics with functionality.",
    icon: Sparkles
  },
  {
    title: "Survey & DPR",
    desc: "Topographical surveys, feasibility studies, and comprehensive DPR preparation.",
    icon: Eye
  }
];

const ServicesShowcase = () => {
  return (
    <section className="py-20 bg-zinc-50 border-b border-zinc-100 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-600 bg-teal-50 border border-teal-100 px-4 py-1.5 rounded-full inline-block mb-4">
            Our Core Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight font-sans">
            Comprehensive Infrastructure & Engineering Services
          </h2>
          <div className="w-16 h-1 bg-teal-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-white p-7 rounded-2xl border border-zinc-100 border-b-4 border-b-teal-500 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group cursor-default"
              >
                <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-5 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300 transform group-hover:scale-110 shadow-sm">
                  <Icon size={26} strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-bold text-zinc-900 group-hover:text-teal-600 transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  {service.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const BioSection = () => {
  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-gradient-to-br from-teal-50/40 via-slate-50 to-teal-50/20 relative overflow-hidden border-b border-zinc-200/60">
      {/* Background Architectural Blueprint Dot Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:20px_20px] sm:[background-size:28px_28px] opacity-[0.12] pointer-events-none" />

      {/* Floating Ambient Glowing Blobs */}
      <div className="absolute top-1/3 -left-20 w-72 h-72 sm:w-[500px] sm:h-[500px] bg-teal-400/15 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-72 h-72 sm:w-[450px] sm:h-[450px] bg-sky-400/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-white/85 sm:bg-white/70 backdrop-blur-2xl border border-white/90 p-5 sm:p-12 lg:p-16 rounded-[2rem] sm:rounded-[3rem] shadow-[0_15px_40px_-15px_rgba(13,148,136,0.08)] relative overflow-hidden">
          
          {/* Subtle Top Accent Gradient Stripe */}
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-teal-500 via-emerald-400 to-sky-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Image with City Skyline Grid Backdrop */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-6 relative"
            >
              {/* Background Architectural Building Grid Graphic */}
              <div className="absolute -inset-3 sm:-inset-6 bg-[repeating-linear-gradient(0deg,transparent,transparent_10px,rgba(13,148,136,0.06)_10px,rgba(13,148,136,0.06)_11px),repeating-linear-gradient(90deg,transparent,transparent_10px,rgba(13,148,136,0.06)_10px,rgba(13,148,136,0.06)_11px)] rounded-[2rem] sm:rounded-[3rem] pointer-events-none" />
              <div className="absolute -left-3 -bottom-3 sm:-left-6 sm:-bottom-6 w-32 h-32 sm:w-48 sm:h-48 bg-teal-100/60 rounded-3xl -z-10 blur-sm" />

              <div className="relative rounded-[1.75rem] sm:rounded-[2.5rem] overflow-hidden border border-zinc-200/80 shadow-xl bg-white aspect-[16/10] sm:aspect-[4/3] group">
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop" 
                  alt="Infrastructure Building Excellence" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-transparent to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-md border border-zinc-200/80 px-3.5 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl shadow-xl flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-black uppercase text-zinc-400 tracking-wider">Established</p>
                    <p className="text-xs sm:text-sm font-extrabold text-zinc-900">2001 • 25+ Years Legacy</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Bio Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-6 flex flex-col justify-center text-left"
            >
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-teal-700 bg-teal-50 border border-teal-200/80 px-3.5 py-1.5 rounded-full inline-block w-fit mb-3 sm:mb-6 shadow-sm">
                About Us
              </span>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight mb-4 sm:mb-6 leading-snug sm:leading-tight font-sans">
                Building Excellence <br />
                <span className="text-teal-600 font-serif italic">Since 2001</span>
              </h2>

              <p className="text-zinc-700 text-xs sm:text-base leading-relaxed sm:leading-relaxed mb-4 sm:mb-6 font-normal">
                Established in <strong className="font-bold text-zinc-900">2001</strong>, we are a leading multidisciplinary architecture, engineering, and project management consultancy delivering innovative, sustainable, and high-impact infrastructure solutions. Backed by a team of experienced architects, engineers, planners, and technical experts, we specialize in transforming ideas into landmark projects—from concept and design to execution.
              </p>

              <p className="text-zinc-700 text-xs sm:text-base leading-relaxed sm:leading-relaxed mb-6 sm:mb-8 font-normal">
                With expertise spanning <strong className="font-bold text-zinc-900">architecture, urban planning, structural engineering, environmental consultancy, PMC, turnkey construction, and infrastructure development</strong>, we have successfully delivered projects that combine technical excellence, quality, and long-term value. Our integrated approach, strong industry expertise, and commitment to innovation make us a trusted partner for government, institutional, commercial, and private sector developments.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link 
                  to="/about/our-story" 
                  className="inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-teal-600/20 hover:scale-[1.02] active:scale-95 group text-center"
                >
                  Learn More About Us
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a 
                  href="#connect" 
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-sm text-center"
                >
                  Contact Our Experts
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {STATS.map((stat, idx) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <div className="flex flex-col lg:flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-4xl font-extrabold tracking-tighter text-zinc-900">
                    <Counter 
                      value={stat.value.replace(/[^0-9]/g, '')} 
                      suffix={stat.value.replace(/[0-9]/g, '')} 
                    />
                  </p>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TransparencySection = () => {
  return (
    <section className="py-24 bg-zinc-950 px-6 overflow-hidden relative">
       {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-teal-400/40 text-sm font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
               <span className="w-12 h-[1px] bg-teal-500/20" /> Radical Transparency
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8">
              Watch your vision <br />
              <span className="italic font-light text-teal-200/50 font-serif text-6xl">Take Shape Live.</span>
            </h3>
            <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-lg font-light">
              We eliminate the "Black Box" of construction. With Sanchar Infratech, you possess full visibility over every brick, beam, and finish.
            </p>
            
            <div className="space-y-8">
              {TRANSPARENCY_FEATURES.map((feature, idx) => (
                <div key={feature.title} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-teal-500 group-hover:border-teal-500 transition-all">
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-[10px]">{feature.title}</h4>
                    <p className="text-zinc-500 text-xs leading-relaxed max-w-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative">
             <div className="aspect-video bg-zinc-900 rounded-[40px] overflow-hidden border border-white/10 relative group shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" 
                  alt="Live Site"
                  className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 animate-pulse">
                      <div className="w-3 h-3 bg-red-600 rounded-full animate-ping" />
                    </div>
                </div>
                <div className="absolute top-6 left-6 flex items-center gap-2 bg-red-600/20 backdrop-blur-md px-3 py-1 rounded-full border border-red-600/50">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                  <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Live: Site-047</span>
                </div>
             </div>
             <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-zinc-100 hidden md:block">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-zinc-50 overflow-hidden border border-zinc-200">
                     <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" alt="Manager" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                   </div>
                   <div>
                     <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">On-Site Manager</p>
                     <p className="text-sm font-bold text-zinc-900">Arjun Verma</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const CalculatorSection = ({ user, showToast }: { user: any; showToast: (msg: string, type?: 'success' | 'error') => void }) => {
  const [area, setArea] = useState(1200);
  const [type, setType] = useState('residential');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('steel');
  const [finishPackage, setFinishPackage] = useState('standard');
  const [selectedBrands, setSelectedBrands] = useState<Record<string, number>>({
    steel: 0,
    cement: 0,
    bricks: 0,
    concrete: 0,
    electrical: 0,
    plumbing: 0,
    flooring: 0
  });

  const rates = {
    residential: 2000,
    commercial: 1800,
    industrial: 1200
  };

  const finishPackages = {
    standard: {
      title: 'Standard (Base structural build)',
      rateAdd: 0,
      desc: 'Robust grey brick structure, concrete slabs, load-bearing pillars, and standard plastering.'
    },
    premium: {
      title: 'Premium (Dream home finishes)',
      rateAdd: 800,
      desc: 'Adds designer vitrified tiles, modular kitchen fittings, branded bathroom utilities, and premium wiring.'
    },
    luxury: {
      title: 'Luxury (Ultra-executive villa)',
      rateAdd: 1800,
      desc: 'Adds imported Italian marble/teak floors, smart automation, custom ambient lighting grids, and landscaping.'
    }
  };

  const MATERIALS_LIST = [
    {
      id: 'steel',
      title: 'TMT Steel',
      icon: Layers,
      brands: [
        { name: 'Tata Tiscon', orWith: 'Jindal Panther', type: 'group', priceFactor: 1.165, desc: '₹60 to ₹81 per kg • Premium high-ductility structural rebars' },
        { name: 'Kamdhenu Steel', type: 'single', priceFactor: 1.0, desc: '₹55 to ₹66 per kg • High-strength standard structural steel' },
        { name: 'Rathi TMT', orWith: 'Electrosteel', type: 'group', priceFactor: 0.917, desc: '₹47 to ₹64 per kg • Economy standard steel bundles' }
      ]
    },
    {
      id: 'cement',
      title: 'Cement',
      icon: Blocks,
      brands: [
        { name: 'Ultratech', orWith: 'Ambuja', type: 'group', priceFactor: 1.223, desc: '₹370 – ₹480 per bag • Premium high-adhesion setting cement' },
        { name: 'JK Cement', type: 'single', priceFactor: 1.0, desc: '₹345 – ₹350 per bag • Excellent load-bearing setting' },
        { name: 'Wonder Cement', orWith: 'Shree', type: 'group', priceFactor: 0.95, desc: '₹280 to ₹380 per bag • Reliable fast-drying structural options' },
        { name: 'ACC Cement', type: 'single', priceFactor: 1.043, desc: '₹325 – ₹400 per bag • Standard high-grade aggregate setting' }
      ]
    },
    {
      id: 'bricks',
      title: 'Bricks',
      icon: Blocks,
      brands: [
        { name: 'Red Clay Bricks', orWith: 'Fly Ash Bricks', type: 'group', priceFactor: 1.0, desc: '₹6 to ₹9 per brick • Traditional red clay & eco-friendly brickwork' },
        { name: 'AAC Light Blocks', type: 'single', priceFactor: 1.15, desc: '₹45 to ₹50 per block • Autoclaved aerated concrete lightweight blocks' }
      ]
    },
    {
      id: 'concrete',
      title: 'Mix Concrete',
      icon: Layers,
      brands: [
        { name: 'UltraTech Concrete', orWith: 'ACC ReadyMix', type: 'group', priceFactor: 1.0, desc: '₹4,500 – ₹5,500 per cubic meter • Ready-mix batch concrete' },
        { name: 'Lafarge RMC', type: 'single', priceFactor: 1.12, desc: '₹5,000 to ₹6,200 per cubic meter • Premium pre-graded structural concrete' }
      ]
    },
    {
      id: 'electrical',
      title: 'Electrical',
      icon: Plug,
      brands: [
        { name: 'Polycab', orWith: 'Havells', type: 'group', priceFactor: 0.945, desc: '₹2,500 – ₹3,300 (90 mtr roll) • FR-LSH advanced fire-proof wiring' },
        { name: 'Finolex Wires', type: 'single', priceFactor: 1.0, desc: '₹3,068 (90 mtr roll) • Standard insulated copper wiring coils' },
        { name: 'Anchor', orWith: 'Schneider', type: 'group', priceFactor: 0.912, desc: '₹2,700 – ₹2,900 (90 mtr roll) • High-end switchboards & switches' }
      ]
    },
    {
      id: 'plumbing',
      title: 'Plumbing',
      icon: Droplet,
      brands: [
        { name: 'Astral Pipes', orWith: 'Supreme', type: 'group', priceFactor: 1.10, desc: 'Lead-free heavy-duty CPVC conduits & pipes' },
        { name: 'Ashirvad Pipes', type: 'single', priceFactor: 1.04, desc: 'High-durability water supply layout' },
        { name: 'Prince Pipes', type: 'single', priceFactor: 0.95, desc: 'Durable economy drainage conduits' }
      ]
    },
    {
      id: 'flooring',
      title: 'Flooring',
      icon: Grid,
      brands: [
        { name: 'Kajaria Tiles', orWith: 'Somany', type: 'group', priceFactor: 1.08, desc: 'High-gloss vitrified designer tiles' },
        { name: 'Nitco Tiles', type: 'single', priceFactor: 1.0, desc: 'Textured slip-resistant ceramic boards' },
        { name: 'Premium Teak', type: 'single', priceFactor: 1.25, desc: 'Imported solid teakwood & timber boards' }
      ]
    }
  ];

  // Dynamic calculations based on rates, finish package add-ons, and brand modifiers
  const baseRate = rates[type as keyof typeof rates];
  const packageAdd = finishPackages[finishPackage as keyof typeof finishPackages].rateAdd;
  const rawPerSqftRate = baseRate + packageAdd;

  let brandMultiplier = 1.0;
  Object.entries(selectedBrands).forEach(([catId, brandIdx]) => {
    const category = MATERIALS_LIST.find(m => m.id === catId);
    if (category && category.brands[brandIdx]) {
      brandMultiplier += (category.brands[brandIdx].priceFactor - 1) / 7;
    }
  });

  const finalPerSqftRate = Math.round(rawPerSqftRate * brandMultiplier);
  const estimate = area * finalPerSqftRate;

  const handleQuotation = async () => {
    setLoading(true);
    try {
      const selections: Record<string, string> = {};
      Object.entries(selectedBrands).forEach(([catId, brandIdx]) => {
        const cat = MATERIALS_LIST.find(m => m.id === catId);
        if (cat && cat.brands[brandIdx]) {
          const brand = cat.brands[brandIdx];
          selections[cat.title] = brand.type === 'group' ? `${brand.name} / ${brand.orWith}` : brand.name;
        }
      });

      await saveQuote({
        area,
        type,
        finishPackage: finishPackages[finishPackage as keyof typeof finishPackages].title,
        estimatedRatePerSqft: `₹${finalPerSqftRate}/sqft`,
        estimatedInvestment: `₹${(estimate / 100000).toFixed(2)}L`,
        materialPreferences: JSON.stringify(selections),
        uid: user?.uid
      });
      showToast(`Quotation of ₹${(estimate / 100000).toFixed(2)}L at ₹${finalPerSqftRate}/sqft submitted successfully!`, "success");
    } catch (error) {
      showToast("Failed to submit quotation request. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBrandSelect = (catId: string, index: number) => {
    setSelectedBrands(prev => ({
      ...prev,
      [catId]: index
    }));
  };

  const scrollToCalculator = () => {
    document.getElementById('estimator-calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentCategory = MATERIALS_LIST.find(m => m.id === activeTab) || MATERIALS_LIST[0];

  return (
    <section id="estimator" className="py-28 bg-[#fbfbfa] px-6 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Title & Introduction Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 leading-none">
            Free estimation <br /> for your dream home
          </h2>
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-light mt-6 mb-8 max-w-2xl mx-auto">
            Our smart estimation calculator gives you accurate, instant, and easy-to-understand cost assessments, designed specifically for Jaipur, Rajasthan.
          </p>
          <button 
            onClick={scrollToCalculator}
            className="px-8 py-4 bg-zinc-950 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-zinc-900 transition-all duration-300 shadow-xl shadow-zinc-950/10 cursor-pointer inline-flex items-center gap-2 group"
          >
            Calculate Cost Now 
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Main Interactive Cost Estimator Card Container */}
        <div 
          id="estimator-calculator"
          className="bg-white rounded-[2rem] md:rounded-[3.5rem] p-4 md:p-12 shadow-2xl border border-zinc-200/60 max-w-6xl mx-auto mb-20 scroll-mt-28"
        >
          {/* Top Form Row: Area & Project Type Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-zinc-100 mb-8">
            <div className="lg:col-span-4">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-3 block">1. Select Project Type</label>
              <div className="flex gap-2 p-1 bg-zinc-100 rounded-2xl">
                {Object.keys(rates).map(r => (
                  <button 
                    key={r}
                    onClick={() => setType(r)}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${type === r ? 'bg-white text-zinc-900 shadow-md font-extrabold' : 'text-zinc-500 hover:text-zinc-900'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="flex justify-between items-center mb-3">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">2. Approx Builtup Area</label>
                <span className="text-xs font-black text-zinc-900 bg-zinc-100 px-3 py-1.5 rounded-lg">{area} Sq Ft</span>
              </div>
              <input 
                type="range" 
                min="500" 
                max="30000" 
                step="100"
                value={area}
                onChange={(e) => setArea(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-950"
              />
            </div>
          </div>

          {/* Construction Quality / Finish Package Selector */}
          <div className="pb-8 border-b border-zinc-100 mb-8">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 block">3. Select Finish Quality & Package</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(finishPackages).map(([pkgKey, pkg]) => {
                const isSelected = finishPackage === pkgKey;
                return (
                  <button
                    key={pkgKey}
                    onClick={() => setFinishPackage(pkgKey)}
                    className={`text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${isSelected ? 'bg-zinc-950 text-white border-zinc-950 shadow-lg scale-[1.01]' : 'bg-zinc-50 border-zinc-200 text-zinc-650 hover:border-zinc-350 hover:bg-zinc-50/80'}`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md ${isSelected ? 'bg-zinc-900 text-teal-400 font-extrabold' : 'bg-zinc-200/60 text-zinc-700 font-bold'}`}>
                          {pkg.title.split(' ')[0]}
                        </span>
                        <span className={`text-xs font-black ${isSelected ? 'text-teal-400' : 'text-zinc-950'}`}>
                          {pkg.rateAdd > 0 ? `+₹${pkg.rateAdd}/sqft` : 'Base Rate'}
                        </span>
                      </div>
                      <h4 className={`text-xs font-bold mb-1.5 ${isSelected ? 'text-zinc-100' : 'text-zinc-800'}`}>
                        {pkg.title}
                      </h4>
                      <p className={`text-[11px] leading-relaxed font-light ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                        {pkg.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subheading for Materials Selection */}
          <div className="mb-4">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">4. Customize Materials & Brand Selections</label>
          </div>

          {/* Carousel Category Tabs */}
          <div className="relative mb-8">
            <div className="overflow-x-auto scrollbar-none flex gap-3 pb-3 pr-8">
              {MATERIALS_LIST.map(m => {
                const isActive = activeTab === m.id;
                const TabIcon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => setActiveTab(m.id)}
                    className={`flex-shrink-0 px-6 py-4 rounded-2xl border transition-all duration-300 flex items-center gap-3 relative cursor-pointer ${isActive ? 'bg-zinc-950 text-white border-zinc-950 shadow-lg' : 'bg-zinc-50/50 border-zinc-200 text-zinc-500 hover:border-zinc-350 hover:bg-zinc-50'}`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${isActive ? 'bg-zinc-900 text-teal-400' : 'bg-zinc-200 text-zinc-500'}`}>
                      <TabIcon size={13} />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest">{m.title}</span>
                    
                    {/* Active Checkmark indicator */}
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all text-[8px] ${isActive ? 'bg-emerald-400 text-zinc-950 scale-100 font-bold' : 'bg-zinc-300/60 text-zinc-300 scale-75'}`}>
                      ✓
                    </div>
                  </button>
                );
              })}
            </div>
            {/* Scroll Right Indicator */}
            <div className="absolute right-0 top-0 bottom-3 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none flex items-center justify-end pr-1 text-zinc-400">
              <ChevronRight size={14} className="animate-pulse" />
            </div>
          </div>

          {/* Yellow Select Brand Box Panel */}
          <div className="bg-[#fffdf2] border border-[#f5efc3]/60 rounded-3xl p-6 md:p-8 mb-10">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-900/60">Select Brand ({currentCategory.title})</h4>
              <span className="text-[9px] font-bold text-amber-700 uppercase bg-amber-100/60 px-2.5 py-1 rounded-full">Jaipur Standards</span>
            </div>

            {/* Grid of Indian Brand Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentCategory.brands.map((brand, bIdx) => {
                const isSelected = selectedBrands[currentCategory.id] === bIdx;
                return (
                  <div 
                    key={bIdx}
                    onClick={() => handleBrandSelect(currentCategory.id, bIdx)}
                    className={`bg-white border rounded-[1.5rem] p-5 flex items-center justify-between cursor-pointer transition-all duration-300 shadow-sm ${isSelected ? 'border-zinc-950 ring-1 ring-zinc-950 shadow-md scale-[1.02]' : 'border-zinc-200 hover:border-zinc-350 hover:shadow-md'}`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Product package visual block */}
                      <div className="w-16 h-16 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center relative overflow-hidden shadow-inner">
                        {brand.type === 'group' ? (
                          <div className="text-center flex flex-col justify-center h-full w-full leading-none p-1">
                            <span className="text-[8px] font-black text-zinc-900 uppercase truncate">{brand.name}</span>
                            <span className="text-[7px] text-zinc-400 my-0.5 font-bold uppercase">Or</span>
                            <span className="text-[8px] font-black text-zinc-900 uppercase truncate">{brand.orWith}</span>
                          </div>
                        ) : (
                          <span className="text-[9px] font-black text-zinc-900 uppercase p-1 truncate text-center">{brand.name}</span>
                        )}
                        {/* Decorative background stripes */}
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-zinc-900/5 rotate-45 pointer-events-none" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h5 className="text-zinc-900 font-extrabold text-xs leading-snug">
                          {brand.type === 'group' ? `${brand.name} Or ${brand.orWith}` : brand.name}
                        </h5>
                        <p className="text-zinc-400 text-[9px] mt-1 leading-normal font-light">{brand.desc}</p>
                      </div>
                    </div>

                    {/* Radio Button */}
                    <div className="flex items-center justify-center">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isSelected ? 'border-zinc-950 bg-zinc-950 text-white' : 'border-zinc-300 bg-white'}`}>
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Results Summary Box with Material Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-zinc-900 text-white rounded-[2rem] p-5 md:p-10 shadow-2xl">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-teal-400 border border-zinc-700/50">
                  <Calculator size={18} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">Estimated Project Cost</p>
                  <p className="text-xs text-zinc-400 font-light mt-0.5">Includes standard structural blueprint, labor & selected package finishes</p>
                </div>
              </div>

              {/* Dynamic Materials Bar Breakdown */}
              <div className="space-y-4 pr-0 lg:pr-8">
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase mb-1.5">
                    <span>Steel & Cement Structure</span>
                    <span>₹{((estimate * 0.42) / 100000).toFixed(2)}L (42%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-400 rounded-full" style={{ width: '42%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase mb-1.5">
                    <span>Masonry & Bricks</span>
                    <span>₹{((estimate * 0.18) / 100000).toFixed(2)}L (18%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: '18%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase mb-1.5">
                    <span>Finishing & Woodwork</span>
                    <span>₹{((estimate * 0.22) / 100000).toFixed(2)}L (22%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-400 rounded-full" style={{ width: '22%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase mb-1.5">
                    <span>Plumbing, Wiring & Labor</span>
                    <span>₹{((estimate * 0.18) / 100000).toFixed(2)}L (18%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 rounded-full" style={{ width: '18%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 text-center bg-zinc-950 border border-zinc-800 p-6 md:p-8 rounded-2xl flex flex-col justify-center min-h-[220px]">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">Total Estimated Investment</p>
              <h4 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
                ₹{(estimate / 100000).toFixed(2)}L*
              </h4>
              <p className="text-teal-455 text-[11px] font-extrabold uppercase tracking-widest mb-4">
                Estimated Rate: ₹{finalPerSqftRate} / Sq Ft
              </p>
              <p className="text-zinc-500 text-[10px] mb-8 font-light">*(Pricing fluctuates slightly based on final structural plans)</p>
              
              <button 
                onClick={handleQuotation}
                disabled={loading}
                className="w-full bg-teal-400 text-zinc-950 py-4.5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-teal-350 transition-colors shadow-lg shadow-teal-400/10 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? <Loader2 size={12} className="animate-spin" /> : null}
                Get Detailed Quotation
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Benefits / Features Bar (Matches reference Yellow Badges exactly) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto border-t border-zinc-200/80 pt-16">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-yellow-300 text-zinc-950 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
              <Clock size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-zinc-900 font-extrabold text-sm uppercase tracking-wide">Instant Results</h4>
              <p className="text-zinc-400 text-[11px] font-light mt-1">Get estimates in seconds</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-yellow-300 text-zinc-950 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
              <ShieldAlert size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-zinc-900 font-extrabold text-sm uppercase tracking-wide">100% Free tool</h4>
              <p className="text-zinc-400 text-[11px] font-light mt-1">No paywall applied</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-yellow-300 text-zinc-950 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
              <CheckCircle2 size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-zinc-900 font-extrabold text-sm uppercase tracking-wide">Accurate Data</h4>
              <p className="text-zinc-400 text-[11px] font-light mt-1">Based on real market rates</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
const VastuPopup = ({ user, showToast }: { user: any; showToast: (msg: string, type?: 'success' | 'error' | 'info') => void }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 15000); // Delayed slightly longer
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const handleDownload = async () => {
    if (!email) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    setLoading(true);
    try {
      await saveVastuRequest({
        email,
        uid: user?.uid
      });
      showToast("Vastu Guide request registered! The guide is on its way to your inbox.", "success");
      setShow(false);
    } catch (err) {
      showToast("Failed to register Vastu request. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-8 sm:right-8 z-[100] w-auto sm:w-[350px] bg-zinc-950 rounded-[32px] p-6 sm:p-8 text-white shadow-2xl border border-teal-500/20"
        >
          <button 
            onClick={() => setShow(false)}
            className="absolute top-4 right-4 text-white/40 hover:text-white"
          >
            <X size={18} />
          </button>
          <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-teal-500/30">
            <Compass className="text-white" size={24} />
          </div>
          <h4 className="text-xl font-bold mb-2">Free Vastu Audit</h4>
          <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
            Planning a new space? Get our exclusive "Vastu for Modern Infrastructure" PDF guide for free.
          </p>
          <div className="space-y-3">
             <input 
               type="email" 
               placeholder="Your Email" 
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all font-light" 
             />
             <button 
               onClick={handleDownload}
               disabled={loading}
               className="w-full bg-teal-500 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/20 disabled:opacity-50 cursor-pointer"
             >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />} Download Guide
             </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const tickerServices = [
  { name: "Structural Design", icon: Building2 },
  { name: "Urban Planning", icon: Globe },
  { name: "Vastu Audit", icon: Compass },
  { name: "Interior Concept", icon: Home },
  { name: "Project Management", icon: Target },
  { name: "BIM Modeling", icon: DraftingCompass },
  { name: "Sustainability", icon: Zap },
  { name: "Site Surveillance", icon: Video }
];

const ServicesTicker = () => {
  return (
    <section className="py-24 bg-zinc-950 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-teal-400/40 text-sm font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
          <span className="w-12 h-[1px] bg-teal-500/20" /> Our Expertise
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Broad Spectrum <span className="italic font-serif text-teal-200/50 text-6xl">Services.</span></h3>
      </div>
      
      <div className="flex flex-col gap-6">
        {[0, 1].map((row) => (
          <motion.div 
            key={row}
            animate={{ x: row === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap gap-6"
          >
            {[...tickerServices, ...tickerServices].map((service, i) => (
              <div key={i} className="flex-shrink-0 bg-white/5 border border-white/10 px-10 py-8 rounded-[32px] flex items-center gap-8 min-w-[340px] hover:bg-white/10 hover:border-teal-500/30 transition-all cursor-default group">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/5 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-teal-500 transition-all">
                  <service.icon size={28} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm tracking-widest uppercase">{service.name}</p>
                  <p className="text-teal-400/30 text-[10px] font-medium uppercase tracking-[0.2em] mt-1">Sanchar Excellence</p>
                </div>
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      <div className="absolute left-0 top-0 w-48 h-full bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-48 h-full bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />
    </section>
  );
};

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState('All');
  const categories = ['All', 'Residential', 'Commercial', 'Sports', 'Historical'];
  
  const filteredProjects = activeTab === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeTab);

  return (
    <section id="projects" className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-teal-500 mb-4">Portfolio</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 font-sans">
              Iconic <span className="text-teal-400 italic font-serif">Masterpieces.</span>
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === cat ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20' : 'bg-zinc-50 text-zinc-500 hover:bg-zinc-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div 
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-[40px] cursor-pointer shadow-xl shadow-zinc-100 hover:shadow-teal-100"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 transition-transform">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-teal-300 text-[10px] font-bold uppercase tracking-widest mb-1">{project.category}</p>
                      <h4 className="text-white text-2xl font-bold">{project.title}</h4>
                      <p className="text-white/40 text-[10px] font-medium uppercase tracking-widest mt-2 flex items-center gap-1">
                        <MapPin size={10} /> {project.location}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 aspect-square rounded-[60px] overflow-hidden shadow-2xl shadow-zinc-100"
            >
              <img 
                src="https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-14-2026-03_50_32-PM.png" 
                alt="Architecture"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              /> 
            </motion.div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-zinc-50 rounded-[40px] -z-0 hidden md:block" />
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ paddingLeft: '79px' }}
              className="absolute -top-10 -left-10 bg-teal-500 text-white p-8 rounded-[40px] z-20 hidden md:block shadow-xl shadow-teal-500/20"
            >
              <p className="text-3xl font-black tracking-tighter">15+</p>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Years of Legacy</p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-teal-500 text-sm font-bold tracking-[0.2em] uppercase mb-4">Our Essence</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 leading-tight mb-8 font-sans">
              Building the <span className="text-teal-400 italic font-serif">Incredible</span> with Absolute Precision.
            </h3>
            <p className="text-zinc-500 text-lg leading-relaxed mb-8 font-light">
              At Sanchar Infratech, we don't just build structures; we create landmarks that stand the test of time. Our philosophy integrates futuristic architectural trends with robust structural engineering.
            </p>
            <div className="space-y-6 mb-10">
              {[
                { title: 'Mission', desc: 'To redefine urban landscapes through innovative and sustainable infrastructure.' },
                { title: 'Vision', desc: 'To be the global benchmark for excellence in multi-disciplinary infratech.' }
              ].map(item => (
                <div key={item.title}>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-600 mb-1">{item.title}</p>
                  <p className="text-zinc-500 text-sm font-light">{item.desc}</p>
                </div>
              ))}
            </div>
            <button className="flex items-center gap-2 text-teal-600 font-bold uppercase tracking-widest text-xs border-b-2 border-teal-600 pb-1 hover:gap-4 transition-all hover:text-teal-700 hover:border-teal-700">
              Our Detailed Profile <ArrowRight size={14} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  return (
    <section id="process" className="py-24 bg-zinc-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-teal-500 mb-4">How we work</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900">
            The Project <span className="text-teal-400 italic font-serif">Lifecycle</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div 
              key={step.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white p-10 rounded-[40px] border border-zinc-100 hover:shadow-xl hover:shadow-teal-100/20 transition-all group overflow-hidden"
            >
              <div className="absolute top-8 right-8 text-6xl font-black text-zinc-50 opacity-0 group-hover:opacity-100 transition-opacity">
                0{idx + 1}
              </div>
              <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-6 group-hover:bg-teal-500 group-hover:text-white transition-all">
                <step.icon size={28} />
              </div>
              <h4 className="text-xl font-bold text-zinc-900 mb-3">{step.title}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed font-light">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ValuesSection = () => {
  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-teal-600 mb-4">Differentiators</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 font-sans">
            Why Leaders Choose <br /> <span className="text-teal-400 italic font-serif">Sanchar Infratech.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[800px]">
          {/* Large Featured Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 bg-zinc-950 rounded-[40px] p-12 text-white flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="relative z-10">
              <Zap className="w-12 h-12 mb-8 text-teal-400/50" />
              <h4 className="text-3xl font-bold mb-4">Innovation First</h4>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-sm font-light">
                Integrating cutting-edge technology and materials in every build to ensure longevity and efficiency.
              </p>
            </div>
            <div className="absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-110 pointer-events-none">
               <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" alt="Innovation" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="relative z-10 pt-12">
               <div className="flex gap-2">
                 <span className="px-3 py-1 bg-teal-500/10 rounded-full text-[10px] font-bold uppercase tracking-widest border border-teal-500/20">BIM Modeling</span>
                 <span className="px-3 py-1 bg-teal-500/10 rounded-full text-[10px] font-bold uppercase tracking-widest border border-teal-500/20">Smart Infrastructure</span>
               </div>
            </div>
          </motion.div>

          {/* Medium Secondary Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-zinc-950 text-white rounded-[40px] p-10 border border-zinc-900 hover:border-teal-400/40 hover:shadow-xl hover:shadow-teal-100/5 transition-all duration-300 flex flex-col justify-center cursor-pointer overflow-hidden relative group"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-14 h-14 bg-teal-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                  <ShieldCheck size={28} />
                </div>
                <h4 className="text-2xl font-bold tracking-tight text-white">Zero-Compromise Safety</h4>
              </div>
              <p className="text-zinc-400 leading-relaxed font-light">
                Our safety protocols exceed international standards, ensuring every operative on-site works in a fortress of compliance and security.
              </p>
            </div>
            <div className="absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-110 pointer-events-none">
               <img src="https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/ChatGPT-Image-Jun-13-2026-01_25_52-PM-1.png" alt="Safety" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            viewport={{ once: true }}
            className="bg-zinc-950 text-white rounded-[40px] p-8 flex flex-col justify-end group cursor-pointer overflow-hidden relative shadow-sm hover:shadow-xl hover:shadow-teal-100/5 transition-all duration-300 border border-zinc-900 hover:border-teal-400/40"
          >
            <div className="relative z-10">
              <Globe className="w-8 h-8 mb-4 text-teal-400" />
              <h4 className="text-xl font-bold mb-2">Sustainability</h4>
              <p className="text-zinc-400 text-sm leading-relaxed font-light">
                Eco-conscious designs that minimize environmental footprint through carbon-neutral construction methods.
              </p>
            </div>
            <div className="absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-110 pointer-events-none">
               <img src="https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/ChatGPT-Image-Jun-13-2026-01_25_52-PM-3-1.png" alt="Sustainability" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            viewport={{ once: true }}
            className="bg-zinc-950 text-white rounded-[40px] p-8 flex flex-col justify-end group cursor-pointer overflow-hidden relative shadow-sm hover:shadow-xl hover:shadow-teal-100/5 transition-all duration-300 border border-zinc-900 hover:border-teal-400/40"
          >
            <div className="relative z-10">
              <Users className="w-8 h-8 mb-4 text-teal-400" />
              <h4 className="text-xl font-bold mb-2">Client Centricity</h4>
              <p className="text-zinc-400 text-sm leading-relaxed font-light">
                Your vision is our blueprint. Transparent and collaborative process.
              </p>
            </div>
            <div className="absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-110 pointer-events-none">
               <img src="https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/ChatGPT-Image-Jun-13-2026-01_25_52-PM-4.png" alt="Client Centricity" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Sectors = () => {
  return (
    <section id="sectors" className="py-24 bg-zinc-950 px-6 border-t border-zinc-900 relative overflow-hidden">
      {/* Decorative gradient radial aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column - Copy & Shortcut List */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-teal-400 mb-4">Core Competencies</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
              Crafting infrastructure that shapes <span className="text-teal-400 italic font-serif">future societies.</span>
            </h3>
            <p className="text-zinc-400 text-base leading-relaxed font-light mb-10">
              From monumental sports arenas to bespoke residential sanctuaries, we build with precision and purpose. Explore our three primary corporate sectors through the interactive visual hub or direct links below.
            </p>

            <div className="space-y-4">
              <Link 
                to="/sectors/real-estate"
                className="group flex items-center justify-between p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:border-teal-400/50 hover:bg-zinc-900/80 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-teal-950/50 text-teal-400 border border-teal-900/30 group-hover:bg-teal-900/30 transition-all">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-base transition-colors group-hover:text-teal-400">Real Estate & Construction</h4>
                    <p className="text-zinc-500 text-xs mt-0.5">Ultra-luxury living spaces & structural high-rises</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-zinc-500 group-hover:text-teal-400 group-hover:translate-x-1.5 transition-all" />
              </Link>

              <Link 
                to="/sectors/historical-places"
                className="group flex items-center justify-between p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:border-teal-400/50 hover:bg-zinc-900/80 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-teal-950/50 text-teal-400 border border-teal-900/30 group-hover:bg-teal-900/30 transition-all">
                    <Compass size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-base transition-colors group-hover:text-teal-400">Historical Places & Heritage</h4>
                    <p className="text-zinc-500 text-xs mt-0.5">Indian heritage conservation & historical restorations</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-zinc-500 group-hover:text-teal-400 group-hover:translate-x-1.5 transition-all" />
              </Link>

              <Link 
                to="/sectors/sports-community"
                className="group flex items-center justify-between p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:border-teal-400/50 hover:bg-zinc-900/80 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-teal-950/50 text-teal-400 border border-teal-900/30 group-hover:bg-teal-900/30 transition-all">
                    <Trophy size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-base transition-colors group-hover:text-teal-400">Sports & Community</h4>
                    <p className="text-zinc-500 text-xs mt-0.5">International-grade arenas & local community centers</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-zinc-500 group-hover:text-teal-400 group-hover:translate-x-1.5 transition-all" />
              </Link>
            </div>
          </div>

          {/* Right Column - Interactive AntV G6 Sector Hub Canvas */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <div className="w-full relative group">
              {/* Outer decorative glowing borders */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative">
                <SectorHub />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const VastuSection = () => {
  return (
    <section id="consultancy" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute -top-24 -left-20 w-1/2 h-full opacity-[0.03] pointer-events-none">
        <Sun className="w-full h-full text-teal-400 -rotate-12" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-teal-400/40 text-sm font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
               <span className="w-12 h-[1px] bg-teal-500/20" /> Cosmic Alignment
            </h2>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 font-sans">
              Expert Vastu <br />
              <span className="italic font-serif text-teal-200/40 text-7xl md:text-8xl">Consultancy.</span>
            </h3>
            <p className="text-zinc-400 text-xl mb-10 leading-relaxed max-w-lg font-light">
              We harmonize modern architectural precision with ancient spatial wisdom. Our dedicated Vedic consultants ensure every square inch radiates prosperity and equilibrium.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { t: 'Energy Mapping', d: 'Strategic flow analysis.' },
                { t: 'Spatial Balance', d: 'Optimized orientation.' }
              ].map(item => (
                <div key={item.t} className="p-6 bg-white/5 border border-white/10 rounded-2xl group hover:border-teal-500/40 transition-colors">
                  <p className="text-teal-300 font-bold text-xs uppercase tracking-widest mb-2">{item.t}</p>
                  <p className="text-white/40 text-[10px] leading-tight">{item.d}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center p-12 md:p-20"
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-[85%] h-[85%] bg-teal-500/5 blur-[120px] rounded-full animate-pulse" />
               <div className="w-[60%] h-[60%] bg-teal-400/5 blur-[80px] rounded-full absolute" />
            </div>
            
            <div className="relative w-full aspect-square max-w-[460px] flex items-center justify-center">
               {/* Main Chakra Rings */}
               <div className="absolute inset-0 border border-teal-500/10 rounded-full" />
               <div className="absolute inset-4 border border-teal-500/5 rounded-full" />
               <div className="absolute inset-[15%] border border-teal-500/10 rounded-full border-dashed opacity-30" />

               {/* Rotating Elemental Rings */}
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-[25%] border border-teal-500/20 rounded-full flex items-center justify-center"
               >
                 <div className="absolute top-0 w-2 h-2 bg-teal-400 rounded-full blur-[2px] shadow-[0_0_10px_#9fc5e9]" title="Water" />
                 <div className="absolute bottom-0 w-2 h-2 bg-orange-400 rounded-full blur-[2px] shadow-[0_0_10px_#fb923c]" title="Fire" />
                 <div className="absolute left-0 w-2 h-2 bg-emerald-400 rounded-full blur-[2px] shadow-[0_0_10px_#34d399]" title="Air" />
                 <div className="absolute right-0 w-2 h-2 bg-teal-300 rounded-full blur-[2px] shadow-[0_0_10px_#a3c6ea]" title="Earth" />
               </motion.div>

               {/* Directional Matrix */}
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {[
                    { d: 'N', v: 'Uttar', s: 'Kuber', deg: 0 },
                    { d: 'NE', v: 'Ishaan', s: 'Shiva', deg: 45 },
                    { d: 'E', v: 'Purva', s: 'Indra', deg: 90 },
                    { d: 'SE', v: 'Agneya', s: 'Agni', deg: 135 },
                    { d: 'S', v: 'Dakshin', s: 'Yama', deg: 180 },
                    { d: 'SW', v: 'Nairiti', s: 'Pitra', deg: 225 },
                    { d: 'W', v: 'Pashchim', s: 'Varun', deg: 270 },
                    { d: 'NW', v: 'Vayu', s: 'Vayu', deg: 315 },
                  ].map((dir) => (
                    <div 
                      key={dir.d}
                      style={{ transform: `rotate(${dir.deg}deg)` }}
                      className="absolute w-full h-[1px]"
                    >
                      {/* Connection Line */}
                      <div className="w-[45%] h-full bg-gradient-to-r from-teal-400/20 to-transparent ml-auto" />
                      
                      {/* Direction Label */}
                      <div 
                        style={{ transform: `rotate(-${dir.deg}deg)` }}
                        className="absolute right-[-40px] top-1/2 -translate-y-1/2 text-center"
                      >
                         <p className="text-white font-black text-[12px] tracking-widest">{dir.d}</p>
                         <p className="text-teal-400/30 text-[7px] uppercase tracking-tighter mt-0.5">{dir.v}</p>
                      </div>
                    </div>
                  ))}
               </div>
               
               {/* Central Core: Brahmasthan */}
               <div className="relative z-10 w-32 h-32 flex items-center justify-center">
                  {/* Geometric Mandala Layers */}
                  <div className="absolute inset-0 bg-teal-500/[0.03] backdrop-blur-3xl rounded-full border border-white/10 flex items-center justify-center shadow-[0_0_60px_rgba(159,197,233,0.05)]">
                     <div className="w-24 h-24 border border-teal-500/10 rounded-full flex items-center justify-center">
                        <div className="w-16 h-16 border border-teal-500/20 rounded-full rotate-45 flex items-center justify-center">
                           <div className="w-10 h-10 border border-teal-500/40 flex items-center justify-center">
                              <Sparkles className="w-5 h-5 text-teal-200 opacity-80" />
                           </div>
                        </div>
                     </div>
                  </div>
                  
                  {/* Energy Pulse Ring */}
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset--4 border border-teal-400/20 rounded-full"
                  />
               </div>

               {/* Outer Compass Tick Marks */}
               <div className="absolute inset-[-40px] border border-teal-500/5 rounded-full pointer-events-none opacity-50">
                  <div className="absolute inset-0 rotate-12 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_98%,rgba(159,197,233,0.1)_100%)]" />
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  const [selectedOfficial, setSelectedOfficial] = useState<any | null>(null);

  return (
    <section id="team" className="py-28 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-600 bg-teal-50/50 px-4 py-1.5 rounded-full border border-teal-100/50">
            Corporate Leadership
          </span>
          <h3 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 mt-6 leading-none">
            Precision Powered by <span className="text-teal-500 italic font-serif">People</span>
          </h3>
          <p className="text-zinc-500 text-xs md:text-sm font-light mt-4 max-w-lg mx-auto leading-relaxed">
            Meet the board of directors and operations leaders steering Rajasthan's elite infrastructure development.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {OFFICIALS.map((person, idx) => (
            <motion.div 
              key={person.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              viewport={{ once: true }}
              onClick={() => setSelectedOfficial(person)}
              className="group cursor-pointer bg-white border border-zinc-200/60 p-5 rounded-[40px] shadow-sm hover:shadow-2xl hover:border-teal-400/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[3/4] overflow-hidden rounded-[30px] mb-5 relative shadow-md group-hover:shadow-lg transition-all duration-500">
                  <div className="w-full h-full overflow-hidden transition-transform duration-700 group-hover:scale-105">
                    <img 
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      style={person.zoom ? { transform: `scale(${person.zoom})`, transformOrigin: 'center 20%' } : undefined}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6" />
                  <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md text-zinc-950 font-bold uppercase tracking-widest text-[8px] px-4 py-2 rounded-full opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                    View Profile
                  </span>
                </div>
                
                <h4 className="text-lg font-bold text-zinc-900 group-hover:text-teal-600 transition-colors leading-tight px-1">{person.name}</h4>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-1 px-1">{person.role}</p>
              </div>
              
              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between px-1 text-[9px] text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Domain Focus</span>
                <span className="font-bold text-teal-600">Read Bio →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bio Modal */}
      <AnimatePresence>
        {selectedOfficial && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOfficial(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white rounded-[32px] md:rounded-[40px] max-w-2xl w-full max-h-[90vh] overflow-y-auto md:max-h-none md:overflow-visible shadow-2xl border border-zinc-200/60 relative z-10 flex flex-col md:flex-row animate-none"
            >
              <div className="w-full md:w-2/5 aspect-[4/3] md:aspect-auto relative bg-zinc-950 overflow-hidden flex-shrink-0">
                <img 
                  src={selectedOfficial.image}
                  alt={selectedOfficial.name}
                  className="w-full h-full object-cover"
                  style={selectedOfficial.zoom ? { transform: `scale(${selectedOfficial.zoom})`, transformOrigin: 'center 20%' } : undefined}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-zinc-950/10" />
              </div>
              
              <div className="p-6 md:p-10 flex-1 flex flex-col justify-between relative bg-white">
                <button 
                  onClick={() => setSelectedOfficial(null)}
                  className="absolute top-6 right-6 w-8 h-8 rounded-full bg-zinc-50 border border-zinc-150 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 transition-colors flex items-center justify-center cursor-pointer"
                >
                  <X size={14} />
                </button>
                
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-teal-650 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100/50 inline-block">
                    {selectedOfficial.role}
                  </span>
                  <h4 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900 mt-4 leading-tight">
                    {selectedOfficial.name}
                  </h4>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-1 border-b border-zinc-100 pb-4">
                    {selectedOfficial.experience}
                  </p>
                  
                  <p className="text-zinc-650 text-xs leading-relaxed font-light mt-4">
                    {selectedOfficial.bio}
                  </p>
                  
                  <div className="mt-6">
                    <p className="text-[9px] font-black uppercase tracking-wider text-zinc-400 mb-2">Core Domains</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedOfficial.focus.map((f: string, i: number) => (
                        <span key={i} className="text-[9px] font-bold text-zinc-600 bg-zinc-50 px-2.5 py-1 rounded-lg border border-zinc-200/50">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-[9px] text-zinc-400 italic">Sanchar Infratech Board</span>
                  <button
                    onClick={() => setSelectedOfficial(null)}
                    className="text-[10px] font-bold uppercase tracking-widest text-teal-650 hover:text-teal-700 transition-colors cursor-pointer"
                  >
                    Close Profile
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Connect = ({ user, showToast }: { user: any; showToast: (msg: string, type?: 'success' | 'error' | 'info') => void }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Select Project Category');
  const [vision, setVision] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const nameParts = user.displayName ? user.displayName.split(" ") : ["", ""];
      setFirstName(nameParts[0] || "");
      setLastName(nameParts.slice(1).join(" ") || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !vision.trim() || category === 'Select Project Category') {
      showToast("Please fill in all the required fields and select a project category.", "error");
      return;
    }
    setLoading(true);
    try {
      await saveInquiry({
        firstName,
        lastName,
        email,
        category,
        vision,
        uid: user?.uid
      });
      showToast(`Thank you, ${firstName}! Your inquiry has been logged successfully. Our team will get back to you soon.`, "success");
      setVision('');
      setCategory('Select Project Category');
    } catch (error) {
      showToast("Failed to submit inquiry. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="connect" className="py-24 bg-zinc-950 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-[32px] md:rounded-[60px] p-6 md:p-20 shadow-2xl relative overflow-hidden border border-zinc-100">
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none text-teal-600">
            <Building2 size={600} />
          </div>
          
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div>
                <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-teal-500 mb-6">Global Headquarters</h2>
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 mb-8 font-sans">
                  Let's Build the <br /> <span className="text-teal-400 italic font-serif">Incredible.</span>
                </h3>
                <p className="text-zinc-500 text-lg mb-12 max-w-md leading-relaxed font-light">
                  Our strategic presence across major global hubs allows us to deliver world-class infrastructure without boundaries.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-zinc-50 text-teal-600 rounded-2xl flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-all transform group-hover:rotate-6 shadow-sm border border-zinc-100">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Inquiries</p>
                      <p className="text-zinc-900 font-bold text-lg">sancharinfratech@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-zinc-50 text-teal-600 rounded-2xl flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-all transform group-hover:rotate-6 shadow-sm border border-zinc-100">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Connect</p>
                      <p className="text-zinc-900 font-bold text-lg">0141-4030330</p>
                    </div>
                  </div>
 
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-zinc-50 text-teal-600 rounded-2xl flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-all transform group-hover:rotate-6 shadow-sm border border-zinc-100">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Corporate Office</p>
                      <p className="text-zinc-900 font-bold text-sm tracking-tight">602, 6th Floor, Crystal Palm Mall, 22 Godown Circle, Sardar Patel Marg, Jaipur, Rajasthan 302004</p>
                    </div>
                  </div>
                </div>
              </div>
 
              <div className="bg-zinc-50 p-6 md:p-10 rounded-[24px] md:rounded-[40px] border border-zinc-100">
                <h4 className="text-xl font-bold mb-8 text-zinc-900">Direct Inquiry</h4>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="First Name" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full p-5 bg-white rounded-2xl border border-zinc-200 text-xs font-bold uppercase tracking-widest focus:ring-1 focus:ring-teal-500 transition-all outline-none" 
                    />
                    <input 
                      type="text" 
                      placeholder="Last Name" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full p-5 bg-white rounded-2xl border border-zinc-200 text-xs font-bold uppercase tracking-widest focus:ring-1 focus:ring-teal-500 transition-all outline-none" 
                    />
                  </div>
                  <input 
                    type="email" 
                    placeholder="Corporate Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-5 bg-white rounded-2xl border border-zinc-200 text-xs font-bold uppercase tracking-widest focus:ring-1 focus:ring-teal-500 transition-all outline-none" 
                  />
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-5 bg-white rounded-2xl border border-zinc-200 text-xs font-bold uppercase tracking-widest focus:ring-1 focus:ring-teal-500 transition-all outline-none"
                  >
                     <option>Select Project Category</option>
                     <option>Commercial</option>
                     <option>Residential</option>
                     <option>Sports Infratech</option>
                  </select>
                  <textarea 
                    placeholder="Tell us about your vision" 
                    rows={4} 
                    value={vision}
                    onChange={(e) => setVision(e.target.value)}
                    className="w-full p-5 bg-white rounded-2xl border border-zinc-200 text-xs font-bold uppercase tracking-widest focus:ring-1 focus:ring-teal-500 transition-all outline-none" 
                  />
                  <button 
                    disabled={loading}
                    type="submit"
                    className="w-full bg-teal-500 text-white p-5 rounded-2xl font-bold tracking-[0.2em] uppercase text-xs hover:bg-teal-600 transition-all transform hover:translate-y-[-2px] active:translate-y-0 shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? <Loader2 size={14} className="animate-spin" /> : null}
                    Propel Your Project
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Subtle delay to allow DOM render on route switch
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}


export default function App() {
  const [user, setUser] = useState<any>(null);
  const [toasts, setToasts] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const handleSignIn = async () => {
    try {
      const loggedInUser = await signInWithGoogle();
      if (loggedInUser) {
        showToast(`Welcome back, ${loggedInUser.displayName || 'Partner'}!`, "success");
      }
    } catch (error: any) {
      console.error(error);
      showToast(error.message || "Failed to sign in. Please try again.", "error");
    }
  };

  const handleSignOut = async () => {
    try {
      await logoutUser();
      showToast("Successfully disconnected.", "info");
    } catch (error: any) {
      console.error(error);
      showToast("Failed to sign out.", "error");
    }
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="bg-white min-h-screen selection:bg-black selection:text-white flex flex-col justify-between">
        <Navbar user={user} onSignIn={handleSignIn} onSignOut={handleSignOut} />

        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Main Landing Page Route */}
            <Route path="/" element={
              <>
                <Hero />
                <ServicesShowcase />
                <BioSection />
                <BrandsTicker />
                <QualitySection />
                <StatsSection />
                <Sectors />
                <ProjectsSection />
                <TransparencySection />
                <ProcessSection />
                <VastuSection />
                <CalculatorSection user={user} showToast={showToast} />
                <ValuesSection />
                <Team />
                <Connect user={user} showToast={showToast} />
                <VastuPopup user={user} showToast={showToast} />
              </>
            } />

            {/* Subpages Route Mappings */}
            <Route path="/about/our-story" element={<OurStory />} />
            <Route path="/about/why-choose-us" element={<WhyChooseUs />} />
            <Route path="/about/accreditations" element={<Accreditations />} />
            
            <Route path="/sectors/real-estate" element={<RealEstate />} />
            <Route path="/sectors/historical-places" element={<HistoricalPlaces />} />
            <Route path="/sectors/sports-community" element={<SportsCommunity />} />
            
            <Route path="/projects/featured" element={<Featured />} />
            <Route path="/projects/ongoing" element={<Ongoing />} />
            <Route path="/projects/completed" element={<Completed />} />
            
            <Route path="/team/leadership" element={<Leadership />} />
            <Route path="/team/department-heads" element={<DepartmentHeads />} />
            <Route path="/team/join-us" element={<JoinUs />} />
          </Routes>
        </Suspense>

        {/* Premium Glassmorphic Toast Notifications */}
        <div className="fixed top-24 right-8 z-[200] flex flex-col gap-3 max-w-sm pointer-events-none">
          <AnimatePresence>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="pointer-events-auto bg-white/80 backdrop-blur-xl border border-zinc-200/50 shadow-2xl p-4 rounded-2xl flex items-center justify-between gap-4 w-80 md:w-96 text-zinc-800"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    toast.type === 'success' ? 'bg-teal-50 text-teal-600' :
                    toast.type === 'error' ? 'bg-red-50 text-red-650' : 'bg-blue-50 text-blue-650'
                  }`}>
                    {toast.type === 'success' && <CheckCircle2 size={16} />}
                    {toast.type === 'error' && <AlertTriangle size={16} />}
                    {toast.type === 'info' && <Info size={16} />}
                  </div>
                  <p className="text-[11px] font-bold tracking-tight leading-relaxed">{toast.message}</p>
                </div>
                <button 
                  onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                  className="text-zinc-400 hover:text-zinc-600 transition-colors flex-shrink-0 cursor-pointer"
                >
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <footer className="py-12 bg-white border-t border-zinc-100">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-2xl font-black tracking-tighter text-teal-600">SANCHAR.</div>
            <p className="text-zinc-400 text-[10px] font-bold tracking-widest uppercase text-center md:text-left opacity-60">
              © 2024 Sanchar Infratech Pvt Ltd. All Rights Reserved.
            </p>
            <div className="flex gap-8">
              {['Instagram', 'LinkedIn', 'X'].map(social => (
                <a key={social} href="#" className="text-zinc-400 hover:text-teal-600 text-[10px] font-bold uppercase tracking-widest transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </footer>

        <style>{`
          .animate-spin-slow {
            animation: spin 20s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          html {
            scroll-behavior: smooth;
          }
        `}</style>
      </div>
    </BrowserRouter>
  );
}
