// src/__tests__/components/ShopCard.test.jsx

// Dependencies
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ShopCard from '../../components/ShopCard'

describe('ShopCard', () => {
    
    // Mock buddy data
    const mockBuddyInStock = {
        id: "1",
        name: "Soccer Punk",
        sport: "Soccer",
        price: 24.99,
        image: "/images/soccer-punk.png",
        description: "This soccer ball doesn't play by the rules.",
        inStock: true,
        rarity: "rare"
    };

    const mockBuddyOutOfStock = {
        id: "5",
        name: "Ball Baddie",
        sport: "Dodgeball",
        price: 25.99,
        image: "/images/ball-baddie.png",
        description: "Dark, edgy, and ready to dodge.",
        inStock: false,
        rarity: "rare"
    };


    describe('Base Tests', () => {
        
        // Test: Should render buddy image with correct src and alt
        it('should render buddy image with correct src and alt', () => {
            // Render component
            render(<ShopCard buddy={mockBuddyInStock} />);
            
            // Get image
            const image = screen.getByAltText('Soccer Punk');
            
            // Check image src and alt
            expect(image).toBeInTheDocument();
            expect(image).toHaveAttribute('src', '/images/soccer-punk.png');
            expect(image).toHaveAttribute('alt', 'Soccer Punk');
        });


        // Test: Should render buddy name, sport, rarity, and description
        it('should render buddy name, sport, rarity, and description', () => {
            // Render component
            render(<ShopCard buddy={mockBuddyInStock} />);
            
            // Check name (h3)
            expect(screen.getByText('Soccer Punk')).toBeInTheDocument();
            
            // Check sport
            expect(screen.getByText('Soccer')).toBeInTheDocument();
            
            // Check rarity (uppercased)
            expect(screen.getByText('RARE')).toBeInTheDocument();
            
            // Check description
            expect(screen.getByText("This soccer ball doesn't play by the rules.")).toBeInTheDocument();
        });


        // Test: Should display correct stock status
        it('should display correct stock status', () => {
            // Render in-stock buddy
            const { rerender } = render(<ShopCard buddy={mockBuddyInStock} />);
            
            // Check in-stock status
            expect(screen.getByText('✓ In Stock')).toBeInTheDocument();
            
            // Rerender with out-of-stock buddy
            rerender(<ShopCard buddy={mockBuddyOutOfStock} />);
            
            // Check out-of-stock status
            expect(screen.getByText('✗ Out of Stock')).toBeInTheDocument();
        });
    });


    describe('Edge Cases', () => {
        
        // Test: Should apply correct CSS classes based on stock status
        it('should apply correct CSS classes based on stock status', () => {
            // Render in-stock buddy
            const { container, rerender } = render(<ShopCard buddy={mockBuddyInStock} />);
            
            // Get stock status element for in-stock
            let stockElement = container.querySelector('.stock');
            expect(stockElement).toHaveClass('stock', 'in-stock');
            expect(stockElement).not.toHaveClass('out-of-stock');
            
            // Rerender with out-of-stock buddy
            rerender(<ShopCard buddy={mockBuddyOutOfStock} />);
            
            // Get stock status element for out-of-stock
            stockElement = container.querySelector('.stock');
            expect(stockElement).toHaveClass('stock', 'out-of-stock');
            expect(stockElement).not.toHaveClass('in-stock');
        });
    });
});