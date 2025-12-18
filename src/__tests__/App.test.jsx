// src/__tests__/App.test.jsx

// Dependencies
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import AdminPortal from '../pages/AdminPortal'
import NotFound from '../pages/NotFound'

// Mock all page components
vi.mock('../pages/Home', () => ({
    default: () => <div data-testid="home-page">Home Page</div>
}))

vi.mock('../pages/Shop', () => ({
    default: () => <div data-testid="shop-page">Shop Page</div>
}))

vi.mock('../pages/AdminPortal', () => ({
    default: () => <div data-testid="admin-portal-page">Admin Portal Page</div>
}))

vi.mock('../pages/NotFound', () => ({
    default: () => <div data-testid="not-found-page">Not Found Page</div>
}))

// Mock Header and Footer components
vi.mock('../components/Header', () => ({
    default: () => <div data-testid="header">Header</div>
}))

vi.mock('../components/Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>
}))

// Helper to render App routes with specific route
const renderWithRoute = (route) => {
    return render(
        <MemoryRouter initialEntries={[route]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Header />
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/admin" element={<AdminPortal />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
        </MemoryRouter>
    )
}

describe('App', () => {
    
    describe('Base Tests', () => {
        
        // Test: Should render Header and Footer on all routes
        it('should render Header and Footer on all routes', () => {
            // Test on home route
            const { unmount: unmount1 } = renderWithRoute('/');
            expect(screen.getByTestId('header')).toBeInTheDocument();
            expect(screen.getByTestId('footer')).toBeInTheDocument();
            unmount1();
            
            // Test on shop route
            const { unmount: unmount2 } = renderWithRoute('/shop');
            expect(screen.getByTestId('header')).toBeInTheDocument();
            expect(screen.getByTestId('footer')).toBeInTheDocument();
            unmount2();
            
            // Test on admin route
            renderWithRoute('/admin');
            expect(screen.getByTestId('header')).toBeInTheDocument();
            expect(screen.getByTestId('footer')).toBeInTheDocument();
        });


        // Test: Should render Home component at "/" route
        it('should render Home component at "/" route', () => {
            // Navigate to "/"
            renderWithRoute('/');
            
            // Check Home component renders
            expect(screen.getByTestId('home-page')).toBeInTheDocument();
        });


        // Test: Should render Shop component at "/shop" route
        it('should render Shop component at "/shop" route', () => {
            // Navigate to "/shop"
            renderWithRoute('/shop');
            
            // Check Shop component renders
            expect(screen.getByTestId('shop-page')).toBeInTheDocument();
        });


        // Test: Should render AdminPortal component at "/admin" route
        it('should render AdminPortal component at "/admin" route', () => {
            // Navigate to "/admin"
            renderWithRoute('/admin');
            
            // Check AdminPortal component renders
            expect(screen.getByTestId('admin-portal-page')).toBeInTheDocument();
        });


        // Test: Should render NotFound component for unknown routes
        it('should render NotFound component for unknown routes', () => {
            // Navigate to unknown route
            const { unmount: unmount1 } = renderWithRoute('/unknown-route');
            
            // Check NotFound component renders
            expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
            unmount1();
        });
    });
});