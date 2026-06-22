"use client";

import { ScrollReelTestimonials } from "@/components/ui/scroll-reel-testimonials";

const TESTIMONIALS = [
  {
    quote:
      "The quiz platform was delivered exactly as envisioned. Fast, engaging, and built to keep users coming back every day.",
    author: "dream10.in",
    image: "https://dream10.in/logo.jpg",
    alt: "Dream10",
  },
  {
    quote:
      "From shipping workflows to dashboard UX, every detail was thoughtfully executed. The final product feels enterprise-ready.",
    author: "cashbackwallah.com",
    image: "https://cashbackwallah.com/fav.jpg",
    alt: "CashbackWallah",
  },
  {
    quote:
      "Complex counselling data, college predictors, and admission resources were organized into a seamless experience for students.",
    author: "neetcounselors.com",
    image: "https://neetcounselors.com/favicon.svg",
    alt: "NEET Counselors",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 md:py-32 bg-background flex flex-col items-center"
    >
      <div className="container mx-auto px-6 max-w-7xl mb-16 md:mb-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            What People Say
          </h1>
        </div>
      </div>
      <ScrollReelTestimonials testimonials={TESTIMONIALS} />
    </section>
  );
}
