import React from "react";

const productImage = ({ image, name }) => {
  return <Image src={image} alt={name} fill className="object-contain" />;
};

export default productImage;
