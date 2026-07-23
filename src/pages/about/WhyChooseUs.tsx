import React from 'react';
import { SubPageLayout } from '../../components/SubPageLayout';

const pageData = {
  title: "Why Choose Us",
  category: "About Sanchar",
  description: "Discover our commitment to uncompromised structural integrity, client transparency, and state-of-the-art engineering practices.",
  cards: [
    {
      title: "24/7 Live Site Surveillance",
      description: "We provide secure, high-definition IP camera access to our construction sites. Track your asset's physical pouring and structural framing in real-time."
    },
    {
      title: "Vastu-Compliant Blueprints",
      description: "Every residential layout is designed in strict compliance with traditional Vastu Shastra, optimizing spatial flow, natural ventilation, and daylighting."
    },
    {
      title: "ISO & IGBC Certified Safety",
      description: "Constructed with rigorous safety audits, sustainable water preservation metrics, and certified thermal insulation solutions that lower running costs."
    }
  ]
};

export default function WhyChooseUs() {
  return <SubPageLayout {...pageData} />;
}
