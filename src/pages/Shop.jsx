// src/pages/Shop.jsx

// Dependancies
import useFetch from "../hooks/useFetch"
import useSearch from "../hooks/useSearch"
import ShopCard from "../components/ShopCard"
import SearchBar from "../components/SearchBar"
import "../styles/pages/Shop.css"

const Shop = () => {

    // useFetch to get buddies from database
    const { data: buddies, loading, error } = useFetch("http://localhost:4000/buddies")
    
    // useSearch
    const { searchTerm, setSearchTerm, sortBy, setSortBy, stockFilter, setStockFilter, filteredItems, resultCount, totalCount} = useSearch(buddies, ['name', 'sport', 'description'])

    // Loading / error states
    if (loading) return <div className="shop-container"><p>Loading buddies...</p></div>
    if (error) return <div className="shop-container"><p>Error: {error}</p></div>

    return (
        <div className="shop-container">

            <div className="shop-info">
                <h1>Bring The Buddies To Your Town!</h1>
                <div className="video-container">
                    <video
                        src="/videos/ball-buddies-commercial.mp4"
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                        width="100%"
                    />      
                </div>
                <p>If your store is interested in carrying Ball Buddies contacts our sales team at (702) 479-7522.</p>
            </div>
            
            {/* Search */}
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} sortBy={sortBy} setSortBy={setSortBy} stockFilter={stockFilter} setStockFilter={setStockFilter}/>
            
            <div className="results-info">
                <p>Showing {resultCount} of {totalCount} Buddies</p>
            </div>

            <div className="buddies-grid">
                {filteredItems.length > 0 ? (
                    filteredItems.map(buddy => (
                        <ShopCard key={buddy.id} buddy={buddy} />
                    ))
                ) : (
                    <p>No buddies found matching your filters</p>
                )}
            </div>
        </div>
    )
}

export default Shop