import { Ripple } from "@/components/magicui/ripple";
import { cn } from "@/lib/utils";
import TextAnimation from "@/components/TextAnimation";
import { DotPattern } from "@/components/magicui/dot-pattern";

export default function AboutMe() {
    return (<>
        <div className="snap-start relative">
            <div className="absolute inset-0 -z-1">
                <DotPattern
                    className={cn(
                        "[mask-image:linear-gradient(to_top_left,white,transparent,transparent)] ",
                    )}
                />
            </div>
            {/* <h1 className="font-sans text-7xl mt-9 text-center"> ✨ About me</h1> */}
            <div className="flex flex-wrap items-center ">
                {/* Image section */}
                <div className="w-full md:w-1/2 ">
                    <div className="relative flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden rounded-lg ">
                        <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-white">
                            <img
                                className="w-50 h-50 rounded-full"
                                src="/me2.png"
                                alt="Avatar"
                            />
                        </p>
                        <Ripple />
                    </div>
                </div>

                {/* Text section */}
                <div className="w-full md:w-1/2 p-4 pb-[100px] font-sans text-base md:text-lg font-200 leading-relaxed -mt-[25vh] md:mt-0">
                    Hi, I'm <TextAnimation className="dancing text-center"><span className="dancing font-bold text-primary text-center">Gaurav ,</span></TextAnimation>a passionate <strong>Full-Stack Developer</strong> and engineering student with a strong foundation in modern web technologies. I specialize in building scalable, performant, and user-friendly applications using the <strong>MERN</strong> and <strong>LAMP</strong> stacks, with hands-on experience in tools like <strong>Redis</strong>, <strong>Docker</strong>, and <strong>PostgreSQL</strong>.<br /><br />
                    I love turning complex problems into clean, efficient code. Whether it's designing robust backend architectures, creating seamless frontend experiences, or optimizing real-time systems for 1 lakh+ users, I enjoy diving deep into the full product cycle.
                </div>
            </div>

        </div>
    </>)
}