import React from "react";

const Description = ({ description }) => {
  if (!description) {
    return <p>No desciption avaliable.</p>;
  }
  return (
    <div>
      <h2>Description</h2>
      <p dangerouslySetInnerHTML={{ __html: description }}></p>
    </div>
  );
};

export default Description;
