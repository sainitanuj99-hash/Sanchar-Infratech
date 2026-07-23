import React from 'react';
import { SubPageLayout } from '../../components/SubPageLayout';

const pageData = {
  title: "Real Estate & Construction",
  category: "Core Sectors",
  description: "Redefining the skyline of Jaipur with high-end corporate complexes, luxury apartments, and premium boutique retail hubs.",
  cards: [
    {
      title: "Bespoke Residences",
      description: "Crafting architectural homes featuring double-height entry lobbies, automated smart ventilation, private sky decks, and hand-selected marble finishes.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Premium Corporate Hubs",
      description: "Engineering robust commercial towers equipped with high-speed digital elevators, centralized HVAC systems, and open flexible floor-plates.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Boutique Retail Complexes",
      description: "Developing shopping nodes designed around high foot-traffic layouts, premium visible store fronts, and integrated multi-tier automated parking.",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=600&auto=format&fit=crop"
    }
  ],
  galleryImages: [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop"
  ]
};

export default function RealEstate() {
  return <SubPageLayout {...pageData} />;
}
