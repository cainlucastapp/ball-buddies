// src/components/AdminLogin.jsx

// Dependancies
import { useState } from "react"

const AdminLogin = ({ onLogin, login, isLoading }) => {
    
    // Set user, password, and error states
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    // Handle form submit
    const handleSubmit = async (e) => {
        // Prevent Reload
        e.preventDefault()
        
        // Clear previous errors
        setError("")
        
        // Call the login function from useAuth hook
        const result = await login(username, password)
        
        if (result.success) {
            // Login successful
            onLogin() 
        } else {
            // Clear password on failed login
            setError(result.error)
            setPassword("")
        }
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Admin Login</h2>
                <p className="login-subtitle">Enter your credentials to access the admin panel</p>

                {error && <div className="error-banner">{error}</div>}

                {/* Login */}
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="admin"
                        required
                        disabled={isLoading}
                    />
                </div>

                {/* Password */}
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                        disabled={isLoading}
                    />
                </div>

                {/* Buttons */}
                <button type="submit" className="login-btn" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>

                <div className="login-hint">
                    <small>Demo credentials: admin / admin123</small>
                </div>
            </form>
        </div>
    )
}

export default AdminLogin