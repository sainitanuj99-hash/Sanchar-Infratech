import React from 'react';
import { SubPageLayout } from '../../components/SubPageLayout';

const pageData = {
  title: "Sports & Community",
  category: "Core Sectors",
  description: "Constructing world-class athletic facilities, training academies, and cricket-centric stadium infratech.",
  cards: [
    {
      title: "Cricket Ground Specifications",
      description: "Precisely graded outfields, customized multi-layer clay pitches, high-lux professional LED floodlights, and premium structural concrete pavilion seating.",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Indoor Training Arenas",
      description: "Developing multi-sport athletic tracks, high-durability synthetic courts, high-clearance timber roofings, and dedicated wellness clinics.",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Community Sports Parks",
      description: "Developing lush public green spaces complete with active perimeter jogging tracks, solar-powered open gyms, and drainage networks.",
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop"
    }
  ],
  galleryImages: [
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?q=80&w=600&auto=format&fit=crop"
  ]
};

export default function SportsCommunity() {
  return <SubPageLayout {...pageData} />;
}
