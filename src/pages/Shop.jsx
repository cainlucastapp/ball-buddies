// src/pages/Shop.jsx
import useFetch from "../hooks/useFetch"
import ShopCard from "../components/ShopCard"
import "../styles/pages/Shop.css"

const Shop = () => {
    
    // Fetch buddies from database
    const { data: buddies, loading, error } = useFetch("http://localhost:4000/buddies")

    // Loading api data
    if (loading) return <div className="shop-container"><p>Loading buddies...</p></div>

    // Error on fetch failure
    if (error) return <div className="shop-container"><p>Error: {error}</p></div>

    
    return (
        <div className="shop-container">
            <h1>Shop All Buddies</h1>
            <p>Browse our collection of character balls</p>
            
            {/* SearchBar component will go here */}
            
            {/* Product grid */}
            <div className="products-grid">
                {buddies && buddies.map((buddy) => (
                    <ShopCard 
                        key={buddy.id} 
                        buddy={buddy} 
                    />
                ))}
            </div>
        </div>
    )
}

export default Shop