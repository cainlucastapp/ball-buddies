// src/components/SearchBar.jsx

// Dependancies 
import "../styles/components/SearchBar.css"

const SearchBar = ({ searchTerm, setSearchTerm, sortBy, setSortBy, stockFilter, setStockFilter }) => {
    return (

        <div className="search-bar">
            
            {/* Search Box */}
            <div className="search-input-container">
                <input  type="text" placeholder="Search by name, sport, or description..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input"/>
            </div>

            {/* Sort Drop Down */}
            <div className="filters-container">
                <div className="filter-group">
                    <label htmlFor="sort">Sort by:</label>
                    <select  id="sort" value={sortBy}  onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                        <option value="">None</option>
                        <option value="name">Name</option>
                        <option value="sport">Sport</option>
                        <option value="price">Price</option>
                        <option value="rarity">Rarity</option>
                    </select>
                </div>

                {/* Filter Stock Dropdown */}
                <div className="filter-group">
                    <label htmlFor="stock">Stock:</label>
                    <select  id="stock" value={stockFilter} onChange={(e) => setStockFilter(e.target.value)} className="stock-select">
                        <option value="all">All</option>
                        <option value="inStock">In Stock</option>
                        <option value="outOfStock">Out of Stock</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default SearchBar