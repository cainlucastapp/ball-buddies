// src/__tests__/components/AdminLogin.test.jsx

// Dependencies
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AdminLogin from '../../components/AdminLogin'

describe('AdminLogin', () => {
    
    describe('Base Tests', () => {
        
        // Test: Should render login form with all inputs
        it('should render login form with all inputs', () => {
            // Mock callbacks
            const mockOnLogin = vi.fn();
            const mockLogin = vi.fn();
            
            // Render component
            render(<AdminLogin onLogin={mockOnLogin} login={mockLogin} isLoading={false} />);
            
            // Check heading exists
            expect(screen.getByText('Admin Login')).toBeInTheDocument();
            
            // Check username input exists
            expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
            
            // Check password input exists
            expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
            
            // Check login button exists
            expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
        });


        // Test: Should call login function with entered credentials
        it('should call login function with entered credentials', async () => {
            // Mock callbacks
            const mockOnLogin = vi.fn();
            const mockLogin = vi.fn().mockResolvedValue({ success: true });
            
            // Render component
            render(<AdminLogin onLogin={mockOnLogin} login={mockLogin} isLoading={false} />);
            
            // Fill username and password
            fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
            fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'testpass' } });
            
            // Submit form
            const form = screen.getByRole('button', { name: /login/i }).closest('form');
            fireEvent.submit(form);
            
            // Verify login called with correct credentials
            await waitFor(() => {
                expect(mockLogin).toHaveBeenCalledWith('testuser', 'testpass');
            });
        });


        // Test: Should show error banner on failed login
        it('should show error banner on failed login', async () => {
            // Mock callbacks
            const mockOnLogin = vi.fn();
            const mockLogin = vi.fn().mockResolvedValue({ 
                success: false, 
                error: 'Invalid username or password' 
            });
            
            // Render component
            render(<AdminLogin onLogin={mockOnLogin} login={mockLogin} isLoading={false} />);
            
            // Fill username and password
            fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'admin' } });
            fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrong' } });
            
            // Submit form
            const form = screen.getByRole('button', { name: /login/i }).closest('form');
            fireEvent.submit(form);
            
            // Verify error message displayed
            await waitFor(() => {
                expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
            });
            
            // Verify onLogin NOT called
            expect(mockOnLogin).not.toHaveBeenCalled();
        });


        // Test: Should clear password on failed login
        it('should clear password on failed login', async () => {
            // Mock callbacks
            const mockOnLogin = vi.fn();
            const mockLogin = vi.fn().mockResolvedValue({ 
                success: false, 
                error: 'Invalid username or password' 
            });
            
            // Render component
            render(<AdminLogin onLogin={mockOnLogin} login={mockLogin} isLoading={false} />);
            
            // Get password input
            const passwordInput = screen.getByLabelText(/password/i);
            
            // Fill username and password
            fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'admin' } });
            fireEvent.change(passwordInput, { target: { value: 'wrong' } });
            
            // Verify password has value before submit
            expect(passwordInput.value).toBe('wrong');
            
            // Submit form
            const form = screen.getByRole('button', { name: /login/i }).closest('form');
            fireEvent.submit(form);
            
            // Verify password field is cleared after failed login
            await waitFor(() => {
                expect(passwordInput.value).toBe('');
            });
        });
    });


    describe('Edge Cases', () => {
    
        // Test: Should auto-focus username input on mount
        it('should auto-focus username input on mount', () => {
            // Mock callbacks
            const mockOnLogin = vi.fn();
            const mockLogin = vi.fn();
            
            // Render component
            render(<AdminLogin onLogin={mockOnLogin} login={mockLogin} isLoading={false} />);
            
            // Get username input
            const usernameInput = screen.getByLabelText(/username/i);
            
            // Verify username input has focus
            expect(usernameInput).toHaveFocus();
        });
    });
});