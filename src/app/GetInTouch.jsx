"use client";

import { motion } from "motion/react";
import React, { useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import MonochromeBackground from "@/components/MonochromeBackground";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import items from "./items"
export default function GetInTouch() {
    const { theme } = useTheme()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="relative overflow-hiddden snap-start rounded-2xl">
            {/* <AuroraBackground className="absolute h-[100%] -z-1 inset-0" /> */}

            <div className="font-sans min-h-[100vh] pb-7 md:flex rounded-2xl justify-center items-center relative">

                <div className="grid md:grid-cols-2 items-start gap-12 p-8 mx-auto max-w-4xl max-lg:max-w-2xl  bg-background/50 backdrop-blur-2xl rounded-2xl">
                    <MonochromeBackground theme={theme} />
                    <div className="relative">

                        <h2 className="text-3xl text-primary font-bold">Let's Talk</h2>
                        <p className="text-[15px] text-muted-foreground mt-4 leading-relaxed">Have some big idea or brand to develop and need help? Then reach out we'd love to hear about your project  and provide help.</p>
                        <div className="mt-12">
                            <h2 className="text-primary text-base font-semibold">Email</h2>
                            <ul className="mt-4">
                                <li className="flex items-center">
                                    <div className="bg-muted/70 text-primary h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                        <Icon height="24" width="24" icon="line-md:email-alt-twotone" />
                                    </div>
                                    <a href="mailto:Gauravmrjatt4@gmail.com" target="_blank" className="text-sm ml-4">
                                        <small className="block text-muted-foreground">Mail</small>
                                        <span className="text-blue-600 font-medium">Gauravmrjatt4@gmail.com</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-12">
                            <h2 className="text-primary text-base font-semibold">Socials</h2>
                            <ul className="flex mt-4 space-x-4">
                                {items.map((item, index) =>
                                    <li key={index} className="bg-muted/70 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                        <a target="_blank" href={item.href}>
                                            {item.icon}
                                        </a>
                                    </li>)}
                            </ul>
                        </div>
                    </div>

                    <form action="https://formsubmit.co/gauravmrjatt4@gmail.com" method="POST" className="space-y-4 z-10">
                        <input type='text' placeholder='Name'
                            className="w-full text-primary rounded-md py-2.5 px-4 border placeholder-gray-500 dark:placeholder-gray-40  text-sm " />
                        <input type='email' placeholder='Email'
                            className="w-full text-primary rounded-md py-2.5 px-4 border placeholder-gray-500 dark:placeholder-gray-40  text-sm " />
                        <input type='text' placeholder='Subject'
                            className="w-full text-primary rounded-md py-2.5 px-4 border placeholder-gray-500 dark:placeholder-gray-40  text-sm " />
                        <textarea placeholder='Message' rows="6"
                            className="w-full text-primary rounded-md px-4 border placeholder-gray-500 dark:placeholder-gray-40 text-sm pt-2.5 "></textarea>
                        <button type='button'
                            className="text-white bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium px-4 py-2.5 w-full cursor-pointer border-0 mt-2">Send message</button>
                    </form>
                </div>
            </div>
        </div>

    );
}