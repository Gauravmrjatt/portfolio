
import { SparklesText } from "@/components/magicui/sparkles-text";

import items from "./items"
import { Icon } from "@iconify/react";
export default function Footer() {
    return (
        <div className="snap-start bg-background border-t flex flex-col items-center justify-center text-center gap-5 font-sans p-6 z-2 pb-30">
            <h1 className="text-sm  text-muted-foreground text-center font-extralight">© Developer Portfolio by <br /> <span className="font-bold text-primary dancing text-3xl"><SparklesText>Gaurav Chaudhary</SparklesText></span></h1>
            <ul className="flex mt-4 space-x-4">
                {items.map((item, index) =>
                    <li key={index} className="bg-muted/70 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                        <a target="_blank" href={item.href}>
                            {item.icon}
                        </a>
                    </li>)}
            </ul>
        </div>
    )
}