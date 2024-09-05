import React from "react";

const productImage = ({ image }) => {
  return <img key={image} className="w-screen max-h-screen" src={image} />;
};

export default productImage;
