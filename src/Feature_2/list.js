import React, { useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import Placeholder from 'react-bootstrap/Placeholder';
import Spinner from 'react-bootstrap/Spinner';
import './List.css'
import {Link} from "react-router-dom"


function List(props) {
  let getHotelData = props.data;
  const [dest_id, checkin, checkout, lang, currency, guests] = props.object_input_data;
  let data = []; 
  data = getHotelData()[0];
  const completed = getHotelData()[1]
  const lengthOfHotel = getHotelData()[2]
  const badReq = getHotelData()[3]
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);


  // let search = window.location.search;
  // let params = new URLSearchParams(search);
  // const dest_id = params.get('destination_id');
  // const checkin = params.get('checkin');
  // const checkout = params.get('checkout');
  // const lang = params.get('lang');
  // const currency = params.get('currency');
  // const guests = params.get("guests");

  const itemsPerPage = 5;

  useEffect(() => {
    console.log(badReq);
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
    {(lengthOfHotel !== 0 && completed === true) ?  
        <div>
        <div>{currentItems.map(hotel => {
            return (
              <div key={hotel.id} className='border'>
                <p>Name: {hotel.name}</p>
                <p>Address: {hotel.address}</p>
                <p>Price: {hotel.price}</p>
                <div>
                <Link to={`/hotel?hotel_id=${hotel.id}&destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=en_US&currency=${currency}&guests=${guests}`}
                state = {[hotel.id, dest_id, checkin, checkout, currency, guests]}
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
        (completed === true && lengthOfHotel === 0 && badReq === false) ? <div><p>There are no hotels currently available, please refresh again or try another entry.</p></div> :
        (completed === false && badReq === false) ? <div>
          <div>loading...</div>
          <Spinner animation="border" role="status"></Spinner>
          </div> :
        //(badReq === false) ? <div><p>There are no hotels currently available, please try another entry.</p></div> : null
        (badReq === true) ? <div><p>An error has occurred due to your inputs, please try another entry.</p> <Link to = "/">Please re-start your booking via the following link</Link> </div> : null
        
    }   
    </>
  );

}
export default List;
