import React from "react";
import { Link } from "react-router-dom";
import { FcMultipleDevices, FcDisplay } from "react-icons/fc";
import { FcManager } from "react-icons/fc";
import Logo from "../images/logo.png"

const SideMenu = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <img className="logo" src={Logo} alt={"logo"} />
            </div>
            <ul className="sidebar-menu">
                <li className="menu-item">
                    <FcMultipleDevices className="icon" />
                    <Link className="item-link" to="/admin">Dashboard</Link>
                </li>
                <li className="menu-item">
                    <FcManager className="icon" />
                    <Link className="item-link" to="/admin/barbers">Barbers</Link>
                </li>
                <li className="menu-item">
                    <FcManager className="icon" />
                    <Link className="item-link" to="/admin/services">Services</Link>
                </li>
                <li className="menu-item">
                    <FcManager className="icon" />
                    <Link className="item-link" to="/admin/customers">Customer</Link>
                </li>
            </ul>

        </div>
    )
}

export default SideMenu;