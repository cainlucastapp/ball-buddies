// src/__tests__/App.test.jsx

// Dependencies
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
    
    // Test: Should render without crashing
    it('should render without crashing', () => {
        // Render app
        render(<App />);
        
        // renders header and footer
        expect(screen.getByRole('banner')).toBeInTheDocument(); 
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
});