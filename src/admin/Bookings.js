import React, { useState, useEffect } from 'react'
import { FaRupeeSign, FaCut } from "react-icons/fa";   // from Font Awesome
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../front/components/Header'
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const Bookings = () => {
    const { id } = useParams();
    const [bookings, setBookings] = useState([]);
    const today = new Date().toISOString().split("T")[0];
    const currentTime = new Date().toTimeString().slice(0, 5); // "HH:MM"
   
    useEffect(() => {
        const getBookings = async () => {
            const response = await axios.get(`${baseURL}/booking/bookings.php?`);
            setBookings([...bookings, response.data.data]);
        }
        getBookings();
    }, [id]);

    const cancelBooking = (id) => {
        setBookings(bookings.filter((b) => b.id !== id));
    };
    return (
        <div className='booking'>
            {/* Manage Bookings */}
            <div className="manage-section">
                <h3>Your Bookings</h3>
                {!bookings || bookings.length === 0 ? (
                    <p>No appointments booked yet.</p>
                ) : (
                    <div className="bookings-list">
                        {bookings[0].map((b) => (
                            <div key={b.id} className="booking-card">
                                <p><strong>Service :</strong> {b.service}</p>
                                <h4>{b.barber}</h4>
                                <p>
                                    {b.date} at {b.time}
                                </p>
                                <div className='row'>
                                    <button onClick={() => cancelBooking(b.id)}>Accept</button>
                                    <button className="danger" onClick={() => cancelBooking(b.id)}>Cancel</button>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Bookings
