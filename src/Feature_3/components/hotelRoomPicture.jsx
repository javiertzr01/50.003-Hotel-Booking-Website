import React from "react";

const HotelRoomPicture = ({ pictures }) => {
  if (!pictures[0]) {
    return <p>No picture available.</p>;
  }

  return <img src={pictures[0].url} alt="" className="img-fluid" />;
};

export default HotelRoomPicture;
