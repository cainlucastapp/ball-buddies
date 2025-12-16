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

    // Switch to form view for adding new buddy
    const handleAddNew = () => {
        setEditingBuddy(null)
        setView('form')
    }

    // Switch to form view for editing existing buddy
    const handleEdit = (buddy) => {
        setEditingBuddy(buddy)
        setView('form')
    }

    // Switch back to table view
    const handleBackToTable = () => {
        setView('table')
        setEditingBuddy(null)
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
                <ProductList onAddNew={handleAddNew} onEdit={handleEdit} refreshTrigger={refreshTrigger}/>
            ) : (
                <ProductForm editingBuddy={editingBuddy} onSuccess={handleFormSuccess} onCancel={handleBackToTable}/>
            )}
        </div>
    )
}

export default AdminPortal