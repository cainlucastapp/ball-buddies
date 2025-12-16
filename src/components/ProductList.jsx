// src/components/ProductList.jsx

// Dependancies 
import { useState, useEffect } from "react"
import useFetch from "../hooks/useFetch"
import useSearch from "../hooks/useSearch"
import SearchBar from "../components/SearchBar"

const ProductList = ({ onAddNew, onEdit, refreshTrigger }) => {
    
    // Fetch buddies from API (refreshTrigger forces re-fetch)
    const { data: fetchedBuddies, loading, error } = useFetch(
        `http://localhost:4000/buddies?_refresh=${refreshTrigger}`
    )
    const [buddies, setBuddies] = useState([])

    // useSearch
    const { searchTerm, setSearchTerm, sortBy, setSortBy, stockFilter, setStockFilter, filteredItems, resultCount, totalCount} = useSearch(buddies, ['name', 'sport', 'description'])

    // Update local state when data is fetched
    useEffect(() => {
        if (fetchedBuddies) {
            setBuddies(fetchedBuddies)
        }
    }, [fetchedBuddies])

    // Handle delete buddy
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this buddy?")) {
            return
        }

        try {
            const response = await fetch(`http://localhost:4000/buddies/${id}`, {
                method: "DELETE"
            })

            if (!response.ok) {
                throw new Error("Failed to delete buddy")
            }

            // Update local state
            setBuddies(prevBuddies => prevBuddies.filter(buddy => buddy.id !== id))
            alert("Buddy deleted successfully!")
        } catch (error) {
            console.error("Error deleting buddy:", error)
            alert("Failed to delete buddy. Please try again.")
        }
    }

    // Handle Toggle stock status
    const handleToggleStock = async (buddy) => {
        try {
            const response = await fetch(`http://localhost:4000/buddies/${buddy.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inStock: !buddy.inStock
                })
            })

            if (!response.ok) {
                throw new Error("Failed to update stock status")
            }

            const updatedBuddy = await response.json()
            
            // Update local state immediately
            setBuddies(prevBuddies => 
                prevBuddies.map(b => 
                    b.id === updatedBuddy.id ? updatedBuddy : b
                )
            )
        } catch (error) {
            // Error updating
            console.error("Error updating stock:", error)
            alert("Failed to update stock status.")
        }
    }

    // Loading and error states
    if (loading) return <div className="list-container"><p>Loading buddies...</p></div>
    if (error) return <div className="list-container"><p>Error: {error}</p></div>

    return (
        <div className="list-container">

            <div className="list-header">
                <h2>Current Inventory</h2>
                
                {/* Search */}
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} sortBy={sortBy} setSortBy={setSortBy} stockFilter={stockFilter} setStockFilter={setStockFilter}/>
                
                {/* New Buddy Button */}
                <button onClick={onAddNew} className="add-new-btn">
                    + Add New Buddy
                </button>
            </div>

            <div className="results-info">
                <p>Showing {resultCount} of {totalCount} buddies</p>
            </div>

            {/* List Header */}
            {filteredItems.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Sport</th>
                            <th>Price</th>
                            <th>Rarity</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map(buddy => (
                            <tr key={buddy.id}>
                                <td>
                                    <img 
                                        src={buddy.image} 
                                        alt={buddy.name}
                                        className="table-image"
                                    />
                                </td>
                                <td>{buddy.name}</td>
                                <td>{buddy.sport}</td>
                                <td>${buddy.price}</td>
                                <td>
                                    <span className={`rarity-badge rarity-${buddy.rarity}`}>
                                        {buddy.rarity}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleToggleStock(buddy)}
                                        className={`stock-toggle ${buddy.inStock ? 'in-stock' : 'out-of-stock'}`}
                                    >
                                        {buddy.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                                    </button>
                                </td>
                                <td className="action-buttons">
                                    <button 
                                        onClick={() => onEdit(buddy)}
                                        className="edit-btn"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(buddy.id)}
                                        className="delete-btn"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="empty-state">
                    {buddies.length === 0 ? (
                        <>
                            <p>No buddies in inventory yet.</p>
                            {/* Button */}
                            <button onClick={onAddNew} className="add-new-btn">
                                + Add Your First Buddy
                            </button>
                        </>
                    ) : (
                        <p>No buddies found matching your filters</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default ProductList