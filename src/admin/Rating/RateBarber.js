import { useState } from "react";
import StarRating from "./StarRating";
import axiosClient from "../../front/axiosClient";
import { useAuth } from "../../Context/AuthUser";
import { toast } from "react-toastify";
const RateBarber = ({ barberId, bookingId, onSuccess }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const submitRating = async () => {
        if (rating === 0) {
            alert("Please select a rating");
            return;
        }

        setLoading(true);

        try {
            await axiosClient.post("/rate-barber.php", {
                barber_id: barberId ?? 6,
                booking_id: bookingId ?? 6,
                cust_id: user?.id,
                rating,
                review
            });

            toast("Thanks for rating! 🙌");
            onSuccess?.();
            setReview('');
        } catch (err) {
            toast("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rate-box">
            <h3>Rate Your Barber</h3>

            <StarRating value={rating} onChange={setRating} />

            <textarea
                placeholder="Write a short review (optional)"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={4}
            />

            <button onClick={submitRating} disabled={loading}>
                {loading ? "Submitting..." : "Submit Rating"}
            </button>
        </div>
    );
};

export default RateBarber;
