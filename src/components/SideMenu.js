import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcMultipleDevices, FcManager, FcServices, FcViewDetails, FcRedo } from "react-icons/fc";
import { TbCreditCardPay } from "react-icons/tb";
import Logo from "../images/logo.png";
import { useAuth } from "../Context/AuthUser";
const SideMenu = () => {
    const { user, avatar } = useAuth();
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
                <div className="sidebar-profile">
                    <Link to="/admin/profile" onClick={closeSidebar}>
                        <img className="logo" src={avatar} alt="logo" style={{ height: '40px' }} />
                        <p><strong>{user?.name}</strong></p>
                    </Link>
                </div>
                <ul className="sidebar-menu">
                    <li className="menu-item">
                        <FcMultipleDevices className="icon" />
                        <Link className="item-link" to="/admin" onClick={closeSidebar}>
                            Dashboard
                        </Link>
                    </li>

                    {user?.role === "admin" && (
                        <li className="menu-item">
                            <FcManager className="icon" />
                            <Link className="item-link" to="/admin/barbers" onClick={closeSidebar}>
                                Barbers
                            </Link>
                        </li>
                    )}
                    {user?.role === "admin" || user?.role === "barber" && (
                        <li className="menu-item">
                            <FcServices className="icon" />
                            <Link className="item-link" to="/admin/services" onClick={closeSidebar}>
                                Services
                            </Link>
                        </li>
                    )}

                    {user?.role === "admin" && (
                        <li className="menu-item">
                            <FcManager className="icon" />
                            <Link className="item-link" to="/admin/customers" onClick={closeSidebar}>
                                Customers
                            </Link>
                        </li>
                    )}

                    {/* {user?.role === "admin" || user?.role === "barber" && ( */}
                    <li className="menu-item">
                        <FcViewDetails className="icon" />
                        <Link className="item-link" to="/bookings" onClick={closeSidebar}>
                            Bookings
                        </Link>
                    </li>
                    {/* )} */}
                    {user?.role === "admin" || user?.role === "customer" && (
                        <li className="menu-item">
                            <FcViewDetails className="icon" />
                            <Link className="item-link" to="/view-barbers" onClick={closeSidebar}>
                                All Barbers
                            </Link>
                        </li>
                    )}
                    {user?.role === "admin" || user?.role === "barber" && (

                        <li className="menu-item">
                            <TbCreditCardPay className="icon" />
                            <Link className="item-link" to="/bookings/" onClick={closeSidebar}>
                                Payments
                            </Link>
                        </li>
                    )}

                    <li className="menu-item">
                        <FcRedo className="icon" />
                        <Link className="item-link" to="/logout" onClick={closeSidebar}>
                            Logout
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
