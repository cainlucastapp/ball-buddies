// src/components/Header.jsx

// Dependencies
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/components/Header.css";

const Header = () => {
    return (
        <header className="site-header">
            <div className="header-left">
                <Link to="/" className="logo-link">
                    <img src="/images/ball-buddies-header-logo.png" alt="Ball Buddies" />
                </Link>
                <p className="header-tagline">Where Every Ball Has Attitude!</p>
            </div>
            <Navbar />
        </header>
    );
};

export default Header;