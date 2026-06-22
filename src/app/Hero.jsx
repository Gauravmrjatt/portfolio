import { TextAnimate } from "@/components/magicui/text-animate";

import TextAnimation from "@/components/TextAnimation";
import GlassIcons from "@/components/magicui/GlassIcon";
import items from "./items"
import { Sparkles } from "@/components/Aurora/sparkles";
import { useTheme } from "next-themes";
import Glow from "@/components/Glow";
import { HeroPill, StarIcon } from "@/components/HeroPill"
import InkReveal from "@/components/ui/ink-reveal";
import TechGridBackground from "@/components/ui/tech-grid-background";

import { useState, useEffect } from "react";
import Image from "next/image";


export default function Hero() {
    const { theme } = useTheme()
    const [gridSize, setGridSize] = useState({ cols: 28, rows: 20 })
    useEffect(() => {
      const update = () => {
        const w = window.innerWidth
        if (w < 768) setGridSize({ cols: 12, rows: 10 })
        else if (w < 1024) setGridSize({ cols: 18, rows: 14 })
        else setGridSize({ cols: 28, rows: 20 })
      }
      update()
      window.addEventListener("resize", update)
      return () => window.removeEventListener("resize", update)
    }, [])
    return (<>
        {/* <ParallaxScroll> */}
        <section id="home" className="relative overflow-hidden flex min-h-dvh bg-background flex-col md:flex-col snap-start z-[50] ">
        
            {/* TEXT — CENTERED (shifted slightly left on desktop) */}
            <div
                className="
        flex 
        z-30 
        flex-col 
        justify-center 
        items-center 
        text-center
        h-[80dvh]

        md:h-[100dvh]
        md:items-start 
        md:text-left 
        md:ml-[10%]
        relative
        
    ">
                <div className="relative flex items-center scale-150 md:scale-300 opacity-30  justify-center">
                    <div className="absolute md:left-20 top-30 translate-x-1/2 -translate-y-1/2 -z-10">
                        <Glow x={-40} y={-30} color="rgba(227,148,0,0.25)" />
                        <Glow x={40} y={-20} color="rgba(0,151,254,0.25)" />
                        <Glow x={55} y={20} color="rgba(0,173,9,0.25)" />
                        <Glow x={0} y={55} color="rgba(243,71,255,0.25)" />
                        <Glow x={-55} y={20} color="rgba(153,102,255,0.25)" />
                        <Glow x={-35} y={-5} color="rgba(255,71,71,0.25)" />
                    </div>
                </div>
                <span className="font-mono mb-4">
                    {/* <TextAnimate animation="slideLeft" by="character"> */}
                    <HeroPill
                        icon={<StarIcon />}
                        text="Full Stack Developer"
                    />
                    {/* </TextAnimate> */}
                </span>

               <h1 className="dancing md:text-9xl mt-4  text-6xl text-balance">
                    <TextAnimate
                        by="character"
                        className="font-medium dancing font-dancing dancing md:text-9xl text-6xl">
                        Gaurav 
                    </TextAnimate>
                </h1>
                <h1 className="dancing  md:text-9xl  mb-4 text-6xl">
                    <TextAnimation>
                        <TextAnimate
                            by="character"
                            className="font-medium dancing font-dancing dancing md:text-9xl text-6xl"
                        >
                            Chaudhary
                        </TextAnimate>
                    </TextAnimation>
                </h1>
                <span className="mt-5 font-sans">
                    <TextAnimate animation="slideLeft" by="character" className="text-pretty">
                        I'm a full-stack web-developer from India
                    </TextAnimate>

                    <div className="mt-6 mb-4 pb-[30px]">
                        <GlassIcons items={items} className="custom-class" />
                    </div>
                </span>
            </div>

            {/* IMAGE — MOBILE CENTERED, DESKTOP BOTTOM-RIGHT */}
            <div
                className="
        absolute 
        -bottom-0
        right-0 
        w-full 
        h-[35dvh] 
        flex 
        justify-center      /* MOBILE: CENTER IMAGE */
        items-end 
        z-20
        md:h-[50dvh]
        md:justify-end       /* TABLET+: SHIFT RIGHT */
        md:pr-[5%]
        lg:h-[70dvh]
    ">
                <Image
                    src="/gaurav-chaudhary-hero.png"
                    alt="Gaurav Chaudhary — Full-Stack Developer"
                    width={500}
                    height={700}
                    priority
                    className="
                pointer-events-none 
                select-none 
                w-auto 
                h-full 
                object-contain
                max-h-[35dvh] 
                md:max-h-[50dvh]
                lg:max-h-[70dvh]
                
            "
                />b
              
            </div>
            {/* </ParallaxLayer> */}
            {/* <ParallaxLayer className="z-[0]" speed={0} offset={0.2}> */}
            {/* BOTTOM GLOW */}
            <div className="absolute bg-background z-10 bottom-0 -mt-32 h-[20vh] w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
                <div className="absolute inset-0 before:absolute  before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] before:opacity-40" />
                <div className="absolute -left-1/2 z-3 top-1/2 aspect-[1/0.7] w-[200%] rounded-[100%] border-t border-zinc-900/20 dark:border-white/20 bg-white dark:bg-zinc-900" />
                <Sparkles
                    density={1200}
                    className="absolute   inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
                    color={theme === "dark" ? "#ffffff" : "#000000"}
                />
            </div>
            {/* </ParallaxLayer> */}

            <TechGridBackground
                cols={gridSize.cols}
                rows={gridSize.rows}
                density={0.5}
                opacityProp={0.25}
                className="absolute inset-0"
                style={{ zIndex: 1 }}
            />

            <InkReveal
                mode="reveal"
                maskColor={theme === "dark" ? [10, 10, 10] : [255, 255, 255]}
                brushSize={190}
                stampStep={5}
                style={{ zIndex: 5 }}
            />
        </section>
        {/* </ParallaxScroll> */}


    </>);
}