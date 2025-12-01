import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import SideMenu from "../components/SideMenu";
import NavBar from "../components/NavBar";
const AdminLayout = () => {
    return (
        <div className="admin-container">
            <SideMenu />
            <ToastContainer position="top-right" autoClose={3000} />
            {/* Dynamic Content Goes Here */}
            <main className="main-content">
                <NavBar />
                <div className="main-container">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
export default AdminLayout;