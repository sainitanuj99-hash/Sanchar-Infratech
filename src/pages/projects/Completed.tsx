import React from 'react';
import { SubPageLayout } from '../../components/SubPageLayout';

const pageData = {
  title: "Completed Portfolio",
  category: "Our Portfolio",
  description: "A showcase of premium projects delivered successfully on-schedule and in absolute compliance with structural expectations.",
  cards: [
    {
      title: "Pt. Deen Dayal Upadhyay Hospital (300 Bedded)",
      description: "Pandit Deen Dayal Government Hospital, a dedicated hospital in Hospitals located in Gangori Bazar.",
      image: "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/Update_the_hospital_building_facade_202606161324.jpeg"
    },
    {
      title: "SNG’s OZONE",
      description: "Ozone in Sirsi Road, Jaipur is a ready-to-move housing society. It offers apartments in varied budget range.",
      image: "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/ozone1large-1-1.jpg"
    },
    {
      title: "Jaipur Club",
      description: "An elite structural overhaul of the historic club's sports stands, creating master-grade pitches and high-lux floodlighting arrays.",
      image: "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/1713608977IMG-20240320-WA0007.jpg"
    }
  ],
  galleryImages: [
    "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/01JP45MTBHKR09R5RW6P1VWK0N-w1024.jpg",
    "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/1687932017.jpg",
    "https://sancharinfratech-com-431288.hostingersite.com/wp-content/uploads/2026/06/Picture1.png"
  ]
};

export default function Completed() {
  return <SubPageLayout {...pageData} />;
}
