// src/__tests__/pages/Home.test.jsx

// Dependencies
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from '../../pages/Home'

// Wrapper with future flags
const RouterWrapper = ({ children }) => (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        {children}
    </BrowserRouter>
);

describe('Home', () => {
    
    describe('Base Tests', () => {
        
        // Test: Should render hero logo with alt text
        it('should render hero logo with alt text', () => {
            // Render component
            render(<Home />, { wrapper: RouterWrapper });
            
            // Check logo exists with correct alt text
            const logo = screen.getByAltText('Ball Buddies Logo');
            expect(logo).toBeInTheDocument();
            expect(logo).toHaveAttribute('src', '/images/ball-buddies-logo.png');
        });


        // Test: Should render hero section with heading and text
        it('should render hero section with heading and text', () => {
            // Render component
            render(<Home />, { wrapper: RouterWrapper });
            
            // Check heading
            expect(screen.getByText('Welcome to Ball Buddies!')).toBeInTheDocument();
            
            // Check tagline
            expect(screen.getByText('Where Every Ball Has Personality (and Attitude)')).toBeInTheDocument();
            
            // Check description text
            expect(screen.getByText(/From Foot Brawler's fists to Puck Norris's roundhouse kicks/i)).toBeInTheDocument();
        });


        // Test: Should render "Meet the Crew" link to shop
        it('should render "Meet the Crew" link to shop', () => {
            // Render component
            render(<Home />, { wrapper: RouterWrapper });
            
            // Check link exists
            const link = screen.getByText('Meet the Crew');
            expect(link).toBeInTheDocument();
            
            // Check link points to /shop
            expect(link.closest('a')).toHaveAttribute('href', '/shop');
        });


        // Test: Should render all three feature sections
        it('should render all three feature sections', () => {
            // Render component
            render(<Home />, { wrapper: RouterWrapper });
            
            // Check "Unique Personalities" feature
            expect(screen.getByText('Unique Personalities')).toBeInTheDocument();
            expect(screen.getByText('Each buddy comes with attitude, style, and a whole lot of sass.')).toBeInTheDocument();
            
            // Check "Legendary Rarities" feature
            expect(screen.getByText('Legendary Rarities')).toBeInTheDocument();
            expect(screen.getByText('From common to ultra - collect them all if you dare.')).toBeInTheDocument();
            
            // Check "Battle-Ready" feature
            expect(screen.getByText('Battle-Ready')).toBeInTheDocument();
            expect(screen.getByText("These balls don't just play sports. They dominate them.")).toBeInTheDocument();
        });
    });
});