import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useAuth } from '../Context/AuthUser'
import BackButton from '../front/components/BackButton';
import { Icons } from '../front/components/Icons';

import axiosClient from '../front/axiosClient';
const baseURL = process.env.REACT_APP_API_BASE_URL;

export default function Profile() {
    const { user, avatar } = useAuth();
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            if (!user?.id) return;

            try {
                const response = await axiosClient.get(`/auth/profile.php?id=${user.id}`);
                setProfile(response.data.data[0]);
            } catch (err) {
                setError("Whoops, something went wrong!");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [user]);
    console.log('profile', profile);

    return (
        <div className='user-profile grid'>
            <div className='card-header'>
                <Link to="" style={{ fontSize: '20px', color: 'gray' }}><BackButton /></Link>
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Profile</h4>
            </div>
            <div className='profile-card card'>

                <img className="profile" src={
                    profile?.profile_image
                        ? `${baseURL}/auth/uploads/profiles/${profile.profile_image}`
                        : avatar
                } alt="profile" style={{ height: '70px', width: "70px", borderRadius: "50%", objectFit: "cover" }} />

                <div className='profile-content'>
                    <h4 style={{ fontSize: '16px', fontWeight: '600' }}>{user?.name}</h4>
                    <p><Icons.Email className='icon' />{user?.email}</p>
                    <p><Icons.Phone className='icon' />{user?.mobile}</p>
                </div>
                <Link to="/admin/edit-profile/user" style={{ fontSize: '20px', color: 'gray', position: 'absolute', right: '15px', top: '10px', }}><Icons.Edit /></Link>
            </div>

            {user?.role === 'barber' && (
                <div className='shop-card card'>
                    <div className='card-header'>
                        <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Shop Details</h4>
                        <Link to="/admin/edit-profile/shop" style={{ fontSize: '20px', color: 'gray' }}><Icons.Edit /></Link>
                    </div>

                    <p><Icons.Shop className='icon' />{profile?.shop_name}</p>
                    <p><Icons.Email className='icon' />{user?.email}</p>
                    <p><Icons.Phone className='icon' />{user?.mobile}</p>
                    <p><Icons.Address className='icon' />{profile?.address}</p>
                    <p><Icons.Watch className='icon' />{profile?.shop_open_time} - {profile?.shop_close_time}</p>
                </div>
            )}

            <div className='account-card card'>
                <div className='card-header'>
                    <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Account</h4>
                </div>

                <p>
                    <Icons.Lock className='icon' />
                    <Link to="/admin/edit-profile/password" style={{ fontSize: '12px', color: 'black' }}>Change password</Link>
                </p>
                <p>
                    <Icons.Logout className='icon' />
                    <Link className="item-link" to="/logout">Logout</Link>
                </p>
            </div>
        </div>
    )
}
