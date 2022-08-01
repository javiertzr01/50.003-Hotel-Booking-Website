import React from "react";

const Amenities = ({ amenities }) => {
  const amenities_keys = Object.keys(amenities);

  const amenities_map = {
    airConditioning: "Air Conditioning",
    clothingIron: "Clothing Iron",
    continentalBreakfast: "Continental Breakfast",
    dataPorts: "Data Ports",
    hairDryer: "Hairdryer",
    kitchen: "Kitchen",
    outdoorPool: "Outdoor Pool",
    parkingGarage: "Parking Garage",
    safe: "Safe",
    tVInRoom: "TV",
    voiceMail: "Voice Mail",
  };

  if (!amenities) {
    return <p>No amenities information available.</p>;
  }
  return (
    <div>
      <h3>Amenities</h3>
      <ul>
        {amenities_keys.map((amenity) => (
          <li key={amenity}>{amenities_map[amenity]}: Y</li>
        ))}
      </ul>
    </div>
  );
};

export default Amenities;
