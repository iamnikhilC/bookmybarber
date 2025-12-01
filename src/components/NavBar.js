import React from "react";
import { Link } from "react-router-dom";
import { FcMultipleDevices, FcDisplay } from "react-icons/fc";
import { CiUser } from "react-icons/ci";

const NavBar = () => {
    return (
        <div className="navbar">
            <h2 className="navbar-title">Dashboard</h2>
            <div className="navbar-right">
                <span className="navbar-icon">🔔</span>
                <span className="navbar-icon">👤</span>
                <Link className="item-link" to="/logout">Logout</Link>
            </div>
        </div>
    )
}

export default NavBar;