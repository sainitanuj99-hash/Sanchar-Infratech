import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Building2, 
  Globe, 
  Award, 
  Users, 
  Target, 
  Compass, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles,
  Trophy
} from 'lucide-react';

const STATS = [
  { label: "Years Excellence", value: "25+", icon: Globe },
  { label: "Landmark Builds", value: "250+", icon: Building2 },
  { label: "Client Rating", value: "98%", icon: Users },
  { label: "Constructed", value: "12M+ Sq Ft", icon: Award }
];

const TIMELINE = [
  {
    year: "2001",
    title: "Founding in Jaipur",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop",
    short: "Incorporated with a vision for engineering rigor, Astro-Vastu alignment, and transparency."
  },
  {
    year: "2010",
    title: "Healthcare & Commercial",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
    short: "Built Pt. Deen Dayal Upadhyay Hospital (₹55 Cr) and Patrika Headquarters."
  },
  {
    year: "2018",
    title: "Heritage & Sports Facilities",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800&auto=format&fit=crop",
    short: "Restoration of Amber Palace and modern expansion of SMS Stadium sports complex."
  },
  {
    year: "2026+",
    title: "Smart Cities & Green Build",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=800&auto=format&fit=crop",
    short: "IGBC certified green building standards, automation, and carbon-neutral designs."
  }
];

const LEADERSHIP = [
  {
    name: "Er Akhilesh Kumar Mittal",
    role: "Director • B.Tech, M.Tech",
    image: "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/WhatsApp-Image-2026-02-21-at-6.17.51-PM-2-1.png",
    short: "Civil Engineer & Astro Vastu Planner overseeing structural compliance and corporate strategy."
  },
  {
    name: "Dr Pushpendra Kumar Mittal",
    role: "Director • Urban Planner",
    image: "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/WhatsApp-Image-2026-02-21-at-6.17.51-PM-1.png",
    short: "Urban Planner and Economist guiding master planning and large-scale infrastructure."
  },
  {
    name: "Shri Manohar Kant",
    role: "Advisor • Retd. IAS",
    image: "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/02/Gemini_Generated_Image_x8zg3x8zg3x8zg3x-1.png",
    short: "Retd. IAS Officer ensuring administrative governance, compliance, and site quality."
  },
  {
    name: "Mr Tanmaya Mittal",
    role: "Director • Operations",
    image: "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/02/Gemini_Generated_Image_g0roc7g0roc7g0ro-1.png",
    short: "Leading operational growth, technology integration, and sustainable innovation."
  }
];

const GALLERY = [
  {
    title: "Pt. Deen Dayal Upadhyay Hospital",
    tag: "Healthcare Landmark",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "High-Rise Residential Towers",
    tag: "Luxury Housing",
    img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Heritage Conservation Projects",
    tag: "Jaipur Restoration",
    img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop"
  }
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 relative overflow-hidden">
      {/* Blueprint background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-teal-400 transition-colors group cursor-pointer"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
            <Link to="/" className="hover:text-zinc-300">Home</Link>
            <span>/</span>
            <span className="text-teal-400 font-extrabold">About Us</span>
          </div>
        </div>

        {/* Hero Section: Text Left + Big Visual Photo Right */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-zinc-900/70 border border-zinc-800/80 p-6 sm:p-10 rounded-[2.5rem] shadow-2xl mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-teal-500 via-emerald-400 to-sky-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Copy Column */}
            <div className="lg:col-span-6">
              <span className="text-[9px] font-black text-teal-400 uppercase tracking-[0.3em] bg-teal-950/80 border border-teal-800/60 px-3.5 py-1.5 rounded-full inline-block mb-4">
                Sanchar Infratech Pvt. Ltd.
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white font-sans leading-tight mb-4">
                Building Excellence <br />
                <span className="text-teal-400 font-serif italic">Since 2001</span>
              </h1>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                Multidisciplinary architectural, civil engineering, and project management consultancy with 25+ years of structural legacy.
              </p>

              {/* Quick Stat Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
                {STATS.slice(0, 2).map((s) => (
                  <div key={s.label} className="bg-zinc-950/60 p-3.5 rounded-2xl border border-zinc-800/60">
                    <p className="text-2xl font-black text-teal-400">{s.value}</p>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-zinc-800 aspect-[4/3] group shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200&auto=format&fit=crop" 
                  alt="Sanchar Corporate Building" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 p-3.5 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-black uppercase text-teal-400 tracking-wider">Corporate Landmark</p>
                    <p className="text-xs font-bold text-white">25+ Years of Structural Innovation</p>
                  </div>
                  <Sparkles size={16} className="text-teal-400 animate-pulse" />
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Visual Cards: Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="relative bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-4">
              <Target size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Our Mission</h3>
            <p className="text-zinc-400 text-xs leading-relaxed font-normal">
              Innovative & sustainable infrastructure with absolute engineering precision.
            </p>
          </div>

          <div className="relative bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-4">
              <Compass size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Our Vision</h3>
            <p className="text-zinc-400 text-xs leading-relaxed font-normal">
              Global benchmark for multidisciplinary architecture & Astro-Vastu alignment.
            </p>
          </div>

          <div className="relative bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Core Pillars</h3>
            <p className="text-zinc-400 text-xs leading-relaxed font-normal">
              Zero-compromise structural safety, 24/7 site surveillance & IGBC green builds.
            </p>
          </div>
        </div>

        {/* Visual Timeline Section with Image Cards */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-teal-400 bg-teal-950/80 border border-teal-800/60 px-3.5 py-1.5 rounded-full">
              Key Milestones
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              Our 25-Year Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE.map((item, idx) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-900/70 border border-zinc-800 rounded-3xl overflow-hidden group hover:border-teal-500/40 transition-all flex flex-col justify-between shadow-lg"
              >
                <div className="h-44 overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  <span className="absolute top-3 left-3 bg-teal-500 text-zinc-950 font-black text-xs px-3 py-1 rounded-xl shadow-md">
                    {item.year}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-extrabold text-white mb-1.5">{item.title}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">{item.short}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Visual Project Showcase Showcase Bar */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-teal-400 bg-teal-950/80 border border-teal-800/60 px-3.5 py-1.5 rounded-full">
              Portfolio Snapshot
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              Delivered Architectural Landmarks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GALLERY.map((g) => (
              <div key={g.title} className="relative rounded-3xl overflow-hidden border border-zinc-800 aspect-[16/10] group shadow-xl">
                <img 
                  src={g.img} 
                  alt={g.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-teal-400 bg-teal-950/90 border border-teal-800/60 px-2.5 py-1 rounded-md inline-block mb-1">
                    {g.tag}
                  </span>
                  <h4 className="text-sm font-bold text-white">{g.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Showcase Grid */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-teal-400 bg-teal-950/80 border border-teal-800/60 px-3.5 py-1.5 rounded-full">
              Leadership
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              Board of Directors
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERSHIP.map((person) => (
              <div key={person.name} className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-3xl group shadow-lg flex flex-col justify-between">
                <div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 border border-zinc-800">
                    <img 
                      src={person.image} 
                      alt={person.name} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-[9px] font-black text-teal-400 uppercase tracking-wider mb-1">{person.role}</p>
                  <h3 className="text-sm font-bold text-white mb-2">{person.name}</h3>
                  <p className="text-xs text-zinc-400 leading-snug font-normal">{person.short}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center bg-gradient-to-r from-teal-950 via-zinc-900 to-teal-950 border border-teal-800/40 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Partner With Sanchar Infratech
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto mb-6">
            Turnkey civil engineering, Vastu spatial planning, and structural excellence.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              to="/#estimator" 
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-zinc-950 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-lg"
            >
              Get Instant Estimate
              <ArrowRight size={14} />
            </Link>
            <a 
              href="/#connect" 
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all"
            >
              Contact Directors
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
