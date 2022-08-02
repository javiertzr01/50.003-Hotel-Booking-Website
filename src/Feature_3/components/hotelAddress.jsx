import React from "react";

const Address = ({ address }) => {
  if (!address) {
    return <p>No address avaliable.</p>;
  }
  return (
    <p>
      <span className="fw-bold">Address:</span> {address}
    </p>
  );
};

export default Address;
