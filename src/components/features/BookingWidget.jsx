import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star } from "lucide-react"
import { useCountry } from "@/context/CountryContext"

export function BookingWidget({ price, rating, reviews }) {
    const [nights, setNights] = React.useState(5)
    const [guests, setGuests] = React.useState(2)
    const { currency, exchangeRates } = useCountry()

    // Currency Conversion Helper
    const convert = (amount) => {
        const rate = exchangeRates[currency] || 1
        return Math.round(amount * rate)
    }

    const displayPrice = convert(price)
    const subtotal = displayPrice * nights
    const cleaningFee = convert(50)
    const serviceFee = Math.round(subtotal * 0.1)
    const total = subtotal + cleaningFee + serviceFee

    const getSymbol = () => {
        switch (currency) {
            case "USD": return "$"
            case "EUR": return "€"
            case "GBP": return "£"
            case "CAD": return "C$"
            case "AUD": return "A$"
            case "AED": return "AED"
            case "INR": return "₹"
            case "JPY": return "¥"
            default: return currency + " "
        }
    }

    const symbol = getSymbol()

    return (
        <div className="border rounded-xl p-6 shadow-lg bg-white">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <span className="text-2xl font-bold text-blue-500">{symbol}{displayPrice}</span>
                    <span className="text-gray-500"> / night</span>
                    <div className="text-xs text-gray-500 font-medium mt-1">
                        {currency !== "INR" ? (
                            <span>(approx. ₹{convert(price * (exchangeRates["INR"] / (exchangeRates[currency] || 1))).toLocaleString("en-IN")})</span>
                        ) : (
                            <span>(approx. ${Math.round(price / exchangeRates["INR"]).toLocaleString("en-US")})</span>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-bold text-blue-500">{rating}</span>
                    <span className="text-gray-500">({reviews} reviews)</span>
                </div>
            </div>

            <div className="border rounded-lg mb-4 overflow-hidden">
                <div className="grid grid-cols-2 border-b">
                    <div className="p-3 border-r">
                        <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Check-in</label>
                        <Input type="date" className="border-none p-0 h-auto focus-visible:ring-0 text-blue-500" />
                    </div>
                    <div className="p-3">
                        <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Check-out</label>
                        <Input type="date" className="border-none p-0 h-auto focus-visible:ring-0 text-blue-500" />
                    </div>
                </div>
                <div className="p-3">
                    <label className="text-xs font-bold uppercase text-gray-500 block mb-1">Guests</label>
                    <select
                        className="w-full outline-none bg-transparent text-sm text-blue-500"
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                    >
                        <option value={1}>1 guest</option>
                        <option value={2}>2 guests</option>
                        <option value={3}>3 guests</option>
                        <option value={4}>4 guests</option>
                    </select>
                </div>
            </div>

            <Button className="w-full bg-accent hover:bg-accent/90 text-white font-bold text-lg h-12 mb-4">
                Reserve
            </Button>

            <p className="text-center text-sm text-gray-500 mb-6">You won't be charged yet</p>

            <div className="space-y-3 text-gray-600">
                <div className="flex justify-between">
                    <span className="underline">{symbol}{displayPrice} x {nights} nights</span>
                    <span>{symbol}{subtotal}</span>
                </div>
                <div className="flex justify-between">
                    <span className="underline">Cleaning fee</span>
                    <span>{symbol}{cleaningFee}</span>
                </div>
                <div className="flex justify-between">
                    <span className="underline">Service fee</span>
                    <span>{symbol}{serviceFee}</span>
                </div>
            </div>

            <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg text-black">
                <span>Total</span>
                <span>{symbol}{total}</span>
            </div>
        </div>
    )
}
