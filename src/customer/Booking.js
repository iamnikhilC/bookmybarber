import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../front/components/BackButton';
import { Icons } from '../front/components/Icons';
import { useAuth } from '../Context/AuthUser';
import RateBarber from '../admin/Rating/RateBarber';
import Popup from '../components/Popup';
const baseURL = process.env.REACT_APP_API_BASE_URL;

const Booking = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [barber, setBarber] = useState([]);
    const [services, setServices] = useState([]);
    const [form, setForm] = useState({ services: [], totalDuration: 0, selectedTime: '' });
    const today = new Date().toISOString().split("T")[0];
    const currentTime = new Date().toTimeString().slice(0, 5); // "HH:MM"
    const [alert, setAlert] = useState(null);

    const getBarberDetails = async (date = '') => {
        const response = await axios.get(`${baseURL}/service/services.php?id=${id}&date=${date}`);
        setServices(response.data.data.services);
        setBarber(response.data.data.barber);
    };

    useEffect(() => {
        setForm((prev) => ({ ...prev, date: today }));
        getBarberDetails(today);
    }, [id]);

    const handleBook = async () => {
        if (!form.services || !form.date || !form.selectedTime) {
            setAlert({ type: "error", message: "Please fill all booking details!" });
            return;
        }

        const newBooking = {
            cid: user.id,
            bid: barber.id,
            date: form.date,
            time: form.selectedTime,
            sids: form.services.map(service => service.id),
        };

        const { data } = await axios.post(
            `${baseURL}/booking/add-booking.php?action=add`,
            { newBooking },
            { headers: { "Content-Type": "application/json" } }
        )
        if (data.status === 'success') {
            setAlert({ type: "success", message: data.message });
            setTimeout(() => {
                window.location.reload();
            }, 800);
        } else {
            setAlert({ type: "error", message: data.message });
        }
        setForm({ services: [] });
    };

    const handleSlotSelect = (time) => {
        setForm(prev => ({
            ...prev,
            selectedTime: time,
            services: [],
            totalDuration: 0
        }));
    };

    const toggleService = (service) => {
        if (!form.selectedTime) {
            setAlert({ type: 'warning', message: `Please select your suitable slot` });
            return;
        }
        setForm(prev => {
            const exists = prev.services.find(s => s.id === service.id);
            const selectedSlot = barber.slots.find(s => s.start === prev.selectedTime);
            const availableMinutes = selectedSlot?.available_minutes ?? 0;
            let updatedServices;

            if (exists) {
                updatedServices = prev.services.filter(
                    s => s.id !== service.id
                );
            } else {
                updatedServices = [
                    ...prev.services,
                    {
                        id: service.id,
                        name: service.service,
                        price: service.price,
                        time: service.duration
                    }
                ];
            }

            const totalDuration = updatedServices.reduce((sum, s) => sum + s.time, 0);

            if (totalDuration > availableMinutes) {
                setAlert({ type: 'warning', message: `You can only select services up to ${availableMinutes} minutes for this slot` });
                return prev;
            }

            return {
                ...prev,
                services: updatedServices,
                totalDuration
            };
        });
    };

    return (
        <div className='booking'>
            {alert && (
                <Popup type={alert.type} message={alert.message} />
            )}
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
                    setForm({ ...form, date: selectedDate });
                    getBarberDetails(selectedDate);
                }}
            />
            {barber.is_week_off ? (
                <div className='week-off'>
                    <Icons.Alert className='week-off-alert'/>
                    <h3>Oh Oh It's week off</h3>
                <p>The barber is on weekly off today. Please select another date to book.</p>
                </div>
            ) : (<>
                <p><strong>Available Slots:</strong></p>
                <div className='slot-indicator row'>
                    <div><span className='slots available'></span>Available</div>
                    <div><span className='slots disabled'></span>Booked</div>
                </div>

                <div className='available-slots row'>
                    {barber.slots?.map((slot, i) => {
                        const isToday = form.date === today;
                        const isPast = isToday && slot.start < currentTime;
                        const isBooked = Boolean(slot.is_booked);
                        const isDisabled = isPast || isBooked;

                        return (
                            isDisabled ? <span key={i} className={`slots card ${isDisabled ? "disabled" : ""}`}> {slot.label} </span>
                                : <span
                                    key={i}
                                    className={`slots card ${form.selectedTime === slot.start ? "selected" : ""} `}
                                    onClick={() => handleSlotSelect(slot.start)}
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
                                        <Icons.Watch className="icon" />
                                        {service.duration.toFixed(2)} Min(s)
                                    </p>
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
                            <p><Icons.Watch className="icon" />{form.totalDuration} Min(s)</p>
                            <p>
                                <Icons.Wallet className="icon" />
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
            </>
            )}

        </div>
    );
}

export default Booking
