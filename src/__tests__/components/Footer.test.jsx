// src/__tests__/components/Footer.test.jsx

// Dependencies
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';

describe('Footer', () => {

    describe('Base Tests', () => {
        
        // Test: Should display current year dynamically
        it('should display current year dynamically', () => {
            // Render component
            render(<Footer />);
            
            // Get current year
            const currentYear = new Date().getFullYear();
            
            // Check that current year is displayed
            expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
        });
    });
});