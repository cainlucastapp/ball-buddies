// src/__tests__/pages/Shop.test.jsx

// Dependencies
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Shop from '../../pages/Shop';
import useFetch from '../../hooks/useFetch';
import useSearch from '../../hooks/useSearch';

// Mock the hooks
vi.mock('../../hooks/useFetch');
vi.mock('../../hooks/useSearch');

// Mock SearchBar component
vi.mock('../../components/SearchBar', () => ({
    default: () => <div data-testid="search-bar">SearchBar</div>
}));

// Mock ShopCard component
vi.mock('../../components/ShopCard', () => ({
    default: ({ buddy }) => <div data-testid={`shop-card-${buddy.id}`}>{buddy.name}</div>
}));

describe('Shop', () => {
    
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
        vi.clearAllMocks();
    });


    describe('Base Tests', () => {
        
        // Test: Should render error state
        it('should render error state', () => {
            // Mock useFetch to return error
            useFetch.mockReturnValue({
                data: null,
                loading: false,
                error: 'Failed to fetch buddies'
            });
            
            // Render component
            render(<Shop />);
            
            // Check error message is displayed
            expect(screen.getByText(/Error: Failed to fetch buddies/i)).toBeInTheDocument();
        });


        // Test: Should render SearchBar component
        it('should render SearchBar component', () => {
            // Mock useFetch to return buddy data
            useFetch.mockReturnValue({
                data: mockBuddies,
                loading: false,
                error: null
            });
            
            // Render component
            render(<Shop />);
            
            // Check SearchBar is rendered
            expect(screen.getByTestId('search-bar')).toBeInTheDocument();
        });


        // Test: Should render ShopCard for each buddy
        it('should render ShopCard for each buddy', () => {
            // Mock useFetch to return buddy data
            useFetch.mockReturnValue({
                data: mockBuddies,
                loading: false,
                error: null
            });
            
            // Render component
            render(<Shop />);
            
            // Check correct number of ShopCards rendered
            expect(screen.getByTestId('shop-card-1')).toBeInTheDocument();
            expect(screen.getByTestId('shop-card-5')).toBeInTheDocument();
            
            // Check ShopCards receive correct buddy props (via name)
            expect(screen.getByText('Soccer Punk')).toBeInTheDocument();
            expect(screen.getByText('Ball Baddie')).toBeInTheDocument();
        });


        // Test: Should show "no buddies found" message when filtered items empty
        it('should show "no buddies found" message when filtered items empty', () => {
            // Mock useFetch with buddies
            useFetch.mockReturnValue({
                data: mockBuddies,
                loading: false,
                error: null
            });
            
            // Mock useSearch to return empty filteredItems
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
            
            // Render component
            render(<Shop />);
            
            // Check "no buddies found" message
            expect(screen.getByText('No buddies found matching your filters')).toBeInTheDocument();
        });
    });
});