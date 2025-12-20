// src/components/AdminLogin.jsx

// Dependancies
import { useState, useRef, useEffect } from "react";
import "../styles/components/AdminLogin.css";


const AdminLogin = ({ onLogin, login, isLoading }) => {
    
    // Set user, password, and error states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    // Username input ref
    const usernameRef = useRef(null);

    // Focus username on mount
    useEffect(() => {
        usernameRef.current?.focus();
    }, []);

    // Handle form submit
    const handleSubmit = async (e) => {
        // Prevent Reload
        e.preventDefault();
        
        // Clear previous errors
        setError("");
        
        // Call the login function from useAuth hook
        const result = await login(username, password);
        
        if (result.success) {
            // Login successful
            onLogin(); 
        } else {
            // Clear password on failed login
            setError(result.error);
            setPassword("");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>Admin Login</h1>

                {error && <div className="error-banner">{error}</div>}

                {/* Login */}
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        ref={usernameRef}
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="username"
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
            </form>
        </div>
    );
};

export default AdminLogin;