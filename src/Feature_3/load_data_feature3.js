import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios'
import { useLocation } from "react-router-dom";
import HotelPage from './hotelPage.js';


function createGuestRoomStr(room,guests){
  let guest_string = guests.toString();
  
  //null error handling
  if (!room || !guests){
    return 
  }

  if (room === 1) {
    return guest_string;
  }
  else {
    for(let i = 1; i < room; i++){
      try {
        guest_string = guest_string + "|" + guests.toString()
      } catch (error) {
        if (error instanceof RangeError) {
          guest_string = null;
          break;
        }
    } 
    return guest_string;
    }
  }
}

function Load_data_feature3() {

  const [hotelData, setHotelData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [badReq, setBadReq] = useState(false);

  const location = useLocation();
  const hotel_id = !location.state ? null : location.state[0];
  const dest_id = !location.state ? null : location.state[1];
  const checkin = !location.state ? null : location.state[2];
  const checkout = !location.state ? null : location.state[3];
  const currency = !location.state ? null : location.state[4];
  const adult = !location.state ? null : location.state[5];
  const children = !location.state ? null : location.state[6];
  const room = !location.state ? null : location.state[7];
  const lang = "en-US"
  const guests = parseInt(adult) + parseInt(children);
  const guest_str = createGuestRoomStr(room,guests);
  
  const [bookingDetails, setBookingDetails] = useState({
    hotel_id,
    dest_id,
    checkin,
    checkout,
    lang,
    currency,
    guests,
    room
  });

  const [roomLink, setRoomLink] = useState(
    `hotels/${hotel_id}/price?destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&partner_id=16&country_code=SG&guests=${guest_str}`
  );
  const [hotelLink, setHotelLink] = useState(`hotels/${hotel_id}`);

  useEffect(() => {
    let link = `hotels/${hotel_id}/price?destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&partner_id=16&country_code=SG&guests=${guest_str}`;
    setRoomLink(link);
  }, [hotel_id, dest_id, checkin, checkout, lang, currency, guest_str]);

  useEffect(() => {
    let link = `hotels/${hotel_id}`;
    setHotelLink(link);
  }, [hotel_id]);

  useEffect(() => {
    let obj = { hotel_id, dest_id, checkin, checkout, lang, currency, guests, room };
    setBookingDetails(obj);
  }, [hotel_id, dest_id, checkin, checkout, lang, currency, guests, room]);

  useEffect(() => {
    axios.get(hotelLink).then((response) => {setHotelData(response.data)
    });
  }, [hotelLink]);

  //for roomlink
  useEffect(() => {
    let counter = 0;
    const axios = require('axios');
    const sendGetRequest = async () => {
        try {
            const response = await axios.get(roomLink);
            console.log(response.data)
            setRoomData(response.data)
        } catch (err) {
          setBadReq(true);
        }
    };
    while (counter < 5){
      sendGetRequest();
      counter++;
    }
    return () =>{
      console.log("unmounting RoomData API");
    } 
  }, [roomLink])
  
  //edit callback to prevent rendering
  let hotel_data = useCallback(() => {return [roomData, hotelData, bookingDetails, badReq]},[roomData,hotelData,bookingDetails,badReq])
  return (
    <div>
      <HotelPage data = {hotel_data}/>
    </div>
  );
}
export default Load_data_feature3;
