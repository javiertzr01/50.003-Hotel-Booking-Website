import React from "react";

const AmenitiesRatings = ({ amenities_ratings }) => {
  const amenities_ratings_desc =
    amenities_ratings.length === 0 ? (
      <p>No amenities ratings available.</p>
    ) : (
      <ul className="list-group">
        {amenities_ratings.map((amenity) => (
          <li key={amenity.name} className="list-group-item">
            {amenity.name}: {amenity.score}
          </li>
        ))}
      </ul>
    );

  return (
    <div className="container p-4">
      <h3>Amenities Ratings</h3>
      {amenities_ratings_desc}
    </div>
  );
};

export default AmenitiesRatings;
