// src/pages/NotFound.jsx

// Dependencies
import { Link } from "react-router-dom"
import "../styles/pages/NotFound.css"

const NotFound = () => {
    return (
        <div className="notfound-container">
            <img src="/images/missing-buddy-404.png" alt="Missing Buddy - 404 Not Found" className="missing-buddy-image"/>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>Oops! Looks like this buddy got lost.</p>
        </div>
    )
}

export default NotFound