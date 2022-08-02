import React from "react";
import HotelRoomPicture from "./hotelRoomPicture";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const HotelRoomTable = ({ room_data, booking_details }) => {
  const { hotel_id, dest_id, checkin, checkout, lang, currency, guests } =
    booking_details;

  return (
    <table class="table table-bordered">
      <thead class="table-light">
        <tr>
          <th>Room</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {room_data.rooms.map((room) => (
          <tr key={room.key}>
            <td>
              <b>{room.description}</b>
              <br />
              {`${room.price} ${currency}`}
              <br />
              <HotelRoomPicture pictures={room.images} />
              <br />
              <br />
              <Link
                class="btn btn-primary btn-lg"
                to={`/submission?hotel_id=${hotel_id}&destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&guests=${guests}&key=${room.key}`}
                state={[
                  room.price,
                  hotel_id,
                  dest_id,
                  checkin,
                  checkout,
                  lang,
                  currency,
                  guests,
                ]}
              >
                Book
              </Link>
            </td>
            <td
              class="text-start"
              dangerouslySetInnerHTML={{ __html: room.long_description }}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HotelRoomTable;
