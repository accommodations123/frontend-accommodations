import React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COUNTRIES } from '@/lib/mock-data';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickOutside } from '@/hooks/useClickOutside';

export const CountryCodeSelect = ({ value, onChange, className }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const ref = useClickOutside(() => setIsOpen(false));

    // Desired order of codes
    const priorityCodes = ["+91", "+1", "+44", "+61", "+33", "+49", "+81", "+55"]; // India, US/Canada, UK, Aus, France, Germany, Japan, Brazil

    // Sort countries: Priority ones first, then others
    const sortedCountries = React.useMemo(() => {
        return [...COUNTRIES].sort((a, b) => {
            const indexA = priorityCodes.indexOf(a.phoneCode);
            const indexB = priorityCodes.indexOf(b.phoneCode);

            // If both are in priority list, sort by index
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            // If only A is in priority list, it comes first
            if (indexA !== -1) return -1;
            // If only B is in priority list, it comes first
            if (indexB !== -1) return 1;
            // Otherwise maintain original order (or sort alphabetically if preferred)
            return 0;
        });
    }, []);

    const selectedCountry = COUNTRIES.find(c => c.phoneCode === value) || COUNTRIES.find(c => c.code === "IN");

    return (
        <div className={cn("relative", className)} ref={ref}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-4 bg-white border-2 border-neutral/30 rounded-xl hover:border-accent/30 transition-all w-full min-w-[100px]"
            >
                {selectedCountry && (
                    <div className="flex items-center gap-2">
                        {selectedCountry.flag.startsWith('/') ? (
                            <img src={selectedCountry.flag} alt={selectedCountry.name} className="w-5 h-3.5 object-cover rounded-sm" />
                        ) : (
                            <span className="text-lg leading-none">{selectedCountry.flag}</span>
                        )}
                        <span className="font-semibold text-primary">{selectedCountry.phoneCode}</span>
                    </div>
                )}
                <ChevronDown className={cn("w-4 h-4 text-neutral/50 ml-auto transition-transform", isOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-neutral/10 max-h-64 overflow-y-auto z-50 py-1"
                    >
                        {sortedCountries.map((country) => (
                            <button
                                key={`${country.code}-${country.phoneCode}`}
                                type="button"
                                onClick={() => {
                                    onChange(country.phoneCode);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-neutral/5 transition-colors",
                                    value === country.phoneCode && "bg-neutral/10"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    {country.flag.startsWith('/') ? (
                                        <img src={country.flag} alt={country.name} className="w-5 h-3.5 object-cover rounded-sm shadow-sm" />
                                    ) : (
                                        <span className="text-xl leading-none">{country.flag}</span>
                                    )}
                                    <span className="text-sm font-medium text-primary">{country.name}</span>
                                    <span className="text-xs text-neutral/50 font-mono ml-1">({country.phoneCode})</span>
                                </div>
                                {value === country.phoneCode && <Check className="w-4 h-4 text-accent" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
