"use client"
import TextAnimation from "@/components/TextAnimation";
import LazySection from "@/components/LazySection";
import HeroSection from "./Hero";
import TechStackSection from "./TechStack";
import AboutMe from "./About";
import Projects from "./Projects";
import GetInTouch from "@/app/GetInTouch";
import Footer from "./Footer";
import EducationTimeline from "./Education";
import Achievements from "./Achievements";
import DownloadResume from "./DownloadResume";
export default function Home() {
  return (
    <>
      <div className="overflow-y-auto hide-scrollbar">
        
          <HeroSection />
        {/* stack  marquee */}
        <LazySection>
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
        </LazySection>

        {/* about me */}
        <LazySection>
          <AboutMe />
        </LazySection>

        {/* tech and skills - vertical to horizontal scroll */}
        <LazySection>
          <TechStackSection />
        </LazySection>
        {/* projects */}
        <LazySection>
          <Projects />
        </LazySection>

        {/* education */}
        <LazySection>
          <EducationTimeline />
        </LazySection>

        {/* achievements */}
        <LazySection>
          <Achievements />
        </LazySection>

        {/* download resume */}
        <LazySection>
          <DownloadResume />
        </LazySection>
        {/* contacts */}
        <LazySection>
          <GetInTouch />
        </LazySection>


        {/* footer */}
        <LazySection>
          <Footer />
        </LazySection>
      </div>
    </>
  );
}
