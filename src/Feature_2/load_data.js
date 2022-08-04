import React, { useCallback, useEffect, useState } from 'react';
import List from './list.js';
import { useLocation, Navigate } from "react-router-dom";


function sort_data(data){
  if (!data[0] || !data[1]){
    return
  }
  //data[0] is prices, data[1] is hotels
  let prices = data[0];
  let hotels = data[1];
  let final = [];
  //assumption hotels.length > prices.length
  for (let i = 0; i < prices.length; i++){
    for (let j = 0; j < hotels.length; j++){
      if (prices[i]["id"] === hotels[j]["id"]){
          let new_obj = JSON.parse(JSON.stringify(hotels[j]));
          new_obj["price"] = prices[i]["price"]
          final.push(new_obj);
          break;
        }
      }
    }
    return final;
  }

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

function Load_data() {
  //add prop here when needed 
  const [prices, setPrices] = useState([])
  const [completed, setCompleted] = useState(false)
  const [lengthOfHotel, setLength] = useState(0);
  const [searchComplete, setsearchComplete] = useState(false);
  const [badReq, setBadReq] = useState(false);
  const [hotels, setHotels] = useState([]);

  const location = useLocation();

  let dest_id = !location.state ? null : location.state[0];
  let checkin = !location.state ? null : location.state[1];
  let checkout = !location.state ? null : location.state[2];
  let lang = !location.state ? null : location.state[3];
  let currency = !location.state ? null : location.state[4];
  let adult = !location.state ? null : location.state[5];
  let children = !location.state ? null : location.state[6];
  let room = !location.state ? null : location.state[7];
  
    // checks if state is defined, if not it will redirect to error
    useEffect(() => {
      if (!location.state) {
        <Navigate to ="/error"/>;
      }
    } , [location.state])

    const guests = parseInt(adult)+parseInt(children);
    const [link, setLink] = useState(`hotels/prices?destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&landing_page=&partner_id=16&country_code=SG&guests=${createGuestRoomStr(room,guests)}`);
    const [Hotellink, setHotelLink] = useState(`hotels?destination_id=${dest_id}`);

  //console.log(dest_id, checkin, checkout, lang, currency, guests)

  useEffect(() => {
    let link = `hotels/prices?destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&landing_page=&partner_id=16&country_code=SG&guests=${createGuestRoomStr(room,guests)}`
    setLink(link)
  }, [])

  useEffect(() => {
    let link = `hotels?destination_id=${dest_id}`;
    setHotelLink(link)
  }, [])

  useEffect(() => {
    const axios = require('axios');
    //parameters to try for true and array.length == 0 : 2023-08-01
    //parameters to try for false and array.length == 0 : 2018-08-01
    //let link = "https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=WD0M&checkin=2022-07-31&checkout=2022-08-01&lang=en_US&currency=SGD&landing_page=&partner_id=16&country_code=SG&guests=1"
    //let link = `hotels/prices?destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&landing_page=&partner_id=16&country_code=SG&guests=${guests}`
    axios.get(Hotellink).then(response => {
      setHotels(response.data);
    })
      .catch(response => {
      console.log("error from hotel API");
    });
  },[Hotellink])

  useEffect(() => {
    let counter = 0;
    const axios = require('axios');
    const sendGetRequest = async () => {
        try {
            const response = await axios.get(link);
            console.log(response.data);
            setPrices(response.data.hotels); 
            setCompleted(response.data.completed); 
            setLength(response.data.hotels.length);
            console.log("calling data...");
        } catch (err) {
            // Handle Error Here
            console.log("error from price API")
            setBadReq(true);
        }
    };
    while (counter < 5){
      sendGetRequest();
      counter++;
    }
    return () =>{
      console.log("unmounting price API");
      //source.cancel();
    } 
  }, [link /*completed, prices, lengthOfHotel, badReq*/])
  
  //edit callback to prevent rendering
  console.log(prices,hotels)
  let sorted_data = sort_data([prices,hotels]);
  let new_data = useCallback(() => {return [sorted_data,completed,searchComplete,lengthOfHotel,badReq]},[sorted_data,completed,searchComplete,lengthOfHotel,badReq])
  return (
    <div>
      <List data = {new_data} object_input_data = {[dest_id, checkin, checkout, lang, currency, adult, children, room]}/>
    </div>
  );
}
export default Load_data;
