import React from "react";

const Rating = ({ rating }) => {
  if (!rating) {
    return <p>No rating available.</p>;
  }
  return <p>Rating: {rating}</p>;
};

export default Rating;
