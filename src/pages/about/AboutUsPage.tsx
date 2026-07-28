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
  Zap, 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  UserCheck,
  BookOpen,
  Trophy
} from 'lucide-react';

const STATS = [
  { label: "Years Excellence", value: "25+", icon: Globe },
  { label: "Projects Completed", value: "250+", icon: Building2 },
  { label: "Client Satisfaction", value: "98%", icon: Users },
  { label: "Sq Ft Constructed", value: "12M+", icon: Award }
];

const TIMELINE = [
  {
    year: "2001",
    title: "Founding & Incorporation",
    description: "Established in Jaipur by visionary civil engineers with a mission to bring structural rigor, Astro-Vastu spatial harmony, and absolute transparency to Rajasthan's infrastructure."
  },
  {
    year: "2010",
    title: "Commercial & Healthcare Landmarks",
    description: "Delivered major state projects including the 300-bedded Pt. Deen Dayal Upadhyay Hospital (₹55 Cr) and Rajasthan Patrika Headquarters in Jaipur."
  },
  {
    year: "2018",
    title: "Heritage Conservation & Sports Infratech",
    description: "Chosen for structural restoration of Amber Palace and modern expansion of SMS Stadium sports complex alongside high-rise residential projects like SNG Ozone."
  },
  {
    year: "2026+",
    title: "Smart Cities & Sustainable Future",
    description: "Pioneering IGBC-certified green building designs, smart automation, carbon-neutral construction, and turnkey PMC operations."
  }
];

const LEADERSHIP = [
  {
    name: "Er Akhilesh Kumar Mittal",
    role: "Director",
    image: "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/WhatsApp-Image-2026-02-21-at-6.17.51-PM-2-1.png",
    bio: "Qualified Civil Engineer (B.Tech & M.Tech) and Astro Vastu Planner. Combines engineering precision with Vastu principles, overseeing strategy, auditing, and structural compliance.",
    tags: ["Civil Engineering", "Astro Vastu", "Corporate Strategy"]
  },
  {
    name: "Dr Pushpendra Kumar Mittal",
    role: "Director",
    image: "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/WhatsApp-Image-2026-02-21-at-6.17.51-PM-1.png",
    bio: "Distinguished Urban Planner and Economist. Brings macro-level urban planning expertise and economic analysis to steer structural design, master planning, and operations.",
    tags: ["Urban Planning", "Economic Strategy", "Infrastructure"]
  },
  {
    name: "Shri Manohar Kant",
    role: "Advisor (Retd. IAS)",
    image: "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/02/Gemini_Generated_Image_x8zg3x8zg3x8zg3x-1.png",
    bio: "Retd. IAS officer bringing administrative rigor, public governance experience, and regulatory oversight across all major site workflows and compliance.",
    tags: ["Governance", "Site Optimization", "Compliance"]
  },
  {
    name: "Mr Tanmaya Mittal",
    role: "Director",
    image: "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/02/Gemini_Generated_Image_g0roc7g0roc7g0ro-1.png",
    bio: "Key driver of strategic growth, operational excellence, and modern technology integration, upholding Sanchar's commitment to quality and sustainability.",
    tags: ["Strategic Growth", "Operations", "Sustainability"]
  }
];

const ACCREDITATIONS = [
  { title: "ISO 9001:2015", desc: "Quality Management Systems" },
  { title: "ISO 45001:2018", desc: "Occupational Health & Safety" },
  { title: "ISO 14001:2015", desc: "Environmental Management" },
  { title: "IGBC Member", desc: "Green Building Certifications" }
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 relative overflow-hidden">
      {/* Background Architectural Blueprint Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.1] pointer-events-none" />

      {/* Floating Glowing Aura Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/10 w-[500px] h-[500px] bg-teal-400/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-10">
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

        {/* Hero Header Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800/80 p-8 sm:p-14 rounded-[2.5rem] shadow-2xl mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-teal-500 via-emerald-400 to-sky-500" />
          
          <div className="max-w-3xl">
            <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.4em] bg-teal-950/80 border border-teal-800/50 px-4 py-1.5 rounded-full">
              Sanchar Infratech Pvt. Ltd.
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mt-6 mb-6 font-sans leading-tight">
              Pioneering Infrastructure <br />
              <span className="text-teal-400 font-serif italic">Excellence Since 2001</span>
            </h1>
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
              We are a leading multidisciplinary architecture, engineering, and project management consultancy. 
              With over 25 years of legacy, we transform visionary concepts into enduring structural masterpieces.
            </p>
          </div>

          {/* Key Stat Badges Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-10 border-t border-zinc-800/60">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-950/60 border border-teal-800/40 flex items-center justify-center text-teal-400">
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-white tracking-tight">{s.value}</p>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{s.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Mission, Vision & Core Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900/40 border border-zinc-800/60 p-8 rounded-3xl hover:border-teal-500/40 transition-all shadow-xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-6">
              <Target size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
              To redefine urban landscapes through innovative, sustainable, and high-impact infrastructure solutions, 
              combining technical engineering precision with transparent client partnership.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-zinc-900/40 border border-zinc-800/60 p-8 rounded-3xl hover:border-teal-500/40 transition-all shadow-xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-6">
              <Compass size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
              To be the trusted global benchmark for excellence in multidisciplinary architecture, urban planning, 
              structural engineering, and Astro-Vastu spatial design.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-zinc-900/40 border border-zinc-800/60 p-8 rounded-3xl hover:border-teal-500/40 transition-all shadow-xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-6">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Core Pillars</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
              Zero-compromise structural safety, 24/7 site surveillance transparency, 
              eco-conscious IGBC green building standards, and Astro-Vastu harmony.
            </p>
          </motion.div>
        </div>

        {/* 25-Year Milestone Timeline Section */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400 bg-teal-950/60 border border-teal-800/40 px-4 py-1.5 rounded-full">
              Quarter-Century Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 font-sans">
              Historical Growth & Milestones
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE.map((item, idx) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-900/50 border border-zinc-800/80 p-7 rounded-3xl hover:border-teal-500/40 transition-all relative flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-teal-500 text-zinc-950 font-black flex items-center justify-center text-sm tracking-wider mb-6 shadow-lg shadow-teal-500/20">
                    {item.year}
                  </div>
                  <h4 className="text-base font-bold text-white mb-3">{item.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leadership & Directors Board Section */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400 bg-teal-950/60 border border-teal-800/40 px-4 py-1.5 rounded-full">
              Leadership & Guidance
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 font-sans">
              Meet Our Board of Directors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERSHIP.map((person, idx) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-900/40 border border-zinc-800/60 p-6 rounded-3xl hover:border-teal-500/40 transition-all flex flex-col justify-between overflow-hidden group shadow-xl"
              >
                <div>
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-zinc-800">
                    <img 
                      src={person.image} 
                      alt={person.name} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[9px] font-black uppercase text-teal-400 tracking-wider bg-teal-950/80 px-2.5 py-1 rounded-md border border-teal-800/40">
                    {person.role}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-3 mb-2">{person.name}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">{person.bio}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-800/60">
                  {person.tags.map((t) => (
                    <span key={t} className="text-[8px] font-bold text-zinc-400 uppercase bg-zinc-800/60 px-2 py-0.5 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Accreditations & Quality Standards */}
        <div className="bg-zinc-900/60 border border-zinc-800 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl mb-16 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-8 font-sans">
            Recognized Quality Standards & ISO Accreditations
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {ACCREDITATIONS.map((acc) => (
              <div key={acc.title} className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/60">
                <p className="text-sm font-black text-teal-400 uppercase tracking-widest mb-1">{acc.title}</p>
                <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">{acc.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="text-center bg-gradient-to-r from-teal-950 via-zinc-900 to-teal-950 border border-teal-800/40 p-10 sm:p-16 rounded-[2.5rem] shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Ready to Build Your Landmark Project?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mb-8 font-light">
            Partner with Sanchar Infratech for turnkey civil engineering, Vastu spatial planning, and structural excellence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/#estimator" 
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-zinc-950 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-teal-500/20"
            >
              Get Instant Estimate
              <ArrowRight size={14} />
            </Link>
            <a 
              href="/#connect" 
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all"
            >
              Contact Our Directors
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
