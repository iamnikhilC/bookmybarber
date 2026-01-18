import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../Context/AuthUser';
import Logo from "../images/logo.png";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const NavBar = () => {
    const { notification } = useAuth(); // or props / context

    const unreadCount = notification?.filter(
        n => n.is_read === 0
    ).length;
console.log('unreadCount', unreadCount);
    return (
        <div className="navbar">
            <div className="navbar-logo">
                <img className="logo" src={Logo} alt="logo" />
            </div>
            <div className="navbar-right">
                <Link className="navbar-icon" to="/notifications" style={{fontSize:'large'}}>🔔
                
                {unreadCount > 0 && (
                        <span className="badge">
                            {unreadCount}
                        </span>
                    )}</Link>

                {/* <span className="navbar-icon"></span> */}
                {/* <span className="navbar-icon">👤</span> */}
                {/* <Link className="item-link" to="/logout">Logout</Link> */}
            </div>
            
        </div>
    )
}

export default NavBar;