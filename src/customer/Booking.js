import React, { useState, useEffect } from 'react'
import { FaRupeeSign, FaCut } from "react-icons/fa";   // from Font Awesome
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../front/components/Header'

const baseURL = process.env.REACT_APP_API_BASE_URL;

const Booking = () => {
    const { id } = useParams();
    const [selectedservice, setSelectedService] = useState(null);
    const [barber, setBarber] = useState([]);
    const [services, setServices] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [form, setForm] = useState({ date: "", time: "", service: "" });

    useEffect(() => {
        const getBarberDetails = async () => {
            try {
                const response = await axios.get(`${baseURL}/service/services.php?id=${id}`);
                console.log("✅ API response:", response.data.data);
                setServices(response.data.data.services);
                setBarber(response.data.data.barber);
            } catch (error) {
            }
        };

        getBarberDetails();
    }, [id]);

    const handleBook = () => {
        if (!selectedservice || !form.date || !form.time || !form.service) {
            alert("Please fill all booking details!");
            return;
        }
        const newBooking = {
            id: Date.now(),
            barber: selectedservice.name,
            date: form.date,
            time: form.time,
            service: form.service,
        };
        setBookings([...bookings, newBooking]);
        setSelectedService(null);
        setForm({ date: "", time: "", service: "" });
    };

    const cancelBooking = (id) => {
        setBookings(bookings.filter((b) => b.id !== id));
    };

    return (
        <div className='booking'>
            <h2 className="title"> Booking Management</h2>
            <p className="subtitle">Manage your appointments — View available barbers, book, cancel or reschedule.</p>
            <div className="barber-section">
                <h3>{barber.shop_name}</h3>
                <h5>{barber.user_name}</h5>
                <p><strong>Address:</strong> {barber.address}</p>
                <p><strong>Experience:</strong> {barber.experience} Year's</p>
                <p><strong>Specialties:</strong> {barber.specialization}</p>
                <p><strong>Available Slots:</strong> {barber.availableSlots}</p>
            </div>

            <div className='services'>
                {services.map((service) => (
                    <div className='card'>
                        <div className='card-header'>{service.service}</div>
                        <div className='card-body'>
                            <p>{service.description}</p>
                            <div className='price'><FaRupeeSign /> <strong>{service.price.toFixed(2)}</strong> </div>
                        </div>
                        <button onClick={() => setSelectedService(service)}>Book Now</button>
                    </div>
                ))}

            </div>

            {/* Booking Form */}
            {selectedservice && (
                <div className="booking-form">
                    <h3>Book Appointment with {selectedservice.name}</h3>
                    <div className="form-grid">
                        <input
                            type="date"
                            value={form.date}
                            onChange={(e) => setForm({ ...form, date: e.target.value })}
                        />
                        <select
                            value={form.time}
                            onChange={(e) => setForm({ ...form, time: e.target.value })}
                        >
                            <option value="">Select Time</option>
                            {/* {selectedservice.availableSlots.map((slot, i) => (
                                <option key={i} value={slot}>
                                    {slot}
                                </option>
                            ))} */}
                        </select>
                        <input
                            type="text"
                            placeholder="Service (e.g. Beard Trim)"
                            value={form.service}
                            onChange={(e) => setForm({ ...form, service: e.target.value })}
                        />
                        <button onClick={handleBook}>Book Now</button>
                    </div>
                </div>
            )}

            {/* Manage Bookings
            <div className="manage-section">
                <h3>Your Bookings</h3>
                {!bookings || bookings.length === 0 ? (
                    <p>No appointments booked yet.</p>
                ) : (
                    <div className="bookings-list">
                        {bookings.map((b) => (
                            <div key={b.id} className="booking-card">
                                <h4>{b.barber}</h4>
                                <p>
                                    {b.date} at {b.time}
                                </p>
                                <p>Service: {b.service}</p>
                                <button onClick={() => cancelBooking(b.id)}>Cancel</button>
                            </div>
                        ))}
                    </div>
                )}
            </div> */}
        </div>
    );
}

export default Booking
