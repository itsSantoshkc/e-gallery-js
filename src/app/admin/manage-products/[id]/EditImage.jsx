"use client";
import React, { useState } from "react";
import { MdChangeCircle, MdDelete } from "react-icons/md";

const EditImage = (props) => {
  const [imageSrc, setImageSrc] = useState(props.src);
  const handleClick = () => {
    props.deleteImage(imageSrc);
  };
  return (
    <div className="relative w-full h-full p-2 transition-all duration-100 cursor-pointer group hover:border-2 hover:border-blue-400 inset-1">
      <img className="w-screen h-screeen" src={imageSrc} alt={props.alt} />
      <div className="absolute flex flex-col translate-x-16 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 *:bg-black *:rounded-full gap-5 top-5 right-5">
        <span onClick={handleClick}>
          <MdDelete className="p-2 text-white cursor-pointer w-11 h-11" />
        </span>
        {/* <span>
          <MdChangeCircle className="p-2 text-white cursor-pointer w-11 h-11" />
        </span> */}
      </div>
    </div>
  );
};

export default EditImage;
