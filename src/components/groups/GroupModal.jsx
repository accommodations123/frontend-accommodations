"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, MoreHorizontal, X } from "lucide-react"
import { GROUP_FEED } from "@/lib/mock-data"

// Since I don't have the exact UI components for Dialog/Tabs/Avatar verified, I will build a custom modal using fixed positioning if standard ones aren't available, 
// but I'll assume standard shadcn/ui structure based on previous files. 
// If they don't exist, I'll need to create them or use raw HTML/CSS.
// Given the previous files used `components/ui/...`, I'll assume they exist or I should create a self-contained modal.
// To be safe and "premium", I'll build a robust self-contained modal structure here to avoid dependency issues if those UI components are missing or different.

export function GroupModal({ isOpen, onClose, group }) {
    if (!isOpen || !group) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="relative w-full max-w-4xl bg-[#F1E7D6] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Header / Cover */}
                <div className="h-48 bg-[#07182A] relative shrink-0">
                    {group.image && (
                        <img src={group.image} alt={group.title} className="w-full h-full object-cover opacity-60" />
                    )}
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                        <h2 className="text-3xl font-bold mb-1">{group.title || group.name}</h2>
                        <p className="opacity-90">{group.members} members • Public Group</p>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Main Feed */}
                    <div className="flex-1 overflow-y-auto p-6 bg-white">
                        <div className="flex gap-4 mb-6 border-b border-gray-100 pb-4">
                            {["Posts", "About", "Members", "Photos"].map((tab, i) => (
                                <button
                                    key={tab}
                                    className={`pb-2 text-sm font-bold ${i === 0 ? "text-[#C93A30] border-b-2 border-[#C93A30]" : "text-gray-500 hover:text-[#07182A]"}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Create Post Input */}
                        <div className="bg-gray-50 p-4 rounded-xl mb-6 flex gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                                ME
                            </div>
                            <input
                                type="text"
                                placeholder="Write something to the group..."
                                className="flex-1 bg-transparent border-none focus:ring-0 text-sm"
                            />
                        </div>

                        {/* Feed */}
                        <div className="space-y-6">
                            {GROUP_FEED.map((post) => (
                                <div key={post.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#07182A] text-white rounded-full flex items-center justify-center font-bold text-sm">
                                                {post.avatar}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#07182A] text-sm">{post.author}</h4>
                                                <p className="text-xs text-gray-500">{post.time}</p>
                                            </div>
                                        </div>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreHorizontal className="h-5 w-5" />
                                        </button>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                        {post.content}
                                    </p>
                                    <div className="flex gap-6 text-gray-500 text-sm">
                                        <button className="flex items-center gap-1 hover:text-[#C93A30] transition-colors">
                                            <Heart className="h-4 w-4" /> {post.likes}
                                        </button>
                                        <button className="flex items-center gap-1 hover:text-[#07182A] transition-colors">
                                            <MessageCircle className="h-4 w-4" /> {post.comments}
                                        </button>
                                        <button className="flex items-center gap-1 hover:text-[#07182A] transition-colors">
                                            <Share2 className="h-4 w-4" /> Share
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-80 bg-[#F9FAFB] p-6 border-l border-gray-100 hidden md:block overflow-y-auto">
                        <div className="mb-6">
                            <Button className="w-full bg-[#C93A30] hover:bg-[#C93A30]/90 text-white font-bold rounded-full">
                                Join Group
                            </Button>
                        </div>

                        <div className="mb-8">
                            <h3 className="font-bold text-[#07182A] mb-3 text-sm uppercase">About</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {group.description || "A community for like-minded people to connect, share, and grow together."}
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold text-[#07182A] mb-3 text-sm uppercase">Group Rules</h3>
                            <ul className="space-y-2 text-sm text-gray-600 list-disc pl-4">
                                <li>Be kind and respectful</li>
                                <li>No spam or self-promotion</li>
                                <li>Respect privacy</li>
                                <li>Help each other out</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
