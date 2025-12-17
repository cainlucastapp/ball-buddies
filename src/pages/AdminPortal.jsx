// src/pages/AdminPortal.jsx

// Dependancies 
import { useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"
import AdminLogin from "../components/AdminLogin"
import ProductList from "../components/ProductList"
import ProductForm from "../components/ProductForm"
import "../styles/pages/AdminPortal.css"

const AdminPortal = () => {

    // Set auth, table, edit, and refesh states
    const { isAuthenticated, isLoading, login, logout } = useAuth()
    const [view, setView] = useState('table')
    const [editingBuddy, setEditingBuddy] = useState(null)
    const [refreshTrigger, setRefreshTrigger] = useState(0)

    // Handle browser back/forward buttons
    useEffect(() => {
        const handlePopState = () => {
            // Check history state to determine which view to show
            if (window.history.state?.formOpen) {
                // Forward button pressed - show form
                setView('form')
                setEditingBuddy(window.history.state.buddy || null)
            } else {
                // Back button pressed - show table
                setView('table')
                setEditingBuddy(null)
            }
        }
        window.addEventListener('popstate', handlePopState)
        return () => window.removeEventListener('popstate', handlePopState)
    }, [])

    // Show correct view based on auth status
    useEffect(() => {
        if (isAuthenticated && view !== 'form') {
            setView('table')
        }
    }, [isAuthenticated, view])

    // Handle successful login
    const handleLoginSuccess = () => {
        setView('table')
    }

    // Handle logout
    const handleLogout = () => {
        logout()
        setView('table')
    }

    // Trigger table refresh after CRUD operations
    const handleRefresh = () => {
        setRefreshTrigger(prev => prev + 1)
    }

    // Switch to form to add new or edit existing buddy
    const handleShowForm = (buddy = null) => {
        // Add to browser history with form state and buddy data
        window.history.pushState({ formOpen: true, buddy: buddy }, '', '')
        setEditingBuddy(buddy)
        setView('form')
    }

    // Switch back to table view
    const handleBackToTable = () => {
        window.history.back()
    }

    // After successful form submission
    const handleFormSuccess = () => {
        handleBackToTable()
        handleRefresh()
    }

    // Show login if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="admin-container">
                <h1>Admin Portal</h1>
                <p className="subtitle">Manage your Ball Buddies inventory</p>
                <AdminLogin 
                    onLogin={handleLoginSuccess} 
                    login={login} 
                    isLoading={isLoading} 
                />
            </div>
        )
    }

    // Show authenticated views
    return (
        <div className="admin-container">
            <div className="admin-header">
                <div>
                    <h1>Admin Portal</h1>
                    <p className="subtitle">Manage Ball Buddies Inventory</p>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </div>

            {view === 'table' ? (
                <ProductList onAddNew={() => handleShowForm()} onEdit={handleShowForm} refreshTrigger={refreshTrigger}/>
            ) : (
                <ProductForm editingBuddy={editingBuddy} onSuccess={handleFormSuccess} onCancel={handleBackToTable}/>
            )}
        </div>
    )
}

export default AdminPortal