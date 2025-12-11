import React, { useState, useEffect } from 'react'
import { FaRupeeSign, FaCut } from "react-icons/fa";   // from Font Awesome
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../front/components/Header'
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const Booking = () => {
    const { id } = useParams();
    const [barber, setBarber] = useState([]);
    const [services, setServices] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [form, setForm] = useState({ date: "", time: "",srvc: "", price: "", id: "" });
    const today = new Date().toISOString().split("T")[0];
    const currentTime = new Date().toTimeString().slice(0, 5); // "HH:MM"

    const getBarberDetails = async (date = '') => {
        try {
            const response = await axios.get(`${baseURL}/service/services.php?id=${id}&date=${date}`);
            setServices(response.data.data.services);
            setBarber(response.data.data.barber);
        } catch (error) {
        }
    };
    useEffect(() => {
        const getBookings = async () => {
            const response = await axios.get(`${baseURL}/booking/add-booking.php?`);
            setBookings([...bookings, response.data.data]);
        }
        getBookings();
        setForm((prev) => ({ ...prev, date: today }));
        getBarberDetails(today);
    }, [id]);

    const handleBook = async () => {
        if (!form.srvc || !form.date || !form.time) {
            alert("Please fill all booking details!");
            return;
        }

        const newBooking = {
            sid: form.id,
            bid: barber.id,
            date: form.date,
            time: form.time,
            service: form.srvc,
        };

        const { data } = await axios.post(
            `${baseURL}/booking/add-booking.php?action=add`,
            { newBooking },
            { headers: { "Content-Type": "application/json" } }
        )
        if (data.status === 'success') {

            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
        setForm({ date: "", time: "", srvc: "", price: "", id: "" });
    };

    const cancelBooking = (id) => {
        setBookings(bookings.filter((b) => b.id !== id));
    };

    return (
        <div className='booking'>
            <h2 className="title"> Booking Management</h2>
            <p className="subtitle">Manage your appointments — View available barbers, book, cancel or reschedule.</p>
            <div className="barber-section card">
                <h3>{barber.shop_name}</h3>
                <h5>{barber.user_name}</h5>
                <p><strong>Address:</strong> <br />{barber.address}</p>
                <p><strong>Experience:</strong> <br />{barber.experience} Year's</p>
                <p><strong>Specialties:</strong> <br /> {barber.specialization}</p>
            </div>

            <input type="date" value={form.date} min={today}
                onChange={(e) => {
                    const selectedDate = e.target.value;
                    setForm({ ...form, date: selectedDate });
                    getBarberDetails(selectedDate);
                }}
            />
            <p><strong>Available Slots:</strong></p>
            <div className='row'>
                {barber.slots?.map((slot, i) => {
                    const isToday = form.date === today;
                    const isPast = isToday && slot.start < currentTime;
                return(
                    isPast ? <span key={i} className={`slots card ${isPast ? "disabled" : ""}`}> {slot.start} </span> 
                    : <span
                        key={i}
                        className={`slots card ${form.time === slot.start ? "selected" : ""} ${isPast ? "disabled" : ""}`}
                        onClick={() => setForm({ ...form, time: slot.start })}
                    >
                    {slot.start}
                    </span>
                )})}
            </div>

            <div className='services'>
                {services.map((service, i) => (
                    <div
                        key={i}
                        className={`card ${form.srvc === service.service ? "selected" : ""}`}
                        onClick={() =>
                            setForm({ ...form, srvc: service.service, price: service.price.toFixed(2), id: service.id })
                        }
                    >
                        <div className='card-header'>{service.service}</div>
                        <div className='card-body'>
                            <p>{service.description}</p>
                            <p className='price'>
                                <FaRupeeSign />
                                <strong>{service.price.toFixed(2)}</strong>
                            </p>
                        </div>
                    </div>
                ))}
            </div>


            {/* Booking Form */}
            {form.srvc && (
                <div className="booking-form card">
                    <h3>Confirm Your Appointment</h3>
                    <div className="form-grids">
                        <p><strong>Service :</strong>{form.srvc}</p>
                        <p><strong>Date :</strong>{form.date}</p>
                        <p><strong>Time :</strong>{form.time}</p>
                        <p><strong>Price :</strong>{form.price}</p>
                    </div>
                        <button onClick={handleBook}>Confirm</button>
                </div>
            )}

            {/* Manage Bookings */}
            <div className="manage-section">
                <h3>Your Bookings</h3>
                {!bookings || bookings.length === 0 ? (
                    <p>No appointments booked yet.</p>
                ) : (
                    <div className="bookings-list">
                        {bookings[0].map((b) => (
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
            </div>
        </div>
    );
}

export default Booking
