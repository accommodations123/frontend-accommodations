import React from "react"
import { Calendar, DollarSign, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export const EventDetailsSection = ({ formData, handleInputChange }) => {
    return (
        <div className="rounded-xl p-6 border bg-[#f8f9fa] border-[#00162d]">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-[#00162d]">
                <Calendar className="mr-2 h-5 w-5 text-[#00162d]" />
                Event Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <Label className="font-medium text-sm text-[#00162d]">Event Title *</Label>
                    <Input
                        value={formData.title || ""}
                        onChange={e => handleInputChange("title", e.target.value)}
                        className="mt-1 text-gray-900 placeholder-gray-400 border-[#00162d]"
                        placeholder="Give your event a catchy title"
                    />
                </div>

                <div>
                    <Label className="font-medium text-sm text-[#00162d]">Event Type</Label>
                    <select
                        className="w-full mt-1 border border-[#00162d] rounded-md p-2 text-gray-900"
                        value={formData.event_type || "meetup"}
                        onChange={e => handleInputChange("event_type", e.target.value)}
                    >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="meetup">Meetup</option>
                        <option value="festival">Festival</option>
                        <option value="party">Party</option>
                    </select>
                </div>

                <div>
                    <Label className="font-medium text-sm text-[#00162d]">Event Mode</Label>
                    <select
                        className="w-full mt-1 border border-[#00162d] rounded-md p-2 text-gray-900"
                        value={formData.event_mode || "offline"}
                        onChange={e => handleInputChange("event_mode", e.target.value)}
                    >
                        <option value="offline">Offline</option>
                        <option value="online">Online</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                </div>

                <div>
                    <Label className="font-medium text-sm text-[#00162d]">Start Date *</Label>
                    <Input
                        type="date"
                        value={formData.date || ""}
                        onChange={e => handleInputChange("date", e.target.value)}
                        className="mt-1 text-gray-900 border-[#00162d]"
                    />
                </div>

                <div>
                    <Label className="font-medium text-sm text-[#00162d]">End Date</Label>
                    <Input
                        type="date"
                        value={formData.end_date || ""}
                        onChange={e => handleInputChange("end_date", e.target.value)}
                        className="mt-1 text-gray-900 border-[#00162d]"
                    />
                </div>

                <div>
                    <Label className="font-medium text-sm text-[#00162d]">Start Time *</Label>
                    <Input
                        type="time"
                        value={formData.time || ""}
                        onChange={e => handleInputChange("time", e.target.value)}
                        className="mt-1 text-gray-900 border-[#00162d]"
                    />
                </div>

                <div>
                    <Label className="font-medium text-sm text-[#00162d]">End Time</Label>
                    <Input
                        type="time"
                        value={formData.end_time || ""}
                        onChange={e => handleInputChange("end_time", e.target.value)}
                        className="mt-1 text-gray-900 border-[#00162d]"
                    />
                </div>

                <div>
                    <Label className="font-medium text-sm flex items-center text-[#00162d]">
                        <DollarSign className="h-4 w-4 mr-1 text-[#00162d]" />
                        Price
                    </Label>
                    <Input
                        type="number"
                        value={formData.price || ""}
                        onChange={e => handleInputChange("price", e.target.value)}
                        className="mt-1 text-gray-900 placeholder-gray-400 border-[#00162d]"
                        placeholder="0.00"
                    />
                </div>

                <div>
                    <Label className="font-medium text-sm flex items-center text-[#00162d]">
                        <Globe className="h-4 w-4 mr-1 text-[#00162d]" />
                        Event URL
                    </Label>
                    <Input
                        value={formData.event_url || ""}
                        onChange={e => handleInputChange("event_url", e.target.value)}
                        className="mt-1 text-gray-900 placeholder-gray-400 border-[#00162d]"
                        placeholder="https://example.com"
                    />
                </div>
            </div>

            <div className="mt-4">
                <Label className="font-medium text-sm text-[#00162d]">Event Description</Label>
                <Textarea
                    value={formData.description || ""}
                    onChange={e => handleInputChange("description", e.target.value)}
                    className="mt-1 text-gray-900 placeholder-gray-400 border-[#00162d]"
                    placeholder="Describe your event in detail"
                    rows={4}
                />
            </div>

            {formData.event_mode !== 'offline' && (
                <div className="mt-4">
                    <Label className="font-medium text-sm text-[#00162d]">Online Instructions</Label>
                    <Textarea
                        value={formData.online_instructions || ""}
                        onChange={e => handleInputChange("online_instructions", e.target.value)}
                        className="mt-1 text-gray-900 placeholder-gray-400 border-[#00162d]"
                        placeholder="How to join your online event"
                        rows={3}
                    />
                </div>
            )}
        </div>
    )
}
