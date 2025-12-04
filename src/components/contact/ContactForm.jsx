import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

export function ContactForm() {
    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full -mr-10 -mt-10 blur-xl" />

            <h2 className="text-2xl font-bold text-[#f7eed7] mb-2 relative z-10">Send us a Message</h2>
            <p className="text-white/60 mb-8 relative z-10">We usually respond within 24 hours.</p>

            <form className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-semibold text-white/80 ml-1">First Name</label>
                        <Input
                            id="firstName"
                            placeholder="John"
                            className="bg-white/5 border-white/10 focus:bg-white/10 text-white placeholder:text-white/30 transition-colors h-12 rounded-xl"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-semibold text-white/80 ml-1">Last Name</label>
                        <Input
                            id="lastName"
                            placeholder="Doe"
                            className="bg-white/5 border-white/10 focus:bg-white/10 text-white placeholder:text-white/30 transition-colors h-12 rounded-xl"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-white/80 ml-1">Email Address</label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="bg-white/5 border-white/10 focus:bg-white/10 text-white placeholder:text-white/30 transition-colors h-12 rounded-xl"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-semibold text-white/80 ml-1">Subject</label>
                    <Input
                        id="subject"
                        placeholder="How can we help?"
                        className="bg-white/5 border-white/10 focus:bg-white/10 text-white placeholder:text-white/30 transition-colors h-12 rounded-xl"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-white/80 ml-1">Message</label>
                    <textarea
                        id="message"
                        rows={6}
                        className="flex w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ring-offset-[#00152d] disabled:cursor-not-allowed disabled:opacity-50 focus:bg-white/10 transition-colors resize-none"
                        placeholder="Tell us more about your inquiry..."
                    />
                </div>

                <Button className="w-full h-12 rounded-xl bg-accent hover:bg-accent/90 text-white font-semibold text-lg shadow-lg shadow-accent/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                </Button>
            </form>
        </div>
    )
}
