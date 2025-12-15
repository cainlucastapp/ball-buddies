// src/components/ProductCard.jsx
import "../styles/components/ProductCard.css"

const ProductCard = ({ buddy }) => {
    return (
        <div className="product-card">
            <h3>{buddy?.name || "Loading..."}</h3>
            <p>Sport: {buddy?.sport}</p>
            <p>Price: ${buddy?.price}</p>
            {/* More details will be added later */}
        </div>
    )
}

export default ProductCard