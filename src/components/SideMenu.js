import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcMultipleDevices, FcManager } from "react-icons/fc";
import Logo from "../images/logo.png";

const SideMenu = () => {
    const [sidebar, setSidebar] = useState(false);

    const toggleSidebar = () => {
        setSidebar(prev => !prev);
    };

    const closeSidebar = () => {
        setSidebar(false);
    };

    return (
        <>
            <div className={`sidebar ${sidebar ? "open" : ""}`}>
                <div className="sidebar-logo">
                    <img className="logo" src={Logo} alt="logo" />
                </div>

                <ul className="sidebar-menu">
                    <li className="menu-item">
                        <FcMultipleDevices className="icon" />
                        <Link className="item-link" to="/admin" onClick={closeSidebar}>
                            Dashboard
                        </Link>
                    </li>
                    <li className="menu-item">
                        <FcManager className="icon" />
                        <Link className="item-link" to="/admin/barbers" onClick={closeSidebar}>
                            Barbers
                        </Link>
                    </li>
                    <li className="menu-item">
                        <FcManager className="icon" />
                        <Link className="item-link" to="/admin/services" onClick={closeSidebar}>
                            Services
                        </Link>
                    </li>
                    <li className="menu-item">
                        <FcManager className="icon" />
                        <Link className="item-link" to="/admin/customers" onClick={closeSidebar}>
                            Customers
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Mobile hamburger */}
            <div className="sidebar-menu-icon" onClick={toggleSidebar}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* Backdrop (mobile only) */}
            {sidebar && <div className="sidebar-backdrop" onClick={closeSidebar}></div>}
        </>
    );
};

export default SideMenu;
