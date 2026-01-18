import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import BackButton from '../front/components/BackButton';
import { Icons } from '../front/components/Icons';
import { useAuth } from '../Context/AuthUser';
const baseURL = process.env.REACT_APP_API_BASE_URL;

const BookingList = () => {
    const {user} = useAuth();
    const { id } = useParams();
    const [bookings, setBookings] = useState([]);
    
    const getBookings = async (date = "") => {
        const response = await axios.get(`${baseURL}/booking/get-cust-bookings.php?date=${date}`);
        setBookings([...bookings, response.data.data]);
    };
    
    useEffect(() => {
        getBookings();
    }, [id]);

    const cancelBooking = (id) => {
        setBookings(bookings.filter((b) => b.id !== id));
    };
  
    return (
        <div className='booking'>
            <div className='page-header'>
                <Link to="" style={{ fontSize: '20px', color: 'gray' }}><BackButton /></Link>
                <div className='heder'>
                    <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Manage Bookings</h4>
                    <p className="subtitle">Manage your appointments — View available barbers, book, cancel or reschedule.</p>
                </div>
            </div>

            {/* Manage Bookings */}
            <div className="manage-section">
                <h3>Your Bookings</h3>
                {!bookings || bookings.length === 0 ? (
                    <p>No appointments booked yet.</p>
                ) : (
                    <div className="bookings-list">
                        {bookings[0].map((b) => (
                            <div key={b.id} className=" card">
                                <p><Icons.Service className="icon"/> <strong>{b.services}</strong></p>
                                <p><Icons.Calendar className="icon" />{b.date}</p>
                                <p><Icons.Watch className="icon" />{b.time}</p>
                                <p><Icons.Wallet className="icon"/>₹ {b.price.toFixed(2)}</p>
                                <p></p>
                                <button onClick={() => cancelBooking(b.id)}>Cancel</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookingList
