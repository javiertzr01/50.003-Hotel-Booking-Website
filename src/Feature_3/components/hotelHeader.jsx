import React from "react";

const Header = ({ name }) => {
  if (!name) {
    return <p>No header avaliable.</p>;
  }
  return <h1>{name}</h1>;
};

export default Header;
