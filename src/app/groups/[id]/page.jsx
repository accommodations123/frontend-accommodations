"use client"

import * as React from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { useGetCommunityByIdQuery, useJoinCommunityMutation, useLeaveCommunityMutation } from "@/store/api/hostApi"
import { toast } from "sonner"
import { Heart, MessageCircle, Share2, X, Users, Star, Zap, Bell, Search, Filter, Home, UserCheck, CalendarDays, Image, FileText, Hash, MessageSquare, Clock, MapPin, Calendar, Camera, FolderOpen, Download, Play, Eye, Briefcase, BookOpen, Database, HelpCircle, UserPlus, UserMinus, Settings, ChevronRight, ArrowLeft, ThumbsUp, Bookmark, TrendingUp, Award, BarChart3, Target, Trophy, Gift, Sparkles, Info, Code, Globe, Link2, Mail, Phone, Shield, Pin, Upload, MoreVertical, Layers, Palette, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

function ErrorBoundary({ children }) {
    const [hasError, setHasError] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        const handleError = (event) => {
            console.error("Caught by Error Boundary:", event.error);
            setError(event.error);
            setHasError(true);
        };

        window.addEventListener('error', handleError);
        return () => window.removeEventListener('error', handleError);
    }, []);

    const handleRetry = () => {
        setHasError(false)
        setError(null)
    }

    if (hasError) {
        return (
            <div className="flex items-center justify-center p-4 min-h-[50vh]">
                <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg border">
                    <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
                    <p className="text-gray-600 mb-2 text-sm">An error occurred while loading the community.</p>
                    <Button onClick={handleRetry}>
                        Try Again
                    </Button>
                </div>
            </div>
        )
    }

    return <>{children}</>
}

