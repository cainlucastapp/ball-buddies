// src/__tests__/hooks/useSearch.test.js

// Dependencies
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useSearch from '../../hooks/useSearch';

describe('useSearch', () => {
    
    // Mock buddy data
    const mockBuddies = [
        {
            id: "1",
            name: "Soccer Punk",
            sport: "Soccer",
            price: 24.99,
            inStock: true,
            rarity: "rare",
            description: "This soccer ball doesn't play by the rules."
        },
        {
            id: "5",
            name: "Ball Baddie",
            sport: "Dodgeball",
            price: 25.99,
            inStock: false,
            rarity: "rare",
            description: "Dark, edgy, and ready to dodge."
        },
        {
            id: "4",
            name: "8-Ball",
            sport: "Billiards",
            price: 34.99,
            inStock: true,
            rarity: "legendary",
            description: "Magic 8-Ball says: You're about to lose."
        },
        {
            id: "2",
            name: "Basketballer",
            sport: "Basketball",
            price: 29.99,
            inStock: true,
            rarity: "common",
            description: "Always ready for the spotlight."
        }
    ];


    describe('Base Tests', () => {
        
        // Test: Should return all 4 buddies when no filters applied
        it('should return all 4 buddies when no filters applied', () => {
            // Render hook with no filters
            const { result } = renderHook(() => 
                useSearch(mockBuddies, ['name', 'sport'])
            );
            
            // Should return all items
            expect(result.current.filteredItems).toHaveLength(4);
            expect(result.current.resultCount).toBe(4);
            expect(result.current.totalCount).toBe(4);
        });


        // Test: Should filter buddies by name search
        it('should filter buddies by name search', () => {
            // Render hook
            const { result } = renderHook(() => 
                useSearch(mockBuddies, ['name', 'sport'])
            );
            
            // Search "Ball" - should find Ball Baddie, 8-Ball, Basketballer
            act(() => {
                result.current.setSearchTerm('Ball');
            });
            
            expect(result.current.filteredItems).toHaveLength(3);
            expect(result.current.filteredItems.map(item => item.name)).toContain('Ball Baddie');
            expect(result.current.filteredItems.map(item => item.name)).toContain('8-Ball');
            expect(result.current.filteredItems.map(item => item.name)).toContain('Basketballer');
            
            // Search "Soccer" - should find Soccer Punk
            act(() => {
                result.current.setSearchTerm('Soccer');
            });
            
            expect(result.current.filteredItems).toHaveLength(1);
            expect(result.current.filteredItems[0].name).toBe('Soccer Punk');
        });


        // Test: Should filter buddies by sport search
        it('should filter buddies by sport search', () => {
            // Render hook
            const { result } = renderHook(() => 
                useSearch(mockBuddies, ['name', 'sport'])
            );
            
            // Search "Soccer" in sport field
            act(() => {
                result.current.setSearchTerm('Soccer');
            });
            
            expect(result.current.filteredItems).toHaveLength(1);
            expect(result.current.filteredItems[0].name).toBe('Soccer Punk');
            expect(result.current.filteredItems[0].sport).toBe('Soccer');
            
            // Search "Dodgeball"
            act(() => {
                result.current.setSearchTerm('Dodgeball');
            });
            
            expect(result.current.filteredItems).toHaveLength(1);
            expect(result.current.filteredItems[0].name).toBe('Ball Baddie');
            expect(result.current.filteredItems[0].sport).toBe('Dodgeball');
        });


        // Test: Should sort buddies by name alphabetically
        it('should sort buddies by name alphabetically', () => {
            // Render hook
            const { result } = renderHook(() => 
                useSearch(mockBuddies, ['name', 'sport'])
            );
            
            // Sort by name
            act(() => {
                result.current.setSortBy('name');
            });
            
            // Expected order: "8-Ball", "Ball Baddie", "Basketballer", "Soccer Punk"
            const names = result.current.filteredItems.map(item => item.name);
            expect(names).toEqual(['8-Ball', 'Ball Baddie', 'Basketballer', 'Soccer Punk']);
        });


        // Test: Should sort buddies by price ascending
        it('should sort buddies by price ascending', () => {
            // Render hook
            const { result } = renderHook(() => 
                useSearch(mockBuddies, ['name', 'sport'])
            );
            
            // Sort by price
            act(() => {
                result.current.setSortBy('price');
            });
            
            // Expected order: 24.99, 25.99, 29.99, 34.99
            const prices = result.current.filteredItems.map(item => item.price);
            expect(prices).toEqual([24.99, 25.99, 29.99, 34.99]);
        });


        // Test: Should filter only in-stock buddies
        it('should filter only in-stock buddies', () => {
            // Render hook
            const { result } = renderHook(() => 
                useSearch(mockBuddies, ['name', 'sport'])
            );
            
            // Filter in-stock only
            act(() => {
                result.current.setStockFilter('inStock');
            });
            
            // Expect 3 items: Soccer Punk, 8-Ball, Basketballer
            expect(result.current.filteredItems).toHaveLength(3);
            expect(result.current.filteredItems.every(item => item.inStock)).toBe(true);
            
            const names = result.current.filteredItems.map(item => item.name);
            expect(names).toContain('Soccer Punk');
            expect(names).toContain('8-Ball');
            expect(names).toContain('Basketballer');
            expect(names).not.toContain('Ball Baddie');
        });


        // Test: Should filter only out-of-stock buddies
        it('should filter only out-of-stock buddies', () => {
            // Render hook
            const { result } = renderHook(() => 
                useSearch(mockBuddies, ['name', 'sport'])
            );
            
            // Filter out-of-stock only
            act(() => {
                result.current.setStockFilter('outOfStock');
            });
            
            // Expect 1 item: Ball Baddie
            expect(result.current.filteredItems).toHaveLength(1);
            expect(result.current.filteredItems[0].name).toBe('Ball Baddie');
            expect(result.current.filteredItems[0].inStock).toBe(false);
        });
    });


    describe('Edge Cases', () => {
        
        // Test: Should handle case-insensitive search
        it('should handle case-insensitive search', () => {
            // Render hook
            const { result } = renderHook(() => 
                useSearch(mockBuddies, ['name', 'sport'])
            );
            
            // Search "BALL" - should find all with "ball" in name
            act(() => {
                result.current.setSearchTerm('BALL');
            });
            
            expect(result.current.filteredItems).toHaveLength(3);
            const names = result.current.filteredItems.map(item => item.name);
            expect(names).toContain('Ball Baddie');
            expect(names).toContain('8-Ball');
            expect(names).toContain('Basketballer');
            
            // Search "soccer" - should find "Soccer Punk"
            act(() => {
                result.current.setSearchTerm('soccer');
            });
            
            expect(result.current.filteredItems).toHaveLength(1);
            expect(result.current.filteredItems[0].name).toBe('Soccer Punk');
        });


        // Test: Should combine search + sort
        it('should combine search + sort', () => {
            // Render hook
            const { result } = renderHook(() => 
                useSearch(mockBuddies, ['name', 'sport'])
            );
            
            // Search "Ball" + sort by price
            act(() => {
                result.current.setSearchTerm('Ball');
                result.current.setSortBy('price');
            });
            
            // Finds 3 items, sorted by price
            expect(result.current.filteredItems).toHaveLength(3);
            
            // Expected order: Ball Baddie (25.99), Basketballer (29.99), 8-Ball (34.99)
            const names = result.current.filteredItems.map(item => item.name);
            expect(names).toEqual(['Ball Baddie', 'Basketballer', '8-Ball']);
            
            const prices = result.current.filteredItems.map(item => item.price);
            expect(prices).toEqual([25.99, 29.99, 34.99]);
        });


        // Test: Should combine search + stock filter
        it('should combine search + stock filter', () => {
            // Render hook
            const { result } = renderHook(() => 
                useSearch(mockBuddies, ['name', 'sport'])
            );
            
            // Search "Ball" + filter in-stock
            act(() => {
                result.current.setSearchTerm('Ball');
                result.current.setStockFilter('inStock');
            });
            
            // Should find 8-Ball and Basketballer (Ball Baddie is out of stock)
            expect(result.current.filteredItems).toHaveLength(2);
            
            const names = result.current.filteredItems.map(item => item.name);
            expect(names).toContain('8-Ball');
            expect(names).toContain('Basketballer');
            expect(names).not.toContain('Ball Baddie');
        });


        // Test: Should combine all three filters (search + stock + sort)
        it('should combine all three filters (search + stock + sort)', () => {
            // Render hook
            const { result } = renderHook(() => 
                useSearch(mockBuddies, ['name', 'sport'])
            );
            
            // Search "Ball" + in-stock + sort by price
            act(() => {
                result.current.setSearchTerm('Ball');
                result.current.setStockFilter('inStock');
                result.current.setSortBy('price');
            });
            
            // Should find 2 items, sorted by price
            expect(result.current.filteredItems).toHaveLength(2);
            
            // Expected: Basketballer (29.99), then 8-Ball (34.99)
            const names = result.current.filteredItems.map(item => item.name);
            expect(names).toEqual(['Basketballer', '8-Ball']);
            
            const prices = result.current.filteredItems.map(item => item.price);
            expect(prices).toEqual([29.99, 34.99]);
        });
    });


    describe('Fail Cases', () => {
        
        // Test: Should handle invalid stock filter value
        it('should handle invalid stock filter value', () => {
            // Render hook
            const { result } = renderHook(() => 
                useSearch(mockBuddies, ['name', 'sport'])
            );
            
            // Set invalid stock filter
            act(() => {
                result.current.setStockFilter('invalid');
            });
            
            // Should return all items (treat as 'all')
            expect(result.current.filteredItems).toHaveLength(4);
            expect(result.current.resultCount).toBe(4);
        });


        // Test: Should handle sorting by non-existent field
        it('should handle sorting by non-existent field', () => {
            // Render hook
            const { result } = renderHook(() => 
                useSearch(mockBuddies, ['name', 'sport'])
            );
            
            // Sort by non-existent field
            act(() => {
                result.current.setSortBy('nonExistentField');
            });
            
            // Should not crash, return items unsorted
            expect(result.current.filteredItems).toHaveLength(4);
            expect(() => result.current.filteredItems).not.toThrow();
        });


        // Test: Should update resultCount and totalCount correctly
        it('should update resultCount and totalCount correctly', () => {
            // Render hook
            const { result } = renderHook(() => 
                useSearch(mockBuddies, ['name', 'sport'])
            );
            
            // No filters
            expect(result.current.resultCount).toBe(4);
            expect(result.current.totalCount).toBe(4);
            
            // After search "Ball"
            act(() => {
                result.current.setSearchTerm('Ball');
            });
            
            expect(result.current.resultCount).toBe(3);
            expect(result.current.totalCount).toBe(4);
            
            // After in-stock filter
            act(() => {
                result.current.setSearchTerm('');
                result.current.setStockFilter('inStock');
            });
            
            expect(result.current.resultCount).toBe(3);
            expect(result.current.totalCount).toBe(4);
        });
    });
});