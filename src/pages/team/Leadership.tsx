import React from 'react';
import { SubPageLayout } from '../../components/SubPageLayout';

const pageData = {
  title: "Leadership & Directors",
  category: "Our Team",
  description: "Meet the visionary board of directors and managing officers leading Sanchar Infratech's structural mission.",
  cards: [
    {
      title: "Er Akhilesh Kumar Mittal (Director)",
      description: "Er Akhilesh Kumar Mittal is a Director at Sanchar Infratech and a qualified Civil Engineer holding B.Tech and M.Tech degrees, complemented by expertise as an Astro Vastu Planner. He combines technical engineering precision with Vastu-compliant design principles, overseeing corporate strategy, project auditing, and financial compliance while ensuring structural integrity and holistic planning across all infrastructure developments.",
      image: "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/WhatsApp-Image-2026-02-21-at-6.17.51-PM-2-1.png",
    },
    {
      title: "Dr Pushpendra Kumar Mittal (Director)",
      description: "Dr Pushpendra Kumar Mittal is a Director at Sanchar Infratech and a distinguished Urban Planner and Economist. He brings a unique blend of macro-level urban planning expertise and economic analysis to steer structural design and operations, shaping the strategic vision and premium standards of Sanchar's infrastructure developments.",
      image: "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/WhatsApp-Image-2026-02-21-at-6.17.51-PM-1.png",
    },
    {
      title: "Shri Manohar Kant (Advisor (Retd. IAS))",
      description: "Shri Manohar Kant Ji serves as an Advisor at Sanchar Infratech, bringing the administrative rigor and governance experience of a retired IAS officer. He oversees complex site workflows, scheduling precision, and technical operations across the organization's infrastructure projects.",
      image: "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/02/Gemini_Generated_Image_x8zg3x8zg3x8zg3x-1.png"
    },
    {
      title: "Mr Tanamaya Mittal (Director)",
      description: "Mr Tanmaya Mittal is a Director at Sanchar Infratech, contributing to the company's strategic growth and infrastructure development initiatives. He plays a key role in driving operational excellence and upholding the organization's commitment to quality and sustainability.",
      image: "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/02/Gemini_Generated_Image_g0roc7g0roc7g0ro-1.png"
    }
  ]
};

export default function Leadership() {
  return <SubPageLayout {...pageData} />;
}
