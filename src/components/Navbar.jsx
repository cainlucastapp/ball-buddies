// src/components/Navbar.jsx

// Dependencies
import { NavLink } from "react-router-dom"
import "../styles/components/Navbar.css"

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/shop">Shop</NavLink></li>
                <li><NavLink to="/admin">Admin</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar