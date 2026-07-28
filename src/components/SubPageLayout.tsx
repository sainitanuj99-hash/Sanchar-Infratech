import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Compass, Shield, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

interface SubPageCard {
  title: string;
  description: string;
  image?: string; // Optional card preview photo
  zoom?: number;   // Optional zoom crop factor
}

export interface SubPageLayoutProps {
  title: string;
  category: string;
  description: string;
  cards: SubPageCard[];
  galleryImages?: string[]; // Optional visual showcase gallery
}

export const SubPageLayout = ({ title, category, description, cards, galleryImages }: SubPageLayoutProps) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-16 relative overflow-hidden flex flex-col justify-between">
      {/* Premium background grid details & ambient glowing blobs */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-teal-400/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 w-full flex-grow">
        {/* Navigation Breadcrumbs & Go Back */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-teal-400 transition-colors group cursor-pointer"
          >
            <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1" />
            Return to Landing Page
          </Link>

          <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-zinc-500">
            <Link to="/" className="hover:text-zinc-300">Home</Link>
            <span>/</span>
            <span className="text-zinc-400">{category}</span>
            <span>/</span>
            <span className="text-teal-400 font-extrabold">{title}</span>
          </div>
        </div>

        {/* Premium glowing HSL-matched Hero section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 p-8 md:p-12 rounded-[2.5rem] shadow-2xl mb-12 overflow-hidden"
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal-400 via-teal-300 to-teal-500" />
          
          <div className="relative z-10 max-w-3xl">
            <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest bg-teal-950/60 border border-teal-800/40 px-3 py-1.5 rounded-full">
              {category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mt-6 mb-6 font-serif leading-none">
              {title}
            </h1>
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-light">
              {description}
            </p>
          </div>

          {/* Decorative graphic pattern */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 border border-zinc-800/60 rounded-full opacity-20 pointer-events-none" />
          <div className="absolute -right-8 -bottom-8 w-64 h-64 border border-zinc-800/40 rounded-full opacity-20 pointer-events-none" />
        </motion.div>

        {/* Deep Information Card Grid Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <Compass size={14} className="text-teal-400" />
            <h2 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Deep Architectural Specifications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group p-6 bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/50 hover:border-teal-400/30 rounded-3xl transition-all duration-300 shadow-xl flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Card Image Slot */}
                  {card.image && (
                    <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden mb-6 border border-zinc-850 relative group-hover:border-teal-900/40 transition-colors">
                      <div className="w-full h-full overflow-hidden transition-transform duration-500 group-hover:scale-105">
                        <img 
                          src={card.image} 
                          alt={card.title} 
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-[center_top]"
                          style={card.zoom ? { transform: `scale(${card.zoom})`, transformOrigin: 'center 20%' } : undefined}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  )}

                  <div className="w-10 h-10 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300 mb-6">
                    <Shield size={18} />
                  </div>
                  <h3 className="text-base font-bold text-zinc-100 group-hover:text-teal-300 transition-colors mb-3">
                    {card.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light mb-6">
                    {card.description}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer pt-2">
                  Request Specifications <ArrowRight size={10} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Visual Portfolio & Site Gallery Section */}
        {galleryImages && galleryImages.length > 0 && (
          <div className="mt-20 mb-10">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={14} className="text-teal-400" />
              <h2 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Visual Portfolio & Site Gallery</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((imgUrl, imgIdx) => (
                <motion.div
                  key={imgIdx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * imgIdx }}
                  className="group relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden border border-zinc-800/80 hover:border-teal-400/30 transition-all duration-500 shadow-2xl"
                >
                  <img 
                    src={imgUrl} 
                    alt={`Showcase ${imgIdx + 1}`} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-350" />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="text-[9px] font-black uppercase text-teal-400 tracking-wider mb-1">Sanchar Project Blueprint</span>
                    <h4 className="text-white text-sm font-bold tracking-wide">Visual Landmark Phase {imgIdx + 1}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Micro bottom disclaimer bar for styling continuity */}
      <div className="border-t border-zinc-900 pt-8 mt-4 text-center">
        <p className="text-[9px] text-zinc-600 uppercase tracking-widest font-bold">
          Sanchar Infratech • Corporate Standard Blueprint • Jaipur, Rajasthan
        </p>
      </div>
    </div>
  );
};
