import React, { memo } from "react"
import { Facebook, Twitter, Linkedin, Copy, Check } from "lucide-react"

export const ShareMenu = memo(({ open, copied, onCopy }) =>
    !open ? null : (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl z-30 border border-gray-100">
            <div className="p-2">
                <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-accent/10 transition-colors rounded-xl mx-2">
                    <Facebook className="h-4 w-4 text-blue-600" /> Facebook
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-accent/10 transition-colors rounded-xl mx-2">
                    <Twitter className="h-4 w-4 text-blue-400" /> Twitter
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-accent/10 transition-colors rounded-xl mx-2">
                    <Linkedin className="h-4 w-4 text-blue-700" /> LinkedIn
                </a>
                <button
                    onClick={onCopy}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-accent/10 transition-colors w-full text-left rounded-xl mx-2"
                >
                    {copied ? (
                        <>
                            <Check className="h-4 w-4 text-green-500" />
                            <span className="text-green-600">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="h-4 w-4" /> Copy Link
                        </>
                    )}
                </button>
            </div>
        </div>
    )
)
