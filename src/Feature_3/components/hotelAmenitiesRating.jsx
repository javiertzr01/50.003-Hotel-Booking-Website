import React from "react";

const AmenitiesRatings = ({ amenities_ratings }) => {
  if (!amenities_ratings) {
    return <p>No amenities ratings available.</p>;
  }
  return (
    <div>
      <h3>Amenities Ratings</h3>
      <ul>
        {amenities_ratings.map((amenity) => (
          <li key={amenity.name}>
            {amenity.name} : {amenity.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AmenitiesRatings;
