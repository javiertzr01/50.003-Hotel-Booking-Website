import React from "react";

const Header = ({ name }) => {
  if (!name) {
    return <p>No header avaliable.</p>;
  }
  return <h2>{name}</h2>;
};

export default Header;
