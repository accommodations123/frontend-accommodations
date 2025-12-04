import { createContext, useContext, useState, useEffect } from "react"
import { COUNTRIES } from "@/lib/mock-data"

const CountryContext = createContext()

export function CountryProvider({ children }) {
    // Default to US if no saved country
    const [activeCountry, setActiveCountry] = useState(COUNTRIES[0])

    const [isSelected, setIsSelected] = useState(false)

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem("activeCountry")
        if (saved) {
            try {
                setActiveCountry(JSON.parse(saved))
                setIsSelected(true)
            } catch (e) {
                console.error("Failed to parse saved country", e)
            }
        }
    }, [])

    // Save to local storage on change
    const setCountry = (country) => {
        setActiveCountry(country)
        setIsSelected(true)
        localStorage.setItem("activeCountry", JSON.stringify(country))
    }

    // Mock exchange rates (base USD)
    const exchangeRates = {
        "USD": 1,
        "EUR": 0.92,
        "GBP": 0.79,
        "CAD": 1.36,
        "AUD": 1.52,
        "AED": 3.67,
        "INR": 83.50,
        "JPY": 155.0,
        "BRL": 5.15
    }

    const value = {
        activeCountry,
        currency: activeCountry.currency,
        setCountry,
        isSelected,
        exchangeRates
    }

    return (
        <CountryContext.Provider value={value}>
            {children}
        </CountryContext.Provider>
    )
}

export function useCountry() {
    const context = useContext(CountryContext)
    if (context === undefined) {
        throw new Error("useCountry must be used within a CountryProvider")
    }
    return context
}
