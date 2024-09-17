import { Button } from "@/components/ui/button";
import React from "react";
import { MdChangeCircle, MdDelete } from "react-icons/md";

const EditImage = (props) => {
  return (
    <div className="relative w-full h-full">
      <img className="w-screen h-screeen" src={props.src} alt={props.alt} />
      <div className="absolute flex flex-col *:bg-black *:rounded-full gap-5 top-5 right-5">
        <span>
          <MdDelete className="p-2 text-white cursor-pointer w-11 h-11" />
        </span>
        <span>
          <MdChangeCircle className="p-2 text-white cursor-pointer w-11 h-11" />
        </span>
      </div>
    </div>
  );
};

export default EditImage;
