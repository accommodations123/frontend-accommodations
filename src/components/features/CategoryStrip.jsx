"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Home, Briefcase, GraduationCap, Users, Backpack, Building, Star, Heart } from "lucide-react"

const categories = [
    { name: "All", icon: Home },
    { name: "Student", icon: GraduationCap },
    { name: "Family", icon: Users },
    // { name: "Business", icon: Briefcase },
    { name: "Backpacker", icon: Backpack },
    // { name: "Luxury", icon: Star },
    { name: "Long-term", icon: Building },
    { name: "Sharing", icon: Heart },
]

export function CategoryStrip() {
    const [activeCategory, setActiveCategory] = React.useState("All")

    return (
        <div className="w-full border-b bg-white sticky top-[72px] z-40 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-8 overflow-x-auto py-4 no-scrollbar">
                    {categories.map((category) => {
                        const Icon = category.icon
                        const isActive = activeCategory === category.name
                        return (
                            <button
                                key={category.name}
                                onClick={() => setActiveCategory(category.name)}
                                className={cn(
                                    "flex flex-col items-center gap-2 min-w-[64px] transition-colors group",
                                    isActive ? "text-accent" : "text-gray-500 hover:text-gray-800"
                                )}
                            >
                                <Icon className={cn("h-6 w-6", isActive ? "stroke-[2.5px]" : "stroke-[1.5px]")} />
                                <span className={cn("text-xs font-medium whitespace-nowrap", isActive && "font-bold")}>
                                    {category.name}
                                </span>
                                {isActive && (
                                    <div className="h-0.5 w-full bg-accent mt-1 rounded-full" />
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
