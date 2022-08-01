import React from "react";

const Address = ({ address }) => {
  if (!address) {
    return <p>No address avaliable.</p>;
  }
  return <p>Address: {address}</p>;
};

export default Address;
