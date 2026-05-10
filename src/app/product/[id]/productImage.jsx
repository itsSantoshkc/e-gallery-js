import Image from "next/image";
import React from "react";

const productImage = ({ image, name }) => {
  return (
    <Image
      src={image}
      alt={name}
      width={0}
      height={0}
      sizes="100vw"
      className="object-cover w-full h-full"
    />
  );
};

export default productImage;
