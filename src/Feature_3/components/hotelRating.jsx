import React from "react";

const Rating = ({ rating }) => {
  if (!rating) {
    return <p>No rating available.</p>;
  }
  return (
    <p>
      <span className="fw-bold">Rating:</span> {rating}
    </p>
  );
};

export default Rating;
