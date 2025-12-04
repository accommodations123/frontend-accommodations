import { Wifi, ChefHat, Tv, Car, Wind, Sun } from "lucide-react"

export function AmenitiesGrid() {
    const amenities = [
        { icon: Wifi, label: "Fast wifi" },
        { icon: ChefHat, label: "Kitchen" },
        { icon: Tv, label: "HDTV with Netflix" },
        { icon: Car, label: "Free parking" },
        { icon: Wind, label: "Air conditioning" },
        { icon: Sun, label: "Private patio" },
    ]

    return (
        <div className="grid grid-cols-2 gap-4">
            {amenities.map((item) => {
                const Icon = item.icon
                return (
                    <div key={item.label} className="flex items-center gap-3 text-gray-700">
                        <Icon className="h-5 w-5 text-gray-500" />
                        <span>{item.label}</span>
                    </div>
                )
            })}
        </div>
    )
}
