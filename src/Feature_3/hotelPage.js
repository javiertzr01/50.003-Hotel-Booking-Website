import React, { useState, useEffect } from "react";
import Header from "./components/hotelHeader";
import HotelPicture from "./components/hotelPicture";
import Address from "./components/hotelAddress";
import Rating from "./components/hotelRating";
import Description from "./components/hotelDescription";
import Amenities from "./components/hotelAmenities";
import AmenitiesRatings from "./components/hotelAmenitiesRating";
import Map from "./components/hotelMap";
import Book from "./components/hotelBook";
import HotelRoomTable from "./components/hotelRoomTable";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function HotelPage(props) {
  const [roomData, hotelData, bookingDetails, badReq] = props.data();
  console.log(roomData);
  console.log(hotelData);
  console.log(badReq);

  // const [hotelData, setHotelData] = useState(null);
  // const [roomData, setRoomData] = useState(null);
  // const [badReq, setBadReq] = useState(false);

  // const location = useLocation();
  // const hotel_id = !location.state ? null : location.state[0];
  // const dest_id = !location.state ? null : location.state[1];
  // const checkin = !location.state ? null : location.state[2];
  // const checkout = !location.state ? null : location.state[3];
  // const currency = !location.state ? null : location.state[4];
  // const guests = !location.state ? null : location.state[5];
  // const lang = "en-US"

  //console.log(hotel_id, dest_id, checkin, checkout, currency, guests)
  // let search = window.location.search;
  // let params = new URLSearchParams(search);
  // const hotel_id = params.get("hotel_id");
  // const dest_id = params.get("destination_id");
  // const checkin = params.get("checkin");
  // const checkout = params.get("checkout");
  // const lang = params.get("lang");
  // const currency = params.get("currency");
  // const guests = params.get("guests");

  // const [bookingDetails, setBookingDetails] = useState({
  //   hotel_id,
  //   dest_id,
  //   checkin,
  //   checkout,
  //   lang,
  //   currency,
  //   guests,
  // });

  // const [roomLink, setRoomLink] = useState(
  //   `hotels/${hotel_id}/price?destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&partner_id=16&country_code=SG&guests=${guests}`
  // );
  // const [hotelLink, setHotelLink] = useState(`hotels/${hotel_id}`);

  //console.log(bookingDetails);

  // useEffect(() => {
  //   let link = `hotels/${hotel_id}/price?destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&partner_id=16&country_code=SG&guests=${guests}`;
  //   setRoomLink(link);
  // }, [hotel_id, dest_id, checkin, checkout, lang, currency, guests]);

  // useEffect(() => {
  //   let link = `hotels/${hotel_id}`;
  //   setHotelLink(link);
  // }, [hotel_id]);

  // useEffect(() => {
  //   let obj = { hotel_id, dest_id, checkin, checkout, lang, currency, guests };
  //   setBookingDetails(obj);
  // }, [hotel_id, dest_id, checkin, checkout, lang, currency, guests]);

  // useEffect(() => {
  //   axios.get(hotelLink).then((response) => setHotelData(response.data));
  // }, [hotelLink]);

  // useEffect(() => {
  //   axios.get(roomLink).then((response) => setRoomData(response.data)).catch(response => setBadReq(true));
  // }, [roomLink]);

  //console.log(hotelData);

  return (
    <>
      {badReq ? (
        <div>
          <p>
            An error has occurred due to your inputs, please try another entry.
          </p>{" "}
          <Link to="/">
            Please re-start your booking via the following link
          </Link>
        </div>
      ) : !(hotelData && roomData && !badReq) ? (
        <div>
          <div>Loading...</div>
          <Spinner animation="border" role="status"></Spinner>
        </div>
      ) : hotelData && roomData && !badReq ? (
        <React.Fragment>
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col p-4">
                <Header name={hotelData.name} />
                <Address address={hotelData.address} />
                <Rating rating={hotelData.rating} />
              </div>
              <div className="col p-4">
                <HotelPicture id={hotelData.id} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row align-items-top justify-content-between">
              <div className="col-8 p-4">
                <Description description={hotelData.description} />
                <Map
                  latitude={hotelData.latitude}
                  longitude={hotelData.longitude}
                  name={hotelData.name}
                  address={hotelData.address}
                />
              </div>
              <div className="col-4">
                <AmenitiesRatings
                  amenities_ratings={hotelData.amenities_ratings}
                />
                <Amenities amenities={hotelData.amenities} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row align-items-center justify-content-between p-4">
              <Book
                room_data={roomData}
                booking_details={[bookingDetails, hotelData.name]}
              />
              <HotelRoomTable
                room_data={roomData}
                booking_details={[bookingDetails, hotelData.name]}
              />
            </div>
          </div>
        </React.Fragment>
      ) : null}
    </>
  );
}
export default HotelPage;
