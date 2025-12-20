#  Ball Buddies

A React-based e-commerce platform for collectible character sports balls with unique personalities. 

![Ball Buddies Logo](public/images/ball-buddies-logo.png)

## Project Overview

Ball Buddies has an admin portal and shop interface for managing and displaying collectible sports balls with attitude.

---

## Features

### Customer-Facing (Shop)
- Browse all Ball Buddies with detailed cards
- Search by name, sport, or description
- Filter by stock status (in stock / out of stock)
- Sort by name, sport, price, or rarity
- Responsive grid layout

### Admin Portal
- Secure authentication
- Full CRUD operations:
  - **Create** new buddies
  - **Read** inventory list with search/filter
  - **Update** buddy details and stock status
  - **Delete** buddies with confirmation
- Real-time stock toggle
- Form validation

---

## Tech Stack

**Frontend:**
- React 18.3.1
- React Router DOM 6.26.0
- Vite 5.4.1

**Backend/Data:**
- JSON Server 1.0.0-beta.2

**Testing:**
- Vitest 2.0.5
- React Testing Library 16.0.1
- jsdom 25.0.0

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/ball-buddies.git
cd ball-buddies
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Start the JSON server (in a separate terminal):**
```bash
npm run server
```

5. **Open your browser:**
- Frontend: http://localhost:3000
- JSON Server: http://localhost:4000

---

## Testing

Run the test suite:
```bash
npm test
```

---

## Admin Credentials

**Username:** `admin`  
**Password:** `admin123`

*Note: In production, use proper authentication with hashed passwords and secure backend.*

---

## Future Enhancements

- [ ] Shopping cart functionality
- [ ] User accounts and order history
- [ ] Payment integration
- [ ] Product reviews and ratings
- [ ] Wishlist feature
- [ ] Email notifications
- [ ] Image upload for new products