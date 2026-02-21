import React from "react";
import TextLogo from '../images/bookmybarber-logo.png'; // ✅ import image
import { Link } from "react-router-dom";

export default function Announcment() {
    return (
        <div className="cs-container">
            {/* Header */}
            <header className="cs-header">
                <h1 className="cs-logo">
                <img src={TextLogo} alt="MyBarber Hero Logo" className={`logo`} style={{width: "140px", height: '45px'}} />

                    {/* <span>Book</span>MyBarberNow */}
                </h1>
                <div className="cs-social">
                    <a href="#">Instagram</a>
                    <a href="#">Facebook</a>
                </div>
            </header>

            {/* Hero Section */}
            <main className="cs-hero">
            <p className="cs-subtitle">
                    India’s Smart Barber Booking Platform is Launching Soon!
                </p>
                <h2 className="cs-title">
                    Book Your Favorite Barber in Seconds ✂️
                </h2>

                
                <p className="cs-subtitle">BookMyBarberNow helps barbers grow their business by listing their services online, managing bookings, and reaching more customers in their city.</p>
                <p className="cs-tagline">
                    Find • Book • Style — Anytime, Anywhere 🇮🇳
                </p>
                <p className="cs-subtitle">
                BookMyBarberNow is an online platform that lets you discover nearby barbers, view reviews, and book appointments instantly — saving time and avoiding long waiting queues.
                </p>

                {/* Email Form */}
                <div className="cs-form">
                    {/* <input
                        type="email"
                        placeholder="Enter your email for early access"
                    /> */}
                    <button><Link to="https://forms.gle/iemJ7b3EzNq94EVW8">Notify Me on Launch</Link></button>
                </div>

                {/* Secondary Links */}
                {/* <div className="cs-links">
                    <a href="#">Join as Customer</a>
                    <a href="#">Join as Barber</a>
                </div> */}
            </main>

            {/* Footer */}
            <footer className="cs-footer">
                © {new Date().getFullYear()} BookMyBarberNow. All rights reserved.
            </footer>
        </div>
    );
}