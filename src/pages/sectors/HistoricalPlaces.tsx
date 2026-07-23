import React from 'react';
import { SubPageLayout } from '../../components/SubPageLayout';

const pageData = {
  title: "Historical Places & Heritage",
  category: "Core Sectors",
  description: "Sanchar Infratech's specialized division dedicated to the structural preservation, conservation, and sustainable tourism development of India's iconic historical landmarks and ancient cultural heritage sites.",
  cards: [
    {
      title: "Archaeological Conservation",
      description: "Employing traditional lime-surkhi mortars, non-destructive chemical cleaning, and artisanal hand-chiseling to meticulously restore ancient stone carvings, arches, and dome structures.",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Heritage Tourism Infrastructure",
      description: "Designing eco-friendly visitor pathways, subtle aesthetic solar lighting grids, digital interactive interpretation centers, and organic landscaping that blends with historical aesthetics.",
      image: "https://images.unsplash.com/photo-1477584322902-471a5db55d36?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Seismic & Structural Stabilization",
      description: "Implementing state-of-the-art laser-based settlement monitoring, underground micropiling, and discreet structural tie-backs to safeguard towering ancient spires and fort walls.",
      image: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?q=80&w=600&auto=format&fit=crop"
    }
  ],
  galleryImages: [
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1602643163983-ed0babc39797?q=80&w=600&auto=format&fit=crop"
  ]
};

export default function HistoricalPlaces() {
  return <SubPageLayout {...pageData} />;
}
