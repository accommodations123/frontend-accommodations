"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, MoreHorizontal, X, Users, Calendar, MapPin, Hash, Flame, Star, TrendingUp, Award, Clock, Pin, Image, Video, FileText, Settings, Bell, Search, Filter, Grid, List, ChevronRight, Home, CalendarDays, UserCheck, Shield, Zap, Camera, FolderOpen, Download, Play, Eye, UserPlus, Mail, Phone, Globe, Link2, Bookmark, ThumbsUp, MessageSquare } from "lucide-react"

export function GroupModal({ isOpen, onClose, group }) {
    if (!isOpen || !group) return null

    const [activeTab, setActiveTab] = React.useState("feed")
    const [viewMode, setViewMode] = React.useState("grid")

    // Handle close with event stop propagation
    const handleClose = (e) => {
        e?.stopPropagation()
        onClose()
    }

    // Handle backdrop click
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    // Close on Escape key
    React.useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    const renderTabContent = () => {
        switch (activeTab) {
            case "feed":
                return (
                    <div className="p-4 lg:p-6 space-y-6">
                        {/* Create Post */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                                    ME
                                </div>
                                <div className="flex-1">
                                    <textarea
                                        placeholder="Share something with the community..."
                                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                        rows={3}
                                    />
                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex gap-2">
                                            <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                                                <Image className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                                                <Video className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                                                <Calendar className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                                                <FileText className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                            Post
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feed Posts */}
                        <div className="space-y-4">
                            {[
                                {
                                    id: 1,
                                    author: "Alex Thompson",
                                    avatar: "AT",
                                    time: "2 hours ago",
                                    content: "Just finished an amazing workshop on design systems! The insights on component scalability were game-changing. Here's a summary of key takeaways...",
                                    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
                                    likes: 42,
                                    comments: 18,
                                    shares: 5
                                },
                                {
                                    id: 2,
                                    author: "Sarah Chen",
                                    avatar: "SC",
                                    time: "5 hours ago",
                                    content: "Looking for feedback on our latest project. We've been experimenting with new interaction patterns and would love to hear your thoughts!",
                                    likes: 28,
                                    comments: 12
                                }
                            ].map((post) => (
                                <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                                                    {post.avatar}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white">{post.author}</h4>
                                                    <p className="text-sm text-gray-500">{post.time}</p>
                                                </div>
                                            </div>
                                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                                <MoreHorizontal className="h-5 w-5" />
                                            </button>
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                                                {post.content}
                                            </p>
                                            {post.image && (
                                                <div className="rounded-xl overflow-hidden">
                                                    <img
                                                        src={post.image}
                                                        alt="Post attachment"
                                                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                                            <div className="flex items-center gap-6">
                                                <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                                                    <Heart className="h-5 w-5" />
                                                    <span className="text-sm">{post.likes}</span>
                                                </button>
                                                <button className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors">
                                                    <MessageCircle className="h-5 w-5" />
                                                    <span className="text-sm">{post.comments}</span>
                                                </button>
                                                <button className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors">
                                                    <Share2 className="h-5 w-5" />
                                                    <span className="text-sm">{post.shares || 0}</span>
                                                </button>
                                            </div>
                                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                                <Bookmark className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )

            case "events":
                return (
                    <div className="p-4 lg:p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upcoming Events</h2>
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                <CalendarDays className="h-4 w-4 mr-2" />
                                Create Event
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    id: 1,
                                    title: "Design Systems Workshop",
                                    date: "June 15, 2024",
                                    time: "2:00 PM - 5:00 PM",
                                    location: "Virtual Event",
                                    attendees: 45,
                                    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
                                    description: "Learn how to build scalable design systems from scratch"
                                },
                                {
                                    id: 2,
                                    title: "Monthly Networking Meetup",
                                    date: "June 22, 2024",
                                    time: "6:00 PM - 8:00 PM",
                                    location: "Tech Hub, Downtown",
                                    attendees: 32,
                                    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
                                    description: "Connect with fellow professionals and expand your network"
                                },
                                {
                                    id: 3,
                                    title: "React Advanced Patterns",
                                    date: "June 28, 2024",
                                    time: "3:00 PM - 6:00 PM",
                                    location: "Online Workshop",
                                    attendees: 68,
                                    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
                                    description: "Deep dive into advanced React patterns and best practices"
                                }
                            ].map((event) => (
                                <div key={event.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
                                    <div className="h-48 relative">
                                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                                            <p className="text-sm opacity-90">{event.date}</p>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{event.description}</p>
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Clock className="h-4 w-4" />
                                                <span>{event.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <MapPin className="h-4 w-4" />
                                                <span>{event.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Users className="h-4 w-4" />
                                                <span>{event.attendees} attending</span>
                                            </div>
                                        </div>
                                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                                            Register Now
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )

            case "members":
                return (
                    <div className="p-4 lg:p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Group Members</h2>
                            <div className="flex gap-2">
                                <Button variant="outline">
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Invite
                                </Button>
                                <Button variant="outline">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filter
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { name: "Alex Thompson", role: "Admin", avatar: "AT", posts: 245, joined: "Jan 2023", status: "online" },
                                { name: "Sarah Chen", role: "Moderator", avatar: "SC", posts: 189, joined: "Mar 2023", status: "online" },
                                { name: "Mike Johnson", role: "Member", avatar: "MJ", posts: 156, joined: "May 2023", status: "offline" },
                                { name: "Emma Wilson", role: "Member", avatar: "EW", posts: 134, joined: "Jun 2023", status: "online" },
                                { name: "David Kim", role: "Member", avatar: "DK", posts: 98, joined: "Jul 2023", status: "away" },
                                { name: "Lisa Anderson", role: "Moderator", avatar: "LA", posts: 267, joined: "Feb 2023", status: "online" }
                            ].map((member, index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="relative">
                                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                                                {member.avatar}
                                            </div>
                                            <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${member.status === 'online' ? 'bg-green-500' :
                                                    member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                                                }`} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                                            <p className="text-sm text-indigo-600">{member.role}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-sm text-gray-500">
                                        <div className="flex justify-between">
                                            <span>Posts</span>
                                            <span className="font-medium text-gray-700 dark:text-gray-300">{member.posts}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Joined</span>
                                            <span className="font-medium text-gray-700 dark:text-gray-300">{member.joined}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <Button size="sm" variant="outline" className="flex-1">
                                            <MessageSquare className="h-3 w-3 mr-1" />
                                            Message
                                        </Button>
                                        <Button size="sm" variant="outline" className="flex-1">
                                            View Profile
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )

            case "media":
                return (
                    <div className="p-4 lg:p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Media Gallery</h2>
                            <div className="flex gap-2">
                                <Button variant="outline">
                                    <Camera className="h-4 w-4 mr-2" />
                                    Upload
                                </Button>
                                <Button variant="outline">
                                    <FolderOpen className="h-4 w-4 mr-2" />
                                    Albums
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {[
                                { type: "image", url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400", title: "Team Building Event" },
                                { type: "image", url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400", title: "Workshop Session" },
                                { type: "video", url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400", title: "Conference Talk" },
                                { type: "image", url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400", title: "Networking Dinner" },
                                { type: "image", url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400", title: "Product Launch" },
                                { type: "video", url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400", title: "Tutorial Video" },
                                { type: "image", url: "https://images.unsplash.com/photo-1497366216548-375f70e94255?w=400", title: "Office Space" },
                                { type: "image", url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400", title: "Design Sprint" }
                            ].map((media, index) => (
                                <div key={index} className="relative group cursor-pointer">
                                    <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                                        <img
                                            src={media.url}
                                            alt={media.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        {media.type === 'video' && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                                    <Play className="h-6 w-6 text-gray-900 ml-1" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                                        <div className="absolute bottom-2 left-2 right-2">
                                            <p className="text-white text-sm font-medium truncate">{media.title}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Eye className="h-3 w-3 text-white/80" />
                                                <span className="text-xs text-white/80">1.2k views</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )

            case "resources":
                return (
                    <div className="p-4 lg:p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Resources & Documents</h2>
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                <FileText className="h-4 w-4 mr-2" />
                                Add Resource
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    title: "Getting Started Guide",
                                    description: "Complete guide for new members to get acquainted with the community",
                                    type: "PDF",
                                    size: "2.4 MB",
                                    downloads: 156,
                                    icon: FileText,
                                    color: "from-red-500 to-pink-500"
                                },
                                {
                                    title: "Best Practices Handbook",
                                    description: "Collection of best practices and guidelines for community participation",
                                    type: "PDF",
                                    size: "5.1 MB",
                                    downloads: 89,
                                    icon: FileText,
                                    color: "from-blue-500 to-indigo-500"
                                },
                                {
                                    title: "Video Tutorials Library",
                                    description: "Comprehensive video tutorials covering various topics and skills",
                                    type: "Link",
                                    size: "External",
                                    downloads: 234,
                                    icon: Video,
                                    color: "from-purple-500 to-pink-500"
                                },
                                {
                                    title: "Templates & Assets",
                                    description: "Downloadable templates and design assets for community projects",
                                    type: "ZIP",
                                    size: "12.7 MB",
                                    downloads: 67,
                                    icon: FolderOpen,
                                    color: "from-green-500 to-teal-500"
                                }
                            ].map((resource, index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 p-6">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 bg-gradient-to-br ${resource.color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                                            <resource.icon className="h-6 w-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{resource.title}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{resource.description}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                                    <span>{resource.type}</span>
                                                    <span>•</span>
                                                    <span>{resource.size}</span>
                                                    <span>•</span>
                                                    <span>{resource.downloads} downloads</span>
                                                </div>
                                                <Button size="sm" variant="outline">
                                                    <Download className="h-3 w-3 mr-1" />
                                                    Download
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-700">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Links</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <a href="#" className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700">
                                    <Link2 className="h-4 w-4" />
                                    Community Guidelines
                                </a>
                                <a href="#" className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700">
                                    <Link2 className="h-4 w-4" />
                                    Help Center
                                </a>
                                <a href="#" className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700">
                                    <Link2 className="h-4 w-4" />
                                    API Documentation
                                </a>
                                <a href="#" className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700">
                                    <Link2 className="h-4 w-4" />
                                    Contact Support
                                </a>
                            </div>
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-lg transition-opacity"
                onClick={handleBackdropClick}
            />

            {/* Modal Container */}
            <div className="relative w-full h-full sm:h-auto sm:max-w-7xl bg-white dark:bg-gray-900 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[100vh] sm:max-h-[90vh] animate-in fade-in zoom-in-95 duration-300">

                {/* Mobile Header */}
                <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 relative z-10">
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        type="button"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    <h2 className="font-semibold text-gray-900 dark:text-white truncate">{group.title || group.name}</h2>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                        <MoreHorizontal className="h-5 w-5" />
                    </button>
                </div>

                {/* Desktop Header */}
                <div className="hidden lg:block relative h-64 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-4000"></div>
                    </div>
                    {group.image && (
                        <img src={group.image} alt={group.title} className="w-full h-full object-cover opacity-20 mix-blend-overlay" />
                    )}

                    {/* Close Button - Desktop */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all"
                        type="button"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl border-4 border-white">
                                <Users className="h-10 w-10 text-white" />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-white mb-2">{group.title || group.name}</h1>
                                <div className="flex items-center gap-4 text-white/90 text-sm">
                                    <span className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        {group.members} members
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <Star className="h-4 w-4" />
                                        4.9 Rating
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <Zap className="h-4 w-4" />
                                        Very Active
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="outline" className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20">
                                    <Bell className="h-4 w-4 mr-2" />
                                    Notify
                                </Button>
                                <Button className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold">
                                    Join Group
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between px-4 lg:px-6">
                        <div className="flex gap-1 overflow-x-auto">
                            {[
                                { id: "feed", label: "Feed", icon: Home },
                                { id: "events", label: "Events", icon: CalendarDays },
                                { id: "members", label: "Members", icon: UserCheck },
                                { id: "media", label: "Media", icon: Image },
                                { id: "resources", label: "Resources", icon: FileText },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                                            ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20"
                                            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                        }`}
                                >
                                    <tab.icon className="h-4 w-4" />
                                    <span className="hidden sm:inline">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                        <div className="hidden lg:flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                                <Search className="h-4 w-4" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                                <Filter className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
                    {/* Main Content */}
                    <div className="flex-1 overflow-y-auto">
                        {renderTabContent()}
                    </div>

                    {/* Sidebar - Hidden on mobile */}
                    <div className="hidden lg:block w-80 bg-gray-50 dark:bg-gray-800/30 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
                        {/* Group Info */}
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wide">About Group</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                A vibrant community of professionals passionate about design, technology, and innovation. Join us to learn, share, and grow together.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Globe className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600 dark:text-gray-300">Public Group</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600 dark:text-gray-300">Worldwide</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600 dark:text-gray-300">Created Jan 2023</span>
                                </div>
                            </div>
                        </div>

                        {/* Group Stats */}
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wide">Group Stats</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                                    <p className="text-xl font-bold text-indigo-600">{group.members}</p>
                                    <p className="text-xs text-gray-500">Members</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                                    <p className="text-xl font-bold text-purple-600">1.2k</p>
                                    <p className="text-xs text-gray-500">Posts</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                                    <p className="text-xl font-bold text-green-600">89%</p>
                                    <p className="text-xs text-gray-500">Active</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                                    <p className="text-xl font-bold text-yellow-600">4.9</p>
                                    <p className="text-xs text-gray-500">Rating</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="p-6">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wide">Recent Activity</h3>
                            <div className="space-y-3">
                                {[
                                    { action: "New post by", user: "Alex Thompson", time: "2h ago" },
                                    { action: "Event created by", user: "Sarah Chen", time: "5h ago" },
                                    { action: "New member:", user: "Mike Johnson", time: "1d ago" },
                                    { action: "Resource added by", user: "Emma Wilson", time: "2d ago" }
                                ].map((activity, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-1.5"></div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                {activity.action} <span className="font-medium text-gray-900 dark:text-white">{activity.user}</span>
                                            </p>
                                            <p className="text-xs text-gray-500">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Bottom Action Bar */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
                        Join Group
                    </Button>
                </div>
            </div>
        </div>
    )
}