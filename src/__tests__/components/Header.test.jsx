// src/__tests__/components/Header.test.jsx

// Dependencies
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../../components/Header'

// Wrapper with future flags
const RouterWrapper = ({ children }) => (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        {children}
    </BrowserRouter>
);

describe('Header', () => {
    
    describe('Base Tests', () => {
        
        // Test: Should render logo that links to home
        it('should render logo that links to home', () => {
            // Render component
            render(<Header />, { wrapper: RouterWrapper });
            
            // Get logo link
            const logoLink = screen.getByRole('link', { name: /ball buddies/i });
            
            // Verify logo links to home
            expect(logoLink).toHaveAttribute('href', '/');
        });


        // Test: Should display tagline
        it('should display tagline', () => {
            // Render component
            render(<Header />, { wrapper: RouterWrapper });
            
            // Check tagline is visible
            expect(screen.getByText('Where Every Ball Has Attitude!')).toBeInTheDocument();
        });
    });
});