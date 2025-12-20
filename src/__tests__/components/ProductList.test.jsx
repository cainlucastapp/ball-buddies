// src/__tests__/components/ProductList.test.jsx

// Dependencies
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ProductList from '../../components/ProductList'
import useFetch from '../../hooks/useFetch'
import useSearch from '../../hooks/useSearch'

// Mock the hooks
vi.mock('../../hooks/useFetch')
vi.mock('../../hooks/useSearch')

// Mock SearchBar component
vi.mock('../../components/SearchBar', () => ({
    default: () => <div data-testid="search-bar">SearchBar</div>
}))

describe('ProductList', () => {
    
    // Setup and cleanup
    let fetchSpy;
    let alertSpy;
    let confirmSpy;
    let consoleErrorSpy;

    // Mock buddy data
    const mockBuddies = [
        {
            id: "1",
            name: "Soccer Punk",
            sport: "Soccer",
            price: 24.99,
            image: "/images/soccer-punk.png",
            description: "This soccer ball doesn't play by the rules.",
            inStock: true,
            rarity: "rare"
        },
        {
            id: "5",
            name: "Ball Baddie",
            sport: "Dodgeball",
            price: 25.99,
            image: "/images/ball-baddie.png",
            description: "Dark, edgy, and ready to dodge.",
            inStock: false,
            rarity: "rare"
        }
    ];

    beforeEach(() => {
        // Mock fetch
        fetchSpy = vi.spyOn(globalThis, 'fetch');
        
        // Mock alert
        alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
        
        // Mock confirm
        confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => true);
        
        // Mock console.error to suppress expected error logs
        consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        
        // Default mock for useSearch
        useSearch.mockReturnValue({
            searchTerm: '',
            setSearchTerm: vi.fn(),
            sortBy: '',
            setSortBy: vi.fn(),
            stockFilter: 'all',
            setStockFilter: vi.fn(),
            filteredItems: mockBuddies,
            resultCount: 2,
            totalCount: 2
        });
    });

    afterEach(() => {
        // Restore mocks after each test
        fetchSpy.mockRestore();
        alertSpy.mockRestore();
        confirmSpy.mockRestore();
        consoleErrorSpy.mockRestore();
        vi.clearAllMocks();
    });


    describe('Base Tests', () => {
        
        // Test: Should render loading state
        it('should render loading state', () => {
            // Mock useFetch to return loading
            useFetch.mockReturnValue({
                data: null,
                loading: true,
                error: null
            });
            
            // Mock callbacks
            const mockOnAddNew = vi.fn();
            const mockOnEdit = vi.fn();
            
            // Render component
            render(<ProductList onAddNew={mockOnAddNew} onEdit={mockOnEdit} refreshTrigger={0} />);
            
            // Check loading message displayed
            expect(screen.getByText(/loading buddies/i)).toBeInTheDocument();
        });


        // Test: Should render error state
        it('should render error state', () => {
            // Mock useFetch to return error
            useFetch.mockReturnValue({
                data: null,
                loading: false,
                error: 'Failed to fetch buddies'
            });
            
            // Mock callbacks
            const mockOnAddNew = vi.fn();
            const mockOnEdit = vi.fn();
            
            // Render component
            render(<ProductList onAddNew={mockOnAddNew} onEdit={mockOnEdit} refreshTrigger={0} />);
            
            // Check error message displayed
            expect(screen.getByText(/Error: Failed to fetch buddies/i)).toBeInTheDocument();
        });


        // Test: Should render table with buddies data
        it('should render table with buddies data', () => {
            // Mock useFetch to return buddy data
            useFetch.mockReturnValue({
                data: mockBuddies,
                loading: false,
                error: null
            });
            
            // Mock callbacks
            const mockOnAddNew = vi.fn();
            const mockOnEdit = vi.fn();
            
            // Render component
            render(<ProductList onAddNew={mockOnAddNew} onEdit={mockOnEdit} refreshTrigger={0} />);
            
            // Check table headers exist
            expect(screen.getByText('Name')).toBeInTheDocument();
            expect(screen.getByText('Sport')).toBeInTheDocument();
            expect(screen.getByText('Price')).toBeInTheDocument();
            
            // Check buddy rows are rendered
            expect(screen.getByText('Soccer Punk')).toBeInTheDocument();
            expect(screen.getByText('Ball Baddie')).toBeInTheDocument();
        });


        // Test: Should render empty state when no buddies exist
        it('should render empty state when no buddies exist', () => {
            // Mock useFetch to return empty array
            useFetch.mockReturnValue({
                data: [],
                loading: false,
                error: null
            });
            
            // Mock useSearch to return empty filtered items
            useSearch.mockReturnValue({
                searchTerm: '',
                setSearchTerm: vi.fn(),
                sortBy: '',
                setSortBy: vi.fn(),
                stockFilter: 'all',
                setStockFilter: vi.fn(),
                filteredItems: [],
                resultCount: 0,
                totalCount: 0
            });
            
            // Mock callbacks
            const mockOnAddNew = vi.fn();
            const mockOnEdit = vi.fn();
            
            // Render component
            render(<ProductList onAddNew={mockOnAddNew} onEdit={mockOnEdit} refreshTrigger={0} />);
            
            // Check empty state message
            expect(screen.getByText('No buddies in inventory yet.')).toBeInTheDocument();
        });


        // Test: Should render empty state when all buddies filtered out
        it('should render empty state when all buddies filtered out', () => {
            // Mock useFetch with buddies
            useFetch.mockReturnValue({
                data: mockBuddies,
                loading: false,
                error: null
            });
            
            // Mock useSearch to return empty filtered items
            useSearch.mockReturnValue({
                searchTerm: 'NonExistent',
                setSearchTerm: vi.fn(),
                sortBy: '',
                setSortBy: vi.fn(),
                stockFilter: 'all',
                setStockFilter: vi.fn(),
                filteredItems: [],
                resultCount: 0,
                totalCount: 2
            });
            
            // Mock callbacks
            const mockOnAddNew = vi.fn();
            const mockOnEdit = vi.fn();
            
            // Render component
            render(<ProductList onAddNew={mockOnAddNew} onEdit={mockOnEdit} refreshTrigger={0} />);
            
            // Check filtered out message
            expect(screen.getByText('No buddies found matching your filters')).toBeInTheDocument();
        });


        // Test: Should call onAddNew when add button clicked
        it('should call onAddNew when add button clicked', () => {
            // Mock useFetch to return buddy data
            useFetch.mockReturnValue({
                data: mockBuddies,
                loading: false,
                error: null
            });
            
            // Mock callbacks
            const mockOnAddNew = vi.fn();
            const mockOnEdit = vi.fn();
            
            // Render component
            render(<ProductList onAddNew={mockOnAddNew} onEdit={mockOnEdit} refreshTrigger={0} />);
            
            // Click add button
            const addButton = screen.getByText('+ Add New Buddy');
            fireEvent.click(addButton);
            
            // Verify onAddNew callback called
            expect(mockOnAddNew).toHaveBeenCalledTimes(1);
        });


        // Test: Should call onEdit when edit button clicked
        it('should call onEdit when edit button clicked', () => {
            // Mock useFetch to return buddy data
            useFetch.mockReturnValue({
                data: mockBuddies,
                loading: false,
                error: null
            });
            
            // Mock callbacks
            const mockOnAddNew = vi.fn();
            const mockOnEdit = vi.fn();
            
            // Render component
            render(<ProductList onAddNew={mockOnAddNew} onEdit={mockOnEdit} refreshTrigger={0} />);
            
            // Click edit button on first buddy
            const editButtons = screen.getAllByText('Edit');
            fireEvent.click(editButtons[0]);
            
            // Verify onEdit callback called with buddy data
            expect(mockOnEdit).toHaveBeenCalledWith(mockBuddies[0]);
        });
    });


    describe('Edge Cases', () => {
        
        // Test: Should delete buddy after confirmation
        it('should delete buddy after confirmation', async () => {
            // Mock useFetch to return buddy data
            useFetch.mockReturnValue({
                data: mockBuddies,
                loading: false,
                error: null
            });
            
            // Mock confirm to return true
            confirmSpy.mockReturnValue(true);
            
            // Mock successful DELETE response
            fetchSpy.mockResolvedValueOnce({
                ok: true
            });
            
            // Mock callbacks
            const mockOnAddNew = vi.fn();
            const mockOnEdit = vi.fn();
            
            // Render component
            render(<ProductList onAddNew={mockOnAddNew} onEdit={mockOnEdit} refreshTrigger={0} />);
            
            // Click delete button on first buddy
            const deleteButtons = screen.getAllByText('Delete');
            fireEvent.click(deleteButtons[0]);
            
            // Verify confirm was called
            expect(confirmSpy).toHaveBeenCalledWith('Are you sure you want to delete this buddy?');
            
            // Verify success alert shown
            await waitFor(() => {
                expect(alertSpy).toHaveBeenCalledWith('Buddy deleted successfully!');
            });
        });


        // Test: Should cancel delete when user declines confirmation
        it('should cancel delete when user declines confirmation', () => {
            // Mock useFetch to return buddy data
            useFetch.mockReturnValue({
                data: mockBuddies,
                loading: false,
                error: null
            });
            
            // Mock confirm to return false
            confirmSpy.mockReturnValue(false);
            
            // Mock callbacks
            const mockOnAddNew = vi.fn();
            const mockOnEdit = vi.fn();
            
            // Render component
            render(<ProductList onAddNew={mockOnAddNew} onEdit={mockOnEdit} refreshTrigger={0} />);
            
            // Click delete button
            const deleteButtons = screen.getAllByText('Delete');
            fireEvent.click(deleteButtons[0]);
            
            // Verify confirm was called
            expect(confirmSpy).toHaveBeenCalledWith('Are you sure you want to delete this buddy?');
            
            // Verify fetch was NOT called
            expect(fetchSpy).not.toHaveBeenCalled();
            
            // Verify buddy still in list
            expect(screen.getByText('Soccer Punk')).toBeInTheDocument();
        });
    });


    describe('Fail Cases', () => {
        
        // Test: Should handle delete API failure
        it('should handle delete API failure', async () => {
            // Mock useFetch to return buddy data
            useFetch.mockReturnValue({
                data: mockBuddies,
                loading: false,
                error: null
            });
            
            // Mock confirm to return true
            confirmSpy.mockReturnValue(true);
            
            // Mock failed DELETE response
            fetchSpy.mockResolvedValueOnce({
                ok: false,
                status: 500
            });
            
            // Mock callbacks
            const mockOnAddNew = vi.fn();
            const mockOnEdit = vi.fn();
            
            // Render component
            render(<ProductList onAddNew={mockOnAddNew} onEdit={mockOnEdit} refreshTrigger={0} />);
            
            // Click delete button
            const deleteButtons = screen.getAllByText('Delete');
            fireEvent.click(deleteButtons[0]);
            
            // Wait for error handling
            await waitFor(() => {
                expect(alertSpy).toHaveBeenCalledWith('Failed to delete buddy. Please try again.');
            });
            
            // Verify buddy NOT removed from list
            expect(screen.getByText('Soccer Punk')).toBeInTheDocument();
        });
    });
});