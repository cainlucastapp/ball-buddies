// src/__tests__/components/Header.test.jsx

// Dependencies
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../../components/Header'

// Wrapper for React Router
const renderWithRouter = (component) => {
    return render(
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            {component}
        </BrowserRouter>
    )
}

describe('Header', () => {
    
    describe('Base Tests', () => {
        
        // Test: Should render the header element
        it('should render the header element', () => {
            // Render component
            renderWithRouter(<Header />);
            
            // Check header exists with correct class
            const header = document.querySelector('header.site-header');
            expect(header).toBeInTheDocument();
        });


        // Test: Should render the Navbar component
        it('should render the Navbar component', () => {
            // Render component
            renderWithRouter(<Header />);
            
            // Check Navbar is rendered (it has nav element)
            const navbar = document.querySelector('nav');
            expect(navbar).toBeInTheDocument();
        });
    });


    describe('Edge Cases', () => {
        
        // Test: Should have accessible logo alt text
        it('should have accessible logo alt text', () => {
            // Render component
            renderWithRouter(<Header />);
            
            // Check logo image has alt text for accessibility
            const logo = screen.getByAltText('Ball Buddies');
            expect(logo).toBeInTheDocument();
        });
    });
});