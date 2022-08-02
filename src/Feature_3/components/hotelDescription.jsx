import React from "react";

const Description = ({ description }) => {
  return (
    <div className="container">
      <h2>Description</h2>
      <p
        className="text-start"
        dangerouslySetInnerHTML={{
          __html: description
            ? description
            : "<p>No description available.</p>",
        }}
      />
    </div>
  );
};

export default Description;
