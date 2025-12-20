// src/components/ShopCard.jsx

// Dependencies
import "../styles/components/ShopCard.css"

const ShopCard = ({ buddy }) => {
    return (
        <div className="shop-card">
            <div className="card-image-container">
                {/* Image */}
                <img 
                    src={buddy.image || '/missing-image.png'} 
                    alt={buddy.name || 'Missing Image'} 
                    className="buddy-image"
                />
            </div>
            <div className="card-content">
                {/* Name */}
                <h3 className="buddy-name">{buddy.name || 'Lost Ball'}</h3>
                <div className="card-tags">
                    {/* Sport */}
                    <span className="sport">{buddy.sport || 'None'}</span>
                    {/* Rarity */}
                    <span className={`rarity`}>
                        {(buddy.rarity || 'missing').toUpperCase()}
                    </span>
                </div>
                {/* Description */}
                <p className="description">{buddy.description || 'This ball has gone over the fence'}</p>
            </div>
            {/* Footer */}
            <div className="card-footer">
                {/* Price */}
                <span className="price">MSRP ${Number(buddy.price) || 0}</span>
                {/* Stock Status */}
                <span className={`stock ${buddy.inStock === true ? 'in-stock' : 'out-of-stock'}`}>
                    {buddy.inStock === true ? '✓ In Stock' : '✗ Out of Stock'}
                </span>
            </div>
        </div>
    )
}

export default ShopCard