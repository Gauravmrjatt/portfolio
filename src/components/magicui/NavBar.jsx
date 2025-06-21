import { TextAnimate } from "@/components/magicui/text-animate";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { cn } from "@/lib/utils";

export default function NavBar() {
    return (
        <>
            <div className="flex justify-between p-3 bg-background/10 items-center">
                <div>
                    <TextAnimate animation="slideLeft" by="character" once className="font-medium dancing text-2xl font-dancing dancing">
                        Gaurav
                    </TextAnimate>
                </div>
                <nav className="flex ">
                    <ol className="flex gap-4 items-center font-sans">
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                        <li>
                            <ShinyButton className="font-mono">Hire Me</ShinyButton>
                        </li>
                    </ol>
                </nav>
            </div>
        </>
    );
}