// src/components/Navbar.jsx
import { Link } from "react-router-dom"
import "../styles/components/Navbar.css"

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-brand">
                <h1>Ball Buddies</h1>
            </div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/admin">Admin Portal</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar