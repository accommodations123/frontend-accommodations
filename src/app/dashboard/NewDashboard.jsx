"use client"
import React, { useState, useEffect } from "react"
import { Navbar } from "../../components/layout/Navbar"
import { useGetHostProfileQuery } from "@/store/api/hostApi"
import { Sidebar } from "@/components/account-v2/Sidebar"
import { ProfileCard } from "@/components/account-v2/ProfileCard"
import { InfoCard } from "@/components/account-v2/InfoCard"
import { ContactsWidget, CommunitiesWidget } from "@/components/account-v2/Widgets"
import { FeedInput } from "@/components/account-v2/FeedInput"
import { MyListings } from "@/components/dashboard/MyListings"
import { Settings } from "@/components/dashboard/Settings"
import { ProfileOverview } from "@/components/dashboard/ProfileOverview"
import { PersonalInfo } from "@/components/dashboard/PersonalInfo"

export default function NewDashboard() {
    const [userData, setUserData] = useState(null)
    const [activeTab, setActiveTab] = useState("overview")

    useEffect(() => {
        const userStr = localStorage.getItem("user")
        if (userStr) {
            try {
                const user = JSON.parse(userStr)
                setUserData({
                    ...user,
                    name: user.full_name || user.name || "User",
                    firstName: (user.full_name || user.name || "User").split(" ")[0]
                })
            } catch (err) { console.error("Profile parse error:", err) }
        }
    }, [])

    const { data: hostProfile } = useGetHostProfileQuery(undefined, { skip: !userData })

    const currentUser = {
        ...userData,
        ...hostProfile,
        profile_image: hostProfile?.profile_image || userData?.profile_image,
    }

    const renderContent = () => {
        switch (activeTab) {
            case "overview":
                // New Overview: Social Style Layout
                return (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        {/* Center-Left Column: Avatar, Friends, Communities */}
                        <div className="md:col-span-4 space-y-4">
                            <ProfileCard user={currentUser} onEdit={() => setActiveTab("personal")} />
                            <ContactsWidget />
                            <CommunitiesWidget />
                        </div>

                        {/* Center-Right Column: Info, Feed */}
                        <div className="md:col-span-8 space-y-4">
                            <InfoCard user={currentUser} />

                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-medium text-gray-900">Photos</h3>
                                    <span className="text-gray-400 text-sm cursor-pointer hover:underline">Show all</span>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="aspect-square bg-gray-100 rounded hover:opacity-90 cursor-pointer">
                                            <img src={`https://picsum.photos/200/200?random=${i}`} alt="Gallery" className="w-full h-full object-cover rounded" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <FeedInput />

                            {/* Wall / Feed */}
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                    <div className="flex gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                            <img src={currentUser.profile_image || "https://i.pravatar.cc/150?u=fake"} alt="User" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-blue-600">{currentUser.name}</p>
                                            <p className="text-xs text-gray-400">just now</p>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-900">
                                        <p>Just updated my profile on NextKinLife! This new layout is amazing.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "personal":
                // Personal Info: Editable Form (Using existing PersonalInfo component)
                return (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <PersonalInfo />
                    </div>
                );
            case "listings":
                return (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <MyListings />
                    </div>
                );
            case "trips":
                return (
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">My Trips</h3>
                        <p className="text-gray-500">You don't have any upcoming trips yet.</p>
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
                            Explore Properties
                        </button>
                    </div>
                );
            case "wishlists":
                return (
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">My Wishlists</h3>
                        <p className="text-gray-500">Save your favorite stays to plan your next adventure.</p>
                    </div>
                );
            case "notifications":
                return (
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Notifications</h3>
                        <div className="space-y-4">
                            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">
                                    NB
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Welcome to NextKinLife!</p>
                                    <p className="text-xs text-gray-500 mt-1">We're glad to have you here. Complete your profile to get started.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "support":
                return (
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Support Center</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="border border-gray-100 p-6 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                                <h4 className="font-bold text-gray-900 mb-2">Help Center</h4>
                                <p className="text-sm text-gray-500">Find answers to common questions about hosting and traveling.</p>
                            </div>
                            <div className="border border-gray-100 p-6 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                                <h4 className="font-bold text-gray-900 mb-2">Contact Support</h4>
                                <p className="text-sm text-gray-500">Get in touch with our team for personalized assistance.</p>
                            </div>
                        </div>
                    </div>
                );
            case "settings":
                return (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h3>
                        <Settings />
                    </div>
                );
            default:
                return null;
        }
    }


    return (
        <main className="min-h-screen bg-[#edf0f5] font-inter">
            <Navbar />

            <div className="container mx-auto pt-24 px-4 pb-8">
                <div className="flex gap-4">
                    {/* Left Sidebar - Navigation */}
                    <div className="w-64 flex-shrink-0 hidden md:block">
                        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </main>
    )
}
