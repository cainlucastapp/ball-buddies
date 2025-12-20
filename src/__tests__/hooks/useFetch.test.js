// src/__tests__/hooks/useFetch.test.js

// Dependencies
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import useFetch from '../../hooks/useFetch'

describe('useFetch', () => {
    
    // Setup and cleanup
    let fetchSpy;
    
    beforeEach(() => {
        // Mock fetch
        fetchSpy = vi.spyOn(globalThis, 'fetch');
    });

    afterEach(() => {
        // Restore fetch after each test
        fetchSpy.mockRestore();
    });


    describe('Base Tests', () => {
        
        // Test: Should fetch data successfully and handle loading state
        it('should fetch data successfully and handle loading state', async () => {
            // Mock successful API response
            const mockData = [
                { id: 1, name: 'Item 1' },
                { id: 2, name: 'Item 2' }
            ];
            
            fetchSpy.mockResolvedValueOnce({
                ok: true,
                json: async () => mockData
            });
            
            // Render hook
            const { result } = renderHook(() => useFetch('http://localhost:4000/items'));
            
            // Initial state: loading should be true
            expect(result.current.loading).toBe(true);
            expect(result.current.data).toBe(null);
            expect(result.current.error).toBe(null);
            
            // Wait for fetch to complete
            await waitFor(() => {
                expect(result.current.loading).toBe(false);
            });
            
            // After fetch: data should be set, loading false, no error
            expect(result.current.data).toEqual(mockData);
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBe(null);
        });


        // Test: Should update when URL changes
        it('should update when URL changes', async () => {
            // Mock first API response
            const mockData1 = [{ id: 1, name: 'Item 1' }];
            fetchSpy.mockResolvedValueOnce({
                ok: true,
                json: async () => mockData1
            });
            
            // Render hook with initial URL
            const { result, rerender } = renderHook(
                ({ url }) => useFetch(url),
                { initialProps: { url: 'http://localhost:4000/items' } }
            );
            
            // Wait for first fetch to complete
            await waitFor(() => {
                expect(result.current.loading).toBe(false);
            });
            
            // Verify first data
            expect(result.current.data).toEqual(mockData1);
            
            // Mock second API response
            const mockData2 = [{ id: 2, name: 'Item 2' }];
            fetchSpy.mockResolvedValueOnce({
                ok: true,
                json: async () => mockData2
            });
            
            // Change URL (rerender with new props)
            rerender({ url: 'http://localhost:4000/products' });
            
            // Loading should be true again
            expect(result.current.loading).toBe(true);
            
            // Wait for second fetch to complete
            await waitFor(() => {
                expect(result.current.loading).toBe(false);
            });
            
            // Verify updated data
            expect(result.current.data).toEqual(mockData2);
            expect(result.current.error).toBe(null);
        });
    });


    describe('Edge Cases', () => {
        
        // Test: Should handle empty/null response data
        it('should handle empty/null response data', async () => {
            // Mock API returning empty array
            fetchSpy.mockResolvedValueOnce({
                ok: true,
                json: async () => []
            });
            
            // Render hook
            const { result } = renderHook(() => useFetch('http://localhost:4000/items'));
            
            // Wait for fetch to complete
            await waitFor(() => {
                expect(result.current.loading).toBe(false);
            });
            
            // Should handle empty data gracefully
            expect(result.current.data).toEqual([]);
            expect(result.current.error).toBe(null);
            
            // Test with null response
            fetchSpy.mockResolvedValueOnce({
                ok: true,
                json: async () => null
            });
            
            const { result: result2 } = renderHook(() => useFetch('http://localhost:4000/null'));
            
            await waitFor(() => {
                expect(result2.current.loading).toBe(false);
            });
            
            expect(result2.current.data).toBe(null);
            expect(result2.current.error).toBe(null);
        });


        // Test: Should handle URL change during pending fetch
        it('should handle URL change during pending fetch', async () => {
            // Mock first API with delay
            let resolveFirst;
            const firstPromise = new Promise((resolve) => {
                resolveFirst = resolve;
            });
            
            fetchSpy.mockReturnValueOnce(firstPromise);
            
            // Render hook with initial URL
            const { result, rerender } = renderHook(
                ({ url }) => useFetch(url),
                { initialProps: { url: 'http://localhost:4000/slow' } }
            );
            
            // Should be loading
            expect(result.current.loading).toBe(true);
            
            // Mock second API (will complete immediately)
            const mockData2 = [{ id: 2, name: 'Fast Data' }];
            fetchSpy.mockResolvedValueOnce({
                ok: true,
                json: async () => mockData2
            });
            
            // Change URL before first fetch completes
            rerender({ url: 'http://localhost:4000/fast' });
            
            // Wait for second fetch to complete
            await waitFor(() => {
                expect(result.current.loading).toBe(false);
            });
            
            // Should have data from second fetch
            expect(result.current.data).toEqual(mockData2);
            
            // Resolve first fetch (should be ignored)
            resolveFirst({
                ok: true,
                json: async () => [{ id: 1, name: 'Slow Data' }]
            });
            
            // Data should still be from second fetch
            await waitFor(() => {
                expect(result.current.data).toEqual(mockData2);
            });
        });


        // Test: Should handle multiple renders with same URL
        it('should handle multiple renders with same URL', async () => {
            // Mock API response
            const mockData = [{ id: 1, name: 'Item 1' }];
            
            fetchSpy.mockResolvedValue({
                ok: true,
                json: async () => mockData
            });
            
            // Render hook first time
            const { result: result1 } = renderHook(() => 
                useFetch('http://localhost:4000/items')
            );
            
            await waitFor(() => {
                expect(result1.current.loading).toBe(false);
            });
            
            expect(result1.current.data).toEqual(mockData);
            
            // Render hook again with same URL
            const { result: result2 } = renderHook(() => 
                useFetch('http://localhost:4000/items')
            );
            
            await waitFor(() => {
                expect(result2.current.loading).toBe(false);
            });
            
            // Should fetch again and have consistent behavior
            expect(result2.current.data).toEqual(mockData);
            expect(result2.current.error).toBe(null);
        });
    });


    describe('Fail Cases', () => {
        
        let consoleErrorSpy;

        beforeEach(() => {
            // Mock console.error to suppress expected error logs
            consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        });

        afterEach(() => {
            // Restore console.error after each test
            consoleErrorSpy.mockRestore();
        });

        
        // Test: Should handle network failure
        it('should handle network failure', async () => {
            // Mock fetch to throw network error
            fetchSpy.mockRejectedValueOnce(new Error('Network error'));
            
            // Render hook
            const { result } = renderHook(() => useFetch('http://localhost:4000/items'));
            
            // Wait for error handling
            await waitFor(() => {
                expect(result.current.loading).toBe(false);
            });
            
            // Should set error and keep data null
            expect(result.current.error).toBe('Network error');
            expect(result.current.data).toBe(null);
            expect(result.current.loading).toBe(false);
        });


        // Test: Should handle invalid JSON response
        it('should handle invalid JSON response', async () => {
            // Mock response.json() to throw error
            fetchSpy.mockResolvedValueOnce({
                ok: true,
                json: async () => {
                    throw new Error('Unexpected token < in JSON at position 0');
                }
            });
            
            // Render hook
            const { result } = renderHook(() => useFetch('http://localhost:4000/items'));
            
            // Wait for error handling
            await waitFor(() => {
                expect(result.current.loading).toBe(false);
            });
            
            // Should catch and set error state
            expect(result.current.error).toBe('Unexpected token < in JSON at position 0');
            expect(result.current.data).toBe(null);
            expect(result.current.loading).toBe(false);
        });


        // Test: Should handle fetch rejection
        it('should handle fetch rejection', async () => {
            // Mock fetch to reject promise
            fetchSpy.mockRejectedValueOnce(new Error('Failed to fetch'));
            
            // Render hook
            const { result } = renderHook(() => useFetch('http://localhost:4000/items'));
            
            // Wait for error handling
            await waitFor(() => {
                expect(result.current.loading).toBe(false);
            });
            
            // Verify error is caught and stored
            expect(result.current.error).toBe('Failed to fetch');
            expect(result.current.data).toBe(null);
            expect(result.current.loading).toBe(false);
        });


        // Test: Should handle HTTP error (not ok response)
        it('should handle HTTP error status', async () => {
            // Mock fetch returning 404 status
            fetchSpy.mockResolvedValueOnce({
                ok: false,
                status: 404
            });
            
            // Render hook
            const { result } = renderHook(() => useFetch('http://localhost:4000/notfound'));
            
            // Wait for error handling
            await waitFor(() => {
                expect(result.current.loading).toBe(false);
            });
            
            // Should set error with status code
            expect(result.current.error).toBe('HTTP error! status: 404');
            expect(result.current.data).toBe(null);
            expect(result.current.loading).toBe(false);
        });
    });
});