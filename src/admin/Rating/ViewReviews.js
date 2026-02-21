import StarRating from "./StarRating";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthUser";
import BackButton from "../../front/components/BackButton";
import React, { useState, useEffect } from 'react';
import axiosClient from '../../front/axiosClient';
const ViewReviews = () => {

    const { bid } = useParams(); 
    console.log('bid', bid);
    const { user } = useAuth();
    const barberId = bid ?? user?.id;

    const [reviews, setReviews] = useState([]);
    const [barber, setBarber] = useState(null);
    const getReviews = async () => {
        try {
            const res = await axiosClient.get('/barber/reviews.php', {
                params: { id: barberId }
            });
            setReviews(res.data.reviews || []);
            setBarber(res.data.barber[0]);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (user?.id) getReviews();
    }, [user?.id]);
    return (

        <div className="reviews">
            {/* Header */}
            <div className="page-header">
                <Link to="" style={{ fontSize: "20px", color: "gray" }}>
                    <BackButton />
                </Link>
                <h4 style={{ fontSize: "16px", fontWeight: 600 }}>
                    Reviews
                </h4>
            </div>

            <div className="reviews-list grid">
                <div className="card">
                    {!barber ? (
                        <p>Loading barber details...</p>
                    ) : (
                        <div>
                            {user?.role === 'customer' && (
                                <h3>{barber.name}</h3>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                                <StarRating value={barber.total_rating} readOnly size={20} />
                                <span>{barber.total_rating} ({barber.total_reviews} reviews)</span>
                            </div>
                        </div>
                    )}
                </div>
                <div>Customer Reviews</div>
                {reviews.length === 0 ? (
                    <p>No Reviews Yet.</p>
                ) : (
                    reviews.map((r) => (
                        <div className="review card" key={r.id}>
                            <h3>{r.name}</h3>
                            <p>{r.review}</p>
                            <StarRating value={r.rating} readOnly size={20} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ViewReviews;
