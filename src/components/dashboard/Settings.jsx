"use client"
import React, { useState } from "react"
import {
    Shield, Lock, Bell, Mail, Smartphone,
    Globe, Eye, CreditCard, Languages, Flag
} from "lucide-react"
import { cn } from "@/lib/utils"

const SettingSection = ({ title, children }) => (
    <div className="space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00142E]/40 ml-1">{title}</h4>
        <div className="grid gap-4">
            {children}
        </div>
    </div>
)

const SettingToggle = ({ icon: Icon, label, desc, active, onToggle }) => (
    <div className="flex items-center justify-between p-6 rounded-[32px] bg-white border border-neutral/5 shadow-lg shadow-primary/5 hover:border-neutral/10 transition-all group">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F8F9FA] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                <Icon className="w-6 h-6 text-[#00142E]/60 group-hover:text-accent transition-colors" />
            </div>
            <div>
                <h5 className="font-bold text-primary">{label}</h5>
                <p className="text-sm text-[#00142E]/50 font-medium leading-tight">{desc}</p>
            </div>
        </div>
        <button
            onClick={onToggle}
            className={cn(
                "w-12 h-6 rounded-full p-1 transition-all duration-300 relative",
                active ? "bg-accent shadow-lg shadow-accent/20" : "bg-neutral/20"
            )}
        >
            <div className={cn(
                "w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm",
                active ? "translate-x-6" : "translate-x-0"
            )} />
        </button>
    </div>
)

const SettingSelect = ({ icon: Icon, label, value, options }) => (
    <div className="flex items-center justify-between p-6 rounded-[32px] bg-white border border-neutral/5 shadow-lg shadow-primary/5 hover:border-neutral/10 transition-all group">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F8F9FA] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                <Icon className="w-6 h-6 text-[#00142E]/60 group-hover:text-accent transition-colors" />
            </div>
            <div>
                <h5 className="font-bold text-primary">{label}</h5>
            </div>
        </div>
        <select className="bg-[#F8F9FA] border-none font-bold text-primary text-sm px-4 py-2 rounded-xl focus:ring-2 focus:ring-accent/20 outline-none cursor-pointer">
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
)

export const Settings = () => {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        publicProfile: true,
        showPhone: false,
        twoFactor: true,
    })

    const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }))

    return (
        <div className="p-4 md:p-8 space-y-10 max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-2">
                <h2 className="text-3xl font-black text-primary mb-2">Account Settings</h2>
                <p className="text-[#00142E]/50 font-medium">Manage your preferences, privacy, and security.</p>
            </div>

            <SettingSection title="Notification Preferences">
                <SettingToggle
                    icon={Mail}
                    label="Email Notifications"
                    desc="Receive alerts and updates via your email address."
                    active={settings.emailNotifications}
                    onToggle={() => toggle('emailNotifications')}
                />
                <SettingToggle
                    icon={Bell}
                    label="Push Notifications"
                    desc="Receive instant notifications on your device."
                    active={settings.pushNotifications}
                    onToggle={() => toggle('pushNotifications')}
                />
                <SettingToggle
                    icon={Smartphone}
                    label="SMS Notifications"
                    desc="Receive important security alerts via text message."
                    active={settings.smsNotifications}
                    onToggle={() => toggle('smsNotifications')}
                />
            </SettingSection>

            <SettingSection title="Privacy & Security">
                <SettingToggle
                    icon={Eye}
                    label="Public Profile"
                    desc="Allow others to see your public profile information."
                    active={settings.publicProfile}
                    onToggle={() => toggle('publicProfile')}
                />
                <SettingToggle
                    icon={Smartphone}
                    label="Show Phone Number"
                    desc="Show your verified phone number to confirmed guests."
                    active={settings.showPhone}
                    onToggle={() => toggle('showPhone')}
                />
                <SettingToggle
                    icon={Shield}
                    label="Two-Factor Authentication"
                    desc="Keep your account extra secure with 2FA."
                    active={settings.twoFactor}
                    onToggle={() => toggle('twoFactor')}
                />
            </SettingSection>

            <SettingSection title="Global Preferences">
                <SettingSelect
                    icon={CreditCard}
                    label="Preferred Currency"
                    options={["USD ($)", "EUR (€)", "GBP (£)", "INR (₹)", "CAD ($)"]}
                />
                <SettingSelect
                    icon={Flag}
                    label="Preferred Country"
                    options={["United States", "United Kingdom", "Canada", "Germany", "India"]}
                />
                <SettingSelect
                    icon={Languages}
                    label="Preferred Language"
                    options={["English (US)", "English (UK)", "Spanish", "French", "German"]}
                />
            </SettingSection>
        </div>
    )
}
