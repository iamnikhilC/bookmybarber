import React from "react";

export default function StarRating({ rating = 0, size = 25 }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[...Array(fullStars)].map((_, i) => (
        <span key={`f-${i}`} style={{ fontSize: size, color: "#fbbf24" }}>★</span>
      ))}

      {halfStar && (
        <span style={{ fontSize: size, color: "#fbbf24" }}>⯪</span>
      )}

      {[...Array(emptyStars)].map((_, i) => (
        <span key={`e-${i}`} style={{ fontSize: size, color: "#d1d5db" }}>☆</span>
      ))}
    </div>
  );
}
