import { Button } from "@/components/ui/button"
import { Grid3X3 } from "lucide-react"

export function ImageGallery({ images }) {
    return (
        <div className="relative rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] md:h-[500px]">
            <div className="md:col-span-2 md:row-span-2 h-full">
                <img src={images[0]} alt="Main" className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" />
            </div>
            <div className="hidden md:block h-full">
                <img src={images[1]} alt="Gallery 1" className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" />
            </div>
            <div className="hidden md:block h-full">
                <img src={images[2]} alt="Gallery 2" className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" />
            </div>
            <div className="hidden md:block h-full">
                <img src={images[3]} alt="Gallery 3" className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" />
            </div>
            <div className="hidden md:block h-full relative">
                <img src={images[4]} alt="Gallery 4" className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" />
                <Button
                    variant="secondary"
                    size="sm"
                    className="absolute bottom-4 right-4 gap-2 bg-black cursor-pointer"
                >
                    <Grid3X3 className="h-4 w-4" />
                    Show all photos
                </Button>
            </div>
        </div>
    )
}
