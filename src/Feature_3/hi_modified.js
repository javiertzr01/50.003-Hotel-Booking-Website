//Matthew's code 
import React, {useState, useEffect} from "react";
import axios from 'axios'
import Header from "./components/hotelHeader";
import Address from "./components/hotelAddress";
import Rating from "./components/hotelRating";
import Description from "./components/hotelDescription";
import Amenities from "./components/hotelAmenities";
import AmenitiesRatings from "./components/hotelAmenitiesRating";
import Map from "./components/hotelMap";
import HotelRoomTable from "./components/hotelRoomTable";

function HotelPage() {

  let search = window.location.search;
  let params = new URLSearchParams(search);
  const hotel_id = params.get('hotel_id');
  const dest_id = params.get('destination_id');
  const checkin = params.get('checkin');
  const checkout = params.get('checkout');
  const lang = params.get('lang');
  const currency = params.get('currency');
  const guests = params.get("guests");

  const [hotelData, setHotelData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({hotel_id, dest_id, checkin, checkout, lang, currency, guests});

  const [roomLink, setRoomLink] = useState(`hotels/${hotel_id}/price?destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&partner_id=16&country_code=SG&guests=${guests}`);
  const [hotelLink, setHotelLink] = useState(`hotels/${hotel_id}`);

  console.log(bookingDetails)
  
  useEffect(() => {
    let link = `hotels/${hotel_id}/price?destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&partner_id=16&country_code=SG&guests=${guests}`;
    setRoomLink(link);
  }, [hotel_id, dest_id, checkin, checkout, lang, currency, guests])

  useEffect(() => {
    let link = `hotels/${hotel_id}`;
    setHotelLink(link);
  }, [hotel_id])

  useEffect(() => {
    let obj = {hotel_id, dest_id, checkin, checkout, lang, currency, guests};
    setBookingDetails(obj);
  }, [hotel_id, dest_id, checkin, checkout, lang, currency, guests])


  useEffect(() => {
    axios.get(hotelLink).then((response) => setHotelData(response.data));
  }, [hotelLink])

  useEffect(() => {
    axios.get(roomLink).then((response) => setRoomData(response.data));
  }, [roomLink])

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
        <HotelRoomTable room_data={roomData} booking_details = {bookingDetails}/>
        
      </React.Fragment>
    );
  }
}

export default HotelPage;

  