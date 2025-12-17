// src/pages/Home.jsx
import { Link } from "react-router-dom"
import "../styles/pages/Home.css"

const Home = () => {
    return (
        <div className="home-container">
            <section className="hero">
                <img  src="/images/ball-buddies-logo.png"  alt="Ball Buddies Logo" className="hero-logo"/>
                <h1>Welcome to Ball Buddies!</h1>
                <p className="tagline">Where Every Ball Has Personality (and Attitude)</p>
                <p className="description">
                    From Foot Brawler's fists to Puck Norris's roundhouse kicks, 
                    these aren't your average sports balls. They've got character, 
                    they've got style, and they're ready to roll.
                </p>
                <Link to="/shop" className="cta-button">
                    Meet the Crew
                </Link>
            </section>

            <section className="features">
                <div className="feature">
                    <h3>Unique Personalities</h3>
                    <p>Each buddy comes with attitude, style, and a whole lot of sass.</p>
                </div>
                <div className="feature">
                    <h3>Legendary Rarities</h3>
                    <p>From common to legendary - collect them all if you dare.</p>
                </div>
                <div className="feature">
                    <h3>Battle-Ready</h3>
                    <p>These balls don't just play sports. They dominate them.</p>
                </div>
            </section>
        </div>
    )
}

export default Home