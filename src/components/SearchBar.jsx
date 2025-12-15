// src/components/SearchBar.jsx
import "../styles/components/SearchBar.css"

const SearchBar = () => {
    return (
        <div className="search-bar">
            <input 
                type="text" 
                placeholder="Search buddies..."
            />
        </div>
    )
}

export default SearchBar