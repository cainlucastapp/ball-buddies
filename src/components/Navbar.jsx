// src/components/Navbar.jsx

// Dependancies
import { NavLink } from "react-router-dom"
import "../styles/components/Navbar.css"

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-brand">
                <h1>Ball Buddies</h1>
            </div>
            <ul className="nav-links">
                <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
                <li><NavLink to="/shop" className={({ isActive }) => isActive ? "active" : ""}>Shop</NavLink></li>
                <li><NavLink to="/admin" className={({ isActive }) => isActive ? "active" : ""}>Admin Portal</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar