import React from "react";

const Book = ({ room_data, booking_details }) => {
  const { checkin, checkout, guests } = booking_details[0];
  console.log(room_data);

  return (
    <div className="container text-start">
      <h3>Rooms</h3>
      <p className="fs-5">
        {room_data.rooms.length} rooms available from {checkin} to {checkout}{" "}
        for {guests} guests.
      </p>
    </div>
  );
};

export default Book;
