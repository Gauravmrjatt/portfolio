import { TextAnimate } from "@/components/magicui/text-animate";
import TextAnimation from "@/components/TextAnimation";
import GlassIcons from "@/components/magicui/GlassIcon";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Icon } from "@iconify/react";
import items from "./items"

export default function Hero() {
    return (<>
        <div className="flex min-h-[100vh] flex-col-reverse snap-start relative  md:flex-row items-center justify-evenly " >
            <div className="flex  items-center md:items-start flex-col">
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
                    <TextAnimate animation="slideLeft" by="character" className="">
                        I'm a full-stack web-develpoer from india
                    </TextAnimate>
                    <div className="mt-6 mb-4 pb-[30px]">
                        <GlassIcons items={items} className="custom-class" />
                    </div>
                </span>
            </div>
            <div className="w-full md:w-1/2 md:h-full flex items-center justify-center">
                <img className="md:h-[100vh] max-h-[700px] h-[40vh] w-auto" src="/me2.png" />
            </div>
            <div className="absolute h-[100vh] inset-0 -z-1">
                <DotPattern
                    className={cn(
                        "[mask-image:linear-gradient(to_top_right,white,transparent,transparent)] ",
                    )}
                />
            </div>
        </div>
    </>);
}