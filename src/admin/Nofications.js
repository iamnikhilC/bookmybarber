import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from '../Context/AuthUser'
import BackButton from '../front/components/BackButton';
import { toast } from "react-toastify";
import { Icons } from '../front/components/Icons';
import axiosClient from '../front/axiosClient';
import empty from "../images/empty.png";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export default function Notifications() {
    const navigate = useNavigate();
    const { user, avatar, notification, setNotification } = useAuth();
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState("");

    

    const markAsRead = async (id) => {
        try {
            await axiosClient.post(
                "/notify/notification.php",
                { id },
                { headers: { "Content-Type": "application/json" } }
            );
    
            // 🔥 Update UI immediately
            setNotification(prev =>
                prev.map(n =>
                    n.id === id ? { ...n, is_read: 1 } : n
                )
            );
    
        } catch (error) {
            console.error("Failed to mark as read");
        }
    };
    

    return (
        <div className='notifications grid'>
            <div className='card-header'>
                <Link to="" style={{ fontSize: '20px', color: 'gray' }}><BackButton /></Link>
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Notifications</h4>
            </div>
            {!notification || notification.length === 0 ? (
                <div className="empty-state">
                    <img src={empty} alt="no_service" />
                    <p>No Notifications.</p>
                </div>

            ) : (

                <div className='notification-list'>
                    {notification.map((notify) => (

                        <div
                            key={notify.id}
                            className={`notification ${notify.is_read ? "read" : "unread"}`}
                            onClick={() => markAsRead(notify.id)}
                        >
                            <Link to="#" >
                                <div className='bell'><Icons.Bell /></div>
                                <div className='content'>

                                    <h4>{notify.title}</h4>
                                    <p>{notify.message}</p>
                                </div>
                            </Link>

                        </div>

                    ))}
                </div>
            )}


        </div>
    )
}