export default function GroupDetailsPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = React.useState("feed")
    const [selectedMember, setSelectedMember] = React.useState(null)
    const [isJoining, setIsJoining] = React.useState(false)

    // API hooks
    const { data: communityData, isLoading, error } = useGetCommunityByIdQuery(id)
    const [joinCommunity] = useJoinCommunityMutation()
    const [leaveCommunity] = useLeaveCommunityMutation()

    // Key fix: Unwrap community data
    const community = React.useMemo(() => {
        if (!communityData) return null;
        if (communityData.community) return communityData.community;
        if (communityData.data) return communityData.data;
        return communityData;
    }, [communityData]);


    const handleJoinLeave = async () => {
        if (!community) return;
        setIsJoining(true);
        try {
            if (community.isJoined) {
                await leaveCommunity(community.id).unwrap();
                toast.success("Successfully left the community!");
            } else {
                await joinCommunity(community.id).unwrap();
                toast.success("Successfully joined the community!");
            }
            // In a real app, invalidate tags or refetch would handle UI update.
            // For now, depending on API slice providing tags, it might auto-update.
        } catch (err) {
            toast.error(err.data?.message || "An error occurred");
        } finally {
            setIsJoining(false);
        }
    };

    // --- Mock Data (Reused from Modal) ---
    const channels = [
        { id: "general", name: "General", icon: Hash, count: 245 },
        { id: "random", name: "Random", icon: Hash, count: 89 },
        { id: "resources", name: "Resources", icon: FileText, count: 134 },
    ]

    const members = [
        { id: 1, name: "Smith Row", posts: 11, avatar: "SR", avatarColor: "from-blue-500 to-indigo-600", profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face", status: "online", },
        { id: 2, name: "Shakil Ahmed", posts: 10, avatar: "SA", avatarColor: "from-purple-500 to-pink-600", profilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face", status: "online", },
        { id: 3, name: "John Doe", posts: 8, avatar: "JD", avatarColor: "from-green-500 to-teal-600", profilePic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face", status: "offline", },
        { id: 4, name: "Jane Smith", posts: 7, avatar: "JS", avatarColor: "from-orange-500 to-red-600", profilePic: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face", status: "online", },
    ]

    const posts = [
        { id: 1, author: "Smith Row", avatar: "SR", avatarColor: "from-blue-500 to-indigo-600", time: "2 hours ago", content: "Just deployed a new Laravel package for handling API authentication! 🚀 Check it out on GitHub.", likes: 24, comments: 8, shares: 3, },
        { id: 2, author: "Shakil Ahmed", avatar: "SA", avatarColor: "from-purple-500 to-pink-600", time: "5 hours ago", content: "Working on a Laravel-based e-commerce platform with Vue.js frontend.", likes: 18, comments: 12, shares: 5, },
    ]


    const renderTabContent = () => {
        switch (activeTab) {
            case "feed":
                return (
                    <div className="flex h-full min-h-[600px] bg-gray-50 flex-col md:flex-row">
                        {/* Left Sidebar - Channels */}
                        <div className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col">
                            <div className="p-4 border-b border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2">Channels</h3>
                            </div>
                            <div className="md:flex-1 overflow-y-auto max-h-[300px] md:max-h-none">
                                {channels.map((channel) => (
                                    <button key={channel.id} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100">
                                        <channel.icon className="h-5 w-5 text-gray-500" />
                                        <div className="flex-1 text-left">
                                            <p className="font-medium text-gray-900 text-sm">{channel.name}</p>
                                            <p className="text-xs text-gray-500">{channel.count} posts</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 flex flex-col h-full border-r border-gray-200">
                            {/* Create Post */}
                            <div className="p-4 bg-white border-b border-gray-200">
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <div className="flex gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">ME</div>
                                        <div className="flex-1">
                                            <textarea placeholder="Share your thoughts with the community..." className="w-full bg-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 resize-none" rows={2} />
                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="ghost" className="text-gray-600 h-8 px-3"><Image className="h-4 w-4 mr-1" /> Photo</Button>
                                                </div>
                                                <Button className="bg-blue-600 hover:bg-blue-700 text-white h-8 px-4 text-sm">Post</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Posts */}
                            <div className="flex-1 overflow-y-auto p-4">
                                <div className="space-y-4">
                                    {posts.map((post) => (
                                        <div key={post.id} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                                            <div className="flex items-start gap-3 mb-3">
                                                <div className={`w-10 h-10 bg-gradient-to-br ${post.avatarColor} text-white rounded-full flex items-center justify-center font-bold text-sm`}>{post.avatar}</div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="font-semibold text-gray-900">{post.author}</h4>
                                                        <span className="text-xs text-gray-500">{post.time}</span>
                                                    </div>
                                                    <p className="text-gray-700 text-sm">{post.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar - Members (Hidden on small screens) */}
                        <div className="hidden md:flex w-80 bg-white flex-col h-full">
                            <div className="p-4 border-b border-gray-200 bg-red-50">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                        <Users className="h-5 w-5 text-red-600" /> Members
                                    </h3>
                                    <span className="text-sm font-medium text-red-600 bg-red-100 px-2 py-1 rounded">
                                        {community?.members_count || members.length}
                                    </span>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                {members.map((member) => (
                                    <div key={member.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100" onClick={() => setSelectedMember(member)}>
                                        <div className="relative">
                                            <img src={member.profilePic} alt={member.name} className="w-10 h-10 rounded-full object-cover" onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=4F46E5&color=fff` }} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900 text-sm">{member.name}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )

            case "members":
                return (
                    <div className="flex flex-col h-full bg-gray-50 p-6 min-h-[500px]">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Community Members</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {members.map((member) => (
                                <div key={member.id} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                                    <div className="flex items-center gap-3 mb-3">
                                        <img src={member.profilePic} alt={member.name} className="w-12 h-12 rounded-lg object-cover" onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=4F46E5&color=fff&size=100` }} />
                                        <div>
                                            <h3 className="font-semibold text-gray-900 text-sm">{member.name}</h3>
                                            <p className="text-xs text-gray-500">{member.posts} posts</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )

            default:
                return (
                    <div className="flex items-center justify-center min-h-[400px]">
                        <p className="text-gray-500">Coming soon...</p>
                    </div>
                )
        }
    }

    if (isLoading) {
        return (
            <main className="min-h-screen bg-background pt-20 flex flex-col">
                <Navbar />
                <div className="flex-1 flex justify-center items-center">
                    <Loader2 className="h-12 w-12 animate-spin text-[#C93A30]" />
                </div>
                <Footer />
            </main>
        )
    }

    if (error || !community) {
        return (
            <main className="min-h-screen bg-background pt-20 flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col justify-center items-center">
                    <p className="text-red-500 mb-4">Error loading community details.</p>
                    <Button onClick={() => navigate('/groups')}>Go Back to Groups</Button>
                </div>
                <Footer />
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-background pt-20 pb-10">
            <Navbar />

            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4">
                <nav className="flex text-sm text-gray-500 space-x-2">
                    <Link to="/" className="hover:text-[#C93A30]">Home</Link>
                    <span>/</span>
                    <Link to="/groups" className="hover:text-[#C93A30]">Groups</Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium truncate max-w-xs">{community.name}</span>
                </nav>
            </div>

            <div className="container mx-auto px-4">
                <ErrorBoundary>
                    <div className="relative w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col min-h-[80vh]">
                        {/* Header with Background Image */}
                        <div className="relative h-64 flex-shrink-0">
                            {community?.cover_image ? (
                                <img src={community.cover_image} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600"></div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent"></div>

                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
                                    {community?.avatar_image ? (
                                        <img src={community.avatar_image} alt={community?.name} className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg" />
                                    ) : (
                                        <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border-4 border-white">
                                            <span className="text-white text-3xl font-bold">{community?.name ? community.name.substring(0, 2).toUpperCase() : 'CO'}</span>
                                        </div>
                                    )}
                                    <div className="flex-1 mb-2">
                                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{community?.name || 'Community Name'}</h1>
                                        <p className="text-white/90 text-lg max-w-2xl">{community?.description || 'Community description'}</p>
                                    </div>
                                    <div className="mb-2">
                                        <Button onClick={handleJoinLeave} disabled={isJoining} className="font-semibold bg-white text-blue-600 hover:bg-gray-100 border-none shadow-md px-6 py-6 text-lg h-auto">
                                            {isJoining ? <Loader2 className="h-5 w-5 animate-spin" /> : community?.isJoined ? 'Leave Group' : 'Join Group'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                            <div className="flex items-center px-4 md:px-8 space-x-1 overflow-x-auto no-scrollbar">
                                {[
                                    { id: "feed", label: "Feed", icon: Home },
                                    { id: "myfeed", label: "My Feed", icon: UserCheck },
                                    { id: "members", label: "Members", icon: Users },
                                    { id: "events", label: "Events", icon: CalendarDays },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${activeTab === tab.id
                                                ? "text-blue-600 border-blue-600"
                                                : "text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-200"
                                            }`}
                                    >
                                        <tab.icon className="h-4 w-4" />
                                        <span>{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="flex-1 bg-gray-50">
                            {renderTabContent()}
                        </div>
                    </div>
                </ErrorBoundary>
            </div>
            <Footer />
        </main>
    )
}
