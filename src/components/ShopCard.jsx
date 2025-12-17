// src/components/ShopCard.jsx
import "../styles/components/ShopCard.css"

const ProductCard = ({ buddy }) => {
    return (
        <div className="product-card">
            <img src={buddy.image} alt={buddy.name} className="buddy-image" />
            <p className="buddy-name">{buddy.name}</p>
            <p className="sport">{buddy.sport}</p>
            <p className="description">{buddy.description}</p>
            <p className={`rarity rarity-${buddy.rarity}`}>{buddy.rarity}</p>
            <p className="price">${buddy.price}</p>
            <p className={`stock`}>
                {buddy.inStock ? '✓ In Stock' : '✗ Out of Stock'}
            </p>
        </div>
    )
}

export default ProductCard