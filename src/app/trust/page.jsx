import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Shield, CheckCircle, Users, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function TrustPage() {
    return (
        <main className="min-h-screen bg-background pt-20">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-primary py-20 text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Trust & Safety for Indians Abroad</h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    We understand the concerns of moving to a new country. Here's how we ensure a safe and welcoming experience for the Indian diaspora.
                </p>
            </section>

            {/* Trust Features */}
            <section className="py-16 container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <div className="h-12 w-12 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                            <Shield className="h-6 w-6 text-accent" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Verified Listings</h3>
                        <p className="text-gray-400">
                            Every listing is verified. We check property documents and host identity to ensure you don't face any scams.
                        </p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <div className="h-12 w-12 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle className="h-6 w-6 text-accent" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Culturally Compatible</h3>
                        <p className="text-gray-400">
                            Find hosts who understand your culture. Filter by vegetarian kitchens, proximity to Indian stores, and more.
                        </p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <div className="h-12 w-12 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                            <Users className="h-6 w-6 text-accent" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Community Support</h3>
                        <p className="text-gray-400">
                            Connect with other Indians in your city. Join local groups and get advice from people who have been there.
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-gray-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">Trusted by Indians Worldwide</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Priya S.",
                                role: "MS Student, New Jersey",
                                text: "NextKinLife helped me find a safe room near my university with a vegetarian roommate. It made my transition to the US so much easier."
                            },
                            {
                                name: "Rahul M.",
                                role: "IT Professional, London",
                                text: "I was worried about finding a place in London. The community features here connected me with other Telugus, and I found a great flatshare."
                            },
                            {
                                name: "Anjali K.",
                                role: "Family, Toronto",
                                text: "Moving with a family is hard. We found a verified home in a safe, Indian-friendly neighborhood thanks to the detailed listings."
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-background p-6 rounded-xl border border-white/10">
                                <div className="flex items-center gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <StarIcon key={i} className="h-4 w-4 fill-accent text-accent" />
                                    ))}
                                </div>
                                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                                <div>
                                    <p className="text-white font-bold">{testimonial.name}</p>
                                    <p className="text-accent text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ask the Community */}
            <section className="py-16 container mx-auto px-4">
                <div className="max-w-2xl mx-auto bg-white/5 p-8 rounded-2xl border border-white/10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-4">Ask the Community</h2>
                        <p className="text-gray-400">
                            Have doubts about safety, deposit norms, or cultural concerns? Ask here and get replies from verified community members.
                        </p>
                    </div>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input placeholder="Your Name" className="bg-background border-white/10 text-white" />
                            <Input placeholder="City / Destination" className="bg-background border-white/10 text-white" />
                        </div>
                        <Input placeholder="Email / WhatsApp (for replies)" className="bg-background border-white/10 text-white" />
                        <Textarea placeholder="What's on your mind?" className="bg-background border-white/10 text-white min-h-[120px]" />
                        <Button className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-6">
                            <Send className="h-5 w-5 mr-2" />
                            Ask Question
                        </Button>
                        <p className="text-xs text-center text-gray-500 mt-4">
                            We respect your privacy. Your contact info is only used to send you replies.
                        </p>
                    </form>
                </div>
            </section>

            <Footer />
        </main>
    )
}

function StarIcon({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    )
}
