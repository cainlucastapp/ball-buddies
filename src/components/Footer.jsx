// src/components/Footer.jsx

// Dependencies
import "../styles/components/Footer.css";

const Footer = () => {
    return (
        <footer className="site-footer">
            <p>&copy; {new Date().getFullYear()} Ball Buddies. All rights reserved.</p>
        </footer>
    );
};

export default Footer;