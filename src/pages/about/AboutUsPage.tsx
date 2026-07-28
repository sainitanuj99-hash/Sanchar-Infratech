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
  CheckCircle2,
  DraftingCompass,
  Cpu,
  Zap,
  Leaf,
  Trophy
} from 'lucide-react';

const NUMBERS = [
  { value: "25+", label: "Years Excellence", icon: Globe },
  { value: "250+", label: "Landmark Builds", icon: Building2 },
  { value: "98%", label: "Client Satisfaction", icon: Users },
  { value: "12M+", label: "Sq Ft Constructed", icon: Award }
];

const EXPERTISE = [
  { title: "Architecture & Design", icon: DraftingCompass, img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop" },
  { title: "Urban Master Planning", icon: Globe, img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=600&auto=format&fit=crop" },
  { title: "PMC & Turnkey Build", icon: Building2, img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop" },
  { title: "Structural Engineering", icon: Cpu, img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=600&auto=format&fit=crop" },
  { title: "MEP & Utility Systems", icon: Zap, img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop" },
  { title: "Astro-Vastu Planning", icon: Compass, img: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=600&auto=format&fit=crop" },
  { title: "Heritage Conservation", icon: Trophy, img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=600&auto=format&fit=crop" },
  { title: "Environmental & Ecology", icon: Leaf, img: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600&auto=format&fit=crop" }
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

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 relative overflow-hidden">
      {/* Blueprint Background Grid */}
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

        {/* SECTION 1: COMMITTED TO CLIENT */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-zinc-900/70 border border-zinc-800/80 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl mb-12 relative overflow-hidden text-center"
        >
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-teal-500 via-emerald-400 to-sky-500" />
          
          <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.4em] bg-teal-950/80 border border-teal-800/60 px-4 py-1.5 rounded-full inline-block mb-4">
            Committed To Client
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 font-sans leading-tight">
            Building Trust & Engineering <br />
            <span className="text-teal-400 font-serif italic">Excellence Since 2001</span>
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
            Delivering landmark civil infrastructure, multidisciplinary architecture, and project management built on absolute transparency and zero-compromise quality.
          </p>
        </motion.div>

        {/* SECTION 2: WHO WE ARE - 2 HALF IMAGES SIDE BY SIDE */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-teal-400 bg-teal-950/80 border border-teal-800/60 px-3.5 py-1.5 rounded-full">
              Who We Are
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              Multidisciplinary Infratech Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Half Image 1 */}
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 aspect-[16/10] sm:aspect-[4/3] group shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200&auto=format&fit=crop" 
                alt="Modern Corporate Infrastructure" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black uppercase text-teal-400 tracking-wider">Commercial & High-Rise</p>
                  <p className="text-xs font-bold text-white">Modern Civil Engineering</p>
                </div>
                <Sparkles size={16} className="text-teal-400" />
              </div>
            </div>

            {/* Half Image 2 */}
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 aspect-[16/10] sm:aspect-[4/3] group shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop" 
                alt="Heritage Conservation Jaipur" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black uppercase text-teal-400 tracking-wider">Heritage & Restoration</p>
                  <p className="text-xs font-bold text-white">Amber Palace Conservation</p>
                </div>
                <Sparkles size={16} className="text-teal-400" />
              </div>
            </div>
          </div>

          <div className="mt-6 bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl text-center">
            <p className="text-zinc-300 text-xs sm:text-sm max-w-3xl mx-auto leading-relaxed">
              Established in <strong className="text-white font-bold">2001</strong>, Sanchar Infratech Pvt. Ltd. is a premier multidisciplinary architecture, urban planning, and project management consultancy in Rajasthan. Backed by experienced engineers and planners, we specialize in transforming ideas into landmark projects from concept to execution.
            </p>
          </div>
        </div>

        {/* SECTION 3: MISSION AND EXPERTISE + NUMBERS */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-teal-400 bg-teal-950/80 border border-teal-800/60 px-3.5 py-1.5 rounded-full">
              Expertise & Numbers
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              Proven Track Record
            </h2>
          </div>

          {/* Numbers Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {NUMBERS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-zinc-900/70 border border-zinc-800 p-5 rounded-3xl text-center shadow-lg">
                  <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/30 mx-auto flex items-center justify-center text-teal-400 mb-3">
                    <Icon size={20} />
                  </div>
                  <p className="text-3xl font-black text-white tracking-tight">{s.value}</p>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              );
            })}
          </div>

          {/* Expertise Visual Cards with Icons & Images */}
          <div className="bg-zinc-900/40 border border-zinc-800 p-6 sm:p-8 rounded-[2.5rem]">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-teal-400 mb-6">Core Domain Capabilities</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {EXPERTISE.map((item) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.title} 
                    className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 p-4 group hover:border-teal-500/40 transition-all shadow-lg flex flex-col justify-between min-h-[130px]"
                  >
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
                    </div>

                    <div className="relative z-10 w-9 h-9 rounded-xl bg-teal-950/80 border border-teal-800/60 flex items-center justify-center text-teal-400 mb-3 shadow-md">
                      <Icon size={18} />
                    </div>

                    <h4 className="relative z-10 text-xs font-bold text-white group-hover:text-teal-300 transition-colors leading-snug">
                      {item.title}
                    </h4>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION 4: OUR MISSION */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-900/50 to-teal-950/40 border border-teal-800/40 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-4 flex flex-col justify-center">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-4">
                  <Target size={28} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-teal-400 bg-teal-950/80 border border-teal-800/60 px-3 py-1 rounded-full w-fit mb-2">
                  Corporate Creed
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-white font-sans">
                  Our Mission
                </h3>
              </div>

              <div className="lg:col-span-8 border-t lg:border-t-0 lg:border-l border-zinc-800 pt-6 lg:pt-0 lg:pl-8">
                <p className="text-zinc-200 text-sm sm:text-base leading-relaxed font-normal mb-4">
                  To redefine urban landscapes through innovative, sustainable, and high-impact infrastructure solutions—combining technical civil engineering precision with transparent client partnership.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs text-teal-300 font-semibold bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800">
                    <ShieldCheck size={14} className="text-teal-400 flex-shrink-0" />
                    Zero-Compromise Safety
                  </div>
                  <div className="flex items-center gap-2 text-xs text-teal-300 font-semibold bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800">
                    <Compass size={14} className="text-teal-400 flex-shrink-0" />
                    Astro-Vastu Spatial Balance
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* SECTION 5: LEADERSHIP */}
        <div className="mb-16">
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
              <div key={person.name} className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-3xl group shadow-lg flex flex-col justify-between">
                <div>
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 border border-zinc-800 relative bg-zinc-950">
                    <img 
                      src={person.image} 
                      alt={person.name} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-[center_top] group-hover:scale-105 transition-transform duration-500"
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
