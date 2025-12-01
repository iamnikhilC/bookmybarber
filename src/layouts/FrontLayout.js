import React from "react";
import Header from "../front/components/Header";
import Footer from "../front/components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

const FrontLayout = () => {
    return (
        <div className="font-roboto">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Dynamic Content Goes Here */}
            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}
export default FrontLayout;