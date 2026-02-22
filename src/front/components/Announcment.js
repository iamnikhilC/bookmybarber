import React from "react";
import TextLogo from "../../images/bookmybarber-logo.png";
import { Link } from "react-router-dom";

export default function Announcment() {
    return (
        <div className="cs-container">
            {/* Header */}
            <header className="cs-header">
                <h1 className="cs-logo">
                    <img
                        src={TextLogo}
                        alt="BookMyBarberNow Logo"
                        className="logo"
                        style={{ width: "140px", height: "45px" }}
                    />
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

                <p className="cs-subtitle">
                    BookMyBarberNow helps barbers grow their business by listing their
                    services online, managing bookings, and reaching more customers in
                    their city.
                </p>

                <p className="cs-tagline">
                    Find • Book • Style — Anytime, Anywhere 🇮🇳
                </p>

                <p className="cs-subtitle">
                    BookMyBarberNow is an online platform that lets you discover nearby
                    barbers, view reviews, and book appointments instantly — saving time
                    and avoiding long waiting queues.
                </p>

               

                <ul className="cs-offers">
                    <li>1st barber will get lifetime free membership</li>
                    <li>Next 4 barbers will get 1 year free membership</li>
                    {/* <li>If you register now, you will get 75% off</li> */}
                    <li>Get 30 days free</li>
                </ul>
                <p  className="cs-subtitle">
                    Fill in the details below to join our exclusive waiting list and be
                    the first to get exciting offers, early access, and special benefits.
                </p>

                {/* CTA Button */}
                <div className="cs-form">
                    <button>
                        <Link to="https://forms.gle/iemJ7b3EzNq94EVW8">
                            Notify Me on Launch
                        </Link>
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="cs-footer">
                © {new Date().getFullYear()} BookMyBarberNow. All rights reserved.
            </footer>
        </div>
    );
}