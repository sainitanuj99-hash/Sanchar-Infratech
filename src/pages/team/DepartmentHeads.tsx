import React from 'react';
import { SubPageLayout } from '../../components/SubPageLayout';

const pageData = {
  title: "Department Heads",
  category: "Our Team",
  description: "The operational heads overseeing on-site execution, structural safety audits, and smart technology integrations.",
  cards: [
    {
      title: "Bhanwar Lal Mehra (Lead Architect)",
      description: "Overseeing the architectural vision across all projects with over 15+ years of experience in the field. Leads a team of 5 executive architects, ensuring design integrity, innovation, and seamless execution from concept to completion.",
      image: "/bhanwar.png"
    },
    {
      title: "Jagdish Gurjar (Site Engineer)",
      description: "Responsible for day-to-day site engineering operations, ensuring construction activities align with technical drawings and quality standards while coordinating between design and execution teams.",
      image: "/jagdish.png"
    },
    {
      title: "Waheed Khan (Surveyor)",
      description: "Conducts precise land and site surveys, ensuring accurate measurements, boundary verification, and elevation data critical for project planning and construction layout.",
      image: "/waheed.png"
    }
  ]
};

export default function DepartmentHeads() {
  return <SubPageLayout {...pageData} />;
}
