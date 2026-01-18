import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import BackButton from '../../front/components/BackButton';
import axios from 'axios';
import { Icons } from '../../front/components/Icons';
import { toast } from "react-toastify";
import { useAuth } from '../../Context/AuthUser';
const baseURL = process.env.REACT_APP_API_BASE_URL;

const Bookings = () => {
    const { id } = useParams();
    const {user} = useAuth();
    const [bookings, setBookings] = useState([]);
    const today = new Date().toISOString().split("T")[0];
    const currentTime = new Date().toTimeString().slice(0, 5); // "HH:MM"

    useEffect(() => {
        const getBookings = async () => {
            const response = await axios.get(`${baseURL}/booking/bookings.php?`,
            {
                params: {
                    id: user?.id,
                    role: user?.role
                }
            });
            setBookings([...bookings, response.data.data]);
        }
        getBookings();
    }, [id]);

    const getDayName = (dateString) => {
        const inputDate = new Date(dateString);
        const today = new Date();

        // Normalize dates (remove time)
        inputDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const diffInDays =
            (inputDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

        if (diffInDays === -1) return "Yesterday";
        if (diffInDays === 0) return "Today";
        if (diffInDays === 1) return "Tomorrow";
        return inputDate.toLocaleDateString("en-US", { weekday: "short" });
    };

    const cancelBooking = async (id) => {
        const status = "Cancel";
        const response = await axios.post(
            `${baseURL}/booking/bookings.php?booking_id=${id}`,
            { status },
            { headers: { "Content-Type": "application/json" } }
        );
        if (response.data.status === 'success') {
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    };
    return (
        <div className='booking'>
            {/* Manage Bookings */}
            <div className="manage-section">
                <div className='page-header'>
                    <Link to="" style={{ fontSize: '20px', color: 'gray' }}><BackButton /></Link>
                    <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Bookings</h4>
                </div>
                {!bookings || bookings.length === 0 ? (
                    <p>No appointments booked yet.</p>
                ) : (
                    <div className="bookings-list">
                        {bookings[0].map((b) => (
                            <div key={b.id} className={`booking-card ${b.status === 'Cancel' ? 'cancel' : ''}`}>
                                <h3 className='capitalize-first'>{b.service}</h3>
                                <p><span className='icon'><Icons.User /></span>{b.name}</p>
                                <p><span className='icon'><Icons.Calendar /></span>{getDayName(b.date)} - {b.date}</p>
                                <p><span className='icon'><Icons.Watch /></span>{b.time}</p>
                                {b.status !== 'Cancel' ? (

                                    <div className='row'>
                                    <button className="danger" onClick={() => cancelBooking(b.id)}>Cancel</button>
                                </div>
                                ):("")}                 
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Bookings
