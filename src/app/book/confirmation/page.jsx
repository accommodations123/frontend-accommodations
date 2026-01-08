import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Calendar, MapPin, Users, Copy } from "lucide-react"

export default function ConfirmationPage() {
    return (
        <main className="min-h-screen bg-gray-50 pt-20">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Success Header */}
                    <div className="bg-green-50 p-8 text-center border-b border-green-100">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
                        <p className="text-gray-600">Your reservation at Modern Loft in Downtown is set.</p>
                        <p className="text-sm text-gray-500 mt-2">Confirmation #NK-829301</p>
                    </div>

                    <div className="p-8">
                        {/* Trip Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h3 className="font-bold text-gray-900 mb-4">Trip Details</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="h-5 w-5 text-accent mt-0.5" />
                                        <div>
                                            <p className="font-medium text-gray-900">Dates</p>
                                            <p className="text-gray-600">Oct 12 - Oct 17, 2025</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Users className="h-5 w-5 text-accent mt-0.5" />
                                        <div>
                                            <p className="font-medium text-gray-900">Guests</p>
                                            <p className="text-gray-600">2 guests</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-accent mt-0.5" />
                                        <div>
                                            <p className="font-medium text-gray-900">Location</p>
                                            <p className="text-gray-600">123 Broadway, New York, NY 10012</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Access Info */}
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-4">Access Information</h3>
                                <div className="mb-4">
                                    <p className="text-sm text-gray-500 mb-1">Access Code</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-mono font-bold tracking-widest text-primary">8293</span>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-white p-2 rounded-lg shadow-sm">
                                        {/* Mock QR Code */}
                                        <div className="w-24 h-24 bg-gray-900 flex items-center justify-center text-white text-xs text-center p-1">
                                            QR Code
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Scan at the door for keyless entry.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t">
                            <Button className="bg-black text-white hover:bg-gray-800 gap-2">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg" alt="Apple" className="h-4 w-4" />
                                Add to Apple Wallet
                            </Button>
                            <Button variant="outline" className="gap-2">
                                <Download className="h-4 w-4" />
                                Download Invoice
                            </Button>
                            <Button variant="outline" className="text-accent border-accent hover:bg-accent/5">
                                View My Bookings
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
