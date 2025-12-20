// src/__tests__/hooks/useAuth.test.js

// Dependencies
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useAuth from '../../hooks/useAuth'

describe('useAuth', () => {
    
    // Setup and cleanup
    let fetchSpy;
    
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
        
        // Mock fetch
        fetchSpy = vi.spyOn(globalThis, 'fetch');
    });

    afterEach(() => {
        // Restore fetch after each test
        fetchSpy.mockRestore();
    });


    describe('Base Tests', () => {
        
        // Test: Successfully login with correct credentials
        it('should successfully login with correct credentials', async () => {
            // Mock API with valid admin
            const mockAdmins = [
                { id: 1, username: 'admin', password: 'admin123' }
            ];
            
            fetchSpy.mockResolvedValueOnce({
                ok: true,
                json: async () => mockAdmins
            });
            
            // Render hook
            const { result } = renderHook(() => useAuth());
            
            // Initial state should be unauthenticated
            expect(result.current.isAuthenticated).toBe(false);
            
            // Call login
            let loginResult;
            await act(async () => {
                loginResult = await result.current.login('admin', 'admin123');
            });
            
            // Expect successful login
            expect(loginResult.success).toBe(true);
            expect(result.current.isAuthenticated).toBe(true);
            expect(localStorage.getItem('adminAuth')).toBe('true');
        });


        // Test: Successfully logout
        it('should successfully logout', async () => {
            // Set up authenticated state
            localStorage.setItem('adminAuth', 'true');
            
            // Render hook (should restore from localStorage)
            const { result } = renderHook(() => useAuth());
            
            // Should start authenticated
            expect(result.current.isAuthenticated).toBe(true);
            
            // Call logout
            act(() => {
                result.current.logout();
            });
            
            // Expect isAuthenticated to be false
            expect(result.current.isAuthenticated).toBe(false);
            
            // Expect localStorage to be cleared
            expect(localStorage.getItem('adminAuth')).toBeNull();
        });


        // Test: Restore authentication from localStorage on mount
        it('should restore authentication from localStorage on mount', async () => {
            // Set localStorage
            localStorage.setItem('adminAuth', 'true');
            
            // Render hook
            const { result } = renderHook(() => useAuth());
            
            // Expect isAuthenticated to be true
            expect(result.current.isAuthenticated).toBe(true);
        });
    });


    describe('Edge Cases', () => {
        
        // Test: Handle empty localStorage on initial render
        it('should handle empty localStorage on initial render', async () => {
            // Clear localStorage (already done in beforeEach)
            localStorage.clear();
            
            // Render hook
            const { result } = renderHook(() => useAuth());
            
            // Expect isAuthenticated to be false
            expect(result.current.isAuthenticated).toBe(false);
        });


        // Test: Handle corrupted localStorage data
        it('should handle corrupted localStorage data', async () => {
            // Set localStorage to invalid value
            localStorage.setItem('adminAuth', 'corrupted-data-123');
            
            // Render hook
            const { result } = renderHook(() => useAuth());
            
            // Should gracefully default to false (anything other than 'true' is false)
            expect(result.current.isAuthenticated).toBe(false);
        });


        // Test: Handle login when already authenticated
        it('should handle login when already authenticated', async () => {
            // Set up authenticated state
            localStorage.setItem('adminAuth', 'true');
            
            // Render hook
            const { result } = renderHook(() => useAuth());
            
            // Should start authenticated
            expect(result.current.isAuthenticated).toBe(true);
            
            // Mock API with valid admin
            const mockAdmins = [
                { id: 1, username: 'admin', password: 'admin123' }
            ];
            
            fetchSpy.mockResolvedValueOnce({
                ok: true,
                json: async () => mockAdmins
            });
            
            // Try to login again
            let loginResult;
            await act(async () => {
                loginResult = await result.current.login('admin', 'admin123');
            });
            
            // Should still work and update state appropriately
            expect(loginResult.success).toBe(true);
            expect(result.current.isAuthenticated).toBe(true);
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
        
        // Test: Reject login with incorrect username
        it('should reject login with incorrect username', async () => {
            // Mock API with valid admin data
            const mockAdmins = [
                { id: 1, username: 'admin', password: 'admin123' }
            ];
            
            fetchSpy.mockResolvedValueOnce({
                ok: true,
                json: async () => mockAdmins
            });
            
            // Render hook
            const { result } = renderHook(() => useAuth());
            
            // Call login with wrong username
            let loginResult;
            await act(async () => {
                loginResult = await result.current.login('wronguser', 'admin123');
            });
            
            // Expect login to fail
            expect(loginResult.success).toBe(false);
            expect(loginResult.error).toBe('Invalid username or password');
            
            // Expect isAuthenticated to remain false
            expect(result.current.isAuthenticated).toBe(false);
            expect(localStorage.getItem('adminAuth')).toBeNull();
        });


        // Test: Reject login with incorrect password
        it('should reject login with incorrect password', async () => {
            // Mock API with valid admin data
            const mockAdmins = [
                { id: 1, username: 'admin', password: 'admin123' }
            ];
            
            fetchSpy.mockResolvedValueOnce({
                ok: true,
                json: async () => mockAdmins
            });
            
            // Render hook
            const { result } = renderHook(() => useAuth());
            
            // Call login with wrong password
            let loginResult;
            await act(async () => {
                loginResult = await result.current.login('admin', 'wrongpassword');
            });
            
            // Expect login to fail
            expect(loginResult.success).toBe(false);
            expect(loginResult.error).toBe('Invalid username or password');
            
            // Expect isAuthenticated to remain false
            expect(result.current.isAuthenticated).toBe(false);
        });


        // Test: Handle API fetch failure
        it('should handle API fetch failure', async () => {
            // Mock fetch to throw error
            fetchSpy.mockRejectedValueOnce(new Error('Network error'));
            
            // Render hook
            const { result } = renderHook(() => useAuth());
            
            // Call login
            let loginResult;
            await act(async () => {
                loginResult = await result.current.login('admin', 'admin123');
            });
            
            // Expect error handling
            expect(loginResult.success).toBe(false);
            expect(loginResult.error).toBe('Unable to verify credentials. Please try again.');
            
            // Expect isAuthenticated to remain false
            expect(result.current.isAuthenticated).toBe(false);
        });


        // Test: Handle API response not ok
        it('should handle API response not ok', async () => {
            // Mock fetch to return not ok response
            fetchSpy.mockResolvedValueOnce({
                ok: false,
                status: 500
            });
            
            // Render hook
            const { result } = renderHook(() => useAuth());
            
            // Call login
            let loginResult;
            await act(async () => {
                loginResult = await result.current.login('admin', 'admin123');
            });
            
            // Expect error handling
            expect(loginResult.success).toBe(false);
            expect(loginResult.error).toBe('Unable to verify credentials. Please try again.');
            
            // Expect isAuthenticated to remain false
            expect(result.current.isAuthenticated).toBe(false);
        });


        // Test: Handle empty credentials
        it('should handle empty credentials', async () => {
            // Mock API with valid admin data
            const mockAdmins = [
                { id: 1, username: 'admin', password: 'admin123' }
            ];
            
            fetchSpy.mockResolvedValueOnce({
                ok: true,
                json: async () => mockAdmins
            });
            
            // Render hook
            const { result } = renderHook(() => useAuth());
            
            // Call login with empty credentials
            let loginResult;
            await act(async () => {
                loginResult = await result.current.login('', '');
            });
            
            // Should handle gracefully (no match found)
            expect(loginResult.success).toBe(false);
            expect(loginResult.error).toBe('Invalid username or password');
            expect(result.current.isAuthenticated).toBe(false);
        });


        // Test: Handle API returning empty admin list
        it('should handle API returning empty admin list', async () => {
            // Mock API to return empty array
            fetchSpy.mockResolvedValueOnce({
                ok: true,
                json: async () => []
            });
            
            // Render hook
            const { result } = renderHook(() => useAuth());
            
            // Call login
            let loginResult;
            await act(async () => {
                loginResult = await result.current.login('admin', 'admin123');
            });
            
            // Should reject login
            expect(loginResult.success).toBe(false);
            expect(loginResult.error).toBe('Invalid username or password');
            expect(result.current.isAuthenticated).toBe(false);
        });
    });
});