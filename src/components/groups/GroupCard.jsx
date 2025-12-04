"use client"

import { Button } from "@/components/ui/button"
import { Users, ArrowRight, Flame } from "lucide-react"

export function GroupCard({ type, data }) {
    if (type === "country") {
        return (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E6E6E6] hover:shadow-md transition-all min-w-[280px] flex flex-col items-center text-center group cursor-pointer">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{data.flag}</div>
                <h3 className="font-bold text-[#07182A] text-lg mb-1">{data.name}</h3>
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                    <Users className="h-4 w-4" />
                    <span>{data.members} members</span>
                </div>
                <Button className="w-full bg-[#C93A30] hover:bg-[#C93A30]/90 text-white rounded-full">
                    Join Community
                </Button>
            </div>
        )
    }

    if (type === "city") {
        return (
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E6E6E6] hover:shadow-md transition-all group cursor-pointer h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={data.image}
                        alt={data.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                    <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center gap-1 text-xs font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full w-fit mb-2">
                            <Users className="h-3 w-3" />
                            {data.members}
                        </div>
                    </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-[#07182A] text-xl mb-2">{data.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">{data.description}</p>
                    <Button variant="outline" className="w-full border-[#C93A30] text-[#C93A30] hover:bg-[#C93A30] hover:text-white rounded-full">
                        Join Group
                    </Button>
                </div>
            </div>
        )
    }

    if (type === "purpose") {
        const Icon = data.icon
        return (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E6E6E6] hover:border-[#C93A30]/30 hover:shadow-md transition-all cursor-pointer flex items-start gap-4">
                <div className="p-3 bg-[#F1E7D6] rounded-lg text-[#07182A]">
                    <Icon className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="font-bold text-[#07182A] mb-1">{data.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{data.description}</p>
                    <span className="text-xs font-medium text-[#C93A30]">{data.members} members</span>
                </div>
            </div>
        )
    }

    if (type === "trending") {
        return (
            <div className="relative rounded-xl overflow-hidden h-64 group cursor-pointer">
                <img
                    src={data.image}
                    alt={data.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07182A] via-[#07182A]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 text-[#C93A30] font-bold text-sm mb-2">
                        <Flame className="h-4 w-4 fill-current" />
                        <span>Trending • {data.activePosts} active posts</span>
                    </div>
                    <h3 className="text-white font-bold text-xl mb-4">{data.name}</h3>
                    <Button size="sm" className="bg-white text-[#07182A] hover:bg-gray-100 rounded-full w-full font-bold">
                        Join Now
                    </Button>
                </div>
            </div>
        )
    }

    if (type === "recommended") {
        return (
            <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E6E6E6] flex items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-bold text-[#C93A30] uppercase mb-1">{data.title}</p>
                    <h3 className="font-bold text-[#07182A]">{data.groupName}</h3>
                    <p className="text-xs text-gray-500 mt-1">{data.members} members</p>
                </div>
                <Button size="icon" variant="ghost" className="rounded-full hover:bg-[#F1E7D6] text-[#07182A]">
                    <ArrowRight className="h-5 w-5" />
                </Button>
            </div>
        )
    }

    return null
}
