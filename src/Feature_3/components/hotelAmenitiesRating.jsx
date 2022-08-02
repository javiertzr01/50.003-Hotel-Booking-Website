import React from "react";

const AmenitiesRatings = ({ amenities_ratings }) => {
  const amenities_ratings_desc =
    amenities_ratings.length === 0 ? (
      <p>No amenities ratings available.</p>
    ) : (
      <ul>
        {amenities_ratings.map((amenity) => (
          <li key={amenity.name}>
            {amenity.name} : {amenity.score}
          </li>
        ))}
      </ul>
    );

  return (
    <div>
      <h3>Amenities Ratings</h3>
      {amenities_ratings_desc}
    </div>
  );
};

export default AmenitiesRatings;
