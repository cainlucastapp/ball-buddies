// src/components/ShopCard.jsx

// Dependencies
import "../styles/components/ShopCard.css"

const ShopCard = ({ buddy }) => {
    return (
        <div className="shop-card">
            <div className="card-image-container">
                {/* Image */}
                <img src={buddy.image} alt={buddy.name} className="buddy-image" />
            </div>
            <div className="card-content">
                {/* Name */}
                <h3 className="buddy-name">{buddy.name}</h3>
                <div className="card-tags">
                    {/* Sport */}
                    <span className="sport">{buddy.sport}</span>
                    {/* Rarity */}
                    <span className={`rarity`}>{buddy.rarity.toUpperCase()}</span>
                </div>
                {/* Description */}
                <p className="description">{buddy.description}</p>
            </div>
            {/* Footer */}
            <div className="card-footer">
                {/* Price */}
                <span className="price">MSRP ${buddy.price}</span>
                {/* Stock Status */}
                <span className={`stock ${buddy.inStock ? 'in-stock' : 'out-of-stock'}`}>
                    {buddy.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </span>
            </div>
        </div>
    )
}

export default ShopCard