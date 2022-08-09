import React from "react";

const Description = ({ description }) => {
  return (
    <div className="container text-start">
      <h2>Description</h2>
      <p
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
