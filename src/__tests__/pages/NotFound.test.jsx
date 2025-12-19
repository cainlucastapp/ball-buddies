// src/__tests__/pages/NotFound.test.jsx

// Dependencies
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import NotFound from '../../pages/NotFound'

describe('NotFound', () => {
    
    describe('Base Tests', () => {
        
        // Test: Should render 404 image with alt text
        it('should render 404 image with alt text', () => {
            // Render component
            render(<NotFound />);
            
            // Check image exists with correct alt text
            const image = screen.getByAltText('Missing Buddy - 404 Not Found');
            expect(image).toBeInTheDocument();
            expect(image).toHaveAttribute('src', '/images/missing-buddy-404.png');
        });


        // Test: Should render "Page Not Found" text
        it('should render "Page Not Found" text', () => {
            // Render component
            render(<NotFound />);
            
            // Check "Page Not Found" heading exists
            expect(screen.getByText('Page Not Found')).toBeInTheDocument();
        });
    });
});