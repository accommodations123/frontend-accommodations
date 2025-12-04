import { motion } from "framer-motion"

export function ContactHeader() {
    return (
        <div className="text-center mb-12 md:mb-20">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold text-[#f7eed7] mb-6 tracking-tight"
            >
                Get in <span className="text-accent">Touch</span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
            >
                Have questions about hosting, booking, or just want to say hello?
                We're here to help you create unforgettable memories.
            </motion.p>
        </div>
    )
}
