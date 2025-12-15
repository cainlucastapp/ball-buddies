// src/pages/NotFound.jsx
import { Link } from "react-router-dom"
import "../styles/pages/NotFound.css"

const NotFound = () => {
    return (
        <div className="notfound-container">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>Oops! Looks like this buddy got lost.</p>
            <Link to="/">Go back home</Link>
        </div>
    )
}

export default NotFound