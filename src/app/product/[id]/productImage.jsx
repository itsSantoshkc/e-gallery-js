import React from "react";

const productImage = ({ image, name }) => {
  return (
    <img key={image} className="w-screen max-h-screen" src={image} alt={name} />
  );
};

export default productImage;
