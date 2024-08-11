"use client";
import React, { useRef } from "react";
import { FaCamera } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

const NewImage = () => {
  const containerRef = useRef(null);

  const handleFileChange = (e) => {
    const acceptableFileTypes = ["image/png", "image/jpeg", "image/jpg"];

    const file = e.target.files;
    if (!file) {
      return console.log("No file found");
    }
    if (!acceptableFileTypes.includes(file[0].type)) {
      return toast.info("Please Submit image only");
    }
    if (containerRef.current === null) {
      return;
    }
    let mainContainer = containerRef.current;
    let labelElement = mainContainer?.firstElementChild;
    let imageElement = labelElement?.children[0];
    let deleteIcon = mainContainer?.lastElementChild;

    if (imageElement === null || imageElement === undefined) {
      return;
    }
    if (deleteIcon === null || deleteIcon === undefined) {
      return;
    }

    //@ts-ignore
    imageElement.src = URL.createObjectURL(file[0]);
    if (imageElement.classList.contains("hidden")) {
      imageElement.classList.toggle("hidden");
    }

    if (mainContainer.classList.contains("border-dashed")) {
      mainContainer.classList.toggle("border-dashed");
      mainContainer.classList.toggle("border");
    }

    if (deleteIcon.classList.contains("hidden")) {
      deleteIcon.classList.toggle("hidden");
    }
  };

  const handleDelete = (e) => {
    if (containerRef.current === null) {
      return;
    }
    let mainContainer = containerRef.current;
    let labelElement = mainContainer?.firstElementChild;
    let imageElement = labelElement?.children[0];
    let inputElement = labelElement?.children[1];
    let deleteIcon = mainContainer?.lastElementChild;
    if (imageElement === null || imageElement === undefined) {
      return;
    }
    if (deleteIcon === null || deleteIcon === undefined) {
      return;
    }
    console.log(containerRef.current?.firstElementChild?.children);
    //@ts-ignore
    imageElement.src = "";
    //@ts-ignore
    inputElement.value = "";
    if (!imageElement.classList.contains("hidden")) {
      imageElement.classList.toggle("hidden");
    }
    if (!deleteIcon.classList.contains("hidden")) {
      deleteIcon.classList.toggle("hidden");
    }

    if (!mainContainer.classList.contains("border")) {
      mainContainer.classList.toggle("border-dashed");
      mainContainer.classList.toggle("border");
    }
  };
  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full h-full transition-colors duration-300 border border-dashed hover:bg-stone-400 hover:text-stone-300 text-stone-600 border-stone-500"
    >
      <label className="flex items-center justify-center w-full h-full text-5xl ">
        <img
          className="hidden object-cover w-full h-full min-w-full min-h-full rounded-xl"
          src=""
        />
        <input onChange={handleFileChange} type="file" hidden />
        <FaCamera />
      </label>
      <MdDelete
        onClick={handleDelete}
        className="absolute top-[-15px] right-[-15px] text-red-500 text-4xl transition-colors hover:text-red-400 duration-300 hidden p-1 rounded-full bg-white"
      />
    </div>
  );
};

export default NewImage;
