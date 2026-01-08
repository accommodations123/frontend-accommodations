"use client"
import React from "react"
import { Bell, MessageSquare, Star, Info, Home, CheckCircle, Trash2 } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { markAllAsRead, clearNotifications, markAsRead } from "@/store/slices/notificationSlice"

export const Notifications = () => {
    const dispatch = useDispatch()
    const notifications = useSelector(state => state.notifications.items)
    const unreadCount = useSelector(state => state.notifications.unreadCount)

    const getIcon = (notif) => {
        switch (notif.entityType) {
            case 'EVENT':
                return { icon: Star, color: "text-amber-500", bg: "bg-amber-50" }
            case 'PROPERTY':
                return { icon: Home, color: "text-blue-500", bg: "bg-blue-50" }
            case 'HOST':
                return { icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" }
            default:
                if (notif.type === 'success') return { icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" }
                return { icon: Info, color: "text-rose-500", bg: "bg-rose-50" }
        }
    }

    return (
        <div className="p-4 md:p-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8 md:mb-10 pb-6 md:pb-8 border-b border-neutral/10">
                <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 text-[#00142E]">Notifications</h3>
                    <p className="text-sm md:text-base text-[#00142E]/50">Stay updated on your latest activities.</p>
                </div>
                <div className="flex gap-2">
                    {notifications.length > 0 && (
                        <button
                            onClick={() => dispatch(clearNotifications())}
                            className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors"
                            title="Clear all"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    )}
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                        <Bell className="w-5 h-5 text-accent" />
                    </div>
                </div>
            </div>

            <div className="space-y-3 md:space-y-4">
                {notifications.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">No notifications yet</p>
                    </div>
                ) : (
                    notifications.map((notif) => {
                        const { icon: Icon, color, bg } = getIcon(notif)
                        return (
                            <div
                                key={notif.id}
                                onClick={() => dispatch(markAsRead(notif.id))}
                                className={`flex gap-3 md:gap-4 p-4 md:p-6 rounded-2xl md:rounded-3xl border transition-all cursor-pointer group ${notif.read ? 'bg-white border-gray-100 hover:border-gray-200' : 'bg-blue-50/30 border-blue-100 hover:border-blue-200'}`}
                            >
                                <div className={`w-10 h-10 md:w-12 md:h-12 ${bg} rounded-xl md:rounded-2xl flex items-center justify-center shrink-0`}>
                                    <Icon className={`w-5 h-5 md:w-6 md:h-6 ${color}`} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className={`font-bold text-base md:text-lg leading-tight ${notif.read ? 'text-[#00142E]/80' : 'text-[#00142E]'}`}>
                                            {notif.entityType ? `${notif.entityType.charAt(0) + notif.entityType.slice(1).toLowerCase()} Approved` : 'New Notification'}
                                        </h4>
                                        <span className="text-[10px] md:text-xs text-[#00142E]/40 font-medium ml-2 whitespace-nowrap">{notif.time}</span>
                                    </div>
                                    <p className={`text-sm md:text-base leading-normal ${notif.read ? 'text-[#00142E]/50' : 'text-[#00142E]/70'}`}>{notif.message}</p>
                                </div>
                                {!notif.read && (
                                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                                )}
                            </div>
                        )
                    })
                )}
            </div>

            {unreadCount > 0 && (
                <div className="mt-10 text-center">
                    <button
                        onClick={() => dispatch(markAllAsRead())}
                        className="text-sm font-bold text-accent hover:underline decoration-2 underline-offset-4"
                    >
                        Mark all as read
                    </button>
                </div>
            )}
        </div>
    )
}
