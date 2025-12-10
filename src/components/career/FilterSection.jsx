import React from "react"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

export function FilterSection({ title, options, selected, onChange, isOpen = true }) {
    const [isExpanded, setIsExpanded] = React.useState(isOpen)

    return (
        <div className="border-b border-gray-100 py-4 last:border-0">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full mb-2 group"
            >
                <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{title}</h4>
                {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                )}
            </button>

            {isExpanded && (
                <div className="space-y-2 mt-2">
                    {options.map((option) => (
                        <label key={option} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selected.includes(option)}
                                    onChange={() => onChange(option)}
                                    className="peer h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                                />
                            </div>
                            <span className={cn(
                                "text-sm transition-colors",
                                selected.includes(option) ? "text-primary font-medium" : "text-gray-600 group-hover:text-gray-900"
                            )}>
                                {option}
                            </span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    )
}
