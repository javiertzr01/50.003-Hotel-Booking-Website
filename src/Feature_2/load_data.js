import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios'
import List from './list.js'


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
  const [completed, setCompleted] = useState(true)
  const [lengthOfHotel, setLength] = useState(0);
  const [badReq, setBadReq] = useState(false);


  let search = window.location.search;
  let params = new URLSearchParams(search);
  const dest_id = params.get('destination_id');
  const checkin = params.get('checkin');
  const checkout = params.get('checkout');
  const lang = params.get('lang');
  const currency = params.get('currency');
  const guests = params.get("guests");

  //console.log(dest_id, checkin, checkout, lang, currency, guests)

  const [link, setLink] = useState(`hotels/prices?destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&landing_page=&partner_id=16&country_code=SG&guests=${guests}`);
  const [Hotellink, setHotelLink] = useState(`hotels?destination_id=${dest_id}`);

  useEffect(() => {
    let link = `hotels/prices?destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&landing_page=&partner_id=16&country_code=SG&guests=${guests}`
    setLink(link)
  }, [dest_id, checkin, checkout, lang, currency, guests])

  useEffect(() => {
    let link = `hotels?destination_id=${dest_id}`;
    setHotelLink(link)
  }, [dest_id])


  useEffect(() => {
    //parameters to try for true and array.length == 0 : 2023-08-01
    //parameters to try for false and array.length == 0 : 2018-08-01
    //let link = "https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=WD0M&checkin=2022-07-31&checkout=2022-08-01&lang=en_US&currency=SGD&landing_page=&partner_id=16&country_code=SG&guests=1"
    //let link = `hotels/prices?destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&landing_page=&partner_id=16&country_code=SG&guests=${guests}`
      const data = axios.get(link).then(response => { 
        setPrices(response.data.hotels); 
        setCompleted(response.data.completed); 
        setLength(response.data.hotels.length)}).catch(response => {
          setBadReq(true);
        });
    
  },[link, completed, prices])

  const [hotels, setHotels] = useState([])
  useEffect(() => {
    //let link = "hotels?destination_id=WD0M"
    //let link = `hotels?destination_id=${dest_id}`
    const data = axios.get(Hotellink).then(response => {setHotels(response.data)})
    
  },[Hotellink, completed, hotels])
  
  //edit callback to prevent rendering
  let sorted_data = sort_data([prices,hotels]);
  let new_data = useCallback(() => {return [sorted_data,completed,lengthOfHotel,badReq]},[sorted_data,completed,lengthOfHotel,badReq])
  return (
    <div>
      <List data = {new_data} object_input_data = {{dest_id, checkin, checkout, lang, currency, guests}}/>
    </div>
  );
}
export default Load_data;