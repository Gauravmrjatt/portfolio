import { TextAnimate } from "@/components/magicui/text-animate";
import Image from "next/image";
import TextAnimation from "@/components/TextAnimation";
import GlassIcons from "@/components/magicui/GlassIcon";
import items from "./items"
import { Sparkles } from "@/components/Aurora/sparkles";
import { useTheme } from "next-themes";
import ParallaxScroll, { ParallaxLayer, ParallaxHeroExample } from "@/components/ParallaxScroll";
import MonochromeBackground from "@/components/MonochromeBackground";
export default function Hero() {
    const { theme } = useTheme()
    return (<>
        <ParallaxScroll>
            <div className="relative flex min-h-dvh bg-background flex-col md:flex-col snap-start">

                {/* TEXT — CENTERED (shifted slightly left on desktop) */}
                <ParallaxLayer className="mt-20 z-200" speed={0.3} offset={1}>
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
    ">

                        <span className="font-mono mb-4">
                            <TextAnimate animation="slideLeft" by="character">
                                FULL-STACK DEVELOPER
                            </TextAnimate>
                        </span>

                        <h1 className="dancing md:text-9xl mt-4 text-6xl">
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
                            <TextAnimate animation="slideLeft" by="character">
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
        -bottom-25
        right-0 
        w-full 
        h-[40dvh] 
        flex 
        justify-center      /* MOBILE: CENTER IMAGE */
        items-end 
        z-200

        md:h-[70dvh]
        md:justify-end       /* DESKTOP: SHIFT RIGHT */
        md:pr-[5%]
    ">
                        <img
                            src="/me2.png"
                            className="
                pointer-events-none 
                select-none 
                w-auto 
                h-full 
                object-contain
                max-h-[40dvh] 
                md:max-h-[70dvh]
            "
                        />
                    </div>
                </ParallaxLayer>
                <ParallaxLayer className="z-[0]" speed={0} offset={0.2}>
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
                </ParallaxLayer>
            </div>
        </ParallaxScroll>


    </>);
}