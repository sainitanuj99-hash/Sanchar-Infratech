import React from 'react';
import { SubPageLayout } from '../../components/SubPageLayout';

const pageData = {
  title: "Join Our Team",
  category: "Our Team",
  description: "Expand your career horizons by joining Rajasthan's premier structural engineering and construction innovators.",
  cards: [
    {
      title: "Senior Civil Engineer",
      description: "Require civil engineering degree holders with 5+ years experience managing concrete pourings and steel layout alignments in Jaipur."
    },
    {
      title: "Assistant Vastu Architect",
      description: "Seeking a designer with expert knowledge of spatial drawing software and active credentials in Vastu Shastra principles."
    },
    {
      title: "Smart Infrastructure Analyst",
      description: "Join our tech team configuring IoT sensors, smart HVAC controls, and optical fiber conduits for our premium commercial hubs."
    }
  ]
};

export default function JoinUs() {
  return <SubPageLayout {...pageData} />;
}
