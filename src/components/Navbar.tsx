import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  ChevronDown, 
  Menu, 
  X, 
  LogIn, 
  LogOut,
  BookOpen,
  Sparkles,
  Award,
  Cpu,
  Trophy,
  Star,
  Activity,
  CheckCircle2,
  Users,
  UserCheck,
  Briefcase,
  Calendar,
  MapPin,
  Mail,
  ArrowRight,
  Compass
} from 'lucide-react';

interface SubItem {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<any>;
}

interface CategoryData {
  title: string;
  description: string;
  items: SubItem[];
}

const CATEGORIES: Record<string, CategoryData> = {
  About: {
    title: "About Sanchar",
    description: "Discover our heritage, core design values, and construction principles.",
    items: [
      { title: "Our Story", description: "Our historical foundation and vision.", href: "/about/our-story", icon: BookOpen },
      { title: "Why Choose Us", description: "Our engineering and design pillars.", href: "/about/why-choose-us", icon: Sparkles },
      { title: "Accreditations & Associations", description: "ISO, IGBC and global compliance keys.", href: "/about/accreditations", icon: Award }
    ]
  },
  Sectors: {
    title: "Core Sectors",
    description: "Expert engineering and development across specialized domains.",
    items: [
      { title: "Real Estate & Construction", description: "Bespoke luxury residencies and office towers.", href: "/sectors/real-estate", icon: Building2 },
      { title: "Historical Places & Heritage", description: "Structural conservation and historical restoration.", href: "/sectors/historical-places", icon: Compass },
      { title: "Sports & Community", description: "World-class sporting arenas and training hubs.", href: "/sectors/sports-community", icon: Trophy }
    ]
  },
  Projects: {
    title: "Our Portfolio",
    description: "A showcase of engineering masterpieces delivered successfully.",
    items: [
      { title: "Featured Developments", description: "Our award-winning architectural masterworks.", href: "/projects/featured", icon: Star },
      { title: "Ongoing Initiatives", description: "Real-time updates of active supervisor sites.", href: "/projects/ongoing", icon: Activity },
      { title: "Completed Portfolio", description: "Explore 15+ years of successfully delivered spaces.", href: "/projects/completed", icon: CheckCircle2 }
    ]
  },
  Team: {
    title: "Our Team",
    description: "Meet the specialized directors and operators leading Sanchar.",
    items: [
      { title: "Leadership & Directors", description: "Insights from our Managing Director and Board.", href: "/team/leadership", icon: Users },
      { title: "Department Heads", description: "Specialized engineering and site management leaders.", href: "/team/department-heads", icon: UserCheck },
      { title: "Join Our Team", description: "Exciting career opportunities in Jaipur and beyond.", href: "/team/join-us", icon: Briefcase }
    ]
  },
  Connect: {
    title: "Connect",
    description: "Reach out to discuss your blueprint or book spatial planning consults.",
    items: [
      { title: "Schedule a Consultation", description: "Book a structural estimate or Vastu mapping audit.", href: "/#connect", icon: Calendar },
      { title: "Office Locations", description: "Our corporate headquarters at Crystal Palm, Jaipur.", href: "/#connect", icon: MapPin },
      { title: "General Inquiries", description: "Get in touch for partnerships, press, or info.", href: "/#connect", icon: Mail }
    ]
  }
};

interface NavbarProps {
  user: any;
  onSignIn: () => void;
  onSignOut: () => void;
}

