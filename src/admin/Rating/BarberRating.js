import StarRating from "./StarRating";
const BarberRating = ({ rating, totalReviews }) => {
  if (totalReviews === 0) {
    return <span className="new-barber">New Barber ⭐</span>;
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <StarRating value={rating} readOnly size={20} />
      <span>
        {rating} ({totalReviews})
      </span>
    </div>
  );
};

export default BarberRating;
