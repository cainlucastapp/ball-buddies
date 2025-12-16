// src/hooks/useAuth.js

// Dependancies 
import { useState, useEffect } from "react"

// Manages authentication state with localStorage persistence and fetches credentials from API
const useAuth = () => {

    // Initialize state
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('adminAuth') === 'true'
    })

    // Loading state
    const [isLoading, setIsLoading] = useState(false)

    // Save to localStorage whenever auth state changes
    useEffect(() => {
        if (isAuthenticated) {
            localStorage.setItem('adminAuth', 'true')
        } else {
            localStorage.removeItem('adminAuth')
        }
    }, [isAuthenticated])

    // Validates credentials against API
    const login = async (username, password) => {
        
        // Change loading state change
        setIsLoading(true)
        
        try {
            // Fetch admin credentials from API
            const response = await fetch("http://localhost:4000/admins")
            
            // Fail error
            if (!response.ok) {
                throw new Error("Failed to fetch admin data")
            }
            
            // Admin data from API
            const admins = await response.json()
            
            // Check if credentials match any admin
            const validAdmin = admins.find(
                admin => admin.username === username && admin.password === password
            )
            
            if (validAdmin) {
                // Login succesful  
                setIsAuthenticated(true)
                return { success: true }
            } else {
                // Invalid error
                return { success: false, error: "Invalid username or password" }
            }
            
        } catch (error) {
            // API fail error
            console.error("Login error:", error)
            return { success: false, error: "Unable to verify credentials. Please try again." }
        } finally {
            // Change loading state
            setIsLoading(false)
        }
    }

    // Logout function clears auth state
    const logout = () => {
        setIsAuthenticated(false)
    }

    return {
        isAuthenticated,
        isLoading,
        login,
        logout
    }
}

export default useAuth