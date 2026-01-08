import React, { useState } from "react"
import { Home, AlertCircle, ShieldCheck, Calendar, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PropertyCard } from "@/components/account/PropertyCard"
import { EventCard } from "@/components/account/EventCard"
import { useGetMyListingsQuery, useDeletePropertyMutation, useGetMyEventsQuery, useDeleteEventMutation } from "@/store/api/hostApi"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

export const MyListings = () => {
    const navigate = useNavigate()
    const userStr = localStorage.getItem("user")
    const [activeTab, setActiveTab] = useState("spaces") // "spaces" or "experiences"

    // Property Listings
    const {
        data: propertyListings = [],
        isLoading: isPropertiesLoading,
        isError: isPropertiesError,
        error: propertiesError,
    } = useGetMyListingsQuery(undefined, { skip: !userStr })

    // Event Listings
    const {
        data: eventListings = [],
        isLoading: isEventsLoading,
        isError: isEventsError,
        error: eventsError,
    } = useGetMyEventsQuery(undefined, { skip: !userStr })

    const [deleteProperty] = useDeletePropertyMutation()
    const [deleteEvent] = useDeleteEventMutation()

    const [deletingIds, setDeletingIds] = useState(new Set())

    const visibleProperties = (propertyListings || []).filter(p => {
        const id = p._id || p.id
        if (deletingIds.has(id)) return false
        const isDeleted = p.is_deleted === true || (p.status || "").toLowerCase() === "deleted"
        return !isDeleted
    })

    const visibleEvents = (eventListings || []).filter(e => {
        const id = e._id || e.id
        if (deletingIds.has(id)) return false
        return true // Add more filtering if events have an is_deleted flag or status
    })

    const handlePropertyDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return
        setDeletingIds(prev => new Set([...prev, id]))
        try {
            await deleteProperty({ id, reason: "User deleted from dashboard" }).unwrap()
            toast.success("Listing deleted successfully")
        } catch (err) {
            setDeletingIds(prev => {
                const next = new Set(prev)
                next.delete(id)
                return next
            })
            toast.error(err?.data?.message || "Failed to delete listing")
        }
    }

    const handleEventDelete = async (id) => {
        setDeletingIds(prev => new Set([...prev, id]))
        try {
            await deleteEvent(id).unwrap()
            toast.success("Event deleted successfully")
        } catch (err) {
            setDeletingIds(prev => {
                const next = new Set(prev)
                next.delete(id)
                return next
            })
            toast.error(err?.data?.message || "Failed to delete event")
        }
    }

    const isLoading = activeTab === "spaces" ? isPropertiesLoading : isEventsLoading
    const isError = activeTab === "spaces" ? isPropertiesError : isEventsError
    const error = activeTab === "spaces" ? propertiesError : eventsError
    const currentListings = activeTab === "spaces" ? visibleProperties : visibleEvents

    return (
        <div className="p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-2">
                <div>
                    <h2 className="text-3xl font-black text-primary mb-2">My Listings Portfolio</h2>
                    <p className="text-[#00142E]/50 font-medium">Manage your active spaces and community bookings.</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="rounded-2xl h-12 px-6 font-bold border-neutral/20 text-primary hover:bg-neutral/5"
                        onClick={() => navigate(activeTab === "spaces" ? "/host/create" : "/events/host")}
                    >
                        + Create New {activeTab === "spaces" ? "Space" : "Experience"}
                    </Button>
                </div>
            </div>

            {/* Quick Stats & Tabs */}
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 bg-white rounded-3xl p-4 border border-neutral/10 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent shrink-0">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#00142E]/40 leading-tight">Verified Status</p>
                            <p className="text-sm font-bold text-primary">NextKin Verified Host</p>
                        </div>
                    </div>
                    <div className="h-10 w-px bg-neutral/10 hidden sm:block" />
                    <div className="flex gap-8 px-4">
                        <div className="text-center">
                            <p className="text-xl font-black text-primary leading-none">{visibleProperties.length}</p>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#00142E]/40 mt-1">Spaces</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-black text-primary leading-none">{visibleEvents.length}</p>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#00142E]/40 mt-1">Events</p>
                        </div>
                    </div>
                </div>

                {/* Tabs Switcher */}
                <div className="bg-[#F1F3F5] p-1.5 rounded-[24px] flex items-center gap-1 w-fit">
                    <button
                        onClick={() => setActiveTab("spaces")}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2.5 rounded-[20px] text-sm font-bold transition-all",
                            activeTab === "spaces"
                                ? "bg-primary text-white shadow-md transform scale-105"
                                : "text-gray-500 hover:text-gray-900"
                        )}
                    >
                        <Home className="w-4 h-4" />
                        Spaces
                    </button>
                    <button
                        onClick={() => setActiveTab("experiences")}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2.5 rounded-[20px] text-sm font-bold transition-all",
                            activeTab === "experiences"
                                ? "bg-primary text-white shadow-md transform scale-105"
                                : "text-gray-500 hover:text-gray-900"
                        )}
                    >
                        <Sparkles className="w-4 h-4" />
                        Experiences
                    </button>
                </div>
            </div>

            {isError ? (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[40px] border border-neutral/5">
                    <div className="w-20 h-20 bg-rose-50 rounded-[32px] flex items-center justify-center mb-6">
                        <AlertCircle className="w-10 h-10 text-rose-500" />
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-rose-600">Failed to load {activeTab}</h4>
                    <p className="text-rose-600/60 max-w-sm mb-8">{error?.message || "An unexpected error occurred."}</p>
                </div>
            ) : isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-[#00142E]/50 font-medium">Fetching your {activeTab}...</p>
                </div>
            ) : currentListings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[40px] border border-neutral/5">
                    <div className="w-24 h-24 bg-[#F8F9FA] rounded-[32px] flex items-center justify-center mb-6">
                        {activeTab === "spaces" ? <Home className="w-10 h-10 text-neutral" /> : <Calendar className="w-10 h-10 text-neutral" />}
                    </div>
                    <h4 className="text-xl font-bold mb-2">No {activeTab} found</h4>
                    <p className="text-[#00142E]/50 max-w-sm mb-8">
                        {activeTab === "spaces"
                            ? "Start sharing your sanctuary with the community."
                            : "Create memorable experiences for the community."}
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activeTab === "spaces" ? (
                        currentListings.map(p => (
                            <PropertyCard key={p._id || p.id} property={p} onDelete={handlePropertyDelete} />
                        ))
                    ) : (
                        currentListings.map(e => (
                            <EventCard key={e._id || e.id} event={e} onDelete={handleEventDelete} />
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
