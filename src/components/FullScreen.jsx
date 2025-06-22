"use client"

import { useEffect } from "react"

export default function AutoFullscreen() {
    useEffect(() => {
        const requestFullscreen = () => {
            const element = document.documentElement

            if (element.requestFullscreen) {
                element.requestFullscreen()
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen() // Safari
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen() // Firefox
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen() // IE/Edge
            }

            document.removeEventListener("click", requestFullscreen)
            document.removeEventListener("touchstart", requestFullscreen)
        }

        document.addEventListener("click", requestFullscreen)
        document.addEventListener("touchstart", requestFullscreen)

        return () => {
            document.removeEventListener("click", requestFullscreen)
            document.removeEventListener("touchstart", requestFullscreen)
        }
    }, [])

    return null
}
