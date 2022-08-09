import React from "react";

const Amenities = ({ amenities }) => {
  const amenities_keys = Object.keys(amenities);

  const amenities_map = {
    airConditioning: "Air Conditioning",
    businessCenter: "Business Center",
    clothingIron: "Clothing Iron",
    continentalBreakfast: "Continental Breakfast",
    dataPorts: "Data Ports",
    dryCleaning: "Dry Cleaning",
    hairDryer: "Hairdryer",
    kitchen: "Kitchen",
    miniBarInRoom: "Mini Bar In Room",
    outdoorPool: "Outdoor Pool",
    parkingGarage: "Parking Garage",
    roomService: "Room Service",
    safe: "Safe",
    sauna: "Sauna",
    tVInRoom: "TV In Room",
    valetParking: "Valet Parking",
    voiceMail: "Voice Mail",
  };

  const amenities_desc =
    Object.keys(amenities).length === 0 ? (
      <p>No amenities information available.</p>
    ) : (
      <ul className="list-group">
        {amenities_keys
          .filter((amenity) => Object.keys(amenities_map).includes(amenity))
          .map((amenity) => (
            <li key={amenity} className="list-group-item">
              {amenities_map[amenity]}: Y
            </li>
          ))}
      </ul>
    );

  return (
    <div className="container p-4">
      <h3>Amenities</h3>
      {amenities_desc}
    </div>
  );
};

export default Amenities;
