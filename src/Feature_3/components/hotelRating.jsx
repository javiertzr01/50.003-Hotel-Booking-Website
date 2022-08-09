import React from "react";

const Rating = ({ rating }) => {
  if (!rating) {
    return <p>No rating available.</p>;
  }
  return (
    <div>
      <span className="fw-bold">Rating: </span> {rating}
    </div>
  );
};

export default Rating;
