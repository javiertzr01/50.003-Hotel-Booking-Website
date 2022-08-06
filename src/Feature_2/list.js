import React, { useEffect, useState, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from "react-router-dom"
import { Layout, Menu, Button, Rate } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import {DropdownButton, Dropdown} from 'react-bootstrap';
import './List.css'

const { Header, Content, Footer, Sider } = Layout;

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
  const props_arr = [checkin, checkout, adult, children, room]
  let data = useMemo(() => getHotelDataFromCallback(getHotelData, 0), [getHotelData]);
  const lengthOfHotel = getHotelData[2]
  const badReq = getHotelData[3]
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [timeout, setTimer] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const guests = parseInt(adult) + parseInt(children);
  const guest_str = createGuestRoomStr(room,guests);

  const items2 = [CalendarOutlined].map((icon, index) => {
    const key = String(index + 1);
    const arr = ['Check-in Date', 'Check-out Date', 'Number of Adult', 'Number of Children', 'Number of Rooms']
    //console.log(key)
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `View booking information`,
      children: props_arr.map((item, j) => {
        const subKey = j;
        //console.log(j)
        return {
          key: subKey,
          label: `${arr[j]}: ${item}`,
        };
      }),
    };
  });

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
    <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" />
    </Header>
    <Content
      style={{
        padding: '0 15%',
      }}
    >
      <Layout
        className="site-layout-background"
        style={{
          padding: '1% 0',
        }}
      >
        <Sider className="site-layout-background" width={300}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%'
            }}
            items={items2}
          />

        </Sider>
        <Content 
      style={{
        padding: '0 0%',
      }}>
    <div className="site-layout-content">
    {
    (timeout === false && badReq === false && lengthOfHotel === 0) ? 
    <div>
      <Spinner animation="border" role="status" style={{ width: "5rem", height: "5rem" }}></Spinner>
    </div> :
    (timeout === true && lengthOfHotel === 0 && badReq === false) ? 
    <div>
      <p>There are no hotels currently available, please refresh again or try another entry.</p> 
      <Link to = "/">Please re-start your booking.</Link>
    </div> :
    (lengthOfHotel !== 0 && badReq === false) ?  
    <div>
    <div>{currentItems.map(hotel => {
      //console.log(hotel.image_details.prefix.slice(0,-1) + hotel.image_details.suffix)
        return (
        <div id="hotelname">
            <div id="sideBar"><img  className="img-fix" src={`https://www.kaligo.com/images/new/${hotel.id}/i1.jpg?fit=cover&h=250&w=250`}></img></div>
            <div id="content">
            <div key={hotel.id} className='border card'>
              <h3 className = "title">{hotel.name}</h3>
              <p className = "address">{hotel.address}</p>
              <a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${hotel.latitude},${hotel.longitude}`}className = "viewmap">View me in Maps!</a>
              <h2 className = "price">{hotel.price} {currency}</h2>
              <Rate className = "rating" disabled defaultValue={hotel.rating} />
              <div>
                <Button type="primary" size={'large'} className = "purchase-btn">
                   <Link to={`/hotel?hotel_id=${hotel.id}&destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=en_US&currency=${currency}&guests=${guest_str}`}
                   state = {[hotel.id, dest_id, checkin, checkout, currency, adult, children, room]}
                   >Select for Booking!</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
          );
        })
      }
    </div>
    <div className='border-page'>
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
   <DropdownButton id="dropdown-item-button" className="pagination-menu" title="Hotels per Page" onSelect={(e)=>{console.log(e);setItemsPerPage(parseInt(e))}}>
        <Dropdown.Item as="button" eventKey='5'>5 / Page</Dropdown.Item>
        <Dropdown.Item as="button" eventKey='10'>10 / Page</Dropdown.Item>
        <Dropdown.Item as="button" eventKey='15'>15 / Page</Dropdown.Item>
        <Dropdown.Item as="button" eventKey='20'>20 / Page</Dropdown.Item>
    </DropdownButton>    
      </div>
    </div> : 
      (badReq === true) ? <div><p>An error has occurred due to your inputs, please try another entry.</p> <Link to = "/">Please re-start your booking.</Link> </div> : null
    }   
    </div>
    </Content>
      </Layout>
    </Content>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Done by our dearest group members ©2022
    </Footer>
  </Layout>
    </>
  );
}
export default List;
