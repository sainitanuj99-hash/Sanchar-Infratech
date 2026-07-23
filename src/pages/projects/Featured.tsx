import React from 'react';
import { SubPageLayout } from '../../components/SubPageLayout';

const pageData = {
  title: "Featured Developments",
  category: "Our Portfolio",
  description: "A premium showcase of Sanchar Infratech's flagship commercial complexes and award-winning residential masterworks.",
  cards: [
    {
      title: "Silver Soil Industrial Park",
      description: "Proposed Industrial Area cater to the export-import requirements at Industrial & Economical Growth pole..",
      image: "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/slvr.jpg"
    },
    {
      title: "Resort at S. Madhopur",
      description: "Escape the ordinary. Unwind in the lap of nature at Sawai Madhopur.",
      image: "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/02/ascas-1.jpg"
    },
    {
      title: "Shree Enclave",
      description: " Shree Enclave in Niwaru  Road, Jaipur is a ready-to-move housing society. It offers apartments in varied budget range. These units are a perfect combination of comfort and style",
      image: "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/shree-enclave-slide1.png"
    }
  ],
  galleryImages: [
    "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/coming-soon.png",
    "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/befunky_screenshot3.jpg.jpg",
    "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/projGal-2-770x400-1.jpeg"
  ]
};

export default function Featured() {
  return <SubPageLayout {...pageData} />;
}
