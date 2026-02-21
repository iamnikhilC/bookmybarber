import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../front/components/BackButton';
import axiosClient from '../../front/axiosClient';
import { Icons } from '../../front/components/Icons';
import Popup from '../../components/Popup';
import BtnPopup from '../../components/BtnPopup';
import { useAuth } from '../../Context/AuthUser';
import { FaRupeeSign } from 'react-icons/fa';
import { QRCodeCanvas } from "qrcode.react";

const ViewPayments = () => {
    const { user } = useAuth();
    const [payments, setPayments] = useState([]);
    const [alert, setAlert] = useState(null);
    const [showConfirmPayment, setShowConfirmPayment] = useState(false);
    const [qrData, setQrData] = useState(false);
    const [showQr, setShowQr] = useState(false);
    const PLATFORM_FEE_PERCENT = 1;

    const getPayments = async () => {
        try {
            const res = await axiosClient.get('/payments/payments.php', {
                params: { id: user?.id }
            });
            setPayments(res.data.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (user?.id) getPayments();
    }, [user?.id]);

    /* ---------- HELPERS ---------- */

    const getDayName = (dateString) => {
        const inputDate = new Date(dateString);
        const today = new Date();

        inputDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const diff =
            (inputDate - today) / (1000 * 60 * 60 * 24);

        if (diff === -1) return "Yesterday";
        if (diff === 0) return "Today";
        if (diff === 1) return "Tomorrow";

        return inputDate.toLocaleDateString("en-US", { weekday: "short" });
    };

    // Monday as week start
    const getWeekStart = (dateStr) => {
        const date = new Date(dateStr);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        const monday = new Date(date.setDate(diff));
        monday.setHours(0, 0, 0, 0);
        return monday.toISOString().split('T')[0];
    };
    const getLastWeekStart = () => {
        const d = new Date();
        d.setDate(d.getDate() - 7); // go to last week
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
        d.setDate(diff);
        d.setHours(0, 0, 0, 0);
        return d.toISOString().split('T')[0];
    };

    const lastWeekStart = getLastWeekStart();

    const groupByWeek = (data) => {
        const weeks = {};

        data.forEach(p => {
            const weekStart = getWeekStart(p.date);

            if (!weeks[weekStart]) {
                weeks[weekStart] = {
                    total: 0,
                    platform_fee: 0,
                    barber_earnings: 0,
                    items: []
                };
            }

            const amount = Number(p.total_amount);
            const platformFee = (amount * PLATFORM_FEE_PERCENT) / 100;
            const barberAmount = amount - platformFee;

            weeks[weekStart].total += amount;
            weeks[weekStart].platform_fee += platformFee;
            weeks[weekStart].barber_earnings += barberAmount;

            weeks[weekStart].items.push(p);
        });

        return weeks;
    };

    const weeklyPayments = groupByWeek(payments);

    const isAndroid = /Android/i.test(navigator.userAgent);
    const payPlatformFee = (amount, weekStart) => {
        const upiId = "test@upi"; // dummy
        const name = "MyBarber";
        const note = `Platform fee - week ${weekStart}`;

        const upiUrl =
            `upi://pay?pa=${upiId}` +
            `&pn=${encodeURIComponent(name)}` +
            `&am=${amount}` +
            `&cu=INR` +
            `&tn=${encodeURIComponent(note)}`;

        localStorage.setItem("pending_platform_payment", JSON.stringify({
            amount,
            weekStart
        }));

        if (isAndroid) {
            // Android mobile browser → open UPI app
            window.location.href = upiUrl;
        } else {
            // Desktop / iOS → show QR
            setQrData(upiUrl);
            setShowQr(true);
        }
    };


    useEffect(() => {
        const pending = localStorage.getItem("pending_platform_payment");
        if (pending) {
            setShowConfirmPayment(true);
        }
    }, []);

    const confirmPlatformPayment = async () => {
        const pending = JSON.parse(
            localStorage.getItem("pending_platform_payment")
        );

        if (!pending) return;

        try {
            await axiosClient.post("/payments/payments.php", {
                barber_id: user.id,
                week_start: pending.weekStart,
                amount: pending.amount,
                payment_method: "UPI",
                status: "paid"
            });

            localStorage.removeItem("pending_platform_payment");
            setShowConfirmPayment(false);

            setAlert({
                type: "success",
                message: "Payment submitted. Awaiting verification."
            });

        } catch (err) {
            console.error(err);
            setAlert({
                type: "error",
                message: "Unable to record payment. Please contact support."
            });
        }
    };
    const cancelPlatformPayment = () => {
        setShowConfirmPayment(false);
    }

    return (
        <div className="payment">
            {alert && <Popup type={alert.type} message={alert.message} />}
            {showConfirmPayment && (
                <BtnPopup
                    type="confirm"
                    message="Have you completed the platform fee payment?"
                    onConfirm={() => confirmPlatformPayment()}
                    onCancel={() => cancelPlatformPayment()}
                />
            )}

            <div className="manage-section">
                <div className="page-header">
                    <Link to="" style={{ fontSize: '20px', color: 'gray' }}>
                        <BackButton />
                    </Link>
                    <h4 style={{ fontSize: '16px', fontWeight: '600' }}>
                        Payments
                    </h4>
                </div>

                {showQr && (
                    <div className="qr-box">
                        <h4>Scan & Pay Platform Fee</h4>
                        <QRCodeCanvas value={qrData} size={220} />
                        <p>Scan using GPay / PhonePe / Paytm</p>
                    </div>
                )}

                {payments.length === 0 ? (
                    <p>No payment made yet.</p>
                ) : (
                    <div className="grid">
                        {Object.entries(weeklyPayments).map(([weekStart, week]) => (
                            <div key={weekStart} className="week-block">

                                {/* WEEK TOTAL */}
                                <div className="week-header">
                                    <div className='week-calculation'>
                                        <div className='head'>
                                            <h3>Total :</h3>
                                            <h3>Platform fee :</h3>
                                            <h3>Your Earning :</h3>
                                        </div>
                                        <div className='body'>
                                            <p style={{ textAlign: 'end' }} >{week.total}</p>
                                            <p style={{ textAlign: 'end' }} >{week.platform_fee}</p>
                                            <p style={{ textAlign: 'end' }} >{week.barber_earnings} </p>
                                        </div>
                                    </div>

                                    {weekStart === lastWeekStart && (
                                        <button className="pay-btn" onClick={() => payPlatformFee(week.platform_fee, weekStart)}>
                                            Pay Platform Fee
                                        </button>
                                    )}

                                </div>
                                {/* PAYMENTS */}
                                {week.items.map(p => (
                                    <div key={p.id} className="grid-item">
                                        <div>
                                            <h3 className="capitalize-first">
                                                {p.services}
                                            </h3>
                                            <p style={{ fontSize: '12px' }}>
                                                <span className="icon">
                                                    <Icons.Calendar />
                                                </span>
                                                {getDayName(p.date)} – {p.date}
                                            </p>
                                        </div>
                                        <span>{p.total_amount}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewPayments;
