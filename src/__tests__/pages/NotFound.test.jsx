// src/__tests__/pages/NotFound.test.jsx

// Dependencies
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import NotFound from '../../pages/NotFound'

// Wrapper with future flags
const RouterWrapper = ({ children }) => (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        {children}
    </BrowserRouter>
);

describe('NotFound', () => {
    
    describe('Base Tests', () => {
        
        // Test: Should render 404 image with alt text
        it('should render 404 image with alt text', () => {
            // Render component
            render(<NotFound />, { wrapper: RouterWrapper });
            
            // Check image exists with correct alt text
            const image = screen.getByAltText('Missing Buddy - 404 Not Found');
            expect(image).toBeInTheDocument();
            expect(image).toHaveAttribute('src', '/images/missing-buddy-404.png');
        });


        // Test: Should render 404 heading and message
        it('should render 404 heading and message', () => {
            // Render component
            render(<NotFound />, { wrapper: RouterWrapper });
            
            // Check 404 heading
            expect(screen.getByText('404')).toBeInTheDocument();
            
            // Check "Page Not Found" heading
            expect(screen.getByText('Page Not Found')).toBeInTheDocument();
            
            // Check error message
            expect(screen.getByText("Oops! Looks like this buddy got lost.")).toBeInTheDocument();
        });
    });
});