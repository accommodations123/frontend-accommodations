"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function GroupsSection({ title, children, className, type = "grid" }) {
    return (
        <section className={cn("py-12", className)}>
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-[#07182A] mb-8">{title}</h2>

                {type === "scroll" ? (
                    <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                        {children}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {children}
                    </div>
                )}
            </div>
        </section>
    )
}
