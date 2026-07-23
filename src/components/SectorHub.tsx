import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Compass, Trophy, Globe } from 'lucide-react';

export default function SectorHub() {
  const [hoveredNode, setHoveredNode] = useState<'real-estate' | 'heritage' | 'sports' | 'center' | null>(null);
  const navigate = useNavigate();

  const getStatsContent = () => {
    switch (hoveredNode) {
      case 'real-estate':
        return {
          title: 'Real Estate & Construction',
          stat: '48 Projects Delivered • Premium Residential & Commercial Hubs',
          icon: <Building2 className="w-5 h-5 text-teal-400 animate-bounce" />,
          colorClass: 'text-teal-400'
        };
      case 'heritage':
        return {
          title: 'Historical Places & Heritage',
          stat: '12 Heritage Restorations • Architectural Conservation Excellence',
          icon: <Compass className="w-5 h-5 text-sky-400 animate-spin" style={{ animationDuration: '3s' }} />,
          colorClass: 'text-sky-400'
        };
      case 'sports':
        return {
          title: 'Sports & Community',
          stat: '9 Community Arenas • 3 International-Grade Sports Hubs',
          icon: <Trophy className="w-5 h-5 text-purple-400 animate-pulse" />,
          colorClass: 'text-purple-400'
        };
      default:
        return {
          title: 'Sanchar Core Sectors Constellation',
          stat: 'Hover over a sector node to explore key metrics and details',
          icon: <Globe className="w-5 h-5 text-teal-500/60" />,
          colorClass: 'text-teal-400/80'
        };
    }
  };

  const currentStats = getStatsContent();

  return (
    <div className="w-full flex flex-col justify-center items-center bg-black/40 rounded-3xl p-6 border border-zinc-800/80 backdrop-blur-md transform-gpu">
      {/* SVG Container */}
      <div 
        style={{ 
          width: '100%', 
          maxWidth: '600px', 
          height: '340px',
          backgroundImage: `
            radial-gradient(circle at center, transparent 35%, rgba(9, 9, 11, 0.98) 100%),
            linear-gradient(to right, rgba(20, 184, 166, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(20, 184, 166, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 30px 30px, 30px 30px',
          backgroundPosition: 'center'
        }} 
        className="relative overflow-hidden rounded-2xl bg-zinc-950/95 border border-zinc-900"
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 600 340"
          className="select-none"
        >
          <defs>
            {/* Linear Gradients */}
            <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#0d9488" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="lineGradRealEstate" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="lineGradHeritage" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="lineGradSports" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          <style>{`
            @keyframes drawLine {
              to {
                stroke-dashoffset: 0;
              }
            }
            @keyframes rotateCw {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes rotateCcw {
              from { transform: rotate(0deg); }
              to { transform: rotate(-360deg); }
            }
            @keyframes pulse {
              0% { r: 52; opacity: 0.5; }
              50% { r: 59; opacity: 0.15; }
              100% { r: 52; opacity: 0.5; }
            }
            .connector-line {
              stroke-dasharray: 180;
              stroke-dashoffset: 180;
              stroke-width: 1.5;
              stroke-linecap: round;
              transition: stroke 0.3s, stroke-width 0.3s;
            }
            .line-real-estate {
              animation: drawLine 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.2s;
            }
            .line-heritage {
              animation: drawLine 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.5s;
            }
            .line-sports {
              animation: drawLine 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.8s;
            }
            .line-real-estate.line-active {
              stroke: rgba(20, 184, 166, 0.75) !important;
              stroke-width: 3.5;
            }
            .line-heritage.line-active {
              stroke: rgba(56, 189, 248, 0.75) !important;
              stroke-width: 3.5;
            }
            .line-sports.line-active {
              stroke: rgba(168, 85, 247, 0.75) !important;
              stroke-width: 3.5;
            }
            .orbit-rotate-clockwise {
              transform-origin: 300px 170px;
              animation: rotateCw 60s linear infinite;
            }
            .orbit-rotate-counter {
              transform-origin: 300px 170px;
              animation: rotateCcw 40s linear infinite;
            }
            .pulse-circle {
              transform-origin: 300px 170px;
              animation: pulse 3s ease-in-out infinite;
            }
            .node-group {
              transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s;
              cursor: pointer;
            }
            .node-group:hover {
              transform: scale(1.06);
            }
            #node-real-estate { transform-origin: 150px 80px; }
            #node-heritage { transform-origin: 450px 80px; }
            #node-sports { transform-origin: 300px 270px; }
            #node-center { transform-origin: 300px 170px; }
          `}</style>

          {/* Concentric orbit rings */}
          <circle cx="300" cy="170" r="140" fill="none" stroke="rgba(20, 184, 166, 0.05)" strokeWidth="1" strokeDasharray="5, 5" className="orbit-rotate-clockwise" />
          <circle cx="300" cy="170" r="100" fill="none" stroke="rgba(56, 189, 248, 0.03)" strokeWidth="1" strokeDasharray="3, 3" className="orbit-rotate-counter" />

          {/* Connector Lines */}
          <line 
            x1="300" y1="170" 
            x2="150" y2="80" 
            stroke="url(#lineGradRealEstate)"
            className={`connector-line line-real-estate ${hoveredNode === 'real-estate' ? 'line-active' : ''}`}
          />
          <line 
            x1="300" y1="170" 
            x2="450" y2="80" 
            stroke="url(#lineGradHeritage)"
            className={`connector-line line-heritage ${hoveredNode === 'heritage' ? 'line-active' : ''}`}
          />
          <line 
            x1="300" y1="170" 
            x2="300" y2="270" 
            stroke="url(#lineGradSports)"
            className={`connector-line line-sports ${hoveredNode === 'sports' ? 'line-active' : ''}`}
          />

          {/* Central Hub Node */}
          <g 
            id="node-center" 
            className="node-group" 
            onMouseEnter={() => setHoveredNode('center')} 
            onMouseLeave={() => setHoveredNode(null)}
            style={{ filter: hoveredNode === 'center' ? 'drop-shadow(0 0 15px rgba(20, 184, 166, 0.55))' : 'drop-shadow(0 0 6px rgba(20, 184, 166, 0.15))' }}
          >
            <circle cx="300" cy="170" r="54" fill="none" stroke="rgba(20, 184, 166, 0.2)" strokeWidth="1.5" className="pulse-circle" />
            <circle cx="300" cy="170" r="48" fill="rgba(9, 9, 11, 0.95)" stroke="url(#tealGradient)" strokeWidth="2.5" />
            <text x="300" y="166" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="900" letterSpacing="1.5" fontFamily="sans-serif">SANCHAR</text>
            <text x="300" y="181" textAnchor="middle" fill="#14b8a6" fontSize="9.5" fontWeight="800" letterSpacing="1" fontFamily="sans-serif">INFRATECH</text>
          </g>

          {/* Sector Node: Real Estate & Construction */}
          <g 
            id="node-real-estate" 
            className="node-group" 
            onMouseEnter={() => setHoveredNode('real-estate')} 
            onMouseLeave={() => setHoveredNode(null)} 
            onClick={() => navigate('/sectors/real-estate')}
            style={{ filter: hoveredNode === 'real-estate' ? 'drop-shadow(0 0 12px rgba(20, 184, 166, 0.5))' : 'none' }}
          >
            <circle cx="150" cy="80" r="44" fill="rgba(15, 23, 42, 0.85)" stroke={hoveredNode === 'real-estate' ? '#14b8a6' : 'rgba(20, 184, 166, 0.4)'} strokeWidth="1.5" className="transition-all duration-300" />
            <text x="150" y="77" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">Real Estate</text>
            <text x="150" y="91" textAnchor="middle" fill="#14b8a6" fontSize="8.5" fontWeight="medium" fontFamily="sans-serif">& Construction</text>
          </g>

          {/* Sector Node: Historical Places & Heritage */}
          <g 
            id="node-heritage" 
            className="node-group" 
            onMouseEnter={() => setHoveredNode('heritage')} 
            onMouseLeave={() => setHoveredNode(null)} 
            onClick={() => navigate('/sectors/historical-places')}
            style={{ filter: hoveredNode === 'heritage' ? 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.5))' : 'none' }}
          >
            <circle cx="450" cy="80" r="44" fill="rgba(15, 23, 42, 0.85)" stroke={hoveredNode === 'heritage' ? '#38bdf8' : 'rgba(56, 189, 248, 0.4)'} strokeWidth="1.5" className="transition-all duration-300" />
            <text x="450" y="77" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">Historical</text>
            <text x="450" y="91" textAnchor="middle" fill="#38bdf8" fontSize="8.5" fontWeight="medium" fontFamily="sans-serif">Heritage</text>
          </g>

          {/* Sector Node: Sports & Community */}
          <g 
            id="node-sports" 
            className="node-group" 
            onMouseEnter={() => setHoveredNode('sports')} 
            onMouseLeave={() => setHoveredNode(null)} 
            onClick={() => navigate('/sectors/sports-community')}
            style={{ filter: hoveredNode === 'sports' ? 'drop-shadow(0 0 12px rgba(168, 85, 247, 0.5))' : 'none' }}
          >
            <circle cx="300" cy="270" r="44" fill="rgba(15, 23, 42, 0.85)" stroke={hoveredNode === 'sports' ? '#a855f7' : 'rgba(168, 85, 247, 0.4)'} strokeWidth="1.5" className="transition-all duration-300" />
            <text x="300" y="267" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">Sports &</text>
            <text x="300" y="281" textAnchor="middle" fill="#a855f7" fontSize="8.5" fontWeight="medium" fontFamily="sans-serif">Community</text>
          </g>
        </svg>
      </div>

      {/* Stats Display Panel */}
      <div className="w-full mt-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-sm min-h-[76px] flex items-center justify-center transition-all duration-300">
        <div className="flex items-center gap-4 max-w-md">
          <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-center">
            {currentStats.icon}
          </div>
          <div className="text-left">
            <h5 className={`text-sm font-bold tracking-wide uppercase ${currentStats.colorClass} transition-colors duration-300`}>
              {currentStats.title}
            </h5>
            <p className="text-zinc-400 text-xs mt-0.5 leading-relaxed font-light transition-colors duration-300">
              {currentStats.stat}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
