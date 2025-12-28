import * as React from "react"
import TrackingTimeline from "@/components/ui/tracking-timeline"
import { GraduationCap, School, BookOpen } from "lucide-react"

const educationItems = [
    {
        id: 1,
        status: "completed",
        title: "10th Grade (Secondary School)",
        date: "March 2020",
        icon: <School className="h-4 w-4 text-white" />
    },
    {
        id: 2,
        status: "completed",
        title: "12th Grade (Higher Secondary)",
        date: "March 2022",
        icon: <BookOpen className="h-4 w-4 text-white" />
    },
    {
        id: 3,
        status: "in-progress",
        title: "B.Tech in Computer Science",
        date: "2023 – 2027 (Expected)",
        icon: <GraduationCap className="h-4 w-4 text-primary" />
    }
]

const EducationTimeline = () => {
    return (
        <div className="w-full flex flex-col  justify-center items-center min-h-[100vh]">
            <div className="text-center mb-16 md:mb-20">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Education Journey</h1>
            </div>

            <div className="w-full   max-w-2xl mx-auto flex justify-center align-center items-center">

                <TrackingTimeline items={educationItems} />
            </div>
        </div>
    )
}

export default EducationTimeline
