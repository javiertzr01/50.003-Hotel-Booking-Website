import React from "react";

const Description = ({ description }) => {
  if (!description) {
    return <p>No desciption avaliable.</p>;
  }
  return (
    <div className="container">
      <h2>Description</h2>
      <p
        className="text-start"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default Description;