export const Navbar = ({ user, onSignIn, onSignOut }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Monitor Scroll State
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY > 50;
          setIsScrolled(prev => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Desktop Hover State (with slight delay to avoid accidental triggers)
  const handleMouseEnter = (category: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveCategory(category);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 200); // 200ms grace period
  };

  // Close menus on clicking a sub-link (ideal for SPA smooth scrolling)
  const handleSubLinkClick = () => {
    setActiveCategory(null);
    setMobileMenuOpen(false);
  };

  // Toggle category on mobile accordions
  const handleMobileCategoryToggle = (category: string) => {
    setExpandedMobileCategory(prev => prev === category ? null : category);
  };

  return (
    <nav 
      ref={navRef}
      role="navigation"
      aria-label="Main Navigation"
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/85 backdrop-blur-xl py-4 border-b border-zinc-200/50 shadow-sm' 
          : 'bg-zinc-950/80 backdrop-blur-lg py-4 border-b border-zinc-900/40 xl:bg-transparent xl:border-none xl:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand / Logo */}
        <Link 
          to="/"
          onClick={handleSubLinkClick}
          className={`flex items-center gap-3 text-2xl font-black tracking-tighter group cursor-pointer ${
            isScrolled ? 'text-zinc-900' : 'text-white'
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
            isScrolled 
              ? 'bg-zinc-900 text-teal-400 shadow-xl shadow-teal-500/10 group-hover:rotate-12' 
              : 'bg-white text-zinc-900 group-hover:-rotate-12 group-hover:bg-teal-500 group-hover:text-white'
          }`}>
             <Building2 size={20} className="transition-transform group-hover:scale-110" />
          </div>
          <span className="relative">
            SANCHAR
            <span className={`absolute -right-2 top-0 w-1.5 h-1.5 rounded-full ${
              isScrolled ? 'bg-teal-500' : 'bg-white'
            } animate-pulse`} />
          </span>
        </Link>

        {/* Desktop Menu - Mega-Menu Nav Bar */}
        <div className="hidden xl:flex space-x-2 items-center">
          {Object.keys(CATEGORIES).map((key) => {
            const isActive = activeCategory === key;
            return (
              <div 
                key={key}
                onMouseEnter={() => handleMouseEnter(key)}
                onMouseLeave={handleMouseLeave}
                className="relative py-2"
              >
                <button
                  type="button"
                  aria-expanded={isActive}
                  aria-haspopup="true"
                  aria-controls={`dropdown-${key}`}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                    isActive
                      ? 'bg-zinc-150/40 text-teal-500'
                      : isScrolled ? 'text-zinc-500 hover:text-teal-500' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {key}
                  <ChevronDown 
                    size={11} 
                    className={`transition-transform duration-300 ${isActive ? 'rotate-180 text-teal-500' : 'text-zinc-400'}`} 
                  />
                </button>

                {/* Desktop Dropdown Mega Panel */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      id={`dropdown-${key}`}
                      role="menu"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[650px] z-50 pointer-events-auto"
                    >
                      <div className="bg-white/95 backdrop-blur-xl border border-zinc-200/50 shadow-2xl p-8 rounded-3xl grid grid-cols-1 gap-6 relative overflow-hidden">
                        {/* HSL-Matched Top Glow Stripe */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-300 via-teal-400 to-teal-500" />
                        
                        <div className="border-b border-zinc-100 pb-4">
                          <p className="text-[9px] font-black text-teal-500 uppercase tracking-widest">{CATEGORIES[key].title}</p>
                          <p className="text-[11px] text-zinc-400 font-medium mt-1">{CATEGORIES[key].description}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {CATEGORIES[key].items.map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                              <Link
                                key={idx}
                                to={item.href}
                                onClick={handleSubLinkClick}
                                className="group/item flex flex-col gap-2 p-4 bg-zinc-50/50 border border-zinc-100 hover:bg-teal-50/20 hover:border-teal-300/40 rounded-2xl transition-all duration-300 shadow-sm"
                              >
                                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-650 flex items-center justify-center group-hover/item:bg-teal-500 group-hover/item:text-white transition-all">
                                  <IconComponent size={16} />
                                </div>
                                <div>
                                  <p className="text-zinc-800 font-bold text-[10px] uppercase tracking-wider group-hover/item:text-teal-600 transition-colors">
                                    {item.title}
                                  </p>
                                  <p className="text-[9px] text-zinc-500 leading-normal font-light mt-1">
                                    {item.description}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1 text-[8px] font-black uppercase text-teal-600 opacity-0 group-hover/item:opacity-100 transition-opacity mt-auto pt-2">
                                  Explore <ArrowRight size={10} />
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Estimator Highlighted Shortcut */}
          <Link
            to="/#estimator"
            onClick={handleSubLinkClick}
            className={`flex items-center gap-1.5 px-4.5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-all duration-300 active:scale-95 relative group/est border ${
              isScrolled
                ? 'border-teal-500/60 text-teal-650 bg-teal-50/40 hover:bg-teal-50 hover:text-teal-700 shadow-sm shadow-teal-500/5'
                : 'border-white/20 text-white bg-white/5 hover:bg-white/10 hover:border-white/40 shadow-sm shadow-white/5'
            }`}
          >
            <Sparkles size={11} className={`transition-transform duration-300 group-hover/est:scale-125 group-hover/est:rotate-12 ${
              isScrolled ? 'text-teal-500' : 'text-teal-300'
            }`} />
            <span>Estimator</span>
            
            {/* Glowing Accent Pulse Dot */}
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isScrolled ? 'bg-teal-500' : 'bg-white'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                isScrolled ? 'bg-teal-650' : 'bg-teal-200'
              }`}></span>
            </span>
          </Link>

          {/* Active User authentication profile panel */}
          <div className="pl-4 border-l border-zinc-200/50 ml-2">
            {user ? (
              <div className="relative group/user">
                <div className={`flex items-center gap-2.5 px-4 py-1.5 rounded-full border backdrop-blur-md cursor-pointer transition-all duration-300 ${
                  isScrolled 
                    ? 'border-zinc-200 bg-zinc-50 text-zinc-900' 
                    : 'border-white/10 bg-white/5 text-white'
                }`}>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} className="w-5 h-5 rounded-full border border-teal-400" />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center text-[9px] font-bold uppercase">
                      {user.displayName?.slice(0, 2)}
                    </div>
                  )}
                  <span className="text-[10px] font-black uppercase tracking-wider">{user.displayName?.split(" ")[0]}</span>
                </div>
                
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible transition-all duration-300 z-50">
                  <div className="bg-zinc-950 text-white border border-zinc-800 rounded-2xl p-4 shadow-xl min-w-[200px] flex flex-col gap-3">
                    <div className="border-b border-zinc-800 pb-2">
                      <p className="text-[8px] font-black text-teal-400 uppercase tracking-widest">Active Partner</p>
                      <p className="text-xs font-bold truncate mt-0.5">{user.displayName}</p>
                      <p className="text-[9px] text-zinc-500 truncate">{user.email}</p>
                    </div>
                    <button 
                      onClick={onSignOut} 
                      className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors w-full cursor-pointer"
                    >
                      Disconnect <LogOut size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={onSignIn} 
                className={`flex items-center gap-2 px-5 py-2 rounded-full border text-[10px] font-black tracking-widest uppercase transition-all shadow-sm active:scale-95 cursor-pointer ${
                  isScrolled 
                    ? 'border-teal-500 bg-teal-50/50 text-teal-650 hover:bg-teal-500 hover:text-white' 
                    : 'border-white/20 bg-white/5 text-white hover:bg-white hover:text-zinc-900'
                }`}
              >
                Sign In <LogIn size={11} className="text-teal-400" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Hamburger menu toggle button */}
        <button 
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          className={`xl:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            isScrolled ? 'bg-teal-500 text-white shadow-md' : 'bg-white/10 backdrop-blur-md text-white'
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Sliding Drawer & Accordion dropdowns */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Drawer Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 xl:hidden"
            />
            
            {/* Drawer Body */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[85%] max-w-sm bg-white z-50 p-6 flex flex-col shadow-2xl overflow-y-auto xl:hidden"
            >
              {/* Header inside drawer */}
              <div className="flex items-center justify-between border-b border-zinc-100 pb-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-500 text-white flex items-center justify-center">
                    <Building2 size={16} />
                  </div>
                  <span className="font-sans font-black text-zinc-900 uppercase tracking-tighter">SANCHAR</span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-500 flex items-center justify-center hover:bg-zinc-200"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Accordion Categories */}
              <div className="flex flex-col gap-4 flex-grow">
                {Object.keys(CATEGORIES).map((key) => {
                  const isExpanded = expandedMobileCategory === key;
                  return (
                    <div key={key} className="border-b border-zinc-100 pb-3">
                      <button
                        type="button"
                        onClick={() => handleMobileCategoryToggle(key)}
                        className="flex items-center justify-between w-full text-left py-2 text-zinc-800 font-black text-xs uppercase tracking-widest"
                      >
                        {key}
                        <ChevronDown 
                          size={14} 
                          className={`transition-transform duration-300 text-zinc-400 ${isExpanded ? 'rotate-180 text-teal-500' : ''}`}
                        />
                      </button>

                      {/* Accordion Content Drawer */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-3 pl-3 pt-3 pb-2 border-l border-teal-100/70 ml-1">
                              {CATEGORIES[key].items.map((item, idx) => {
                                const IconComponent = item.icon;
                                return (
                                  <Link
                                    key={idx}
                                    to={item.href}
                                    onClick={handleSubLinkClick}
                                    className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl hover:bg-teal-50/20 hover:text-teal-600 transition-colors"
                                  >
                                    <div className="w-7 h-7 rounded-lg bg-white border border-zinc-150 flex items-center justify-center text-teal-600 shadow-sm">
                                      <IconComponent size={14} />
                                    </div>
                                    <div>
                                      <p className="text-[10px] font-bold text-zinc-800 uppercase tracking-wide">
                                        {item.title}
                                      </p>
                                      <p className="text-[8px] text-zinc-500 mt-0.5">
                                        {item.description}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Cost Estimator Mobile Shortcut */}
                <div className="pt-2 pb-1 border-b border-zinc-100">
                  <Link
                    to="/#estimator"
                    onClick={handleSubLinkClick}
                    className="flex items-center justify-between w-full text-left p-4 bg-teal-50 border border-teal-500/30 text-teal-650 font-black text-xs uppercase tracking-widest rounded-2xl shadow-sm hover:bg-teal-100/50 transition-all duration-300 relative overflow-hidden"
                  >
                    <span className="flex items-center gap-2 relative z-10">
                      <Sparkles size={14} className="text-teal-500" />
                      Cost Estimator
                    </span>
                    <ArrowRight size={14} className="text-teal-500 relative z-10" />
                  </Link>
                </div>
              </div>

              {/* Drawer Footer Authentication */}
              <div className="border-t border-zinc-100 pt-6 mt-6">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-2xl border border-zinc-100">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full border border-teal-500" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs font-bold uppercase">
                          {user.displayName?.slice(0, 2)}
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-bold text-zinc-900">{user.displayName}</p>
                        <p className="text-[10px] text-zinc-500 truncate max-w-[180px]">{user.email}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => { onSignOut(); setMobileMenuOpen(false); }} 
                      className="flex items-center justify-center gap-2 w-full bg-red-50 text-red-500 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-red-100 transition-colors"
                    >
                      Sign Out <LogOut size={12} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => { onSignIn(); setMobileMenuOpen(false); }} 
                    className="flex items-center justify-center gap-2 w-full bg-teal-500 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer shadow-lg shadow-teal-500/20 hover:bg-teal-650 transition-colors"
                  >
                    Sign In with Google <LogIn size={12} />
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
