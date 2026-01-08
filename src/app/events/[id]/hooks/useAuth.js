import { useState, useEffect } from "react"

export const useAuth = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        // Safe access to localStorage
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user')
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser))
                } catch (e) {
                    console.error('Failed to parse user from localStorage')
                }
            }
        }
    }, [])

    return { user }
}
