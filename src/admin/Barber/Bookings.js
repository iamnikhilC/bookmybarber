import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import BackButton from '../../front/components/BackButton';
import axios from 'axios';
import axiosClient from '../../front/axiosClient';
import { Icons } from '../../front/components/Icons';
import Popup from '../../components/Popup';
import { useAuth } from '../../Context/AuthUser';
import RateBarber from '../Rating/RateBarber';
const baseURL = process.env.REACT_APP_API_BASE_URL;

const Bookings = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const today = new Date().toISOString().split("T")[0];
    const currentTime = new Date().toTimeString().slice(0, 5); // "HH:MM"
    const [alert, setAlert] = useState(null);

    const getBookings = async () => {
        try {
            const response = await axiosClient.get(`/booking/bookings.php`,
                {
                    params: {
                        id: user?.id,
                    }
                }
            );
            setBookings([...bookings, response.data.data]);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (user?.id) {
            getBookings();
        }
    }, [user?.id, user?.role]);

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
    const isFutureBooking = (date, time) => {
        const bookingDateTime = new Date(`${date}T${time}`);
        return bookingDateTime >= new Date();
    };

    const cancelBooking = async (id) => {
        const status = "Cancel";
        const response = await axios.post(
            `${baseURL}/booking/bookings.php?booking_id=${id}`,
            { status },
            { headers: { "Content-Type": "application/json" } }
        );
        if (response.data.status === 'success') {
            setAlert({ type: "success", message: response.data.message });
        } else {
            setAlert({ type: "error", message: response.data.message });
        }
    };

    const statusColors = {
        completed: 'green',
        pending: 'orange',
        Cancel: 'red',
        confirmed: '#F6A421'
      };

      const statusBgColors = {
        completed: '#00800030',
        pending: 'orange',
        Cancel: '#ff000036',
        confirmed: '#f6a42177'
      };
    return (
        <div className='booking'>
            {alert && (
                <Popup type={alert.type} message={alert.message} />
            )}
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
                            <div key={b.id} className={`booking-card ${b.status === 'Cancel' ? 'cancel' : ''} ${b.status === 'completed' ? 'complete' : ''}`}>
                                <h3 className='capitalize-first booking-card-head'>
                                    <span>{b.services}</span>
                                    <span className='status'
                                        style={{
                                            fontSize: '10px',
                                            color: statusColors[b.status] || 'gray',
                                            padding: '5px', 
                                            backgroundColor: statusBgColors[b.status],
                                            borderRadius: '5px',
                                        }}
                                    >
                                        {b.status}
                                    </span>

                                </h3>
                                <p><span className='icon'><Icons.User /></span>{b.name}</p>
                                <p><span className='icon'><Icons.Calendar /></span>{getDayName(b.date)} - {b.date}</p>
                                <p><span className='icon'><Icons.Watch /></span>{b.time}</p>

                                {!['Cancel', 'completed'].includes(b.status) && isFutureBooking(b.date, b.time) && (
                                    <div className="row">
                                        <button className="danger" onClick={() => cancelBooking(b.id)}>Cancel</button>
                                    </div>
                                )}

                                {b.status === "completed" && !b.is_rated && user?.role === "customer" && (
                                    <RateBarber
                                        barberId={b.barber_id}
                                        bookingId={b.id}
                                        onSuccess={getBookings}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Bookings
