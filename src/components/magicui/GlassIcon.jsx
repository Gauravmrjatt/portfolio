
import Link from "next/link";
const GlassIcons = ({ items, className }) => {
    return (
        <div
            className={`flex pt-2 bg-background/50 shadow-[0px_0px_2px_#989494] dark:shadow-[0px_0px_2px_#eee]  backdrop-blur-md rounded-full gap-5 items-center justify-center ${className || ""
                }`}
        >
            {items.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    target="_blank"
                    className="relative bg-transparent outline-none h-[3em] w-[3em] [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group">
                    <button
                        type="button"
                        aria-label={item.label}
                        className={`relative bg-transparent outline-none h-[2.5em] w-[2.5em] [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group ${item.customClass || ""
                            }`}
                    >

                        <span className="m-auto h-[100%] w-[100%] flex items-center justify-center" aria-hidden="true">
                            {item.icon}
                        </span>

                        <span className="absolute font-sans text-xs top-full left-0 right-0 text-center whitespace-nowrap leading-[2] text-base opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0 group-hover:opacity-100 group-hover:[transform:translateY(20%)]">
                            {item.label}
                        </span>
                    </button>
                </Link>
            ))}


        </div>
    );
};

export default GlassIcons;
