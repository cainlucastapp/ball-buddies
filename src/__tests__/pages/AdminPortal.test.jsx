// src/__tests__/pages/AdminPortal.test.jsx

// Dependencies
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminPortal from '../../pages/AdminPortal';
import useAuth from '../../hooks/useAuth';

// Mock the useAuth hook
vi.mock('../../hooks/useAuth');

// Mock AdminLogin component
vi.mock('../../components/AdminLogin', () => ({
    default: ({ onLogin }) => (
        <div data-testid="admin-login">
            <button onClick={onLogin}>Mock Login</button>
        </div>
    )
}));

// Mock ProductList component
vi.mock('../../components/ProductList', () => ({
    default: ({ onAddNew, onEdit }) => (
        <div data-testid="product-list">
            <button onClick={() => onAddNew()}>Add New</button>
            <button onClick={() => onEdit({ id: '1', name: 'Test Buddy' })}>Edit</button>
        </div>
    )
}));

// Mock ProductForm component
vi.mock('../../components/ProductForm', () => ({
    default: ({ editingBuddy, onSuccess, onCancel }) => (
        <div data-testid="product-form">
            <span>{editingBuddy ? 'Editing' : 'Adding'}</span>
            <button onClick={onSuccess}>Success</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    )
}));

describe('AdminPortal', () => {
    
    let mockLogin;
    let mockLogout;

    beforeEach(() => {
        // Create mock functions
        mockLogin = vi.fn();
        mockLogout = vi.fn();
        
        // Mock window.history methods
        vi.spyOn(window.history, 'pushState').mockImplementation(() => {});
        vi.spyOn(window.history, 'back').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.clearAllMocks();
    });


    describe('Base Tests', () => {
        
        // Test: Should render AdminLogin when not authenticated
        it('should render AdminLogin when not authenticated', () => {
            // Mock useAuth to return not authenticated
            useAuth.mockReturnValue({
                isAuthenticated: false,
                isLoading: false,
                login: mockLogin,
                logout: mockLogout
            });
            
            // Render component
            render(<AdminPortal />);
            
            // Check AdminLogin component renders
            expect(screen.getByTestId('admin-login')).toBeInTheDocument();
            
            // Check ProductList does NOT render
            expect(screen.queryByTestId('product-list')).not.toBeInTheDocument();
        });


        // Test: Should render admin portal header when authenticated
        it('should render admin portal header when authenticated', () => {
            // Mock useAuth to return authenticated
            useAuth.mockReturnValue({
                isAuthenticated: true,
                isLoading: false,
                login: mockLogin,
                logout: mockLogout
            });
            
            // Render component
            render(<AdminPortal />);
            
            // Check "Admin Portal" heading
            expect(screen.getByText('Admin Portal')).toBeInTheDocument();
            
            // Check logout button exists
            expect(screen.getByText('Logout')).toBeInTheDocument();
        });


        // Test: Should render ProductList in table view
        it('should render ProductList in table view', () => {
            // Mock useAuth to return authenticated
            useAuth.mockReturnValue({
                isAuthenticated: true,
                isLoading: false,
                login: mockLogin,
                logout: mockLogout
            });
            
            // Render component
            render(<AdminPortal />);
            
            // Check ProductList renders (default view is table)
            expect(screen.getByTestId('product-list')).toBeInTheDocument();
            
            // Check ProductForm does NOT render
            expect(screen.queryByTestId('product-form')).not.toBeInTheDocument();
        });


        // Test: Should render ProductForm in form view
        it('should render ProductForm in form view', () => {
            // Mock useAuth to return authenticated
            useAuth.mockReturnValue({
                isAuthenticated: true,
                isLoading: false,
                login: mockLogin,
                logout: mockLogout
            });
            
            // Render component
            render(<AdminPortal />);
            
            // Click "Add New" to switch to form view
            const addButton = screen.getByText('Add New');
            fireEvent.click(addButton);
            
            // Check ProductForm renders
            expect(screen.getByTestId('product-form')).toBeInTheDocument();
            
            // Check ProductList does NOT render
            expect(screen.queryByTestId('product-list')).not.toBeInTheDocument();
        });


        // Test: Should call logout when logout button clicked
        it('should call logout when logout button clicked', () => {
            // Mock useAuth to return authenticated
            useAuth.mockReturnValue({
                isAuthenticated: true,
                isLoading: false,
                login: mockLogin,
                logout: mockLogout
            });
            
            // Render component
            render(<AdminPortal />);
            
            // Click logout button
            const logoutButton = screen.getByText('Logout');
            fireEvent.click(logoutButton);
            
            // Verify logout function called
            expect(mockLogout).toHaveBeenCalledTimes(1);
        });


        // Test: Should switch to form view when adding new buddy
        it('should switch to form view when adding new buddy', () => {
            // Mock useAuth to return authenticated
            useAuth.mockReturnValue({
                isAuthenticated: true,
                isLoading: false,
                login: mockLogin,
                logout: mockLogout
            });
            
            // Render component
            render(<AdminPortal />);
            
            // Click "Add New" button
            const addButton = screen.getByText('Add New');
            fireEvent.click(addButton);
            
            // Check form view shown
            expect(screen.getByTestId('product-form')).toBeInTheDocument();
            
            // Check it's in "Adding" mode (no editingBuddy)
            expect(screen.getByText('Adding')).toBeInTheDocument();
        });


        // Test: Should switch to form view when editing buddy
        it('should switch to form view when editing buddy', () => {
            // Mock useAuth to return authenticated
            useAuth.mockReturnValue({
                isAuthenticated: true,
                isLoading: false,
                login: mockLogin,
                logout: mockLogout
            });
            
            // Render component
            render(<AdminPortal />);
            
            // Click "Edit" button
            const editButton = screen.getByText('Edit');
            fireEvent.click(editButton);
            
            // Check form view shown
            expect(screen.getByTestId('product-form')).toBeInTheDocument();
            
            // Check it's in "Editing" mode (has editingBuddy)
            expect(screen.getByText('Editing')).toBeInTheDocument();
        });


        // Test: Should switch back to table view when form is cancelled
        it('should switch back to table view when form is cancelled', () => {
            // Mock useAuth to return authenticated
            useAuth.mockReturnValue({
                isAuthenticated: true,
                isLoading: false,
                login: mockLogin,
                logout: mockLogout
            });
            
            // Render component
            render(<AdminPortal />);
            
            // Switch to form view
            const addButton = screen.getByText('Add New');
            fireEvent.click(addButton);
            
            // Verify form is shown
            expect(screen.getByTestId('product-form')).toBeInTheDocument();
            
            // Click cancel button
            const cancelButton = screen.getByText('Cancel');
            fireEvent.click(cancelButton);
            
            // Verify table view shown (history.back should be called)
            expect(window.history.back).toHaveBeenCalledTimes(1);
        });
    });


    describe('Edge Cases', () => {
        
        // Test: Should set view to table on successful login
        it('should set view to table on successful login', () => {
            // Mock useAuth to return not authenticated initially
            const { rerender } = render(<AdminPortal />);
            
            useAuth.mockReturnValue({
                isAuthenticated: false,
                isLoading: false,
                login: mockLogin,
                logout: mockLogout
            });
            
            rerender(<AdminPortal />);
            
            // Check AdminLogin is shown
            expect(screen.getByTestId('admin-login')).toBeInTheDocument();
            
            // Click mock login button (triggers handleLoginSuccess)
            const loginButton = screen.getByText('Mock Login');
            fireEvent.click(loginButton);
            
            // Mock authenticated state after login
            useAuth.mockReturnValue({
                isAuthenticated: true,
                isLoading: false,
                login: mockLogin,
                logout: mockLogout
            });
            
            rerender(<AdminPortal />);
            
            // Verify table view is shown
            expect(screen.getByTestId('product-list')).toBeInTheDocument();
        });
    });
});