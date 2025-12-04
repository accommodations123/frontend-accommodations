import React, { useState } from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Briefcase, Globe, MessageCircle, User, Filter, Video, Coffee, Plus, ShieldAlert, X } from "lucide-react";
import { JOB_SUPPORTERS, CAREER_DOMAINS } from "@/lib/jobs-data";

export default function SupportPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDomain, setSelectedDomain] = useState("All");
    const [selectedCountry, setSelectedCountry] = useState("All");

    // Modal States
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [isSafetyOpen, setIsSafetyOpen] = useState(false);
    const [selectedMentor, setSelectedMentor] = useState(null);

    // Extract unique countries for filter
    const countries = ["All", ...new Set(JOB_SUPPORTERS.map(s => s.country))];

    const filteredSupporters = JOB_SUPPORTERS.filter(supporter => {
        const matchesSearch = supporter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supporter.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supporter.role.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDomain = selectedDomain === "All" || supporter.domain === selectedDomain;
        const matchesCountry = selectedCountry === "All" || supporter.country === selectedCountry;

        return matchesSearch && matchesDomain && matchesCountry;
    });

    const handleConnect = (mentor) => {
        setSelectedMentor(mentor);
        setIsSafetyOpen(true);
    };

    return (
        <main className="min-h-screen bg-gray-50 relative">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-[#07182A] text-white pt-32 pb-16 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Career Mentor</h1>
                    <p className="text-xl text-gray-300 mb-8">Connect with experienced professionals in your field for guidance, referrals, and career support.</p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
                        <div className="bg-white p-2 rounded-xl shadow-lg flex flex-1 w-full relative z-10">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search by name, company, or role..."
                                    className="pl-10 h-12 border-none focus-visible:ring-0 text-gray-900 placeholder:text-gray-400"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button className="h-12 px-8 bg-[#C93A30] hover:bg-[#a82f26] text-white font-semibold rounded-lg">
                                Search
                            </Button>
                        </div>
                        <Button
                            onClick={() => setIsUploadOpen(true)}
                            className="h-14 px-6 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm rounded-xl flex items-center gap-2 whitespace-nowrap"
                        >
                            <Plus className="h-5 w-5" /> Become a Mentor
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">

                {/* Filter Tags */}
                <div className="mb-10">
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <button
                            onClick={() => setSelectedDomain("All")}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${selectedDomain === "All"
                                ? "bg-[#C93A30] text-white border-[#C93A30] shadow-md"
                                : "bg-white text-gray-600 border-gray-200 hover:border-[#C93A30] hover:text-[#C93A30]"
                                }`}
                        >
                            All Domains
                        </button>
                        {CAREER_DOMAINS.map(domain => (
                            <button
                                key={domain}
                                onClick={() => setSelectedDomain(domain)}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${selectedDomain === domain
                                    ? "bg-[#C93A30] text-white border-[#C93A30] shadow-md"
                                    : "bg-white text-gray-600 border-gray-200 hover:border-[#C93A30] hover:text-[#C93A30]"
                                    }`}
                            >
                                {domain}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content: Supporter Grid */}
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-[#07182A]">Available Mentors</h2>
                        <div className="flex items-center gap-4">
                            <select
                                className="h-10 rounded-md border border-gray-200 bg-white px-3 py-1 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#07182A]"
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                            >
                                {countries.map(c => <option key={c} value={c}>{c === "All" ? "All Countries" : c}</option>)}
                            </select>
                            <span className="text-gray-500 text-sm font-medium">{filteredSupporters.length} mentors found</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSupporters.map(supporter => (
                            <div key={supporter.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all flex flex-col group">
                                {/* Card Header */}
                                <div className="flex flex-col items-center text-center mb-6">
                                    <div className="relative mb-4">
                                        <img
                                            src={supporter.image}
                                            alt={supporter.name}
                                            className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 shadow-sm group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm border border-gray-100">
                                            {supporter.connectionModes.includes("Online") ? (
                                                <Video className="h-4 w-4 text-[#07182A]" />
                                            ) : (
                                                <Coffee className="h-4 w-4 text-[#07182A]" />
                                            )}
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-xl mb-1">{supporter.name}</h3>
                                    <p className="text-gray-500 font-medium text-sm mb-1">{supporter.role}</p>
                                    <p className="text-[#07182A] font-bold text-sm">{supporter.company}</p>
                                </div>

                                {/* Expertise Quote */}
                                <div className="mb-6 flex-1">
                                    <blockquote className="relative pl-4 border-l-4 border-[#C93A30] italic text-gray-600 text-sm leading-relaxed bg-gray-50 py-2 pr-2 rounded-r-lg">
                                        "{supporter.bio}"
                                    </blockquote>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6 justify-center">
                                    <Badge variant="secondary" className="bg-blue-50 text-[#07182A] hover:bg-blue-100 border border-blue-100">
                                        {supporter.domain}
                                    </Badge>
                                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200">
                                        {supporter.experience} Exp
                                    </Badge>
                                </div>

                                {/* Footer Actions */}
                                <div className="pt-4 border-t border-gray-100 mt-auto">
                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
                                        <MapPin className="h-4 w-4" /> {supporter.location}
                                    </div>
                                    <Button
                                        className="w-full bg-[#C93A30] hover:bg-[#a82f26] text-white font-bold h-11 shadow-sm hover:shadow-md transition-all"
                                        onClick={() => handleConnect(supporter)}
                                    >
                                        Request Mentorship
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Upload Profile Modal */}
            {isUploadOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 border-b flex justify-between items-center bg-[#07182A] text-white">
                            <h3 className="text-xl font-bold">Become a Mentor</h3>
                            <button onClick={() => setIsUploadOpen(false)} className="text-white/70 hover:text-white">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                                    <Input placeholder="e.g. Aditi Rao" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Current Role</label>
                                    <Input placeholder="e.g. Product Designer" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Company</label>
                                <Input placeholder="e.g. Microsoft" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Domain</label>
                                    <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                                        {CAREER_DOMAINS.map(d => <option key={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Experience</label>
                                    <Input placeholder="e.g. 5 years" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Location</label>
                                <Input placeholder="e.g. Berlin, Germany" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Bio (Short)</label>
                                <textarea className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="How can you help others?" />
                            </div>
                            <Button className="w-full bg-[#07182A] hover:bg-[#0b2540] text-white h-12 text-lg font-bold">
                                Submit Profile
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Safety Warning Modal */}
            {isSafetyOpen && selectedMentor && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 bg-orange-50 border-b border-orange-100 flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                <ShieldAlert className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-orange-900">Safety First</h3>
                                <p className="text-xs text-orange-700">Read before connecting</p>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <p className="text-sm text-gray-600 leading-relaxed">
                                You are about to connect with <strong>{selectedMentor.name}</strong>. Please keep the following in mind:
                            </p>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-sm text-gray-700">
                                    <span className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                                    <span>Never share financial details or pay for mentorship upfront.</span>
                                </li>
                                <li className="flex gap-3 text-sm text-gray-700">
                                    <span className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                                    <span>Keep initial conversations within the platform or professional networks like LinkedIn.</span>
                                </li>
                                <li className="flex gap-3 text-sm text-gray-700">
                                    <span className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                                    <span>Report any suspicious behavior immediately.</span>
                                </li>
                            </ul>
                            <div className="pt-4 flex gap-3">
                                <Button variant="outline" onClick={() => setIsSafetyOpen(false)} className="flex-1">
                                    Cancel
                                </Button>
                                <Button className="flex-1 bg-[#07182A] hover:bg-[#0b2540] text-white">
                                    I Understand, Proceed
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </main>
    );
}
