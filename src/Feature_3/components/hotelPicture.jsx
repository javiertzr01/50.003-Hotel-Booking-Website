import React from "react";

const HotelPicture = ({ id }) => {
  const image_src = `https://www.kaligo.com/images/new/${id}/i1.jpg`;
  const image_src_alt = `https://www.kaligo.com/images/old/${id}/i1.jpg`;

  return (
    <object data={image_src} className="img-fluid">
      <img src={image_src_alt} className="img-fluid" alt=""></img>
    </object>
  );
};

export default HotelPicture;
