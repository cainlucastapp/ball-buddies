// src/__tests__/components/SearchBar.test.jsx

// Dependencies
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../components/SearchBar';

describe('SearchBar', () => {
    
    describe('Base Tests', () => {
        
        // Test: Should render all inputs and dropdowns with options
        it('should render all inputs and dropdowns with options', () => {
            // Mock callbacks
            const mockSetSearchTerm = vi.fn();
            const mockSetSortBy = vi.fn();
            const mockSetStockFilter = vi.fn();
            
            // Render component
            render(
                <SearchBar 
                    searchTerm="" 
                    setSearchTerm={mockSetSearchTerm} 
                    sortBy="" 
                    setSortBy={mockSetSortBy} 
                    stockFilter="all" 
                    setStockFilter={mockSetStockFilter} 
                />
            );
            
            // Check search input exists
            expect(screen.getByPlaceholderText('Search by name, sport, or description...')).toBeInTheDocument();
            
            // Check sort dropdown exists with options
            expect(screen.getByLabelText(/sort by/i)).toBeInTheDocument();
            expect(screen.getByRole('option', { name: 'Name' })).toBeInTheDocument();
            expect(screen.getByRole('option', { name: 'Price' })).toBeInTheDocument();
            
            // Check stock dropdown exists with options
            expect(screen.getByLabelText(/stock/i)).toBeInTheDocument();
            expect(screen.getByRole('option', { name: 'In Stock' })).toBeInTheDocument();
            expect(screen.getByRole('option', { name: 'Out of Stock' })).toBeInTheDocument();
        });


        // Test: Should call setSearchTerm when typing in search input
        it('should call setSearchTerm when typing in search input', () => {
            // Mock callbacks
            const mockSetSearchTerm = vi.fn();
            const mockSetSortBy = vi.fn();
            const mockSetStockFilter = vi.fn();
            
            // Render component
            render(
                <SearchBar 
                    searchTerm="" 
                    setSearchTerm={mockSetSearchTerm} 
                    sortBy="" 
                    setSortBy={mockSetSortBy} 
                    stockFilter="all" 
                    setStockFilter={mockSetStockFilter} 
                />
            );
            
            // Get search input
            const searchInput = screen.getByPlaceholderText('Search by name, sport, or description...');
            
            // Type in search input
            fireEvent.change(searchInput, { target: { value: 'Soccer' } });
            
            // Verify setSearchTerm was called with correct value
            expect(mockSetSearchTerm).toHaveBeenCalledWith('Soccer');
        });


        // Test: Should call setSortBy when changing sort dropdown
        it('should call setSortBy when changing sort dropdown', () => {
            // Mock callbacks
            const mockSetSearchTerm = vi.fn();
            const mockSetSortBy = vi.fn();
            const mockSetStockFilter = vi.fn();
            
            // Render component
            render(
                <SearchBar 
                    searchTerm="" 
                    setSearchTerm={mockSetSearchTerm} 
                    sortBy="" 
                    setSortBy={mockSetSortBy} 
                    stockFilter="all" 
                    setStockFilter={mockSetStockFilter} 
                />
            );
            
            // Get sort dropdown
            const sortDropdown = screen.getByLabelText(/sort by/i);
            
            // Change sort dropdown to "Name"
            fireEvent.change(sortDropdown, { target: { value: 'name' } });
            
            // Verify setSortBy was called with correct value
            expect(mockSetSortBy).toHaveBeenCalledWith('name');
        });


        // Test: Should call setStockFilter when changing stock dropdown
        it('should call setStockFilter when changing stock dropdown', () => {
            // Mock callbacks
            const mockSetSearchTerm = vi.fn();
            const mockSetSortBy = vi.fn();
            const mockSetStockFilter = vi.fn();
            
            // Render component
            render(
                <SearchBar 
                    searchTerm="" 
                    setSearchTerm={mockSetSearchTerm} 
                    sortBy="" 
                    setSortBy={mockSetSortBy} 
                    stockFilter="all" 
                    setStockFilter={mockSetStockFilter} 
                />
            );
            
            // Get stock dropdown
            const stockDropdown = screen.getByLabelText(/stock/i);
            
            // Change stock dropdown to "In Stock"
            fireEvent.change(stockDropdown, { target: { value: 'inStock' } });
            
            // Verify setStockFilter was called with correct value
            expect(mockSetStockFilter).toHaveBeenCalledWith('inStock');
        });
    });


    describe('Edge Cases', () => {
        
        // Test: Should auto-focus search input on mount
        it('should auto-focus search input on mount', () => {
            // Mock callbacks
            const mockSetSearchTerm = vi.fn();
            const mockSetSortBy = vi.fn();
            const mockSetStockFilter = vi.fn();
            
            // Render component
            render(
                <SearchBar 
                    searchTerm="" 
                    setSearchTerm={mockSetSearchTerm} 
                    sortBy="" 
                    setSortBy={mockSetSortBy} 
                    stockFilter="all" 
                    setStockFilter={mockSetStockFilter} 
                />
            );
            
            // Get search input
            const searchInput = screen.getByPlaceholderText('Search by name, sport, or description...');
            
            // Verify search input has focus
            expect(searchInput).toHaveFocus();
        });
    });
});