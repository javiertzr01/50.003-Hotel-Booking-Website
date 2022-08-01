import React from "react";
import HotelRoomPicture from "./hotelRoomPicture";
import { Link } from "react-router-dom";

const HotelRoomTable = ({ room_data, booking_details }) => {
  const {hotel_id, dest_id, checkin, checkout, lang, currency, guests} = booking_details;

  return (
    <table>
      <thead>
        <tr>
          <th>Room</th>
          <th>Description</th>
          <th>Picture</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {room_data.rooms.map((room) => (
          <tr key={room.key}>
            <td>
              <div>
                {room.description}
                <Link to={`/submission?hotel_id=${hotel_id}&destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&guests=${guests}&key=${room.key}`}
                state = {[room.price, hotel_id, dest_id, checkin, checkout, lang, currency, guests]}
                >Book now!</Link>
              </div>
            </td>
            <td dangerouslySetInnerHTML={{ __html: room.long_description }} />
            <td>
              <HotelRoomPicture pictures={room.images} />
            </td>
            <td>{`${room.price} ${currency}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HotelRoomTable;
