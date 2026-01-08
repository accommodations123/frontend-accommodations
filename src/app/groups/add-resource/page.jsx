import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import CommunityDetailsForm from '@/components/groups/CommunityDetailsForm';
import { ArrowLeft, Settings } from 'lucide-react';

const AddResourcePage = () => {
    return (
        <div className="min-h-screen bg-[#00152d] flex flex-col font-inter selection:bg-accent/30">
            <Navbar />

            {/* Premium Header */}


            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 md:px-8 pt-28 pb-20 w-full relative z-20">
                <CommunityDetailsForm />

                {/* Guidelines */}
                {/* <div className="mt-12 p-8 bg-white/5 backdrop-blur-xl rounded-[40px] border border-white/10">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4 font-poppins">Community Guidelines</h4>
                    <ul className="space-y-3">
                        {[
                            "Ensure the resource is beneficial to the community.",
                            "Avoid spam or promotional links unrelated to the group.",
                            "Verify phone numbers before sharing contact resources.",
                            "Make sure file titles are descriptive and clear."
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 text-sm text-gray-400 font-medium">
                                <span className="text-accent font-black">{i + 1}.</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div> */}
            </main>

            <Footer />
        </div>
    );
};

export default AddResourcePage;
