import React, { useEffect, useState, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import Placeholder from 'react-bootstrap/Placeholder';
import Spinner from 'react-bootstrap/Spinner';
import './List.css'
import {Link} from "react-router-dom"


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
function getHotelDataFromCallback(data, num){
  return data[num]
}


function List(props) {
  let getHotelData = (props.data)();
  const [dest_id, checkin, checkout, lang, currency, adult, children, room] = props.object_input_data;
  let data = useMemo(() => getHotelDataFromCallback(getHotelData, 0), [getHotelData]);
  const lengthOfHotel = getHotelData[2]
  const badReq = getHotelData[3]
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [timeout, setTimer] = useState(false);
  const guests = parseInt(adult) + parseInt(children);
  const guest_str = createGuestRoomStr(room,guests);

  const itemsPerPage = 5;

  //create timer 
  useEffect(() => {
    if (!lengthOfHotel) {
      setTimeout(() => {
        setTimer(true);
    }, 15000);
    }
  }, [])


  useEffect(() => {
  }, [badReq])

  useEffect(() => {
      const calculateEndOffset = () => {return itemOffset + itemsPerPage};
      const setThePage = () => {
        setPageCount(page => page = Math.ceil(data.length / itemsPerPage))
      }
      const fetchItems = () => {
        setCurrentItems(items => items = data.slice(itemOffset, endOffset));
      }
      const endOffset = calculateEndOffset();
      fetchItems();
      setThePage();
      
  }, [itemOffset, itemsPerPage, data]);

  
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
    {
    (timeout == false && badReq === false && lengthOfHotel === 0) ? 
    <div>
      <div>loading...</div>
      <Spinner animation="border" role="status"></Spinner>
    </div> :
    (timeout == true && lengthOfHotel == 0 && badReq === false) ? 
    <div>
      <p>There are no hotels currently available, please refresh again or try another entry.</p> 
      <Link to = "/">Please re-start your booking via the following link</Link>
    </div> :
    (lengthOfHotel !== 0 && badReq === false) ?  
    <div>
    <div>{currentItems.map(hotel => {
        return (
          <div key={hotel.id} className='border'>
            <p>Name: {hotel.name}</p>
            <p>Address: {hotel.address}</p>
            <p>Price: {hotel.price}</p>
            <div>
            <Link to={`/hotel?hotel_id=${hotel.id}&destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=en_US&currency=${currency}&guests=${guest_str}`}
            state = {[hotel.id, dest_id, checkin, checkout, currency, adult, children, room]}
            >Select for Booking!</Link>
            </div>
          </div>
          );
        })
      }
    </div>
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div> : 
      (badReq === true) ? <div><p>An error has occurred due to your inputs, please try another entry.</p> <Link to = "/">Please re-start your booking via the following link</Link> </div> : null
    }   
    </>
  );

}
export default List;
