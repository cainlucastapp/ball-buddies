// src/__tests__/components/ProductForm.test.jsx

// Dependencies
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ProductForm from '../../components/ProductForm'

describe('ProductForm', () => {
    
    // Setup and cleanup
    let fetchSpy;
    let alertSpy;
    let consoleErrorSpy;

    beforeEach(() => {
        // Mock fetch
        fetchSpy = vi.spyOn(global, 'fetch');
        
        // Mock alert
        alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
        
        // Mock console.error
        consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        // Restore mocks
        vi.clearAllMocks();
        fetchSpy.mockRestore();
        alertSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    // Mock buddy data
    const mockBuddy = {
        id: "1",
        name: "Soccer Punk",
        sport: "Soccer",
        description: "This soccer ball doesn't play by the rules.",
        price: 24.99,
        image: "/images/soccer-punk.png",
        rarity: "rare",
        inStock: true
    };


    describe('Base Tests', () => {
        
        // Test: Should render form in add mode
        it('should render form in add mode', () => {
            // Mock callbacks
            const mockOnSuccess = vi.fn();
            const mockOnCancel = vi.fn();
            
            // Render component
            render(<ProductForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
            
            // Check form title
            expect(screen.getByText('Add New Buddy')).toBeInTheDocument();
            
            // Check all inputs exist
            expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/sport/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/image url/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/rarity/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/in stock/i)).toBeInTheDocument();
            
            // Check buttons exist
            expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /add buddy/i })).toBeInTheDocument();
        });


        // Test: Should render form in edit mode with pre-filled values
        it('should render form in edit mode with pre-filled values', () => {
            // Mock callbacks
            const mockOnSuccess = vi.fn();
            const mockOnCancel = vi.fn();
            
            // Render component in edit mode
            render(<ProductForm editingBuddy={mockBuddy} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
            
            // Check form title
            expect(screen.getByText('Edit Buddy')).toBeInTheDocument();
            
            // Check all fields are pre-filled
            expect(screen.getByLabelText(/name/i)).toHaveValue('Soccer Punk');
            expect(screen.getByLabelText(/sport/i)).toHaveValue('Soccer');
            expect(screen.getByLabelText(/description/i)).toHaveValue("This soccer ball doesn't play by the rules.");
            expect(screen.getByLabelText(/price/i)).toHaveValue(24.99);
            expect(screen.getByLabelText(/image url/i)).toHaveValue('/images/soccer-punk.png');
            expect(screen.getByLabelText(/rarity/i)).toHaveValue('rare');
            expect(screen.getByLabelText(/in stock/i)).toBeChecked();
            
            // Check button shows update text
            expect(screen.getByRole('button', { name: /update buddy/i })).toBeInTheDocument();
        });


        // Test: Should update form fields when user types
        it('should update form fields when user types', () => {
            // Mock callbacks
            const mockOnSuccess = vi.fn();
            const mockOnCancel = vi.fn();
            
            // Render component
            render(<ProductForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
            
            // Get inputs
            const nameInput = screen.getByLabelText(/name/i);
            const priceInput = screen.getByLabelText(/price/i);
            const stockCheckbox = screen.getByLabelText(/in stock/i);
            
            // Type in inputs
            fireEvent.change(nameInput, { target: { value: 'Test Name' } });
            fireEvent.change(priceInput, { target: { value: '19.99' } });
            fireEvent.click(stockCheckbox);
            
            // Verify values updated
            expect(nameInput).toHaveValue('Test Name');
            expect(priceInput).toHaveValue(19.99);
            expect(stockCheckbox).not.toBeChecked();
        });


        // Test: Should show success message after successful add
        it('should show success message after successful add', async () => {
            // Mock callbacks
            const mockOnSuccess = vi.fn();
            const mockOnCancel = vi.fn();
            
            // Mock successful fetch
            fetchSpy.mockResolvedValue({
                ok: true,
                json: async () => ({ id: 'new-id' })
            });
            
            // Render component
            render(<ProductForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
            
            // Fill all required fields
            fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test Buddy' } });
            fireEvent.change(screen.getByLabelText(/sport/i), { target: { value: 'Basketball' } });
            fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test description' } });
            fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '29.99' } });
            fireEvent.change(screen.getByLabelText(/image url/i), { target: { value: '/images/test.png' } });
            
            // Submit form
            fireEvent.click(screen.getByRole('button', { name: /add buddy/i }));
            
            // Verify success message shown
            await waitFor(() => {
                expect(alertSpy).toHaveBeenCalledWith('Buddy added successfully!');
            });
            
            // Verify onSuccess called
            expect(mockOnSuccess).toHaveBeenCalledTimes(1);
        });


        // Test: Should show success message after successful update
        it('should show success message after successful update', async () => {
            // Mock callbacks
            const mockOnSuccess = vi.fn();
            const mockOnCancel = vi.fn();
            
            // Mock successful fetch
            fetchSpy.mockResolvedValue({
                ok: true,
                json: async () => ({ ...mockBuddy })
            });
            
            // Render component in edit mode
            render(<ProductForm editingBuddy={mockBuddy} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
            
            // Update name field
            fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Updated Name' } });
            
            // Submit form
            fireEvent.click(screen.getByRole('button', { name: /update buddy/i }));
            
            // Verify success message shown
            await waitFor(() => {
                expect(alertSpy).toHaveBeenCalledWith('Buddy updated successfully!');
            });
            
            // Verify onSuccess called
            expect(mockOnSuccess).toHaveBeenCalledTimes(1);
        });
    });


    describe('Validation', () => {
        
        // Test: Should show validation errors when submitting empty form
        it('should show validation errors when submitting empty form', async () => {
            // Mock callbacks
            const mockOnSuccess = vi.fn();
            const mockOnCancel = vi.fn();
            
            // Render component
            render(<ProductForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
            
            // Submit empty form
            fireEvent.click(screen.getByRole('button', { name: /add buddy/i }));
            
            // Wait for validation errors
            await waitFor(() => {
                expect(screen.getByText('Name is required')).toBeInTheDocument();
            });
            
            // Check all validation errors
            expect(screen.getByText('Name is required')).toBeInTheDocument();
            expect(screen.getByText('Sport is required')).toBeInTheDocument();
            expect(screen.getByText('Description is required')).toBeInTheDocument();
            expect(screen.getByText('Image URL is required')).toBeInTheDocument();
            expect(screen.getByText('Price must be greater than 0')).toBeInTheDocument();
            
            // Verify fetch not called
            expect(fetchSpy).not.toHaveBeenCalled();
            expect(mockOnSuccess).not.toHaveBeenCalled();
        });


        // Test: Should clear validation error when user types in field
        it('should clear validation error when user types in field', async () => {
            // Mock callbacks
            const mockOnSuccess = vi.fn();
            const mockOnCancel = vi.fn();
            
            // Render component
            render(<ProductForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
            
            // Submit empty form to trigger errors
            fireEvent.click(screen.getByRole('button', { name: /add buddy/i }));
            
            // Wait for validation errors
            await waitFor(() => {
                expect(screen.getByText('Name is required')).toBeInTheDocument();
            });
            
            // Verify name error exists
            expect(screen.getByText('Name is required')).toBeInTheDocument();
            
            // Type in name field
            fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test' } });
            
            // Verify name error cleared
            expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
            
            // Other errors should still exist
            expect(screen.getByText('Sport is required')).toBeInTheDocument();
        });
    });


    describe('Error Handling', () => {
        
        // Test: Should show error message when API call fails
        it('should show error message when API call fails', async () => {
            // Mock callbacks
            const mockOnSuccess = vi.fn();
            const mockOnCancel = vi.fn();
            
            // Mock failed fetch
            fetchSpy.mockResolvedValue({
                ok: false,
                status: 500
            });
            
            // Render component
            render(<ProductForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
            
            // Fill all required fields
            fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test Buddy' } });
            fireEvent.change(screen.getByLabelText(/sport/i), { target: { value: 'Basketball' } });
            fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test description' } });
            fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '29.99' } });
            fireEvent.change(screen.getByLabelText(/image url/i), { target: { value: '/images/test.png' } });
            
            // Submit form
            fireEvent.click(screen.getByRole('button', { name: /add buddy/i }));
            
            // Verify error message shown
            await waitFor(() => {
                expect(alertSpy).toHaveBeenCalledWith('Failed to add buddy. Please try again.');
            });
            
            // Verify onSuccess NOT called
            expect(mockOnSuccess).not.toHaveBeenCalled();
        });


        // Test: Should disable submit button while submitting
        it('should disable submit button while submitting', async () => {
            // Mock callbacks
            const mockOnSuccess = vi.fn();
            const mockOnCancel = vi.fn();
            
            // Mock slow fetch
            fetchSpy.mockImplementation(() => 
                new Promise(resolve => setTimeout(() => resolve({
                    ok: true,
                    json: async () => ({ id: 'new-id' })
                }), 100))
            );
            
            // Render component
            render(<ProductForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
            
            // Fill all required fields
            fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test Buddy' } });
            fireEvent.change(screen.getByLabelText(/sport/i), { target: { value: 'Basketball' } });
            fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test description' } });
            fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '29.99' } });
            fireEvent.change(screen.getByLabelText(/image url/i), { target: { value: '/images/test.png' } });
            
            // Get submit button
            const submitButton = screen.getByRole('button', { name: /add buddy/i });
            
            // Submit form
            fireEvent.click(submitButton);
            
            // Verify button disabled and shows loading text
            await waitFor(() => {
                expect(submitButton).toBeDisabled();
                expect(screen.getByRole('button', { name: /saving/i })).toBeInTheDocument();
            });
            
            // Wait for completion
            await waitFor(() => {
                expect(mockOnSuccess).toHaveBeenCalled();
            });
        });
    });
});