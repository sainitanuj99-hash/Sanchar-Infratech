import React from 'react';
import { SubPageLayout } from '../../components/SubPageLayout';

const pageData = {
  title: "Accreditations & Associations",
  category: "About Sanchar",
  description: "Our formal certifications and associations with top structural safety, quality control, and ecological organizations.",
  cards: [
    {
      title: "ISO 9001:2015 Certification",
      description: "Accredited for our systematic quality management systems, ensuring regular concrete batch testing, and certified safety workflows."
    },
    {
      title: "IGBC Silver Member",
      description: "Proud members of the Indian Green Building Council, promoting rainwater harvesting, energy-saving glass, and local source supply networks."
    },
    {
      title: "CREDAI Elite Member",
      description: "Associated with India's apex body for private real estate developers, securing absolute compliance with local real estate regulations and builders trust."
    }
  ]
};

export default function Accreditations() {
  return <SubPageLayout {...pageData} />;
}
