import React from "react";
import HotelRoomPicture from "./hotelRoomPicture";
import { Link } from "react-router-dom";

const HotelRoomTable = ({ room_data, booking_details }) => {
  const { hotel_id, dest_id, checkin, checkout, lang, currency, guests } =
    booking_details[0];
  const hotel_name = booking_details[1];
  console.log(hotel_name);

  return (
    <table className="table table-bordered">
      <thead className="table-light">
        <tr className="d-flex">
          <th className="col-4">Room</th>
          <th className="col-8">Description</th>
        </tr>
      </thead>
      <tbody>
        {room_data.rooms.map((room) => (
          <tr key={room.key} className="d-flex">
            <td className="col-4">
              <b>
                {room.description ? (
                  room.description
                ) : (
                  <p>No description available.</p>
                )}
              </b>
              <br />
              {`${room.price} ${currency}`}
              <br />
              <HotelRoomPicture pictures={room.images} />
              <br />
              <br />
              <Link
                className="btn btn-primary btn-lg"
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
                  room.description,
                  hotel_name,
                ]}
              >
                Book
              </Link>
            </td>
            <td
              className="text-start col-8"
              dangerouslySetInnerHTML={{
                __html: room.long_description
                  ? room.long_description
                  : "<p>No description available.</p>",
              }}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HotelRoomTable;
