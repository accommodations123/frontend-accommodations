import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Key, Smartphone, User, Shield, CreditCard, FileText, Bell, Lock } from "lucide-react"

export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-background pt-20">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8">Account</h1>

                <div className="grid md:grid-cols-[1fr_2fr] gap-8">
                    {/* Profile Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center h-fit">
                        <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl text-gray-500 font-medium">
                            JD
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-black">John Doe</h2>
                        <p className="text-gray-500 mb-6">Student · Joined in 2023</p>
                        <Button variant="outline" className="w-full">Edit Profile</Button>
                    </div>

                    <div className="space-y-6">
                        {/* Digital Key Card */}
                        <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl p-6 text-white shadow-lg">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Digital Key</h3>
                                    <p className="text-white/90 text-sm">Active for: Luxury Villa</p>
                                </div>
                                <Key className="h-6 w-6" />
                            </div>

                            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6">
                                <div className="flex justify-between text-xs font-medium text-white/90 mb-2">
                                    <span>ACCESS CODE</span>
                                    <span>EXPIRES</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold tracking-widest">8492</span>
                                    <span className="text-sm">10/27/23</span>
                                </div>
                            </div>

                            <Button className="w-full bg-white text-indigo-600 hover:bg-white/90 border-0">
                                <Smartphone className="h-4 w-4 mr-2" />
                                Tap to Unlock
                            </Button>
                        </div>

                        {/* Settings Grid */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                {
                                    title: 'Personal info',
                                    desc: 'Provide personal details and how we can reach you',
                                    icon: User
                                },
                                {
                                    title: 'Login & security',
                                    desc: 'Update your password and secure your account',
                                    icon: Shield
                                },
                                {
                                    title: 'Payments & payouts',
                                    desc: 'Review payments, payouts, coupons, and gift cards',
                                    icon: CreditCard
                                },
                                {
                                    title: 'Taxes',
                                    desc: 'Manage taxpayer information and tax documents',
                                    icon: FileText
                                },
                                {
                                    title: 'Notifications',
                                    desc: 'Choose notification preferences and how you want to be contacted',
                                    icon: Bell
                                },
                                {
                                    title: 'Privacy & sharing',
                                    desc: 'Manage your personal data, connected services, and data sharing settings',
                                    icon: Lock
                                },
                            ].map((item) => {
                                const Icon = item.icon
                                return (
                                    <div key={item.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
                                        <Icon className="h-8 w-8 text-gray-400 mb-4 group-hover:text-accent transition-colors" />
                                        <h3 className="font-bold text-lg mb-2 text-black">{item.title}</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
