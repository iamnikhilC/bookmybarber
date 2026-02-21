import { useState } from "react";

const StarRating = ({ value = 0, onChange, size = 28, readOnly = false }) => {
  const [hover, setHover] = useState(0);

  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: size,
            cursor: readOnly ? "default" : "pointer",
            color: star <= (hover || value) ? "#F6A421" : "#ccc",
            transition: "color 0.2s"
          }}
          onClick={() => !readOnly && onChange(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
