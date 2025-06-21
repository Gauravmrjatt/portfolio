import { SparklesText } from "@/components/magicui/sparkles-text";

export default function TextAnimation({ children }) {
    return (<>
        <span className="font-sans"><SparklesText>{children}</SparklesText ></span>
    </>)
}