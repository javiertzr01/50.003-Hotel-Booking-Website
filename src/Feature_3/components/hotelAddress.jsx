import React from "react";

const Address = ({ address }) => {
  if (!address) {
    return <p>No address avaliable.</p>;
  }
  return <span className="fw-light fs-4">{address}</span>;
};

export default Address;
