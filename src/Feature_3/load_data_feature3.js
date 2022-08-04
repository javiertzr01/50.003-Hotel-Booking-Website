import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios'
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import HotelPage from './hotelPage.js';

function Load_data_feature3() {

  const [hotelData, setHotelData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [badReq, setBadReq] = useState(false);
  const [completed, setCompleted] = useState(false)

  const location = useLocation();
  const hotel_id = !location.state ? null : location.state[0];
  const dest_id = !location.state ? null : location.state[1];
  const checkin = !location.state ? null : location.state[2];
  const checkout = !location.state ? null : location.state[3];
  const currency = !location.state ? null : location.state[4];
  const guests = !location.state ? null : location.state[5];
  const lang = "en-US"

  console.log(hotel_id, dest_id, checkin, checkout, currency, guests)
  
  const [bookingDetails, setBookingDetails] = useState({
    hotel_id,
    dest_id,
    checkin,
    checkout,
    lang,
    currency,
    guests,
  });

  const [roomLink, setRoomLink] = useState(
    `hotels/${hotel_id}/price?destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&partner_id=16&country_code=SG&guests=${guests}`
  );
  const [hotelLink, setHotelLink] = useState(`hotels/${hotel_id}`);

  //console.log(dest_id, checkin, checkout, lang, currency, guests)

  useEffect(() => {
    let link = `hotels/${hotel_id}/price?destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&partner_id=16&country_code=SG&guests=${guests}`;
    setRoomLink(link);
  }, [hotel_id, dest_id, checkin, checkout, lang, currency, guests]);

  useEffect(() => {
    let link = `hotels/${hotel_id}`;
    setHotelLink(link);
  }, [hotel_id]);

  useEffect(() => {
    let obj = { hotel_id, dest_id, checkin, checkout, lang, currency, guests };
    setBookingDetails(obj);
  }, [hotel_id, dest_id, checkin, checkout, lang, currency, guests]);

  useEffect(() => {
    axios.get(hotelLink).then((response) => {setHotelData(response.data)
    });
  }, [hotelLink]);

  useEffect(() => {
    axios.get(roomLink).then((response) => {setRoomData(response.data);
    setCompleted(response.data.completed); 
    }).catch(response => setBadReq(true));
  }, [roomLink, completed]);
  
  //edit callback to prevent rendering
  let hotel_data = useCallback(() => {return [roomData, hotelData, bookingDetails, badReq, completed]},[roomData,hotelData,bookingDetails,badReq,completed])
  return (
    <div>
      <HotelPage data = {hotel_data}/>
    </div>
  );
}
export default Load_data_feature3;
