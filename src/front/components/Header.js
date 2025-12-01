import React from "react";
import { Link } from "react-router-dom";
import Logo from '../../images/logo.png'; // ✅ import image

const Header = () => {
    return (

        <header className="common header">
            <img className="logo" alt="logo" src={Logo}/>

            <div className="links">
                <Link to="/">Home</Link>

                <Link to="/login" className="bg-red-500 text-white px-4 py-2 rounded">Login</Link>
                <Link to="/register" className="bg-red-500 text-white px-4 py-2 rounded">Register</Link>
                <Link to="/barber-register" className="bg-red-500 text-white px-4 py-2 rounded">Barber Register</Link>
            </div>

        </header>

    )
}

export default Header;