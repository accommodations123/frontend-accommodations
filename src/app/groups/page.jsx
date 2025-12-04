"use client"

import * as React from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { GroupsHeader } from "@/components/groups/GroupsHeader"
import { GroupsSection } from "@/components/groups/GroupsSection"
import { GroupCard } from "@/components/groups/GroupCard"
import { GroupModal } from "@/components/groups/GroupModal"
import { GROUPS } from "@/lib/mock-data"
import { Users } from "lucide-react"

export default function GroupsPage() {
    const [selectedGroup, setSelectedGroup] = React.useState(null)

    return (
        <main className="min-h-screen bg-background pt-20">
            <Navbar />

            {/* Header Section */}
            <div className="bg-[#F1E7D6] pt-12 pb-8 border-b border-[#E6E6E6]">
                <div className="container mx-auto px-4">
                    <GroupsHeader />
                </div>
            </div>

            {/* Banner Section */}
            <section className="container mx-auto px-4 py-8">
                <div className="relative rounded-2xl overflow-hidden bg-[#07182A] text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
                    <div className="relative z-10 max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Find your community anywhere in the world</h2>
                        <p className="text-lg text-gray-300 mb-6">
                            Connect with people who share your interests, background, or destination.
                        </p>
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#07182A] bg-gray-200 flex items-center justify-center text-[#07182A] font-bold text-xs">
                                    U{i}
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-[#07182A] bg-[#C93A30] flex items-center justify-center text-white font-bold text-xs">
                                +2k
                            </div>
                        </div>
                    </div>
                    <div className="relative z-10">
                        {/* Illustration placeholder */}
                        <Users className="h-32 w-32 text-white/10" />
                    </div>
                    {/* Abstract shapes */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C93A30]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                </div>
            </section>

            {/* Country Groups */}
            <GroupsSection title="Country-Based Communities" type="scroll" className="bg-[#F1E7D6]">
                {GROUPS.countries.map((group) => (
                    <div key={group.id} onClick={() => setSelectedGroup(group)}>
                        <GroupCard type="country" data={group} />
                    </div>
                ))}
            </GroupsSection>

            {/* City Groups */}
            <GroupsSection title="City-Based Groups" className="bg-white">
                {GROUPS.cities.map((group) => (
                    <div key={group.id} onClick={() => setSelectedGroup(group)}>
                        <GroupCard type="city" data={group} />
                    </div>
                ))}
            </GroupsSection>

            {/* Purpose Groups */}
            <GroupsSection title="Topic-Based Groups" className="bg-[#F1E7D6]">
                {GROUPS.purpose.map((group) => (
                    <div key={group.id} onClick={() => setSelectedGroup(group)}>
                        <GroupCard type="purpose" data={group} />
                    </div>
                ))}
            </GroupsSection>

            {/* Trending Groups */}
            <GroupsSection title="Trending Now" className="bg-white">
                {GROUPS.trending.map((group) => (
                    <div key={group.id} onClick={() => setSelectedGroup(group)}>
                        <GroupCard type="trending" data={group} />
                    </div>
                ))}
            </GroupsSection>

            {/* Recommended Groups */}
            <GroupsSection title="Recommended for You" className="bg-[#F1E7D6] mb-12">
                {GROUPS.recommended.map((group) => (
                    <div key={group.id} onClick={() => setSelectedGroup(group)}>
                        <GroupCard type="recommended" data={group} />
                    </div>
                ))}
            </GroupsSection>

            <Footer />

            <GroupModal
                isOpen={!!selectedGroup}
                onClose={() => setSelectedGroup(null)}
                group={selectedGroup}
            />
        </main>
    )
}
