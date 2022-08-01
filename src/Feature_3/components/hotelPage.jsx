import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./hotelHeader";
import Address from "./hotelAddress";
import Rating from "./hotelRating";
import Description from "./hotelDescription";
import Amenities from "./hotelAmenities";
import AmenitiesRatings from "./hotelAmenitiesRating";
import Map from "./hotelMap";
import HotelRoomTable from "./hotelRoomTable";

function HotelPage({
  hotel_id,
  destination_id,
  checkin,
  checkout,
  lang,
  currency,
  country_code,
  guests,
  partner_id,
}) {
  const [hotelData, setHotelData] = useState(null);
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    axios
      .get(`hotels/${hotel_id}`)
      .then((response) => setHotelData(response.data));
    axios
      .get(
        `hotels/${hotel_id}/price?destination_id=${destination_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&country_code=${country_code}&guests=${guests}&partner_id=${partner_id}`
      )
      .then((response) => setRoomData(response.data));
  });

  if (hotelData && roomData && roomData.completed) {
    return (
      <React.Fragment>
        <Header name={hotelData.name} />
        <Address address={hotelData.address} />
        <Rating rating={hotelData.rating} />
        <Description description={hotelData.description} />
        <AmenitiesRatings amenities_ratings={hotelData.amenities_ratings} />
        <Amenities amenities={hotelData.amenities} />
        <Map
          latitude={hotelData.latitude}
          longitude={hotelData.longitude}
          name={hotelData.name}
          address={hotelData.address}
        />
        <HotelRoomTable room_data={roomData} currency={currency} />
      </React.Fragment>
    );
  }
}

export default HotelPage;
