const gradientMapping = {
    insta: "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
    github: "linear-gradient(135deg, #0d1117,rgba(22, 27, 34, 0.43),rgba(13, 17, 23, 0.36))",
    linkedin: "linear-gradient(135deg, #0077B5, #005983)",
    telegram: "linear-gradient(135deg, #37aee2, #1e96c8, #007ab8)",
    orange: "linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))",
    green: "linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))",
};
import Link from "next/link";
const GlassIcons = ({ items, className }) => {
    const getBackgroundStyle = (color) => {
        if (gradientMapping[color]) {
            return { background: gradientMapping[color] };
        }
        return { background: color };
    };

    return (
        <div
            className={`flex gap-5 items-center justify-center ${className || ""
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
                        className={`relative bg-transparent outline-none h-[3em] w-[3em] [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group ${item.customClass || ""
                            }`}
                    >

                        <span
                            className="absolute top-0 left-0 w-full h-full rounded-[1.25em] block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[15deg] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]"
                            style={{
                                ...getBackgroundStyle(item.color),
                                boxShadow: "0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15)",
                            }}
                        ></span>

                        <span
                            className="absolute top-0 left-0 w-full h-full rounded-[1.25em] bg-[hsla(0,0%,100%,0.15)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] transform group-hover:[transform:translateZ(2em)]"
                            style={{
                                boxShadow: "0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset",
                            }}
                        >
                            <span className="m-auto h-[100%] w-[100%] flex items-center justify-center" aria-hidden="true">
                                {item.icon}
                            </span>
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
