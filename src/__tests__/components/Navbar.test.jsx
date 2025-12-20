// src/__tests__/components/Navbar.test.jsx

// Dependencies
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';

// Wrapper with future flags
const RouterWrapper = ({ children }) => (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        {children}
    </BrowserRouter>
);

describe('Navbar', () => {
    
    describe('Base Tests', () => {
        
        // Test: Should render Home link with correct path
        it('should render Home link with correct path', () => {
            // Render component
            render(<Navbar />, { wrapper: RouterWrapper });
            
            // Get Home link
            const homeLink = screen.getByRole('link', { name: /home/i });
            
            // Check link exists and has correct path
            expect(homeLink).toBeInTheDocument();
            expect(homeLink).toHaveAttribute('href', '/');
        });


        // Test: Should render Shop link with correct path
        it('should render Shop link with correct path', () => {
            // Render component
            render(<Navbar />, { wrapper: RouterWrapper });
            
            // Get Shop link
            const shopLink = screen.getByRole('link', { name: /shop/i });
            
            // Check link exists and has correct path
            expect(shopLink).toBeInTheDocument();
            expect(shopLink).toHaveAttribute('href', '/shop');
        });


        // Test: Should render Admin link with correct path
        it('should render Admin link with correct path', () => {
            // Render component
            render(<Navbar />, { wrapper: RouterWrapper });
            
            // Get Admin link
            const adminLink = screen.getByRole('link', { name: /admin/i });
            
            // Check link exists and has correct path
            expect(adminLink).toBeInTheDocument();
            expect(adminLink).toHaveAttribute('href', '/admin');
        });
    });
});