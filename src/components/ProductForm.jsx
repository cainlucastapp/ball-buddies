// src/components/ProductForm.jsx

// Dependancies
import { useState, useEffect } from "react"
import "../styles/components/ProductForm.css"

const ProductForm = ({ editingBuddy, onSuccess, onCancel }) => {
    
    // Set form, error and submit state
    const [values, setValues] = useState({
        name: '',
        sport: '',
        description: '',
        price: '',
        image: '',
        rarity: 'common',
        inStock: true
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Edit buddy side effect
    useEffect(() => {
        if (editingBuddy && typeof editingBuddy === 'object') {
            setValues({
                name: editingBuddy.name || '',
                sport: editingBuddy.sport || '',
                description: editingBuddy.description || '',
                price: editingBuddy.price || '',
                image: editingBuddy.image || '',
                rarity: ['common', 'rare', 'ultra'].includes(editingBuddy.rarity) 
                    ? editingBuddy.rarity 
                    : 'common',
                inStock: editingBuddy.inStock === true
            })
        }
    }, [editingBuddy])

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        
        setValues(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        
        // Clear error
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    // Validate form
    const validate = () => {
        const newErrors = {}
        
        if (!values.name.trim()) {
            newErrors.name = 'Name is required'
        }
        
        if (!values.sport.trim()) {
            newErrors.sport = 'Sport is required'
        }
        
        if (!values.description.trim()) {
            newErrors.description = 'Description is required'
        }
        
        if (!values.price || values.price <= 0) {
            newErrors.price = 'Price must be greater than 0'
        }
        
        if (!values.image.trim()) {
            newErrors.image = 'Image URL is required'
        }
        
        if (!values.rarity) {
            newErrors.rarity = 'Rarity is required'
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!validate()) {
            return
        }
        
        setIsSubmitting(true)
        
        const url = editingBuddy 
            ? `http://localhost:4000/buddies/${editingBuddy.id}`
            : "http://localhost:4000/buddies"
        
        const method = editingBuddy ? "PATCH" : "POST"
        
        // Buddy dats
        const now = new Date().toISOString()
        const buddyData = {
            ...values,
            price: parseFloat(values.price),
            // Update buddy timestap
            dateUpdated: now 
        }
        
        // New buddy timestamp
        if (!editingBuddy) {
            buddyData.dateCreated = now
        }

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(buddyData)
            })

            if (!response.ok) {
                throw new Error(`Failed to ${editingBuddy ? 'update' : 'add'} buddy`)
            }
            // Buddy added
            alert(`Buddy ${editingBuddy ? 'updated' : 'added'} successfully!`)
            onSuccess()
        } catch (error) {
            console.error("Form submission error:", error)
            alert(`Failed to ${editingBuddy ? 'update' : 'add'} buddy. Please try again.`)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="form-container">
            <form className="product-form" onSubmit={handleSubmit}>
                <h2>{editingBuddy ? 'Edit Buddy' : 'Add New Buddy'}</h2>

                {/* Name */}
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                {/* Sport */}
                <div className="form-group">
                    <label htmlFor="sport">Sport *</label>
                    <input
                        type="text"
                        id="sport"
                        name="sport"
                        value={values.sport}
                        onChange={handleChange}
                        className={errors.sport ? 'error' : ''}
                    />
                    {errors.sport && <span className="error-message">{errors.sport}</span>}
                </div>

                {/* Description */}
                <div className="form-group">
                    <label htmlFor="description">Description *</label>
                    <textarea
                        id="description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        rows="4"
                        className={errors.description ? 'error' : ''}
                    />
                    {errors.description && <span className="error-message">{errors.description}</span>}
                </div>

                {/* Price */}
                <div className="form-group">
                    <label htmlFor="price">Price ($) *</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className={errors.price ? 'error' : ''}
                    />
                    {errors.price && <span className="error-message">{errors.price}</span>}
                </div>

                {/* Image URL */}
                <div className="form-group">
                    <label htmlFor="image">Image URL *</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={values.image}
                        onChange={handleChange}
                        placeholder="/images/buddy-name.jpeg"
                        className={errors.image ? 'error' : ''}
                    />
                    {errors.image && <span className="error-message">{errors.image}</span>}
                </div>

                {/* Rarity */}
                <div className="form-group">
                    <label htmlFor="rarity">Rarity *</label>
                    <select
                        id="rarity"
                        name="rarity"
                        value={values.rarity}
                        onChange={handleChange}
                        className={errors.rarity ? 'error' : ''}
                    >
                        <option value="common">Common</option>
                        <option value="rare">Rare</option>
                        <option value="ultra">Ultra</option>
                    </select>
                    {errors.rarity && <span className="error-message">{errors.rarity}</span>}
                </div>

                {/* In Stock */}
                <div className="form-group checkbox-group">
                    <label htmlFor="inStock">
                        <input
                            type="checkbox"
                            id="inStock"
                            name="inStock"
                            checked={values.inStock}
                            onChange={handleChange}
                        />
                        In Stock
                    </label>
                </div>

                {/* Buttons */}
                <div className="form-buttons">
                    <button type="submit" disabled={isSubmitting} className="submit-btn">
                        {isSubmitting ? 'Saving...' : editingBuddy ? 'Update Buddy' : 'Add Buddy'}
                    </button>
                    <button type="button" onClick={onCancel} className="cancel-btn"> Cancel </button>
                </div>
            </form>
        </div>
    )
}

export default ProductForm