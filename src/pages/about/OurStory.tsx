import React from 'react';
import { SubPageLayout } from '../../components/SubPageLayout';

const pageData = {
  title: "Our Story",
  category: "About Sanchar",
  description: "Explore the 15+ year history, architectural milestones, and founding vision that shaped Sanchar Infratech into an industry leader.",
  cards: [
    {
      title: "The Foundation (2011)",
      description: "Established in Jaipur with a vision to deliver premium civil structures built on absolute client trust, meticulous engineering, and transparent operations."
    },
    {
      title: "Milestone Expansion (2018)",
      description: "Diversified into institutional complex designs, boutique shopping centers, luxury high-rises, and smart home residential blueprints across Rajasthan."
    },
    {
      title: "Future Blueprint (2026+)",
      description: "Leading Rajasthan's green building shift by incorporating IGBC-certified materials, smart grid automation systems, and carbon-neutral building techniques."
    }
  ]
};

export default function OurStory() {
  return <SubPageLayout {...pageData} />;
}
