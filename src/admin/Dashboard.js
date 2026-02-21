import { React, useState, useEffect, } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthUser";
import newBooking from '../images/new-booking.png'; // ✅ import image
import axiosClient from "../front/axiosClient";
import { Icons } from "../front/components/Icons";
import { FaRupeeSign } from "react-icons/fa";
import { MdMoney } from "react-icons/md";
const Dashboard = () => {
    const { user } = useAuth();
    const [todaysBooking, setTodaysBooking] = useState(0);
    const [completedBooking, setCompletedBooking] = useState(0);
    const [upcomingBooking, setUpcomingBooking] = useState(0);
    const [todaysEarning, setTodaysEarning] = useState(0);
    const [profileCompition, setprofileCompition] = useState(0);
    useEffect(() => {
        const getTodaysBooking = async () => {
            if (!user?.id) return;

            const response = await axiosClient.get(`/dashboard.php?id=${user.id}`);
            setTodaysBooking(response.data.data.todaysBookingsCount)
            setCompletedBooking(response.data.data.completedBooking)
            setUpcomingBooking(response.data.data.upcomingBooking)
            setTodaysEarning(response.data.data.todaysEarnings)
            setprofileCompition(response.data.data.profileCompletion)
        }
        getTodaysBooking();

    }, [user])


    return (
        <div className="dashbaord">
            <div className="grid">
                <Link to="/admin/profile" style={{ fontSize: "20px", color: "gray" }}>
                    <div className="card">
                        <div className="card-body">
                            <div className="profile-circle" style={{ "--percent": profileCompition }}>
                                <span className="profile-percent" style={{ "--percent": profileCompition }}>{profileCompition}%</span>
                            </div>
                            <p style={{ marginLeft: "80px" }}>Complete your profile to get more bookings and reach more nearby customers.</p>
                        </div>
                    </div>
                </Link>

                <Link to="/bookings" style={{ fontSize: "20px", color: "gray" }}>
                    <div className="card">
                        {!todaysBooking || todaysBooking.length === 0 ? (
                            <p>No bookings scheduled for today yet.</p>
                        ) : (
                            <>
                                <div className="card-body">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: "20px" }}>
                                        <Icons.colorCalendar style={{ fontSize: '24px' }} />
                                        <p><strong>Today's Bookings</strong></p>
                                    </div>
                                    <strong>{todaysBooking}</strong>
                                </div>
                                <div className="card-body">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: "20px" }}>
                                        <p>Completed</p>
                                        <strong>{completedBooking}</strong>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: "20px" }}>
                                        <p>Upcoming</p>
                                        <strong>{upcomingBooking}</strong>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </Link>
                <Link to="/payments" style={{ fontSize: "20px", color: "gray" }}>
                    <div className="card">
                        <div className="card-body">
                            <div style={{ display: 'flex', alignItems: 'center', gap: "20px" }}>
                                <Icons.Wallet style={{ fontSize: '24px' }} />
                                <p>Today’s Earnings</p>
                            </div>
                            <strong>{todaysEarning}</strong>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default Dashboard;