"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, MoreHorizontal, X, Users, Calendar, MapPin, Hash, Flame, Star } from "lucide-react"

export function GroupModal({ isOpen, onClose, group }) {
    if (!isOpen || !group) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Header / Cover */}
                <div className="h-64 bg-gradient-to-br from-[#07182A] to-[#0A1F36] relative shrink-0">
                    {group.image && (
                        <img src={group.image} alt={group.title} className="w-full h-full object-cover opacity-40" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 text-white">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                <Users className="h-5 w-5" />
                            </div>
                            <h2 className="text-3xl font-bold">{group.title || group.name}</h2>
                        </div>
                        <p className="text-sm opacity-90 flex items-center gap-2">
                            <span>{group.members} members</span>
                            <span>•</span>
                            <span>Public Group</span>
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Main Feed */}
                    <div className="flex-1 overflow-y-auto">
                        {/* Tabs */}
                        <div className="bg-white/50 backdrop-blur-sm border-b border-gray-100">
                            <div className="flex px-6 pt-4">
                                {["Posts", "About", "Members", "Photos"].map((tab, i) => (
                                    <button
                                        key={tab}
                                        className={`pb-4 px-4 text-sm font-semibold transition-colors ${
                                            i === 0 
                                                ? "text-[#C93A30] border-b-2 border-[#C93A30]" 
                                                : "text-gray-500 hover:text-[#07182A]"
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Create Post Input */}
                        <div className="p-6 bg-gradient-to-br from-[#F1E7D6] to-[#E8D5C4] border-b border-gray-100">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 bg-[#07182A] text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    ME
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="What's on your mind? Share with the group..."
                                        className="w-full bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C93A30]/50"
                                    />
                                </div>
                                <Button className="bg-[#C93A30] hover:bg-[#B82E28] text-white rounded-xl px-6 py-3 text-sm font-semibold">
                                    Post
                                </Button>
                            </div>
                        </div>

                        {/* Feed */}
                        <div className="p-6 space-y-6">
                            {group.feed?.map((post, index) => (
                                <div key={post.id || index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-[#07182A] to-[#0A1F36] text-white rounded-full flex items-center justify-center font-bold text-sm">
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
                                    
                                    <div className="mb-4">
                                        <p className="text-gray-700 text-sm leading-relaxed mb-3">
                                            {post.content}
                                        </p>
                                        {post.image && (
                                            <div className="rounded-xl overflow-hidden mb-3">
                                                <img 
                                                    src={post.image} 
                                                    alt="Post attachment" 
                                                    className="w-full h-64 object-cover"
                                                />
                                            </div>
                                        )}
                                        {post.link && (
                                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-[#07182A] rounded-lg flex items-center justify-center">
                                                        <Hash className="h-5 w-5 text-white" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-semibold text-[#07182A]">{post.link.title}</p>
                                                        <p className="text-xs text-gray-500">{post.link.url}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-6">
                                            <button className="flex items-center gap-2 text-gray-500 hover:text-[#C93A30] transition-colors">
                                                <Heart className="h-5 w-5" />
                                                <span className="text-sm">{post.likes}</span>
                                            </button>
                                            <button className="flex items-center gap-2 text-gray-500 hover:text-[#07182A] transition-colors">
                                                <MessageCircle className="h-5 w-5" />
                                                <span className="text-sm">{post.comments}</span>
                                            </button>
                                            <button className="flex items-center gap-2 text-gray-500 hover:text-[#07182A] transition-colors">
                                                <Share2 className="h-5 w-5" />
                                                <span className="text-sm">Share</span>
                                            </button>
                                        </div>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreHorizontal className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-80 bg-gradient-to-br from-[#F9FAFB] to-[#F1E7D6] p-6 border-l border-gray-100 hidden md:block overflow-y-auto">
                        {/* Join Button */}
                        <div className="mb-8">
                            <Button className="w-full bg-gradient-to-r from-[#C93A30] to-[#B82E28] hover:from-[#B82E28] hover:to-[#A72520] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                Join Group
                            </Button>
                        </div>

                        {/* Group Info */}
                        <div className="mb-8">
                            <h3 className="font-bold text-[#07182A] mb-4 text-sm uppercase tracking-wide">About</h3>
                            <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                {group.description || "A vibrant community for like-minded individuals to connect, share experiences, and grow together. Join us to discover new friendships and opportunities!"}
                            </p>
                            
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">{group.location || "Worldwide"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">Created {group.created || "2 years ago"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Users className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">{group.members} members</span>
                                </div>
                            </div>
                        </div>

                        {/* Group Rules */}
                        <div className="mb-8">
                            <h3 className="font-bold text-[#07182A] mb-4 text-sm uppercase tracking-wide">Group Rules</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#C93A30] mt-1">•</span>
                                    <span>Be kind and respectful to all members</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#C93A30] mt-1">•</span>
                                    <span>No spam or self-promotion</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#C93A30] mt-1">•</span>
                                    <span>Respect privacy and confidentiality</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#C93A30] mt-1">•</span>
                                    <span>Help each other and contribute positively</span>
                                </li>
                            </ul>
                        </div>

                        {/* Admin Info */}
                        <div>
                            <h3 className="font-bold text-[#07182A] mb-4 text-sm uppercase tracking-wide">Admins</h3>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#C93A30] to-[#B82E28] text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    AD
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[#07182A]">Admin Team</p>
                                    <p className="text-xs text-gray-500">Group Administrator</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}