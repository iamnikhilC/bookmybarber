import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import TextLogo from '../../images/white-logo.png'; // ✅ import image

const Hero = () => {
    const controls = useAnimation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        controls.start({
            scale: scrolled ? 0.280 : 1,
            opacity: scrolled ? 0.9 : 1,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        });
    }, [scrolled, controls]);
    return (
        <section className="hero">
            <header className={`header`}>
                <div className="logo"></div>
                {/* <img src={TextLogo} alt="MyBarber Logo" className="logo" /> */}
                <div className="links">
                    <Link to="/">Home</Link>
                    <Link to="/login" className="bg-red-500 text-white px-4 py-2 rounded">Login</Link>
                    <Link to="/register" className="bg-red-500 text-white px-4 py-2 rounded">Register</Link>
                    <Link to="/barber-register" className="bg-red-500 text-white px-4 py-2 rounded">Barber Register</Link>
                </div>
                <div class="menu-icon" onclick="toggleMenu()">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            </header>
            <div className="hero-content">
                <motion.div className={`logo-container ${scrolled ? "scrolled" : ""}`} animate={controls}>
                    <img src={TextLogo} alt="MyBarber Hero Logo" className={`logo ${scrolled ? "scrolled" : ""}`} />
                </motion.div>
                <h2>Book Your Perfect Haircut in Minutes</h2>
                <p>Find top barbers near you & schedule instantly.</p>
                <button>Book Now</button>
            </div>

            {/* <div className="hero-image">
                <img src="images/man-barber.png" alt="Barber Hero" />
            </div> */}
        </section>

    )
}

export default Hero;