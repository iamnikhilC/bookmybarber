import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import TextLogo from '../../images/white-logo.png'; // ✅ import image

const content = [
    {
        h2: "Book Your Perfect Barber in Minutes.",
        p: "bookmybarber.com connects customers with trusted barbers."
    },
    {
        h2: "Grow Your Salon.",
        p: "Grow your business and earn more."
    }
];

const Hero = () => {
    const controls = useAnimation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // show FIRST text immediately
    const [index, setIndex] = useState(0);
    const [headingText, setHeadingText] = useState(content[0].h2);
    const [paragraphText, setParagraphText] = useState(content[0].p);

    const [charIndex, setCharIndex] = useState(0);
    const [mode, setMode] = useState("idle");
    // idle → deleting → typing

    useEffect(() => {
        // start animation AFTER page load delay
        const startTimer = setTimeout(() => {
            setMode("deleting");
            setCharIndex(content[index].h2.length);
        }, 4000); // delay before first backspace

        return () => clearTimeout(startTimer);
    }, []);

    useEffect(() => {
        if (mode === "idle") return;

        const current = content[index];
        const nextIndex = (index + 1) % content.length;
        const next = content[nextIndex];

        const timer = setTimeout(() => {
            if (mode === "deleting") {
                if (charIndex > 0) {
                    setHeadingText(current.h2.slice(0, charIndex - 1));
                    setParagraphText(current.p.slice(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                } else {
                    setMode("typing");
                    setIndex(nextIndex);
                    setCharIndex(0);
                }
            }

            if (mode === "typing") {
                if (charIndex < next.h2.length || charIndex < next.p.length) {
                    setHeadingText(next.h2.slice(0, charIndex + 1));
                    setParagraphText(next.p.slice(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                } else {
                    // pause before deleting again
                    setTimeout(() => {
                        setMode("deleting");
                        setCharIndex(next.h2.length);
                    }, 2000);
                }
            }
        }, mode === "deleting" ? 40 : 70);

        return () => clearTimeout(timer);
    }, [charIndex, mode, index]);

    const toggleMenu = () => {
        console.log('inside toggel');
        setMenuOpen(!menuOpen);
    };

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
                <div className={`logo`}></div>
                {/* <img src={TextLogo} alt="MyBarber Logo" className="logo" /> */}
                <div className={`links ${menuOpen ? 'show' : ''}`}>
                    <Link to="/">Home</Link>
                    <Link to="/login" className="bg-red-500 text-white px-4 py-2 rounded">Login</Link>
                    <Link to="/register" className="bg-red-500 text-white px-4 py-2 rounded">Register</Link>
                    <Link to="/barber-register" className="bg-red-500 text-white px-4 py-2 rounded">Barber Register</Link>
                    <Link to="/conatct" className="bg-red-500 text-white px-4 py-2 rounded">Contact us</Link>
                </div>
                <div className={`menu-icon ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            </header>

            <motion.div className={`logo-container ${scrolled ? "scrolled" : ""}`} animate={controls} style={{
    zIndex: menuOpen ? 0 : 5,
    transition: "z-index 0.3s"
  }}>
                <img src={TextLogo} alt="MyBarber Hero Logo" className={`logo ${scrolled ? "scrolled" : ""}`} />
            </motion.div>
            <div className="hero-content">

                <h2 className="typewriter">{headingText}</h2>
                <p className="typewriter">{paragraphText}</p>

                <div>

                <button style={{marginRight: '20px'}}>Book Now</button>
                <button>Join as Barber</button>
                </div>
            </div>

            {/* <div className="hero-image">
                <img src="images/man-barber.png" alt="Barber Hero" />
            </div> */}
        </section>

    )
}

export default Hero;