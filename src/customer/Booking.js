import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import BackButton from '../front/components/BackButton';
import { Icons } from '../front/components/Icons';
import { useAuth } from '../Context/AuthUser';
const baseURL = process.env.REACT_APP_API_BASE_URL;

const Booking = () => {
    const {user} = useAuth();
    const { id } = useParams();
    const [barber, setBarber] = useState([]);
    const [services, setServices] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [form, setForm] = useState({services: [],});
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
    const getBookings = async (date = "") => {
        const response = await axios.get(`${baseURL}/booking/get-cust-bookings.php?date=${date}`);
        console.log('bookings', response.data.data);
        setBookings([...bookings, response.data.data]);
    };
    
    useEffect(() => {
        getBookings(today);
        setForm((prev) => ({ ...prev, date: today }));
        getBarberDetails(today);
    }, [id]);

    const handleBook = async () => {
        if (!form.services || !form.date || !form.time) {
            alert("Please fill all booking details!");
            return;
        }

        const newBooking = {
            cid: user.id,
            bid: barber.id,
            date: form.date,
            time: form.time,
            sids: form.services.map(service => service.id),
        };

        console.log('newBooking', form.services);
        const { data } = await axios.post(
            `${baseURL}/booking/add-booking.php?action=add`,
            { newBooking },
            { headers: { "Content-Type": "application/json" } }
        )
        if (data.status === 'success') {
            toast.success(data.message);
            setTimeout(() => {
                window.location.reload();
            }, 800);
        } else {
            toast.error(data.message);
        }
        setForm({ services: [] });
    };

    const toggleService = (service) => {
        setForm(prev => {
            const exists = prev.services.find(s => s.id === service.id);

            if (exists) {
                // ❌ remove if already selected
                return {
                    ...prev,
                    services: prev.services.filter(s => s.id !== service.id)
                };
            }

            // ✅ add if not selected
            return {
                ...prev,
                services: [
                    ...prev.services,
                    {
                        id: service.id,
                        name: service.service,
                        price: service.price
                    }
                ]
            };
        });
    };

    const cancelBooking = (id) => {
        setBookings(bookings.filter((b) => b.id !== id));
    };

    const isSlotBooked = (slotTime) => {
        return bookings?.some(
            booking =>
                booking.time == slotTime
        );
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
            <div className="barber-section card">
                <h3><span className='icon'><Icons.Shop /></span>{barber.shop_name}</h3>
                <p><span className='icon'><Icons.User /></span>{barber.user_name}</p>
                <p><span className='icon'><Icons.Address /></span>{barber.address}</p>
                <p><span className='icon'><Icons.Brifcase /></span>{barber.experience} Year's</p>
                <p><span className='icon'><Icons.Speciality /></span> {barber.specialization}</p>
            </div>

            <input type="date" value={form.date} min={today}
                onChange={(e) => {
                    const selectedDate = e.target.value;
                    getBookings(selectedDate);
                    setForm({ ...form, date: selectedDate });
                    getBarberDetails(selectedDate);
                }}
            />
            <p><strong>Available Slots:</strong></p>
            <div className='slot-indicator row'>
                <div><span className='slots available'></span>Available</div>
                <div><span className='slots disabled'></span>Booked</div>
            </div>

            <div className='available-slots row'>
                {barber.slots?.map((slot, i) => {
                    const isToday  = form.date === today;
                    const isPast   = isToday && slot.start < currentTime;
                    const isBooked = isSlotBooked(slot.start);
                    console.log('isBooked', isBooked);

                    return (
                        isPast ? <span key={i} className={`slots card ${isPast ? "disabled" : ""}`}> {slot.label} </span>
                            : <span
                                key={i}
                                className={`slots card ${form.time === slot.start ? "selected" : ""} `}
                                onClick={() => setForm({ ...form, time: slot.start })}
                            >
                                {slot.label}
                            </span>
                    )
                })}
            </div>

            <div className="services">
                {services.map((service, i) => {
                    const selected = form.services.some(s => s.id === service.id);

                    return (
                        <div
                            key={i}
                            className={`card ${selected ? "selected" : ""}`}
                            onClick={() => toggleService(service)}
                        >
                            <div className="card-header">{service.service}</div>
                            <div className="card-body">
                                <p>{service.description}</p>
                                <p className="price">
                                    <Icons.Wallet className="icon" />
                                    <strong> ₹ {service.price.toFixed(2)}</strong>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Booking Form */}
            {form.services.length > 0 && (
                <div className="booking-form card">
                    <h3>Confirm Your Appointment</h3>
                    <div className="form-grids">
                        <div>
                            <p><Icons.Service className="icon" /> Service(s)
                                {form.services.map(service => (
                                    <p key={service.id}>{service.name} – ₹{Number(service.price).toFixed(2)}</p>
                                ))}
                            </p>
                        </div>

                        <p><Icons.Calendar className="icon" />{form.date}</p>
                        <p><Icons.Watch className="icon" />{form.time}</p>
                        <p>
                            <Icons.Wallet className="icon"/>
                            <strong>
                                Total: ₹
                                {form.services
                                    .reduce((sum, s) => sum + Number(s.price), 0)
                                    .toFixed(2)}
                            </strong>
                        </p>
                    </div>
                    <p></p>
                    <button onClick={handleBook}>Confirm & Pay</button>
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

export default Booking
