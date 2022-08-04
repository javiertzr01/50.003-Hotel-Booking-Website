import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios'
import List from './list.js';
import { useLocation, useNavigate, Navigate } from "react-router-dom";


function sort_data(data){
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

function Load_data() {

  //add prop here when needed 
  const [prices, setPrices] = useState([])
  const [completed, setCompleted] = useState(false)
  const [lengthOfHotel, setLength] = useState(0);
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
  
  //console.log(location);
  const navigate = useNavigate();

    // checks if state is defined, if not it will redirect to error
    useEffect(() => {
      if (!location.state) {
        <Navigate to ="/error"/>;
      }
    } , [])

    const guests = parseInt(adult)+parseInt(children);
    const [link, setLink] = useState(`hotels/prices?destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&landing_page=&partner_id=16&country_code=SG&guests=${guests}`);
    const [Hotellink, setHotelLink] = useState(`hotels?destination_id=${dest_id}`);

  //console.log(dest_id, checkin, checkout, lang, currency, guests)

  useEffect(() => {
    let link = `hotels/prices?destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&landing_page=&partner_id=16&country_code=SG&guests=${guests}`
    setLink(link)
  }, [dest_id, checkin, checkout, lang, currency, guests])

  useEffect(() => {
    let link = `hotels?destination_id=${dest_id}`;
    setHotelLink(link)
  }, [dest_id])

  useEffect(() => {
    const axios = require('axios');
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const sendGetRequest = async () => {
      try {
          const response = await axios.get(Hotellink);
          //console.log(response.data);
          setHotels(response.data)
          console.log("hotel stuff loading");
        } catch (err) {

      }
  };

    sendGetRequest();

    return () => source.cancel();
  }, [Hotellink, completed, hotels])

  useEffect(() => {
    const axios = require('axios');
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    
    const sendGetRequest = async () => {
        try {
            const response = await axios.get(link);
            //console.log(response.data);
            setPrices(response.data.hotels); 
            setCompleted(response.data.completed); 
            setLength(response.data.hotels.length);
            console.log("calling data...");
        } catch (err) {
            // Handle Error Here
            setBadReq(true);
        }
    };
    sendGetRequest();

    return () => source.cancel();
  }, [link, completed, prices, lengthOfHotel, badReq])

  // useEffect(() => {
  //   //parameters to try for true and array.length == 0 : 2023-08-01
  //   //parameters to try for false and array.length == 0 : 2018-08-01
  //   //let original_link = "https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=WD0M&checkin=2022-07-31&checkout=2022-08-01&lang=en_US&currency=SGD&landing_page=&partner_id=16&country_code=SG&guests=1"
  //   //let link = `hotels/prices?destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&landing_page=&partner_id=16&country_code=SG&guests=${guests}`
  //   const axios = require('axios');
  //   const sendGetRequest = async () => {
  //       try {
  //           const response = await axios.get(link);
  //           //console.log(response.data);
  //           setPrices(response.data.hotels); 
  //           setCompleted(response.data.completed); 
  //           setLength(response.data.hotels.length);
  //           console.log("calling data...");
  //       } catch (err) {
  //           // Handle Error Here
  //           setBadReq(true);
  //       }
  //   };
  //   sendGetRequest();
  // },[link, completed, prices, lengthOfHotel, badReq])


  // useEffect(() => {
    //let link = "hotels?destination_id=WD0M"
    //let link = `hotels?destination_id=${dest_id}`
  //   const sendGetRequest = async () => {
  //     try {
  //         const response = await axios.get(Hotellink);
  //         //console.log(response.data);
  //         setHotels(response.data)
  //         console.log("hotel stuff loading");
  //     } catch (err) {
  //     }
  // };
    // const data = axios.get(Hotellink).then(response => {setHotels(response.data)})
    // console.log("hotel stuuff loading"); 
  //   sendGetRequest();
  
  // },[Hotellink, completed, hotels])
  
  //edit callback to prevent rendering
  let sorted_data = sort_data([prices,hotels]);
  let new_data = useCallback(() => {return [sorted_data,completed,lengthOfHotel,badReq]},[sorted_data,completed,lengthOfHotel,badReq])
  return (
    <div>
      <List data = {new_data} object_input_data = {[dest_id, checkin, checkout, lang, currency, guests]}/>
    </div>
  );
}
export default Load_data;
