import { MapPin, Mail, Phone, Clock } from "lucide-react"

const CONTACT_DETAILS = [
    {
        icon: MapPin,
        title: "Visit Us",
        content: (
            <>
                123 Innovation Drive<br />
                Tech Valley, CA 94043<br />
                United States
            </>
        )
    },
    {
        icon: Mail,
        title: "Email Us",
        content: (
            <>
                <a href="mailto:hello@haven.com" className="hover:text-accent transition-colors">hello@haven.com</a><br />
                <a href="mailto:support@haven.com" className="hover:text-accent transition-colors">support@haven.com</a>
            </>
        )
    },
    {
        icon: Phone,
        title: "Call / WhatsApp",
        content: (
            <>
                <a href="tel:+919876543210" className="hover:text-accent transition-colors">+91 98765 43210 (India)</a><br />
                <a href="tel:+15551234567" className="hover:text-accent transition-colors">+1 (555) 123-4567 (US)</a>
            </>
        )
    },
    {
        icon: Clock,
        title: "Support Hours",
        content: (
            <>
                Mon-Fri: 9 AM - 9 PM IST<br />
                <span className="text-accent text-sm">Replies within 2 hours guaranteed.</span>
            </>
        )
    }
]

export function ContactInfo() {
    return (
        <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/20 transition-colors duration-500" />

                <h2 className="text-2xl font-bold text-[#f7eed7] mb-8 relative z-10">Contact Information</h2>

                <div className="grid gap-8 relative z-10">
                    {CONTACT_DETAILS.map((item, index) => {
                        const Icon = item.icon
                        return (
                            <div key={index} className="flex items-start gap-5 group/item">
                                <div className="p-3 rounded-xl bg-white/5 group-hover/item:bg-accent/20 transition-colors duration-300">
                                    <Icon className="h-6 w-6 text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white mb-2 text-lg">{item.title}</h3>
                                    <div className="text-white/60 leading-relaxed">
                                        {item.content}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Map Placeholder with modern styling */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl h-80 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1748&auto=format&fit=crop"
                        alt="Map Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#00152d] via-[#00152d]/50 to-transparent" />

                <div className="relative z-10 text-center p-6 bg-[#00152d]/80 backdrop-blur-md rounded-2xl border border-white/10 transform group-hover:scale-105 transition-transform duration-300">
                    <MapPin className="h-8 w-8 mx-auto mb-3 text-accent animate-bounce" />
                    <p className="text-white font-medium">Interactive Map Integration</p>
                    <p className="text-sm text-white/50 mt-1">Coming Soon</p>
                </div>
            </div>
        </div>
    )
}
