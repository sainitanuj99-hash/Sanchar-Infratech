import React from 'react';
import { SubPageLayout } from '../../components/SubPageLayout';

const pageData = {
  title: "Ongoing Initiatives",
  category: "Our Portfolio",
  description: "Real-time construction timelines of our active sites under strict supervision and quality control.",
  cards: [
    {
      title: "Sanchar Heights Towers",
      description: "A luxury multi-family high-rise complex. Currently at 85% concrete column casting with real-time site camera streaming active.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Jaipur Youth Sports Hub",
      description: "Developing standard cricket pitch foundations and municipal sports complex frameworks. Currently grading outfields and laying tracks.",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Signature Tech Plaza",
      description: "A modern commercial complex at Tonk Road, Jaipur. Currently routing high-density slab fiber backbones and interior HVAC structures.",
      image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?q=80&w=600&auto=format&fit=crop"
    }
  ],
  galleryImages: [
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1590674899484-d5640e854abe?q=80&w=600&auto=format&fit=crop"
  ]
};

export default function Ongoing() {
  return <SubPageLayout {...pageData} />;
}
