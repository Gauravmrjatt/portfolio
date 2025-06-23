"use client"
import NavBar from "@/components/magicui/NavBar";
import TextAnimation from "@/components/TextAnimation";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";

import { Icon } from "@iconify/react";
import HeroSection from "./Hero";
import TechStackSection from "./TechStack";
import AboutMe from "./About";
import Projects from "./Projects";
import GetInTouch from "@/app/GetInTouch";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <div className="snap-y  overflow-hidden  h-screen snap-mandatory overflow-y-auto hide-scrollbar ">
        {/* main hero section */}
        <HeroSection />
        {/* stack  marquee */}
        <div className="border-t border-b snap-start bg-background">
          <marquee behavior="scrolling">
            <div className="flex p-3">
              <TextAnimation>
                FULL-STACK
              </TextAnimation>
              <div className="ml-[70px] mr-[70px] text-3xl"> | </div>
              <TextAnimation>
                FRONTEND
              </TextAnimation>
              <div className="ml-[70px] mr-[70px] text-3xl"> | </div>
              <TextAnimation>
                BACKEND
              </TextAnimation>
              <div className="ml-[70px] mr-[70px] text-3xl"> | </div>
              <TextAnimation>
                UI/UX
              </TextAnimation>
              <div className="ml-[70px] mr-[70px] text-3xl"> | </div>
              <TextAnimation>
                DEVOPS
              </TextAnimation>
              <div className="ml-[70px] mr-[70px] text-3xl"> | </div>
              <TextAnimation>
                CLOUD
              </TextAnimation>
              <div className="ml-[70px] mr-[70px] text-3xl"> | </div>
              <TextAnimation>
                DATABASES
              </TextAnimation>
              <div className="ml-[70px] mr-[70px] text-3xl"> | </div>
              <TextAnimation> SECURITY </TextAnimation>
            </div>
          </marquee>
        </div>

        {/* about me */}
        <AboutMe />

        {/* tech and skills */}
        <TechStackSection />

        {/* projects */}
        <Projects />
        {/* contacts */}
        <GetInTouch />

        {/* footer */}
        <Footer />
      </div>
    </>
  );
}
