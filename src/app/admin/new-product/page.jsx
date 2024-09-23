"use client";
import React, { FormEvent, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import NewImage from "./newImage";
import SelectGenre from "../components/SelectGenre";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const page = (props) => {
  const router = useRouter();
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const availabelQuantityRef = useRef(null);
  const [genreValue, setGenreValue] = useState(1);
  const { data: session, status } = useSession();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formRef.current === null || formRef.current === undefined) {
      return;
    }
    if (session === null || session === undefined) {
      return toast.error("Please! Try again later");
    }

    if (status === "unauthenticated") {
      return toast.error("Please! Log In to inser new product");
    }

    if (session.user.role !== "admin") {
      toast.error("Unauthorized");
      return router.push("/");
    }

    if (
      titleRef.current.value === "" ||
      descriptionRef.current.value === "" ||
      availabelQuantityRef.current.value === "" ||
      priceRef.current.value === ""
    ) {
      return toast.error("Filds cannot be empty");
    }

    var formData = new FormData();
    formData.append("file[]", formRef.current[0].files[0]);
    formData.append("file[]", formRef.current[1].files[0]);
    formData.append("file[]", formRef.current[2].files[0]);
    formData.append("file[]", formRef.current[3].files[0]);
    formData.append("file[]", formRef.current[4].files[0]);
    formData.append("file[]", formRef.current[5].files[0]);
    formData.set("title", titleRef.current?.value);
    formData.set("description", descriptionRef.current?.value);
    formData.set("price", priceRef.current?.value);
    formData.set("ownerId", session.user.id);
    formData.set("availableQuantity", availabelQuantityRef.current?.value);
    formData.set("labelId", genreValue);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/uploadFile`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (response.status === 200) {
      const responseData = await response.json();

      const productId = responseData.productId;
      toast.success("New Product has been added sucessfully");
      formData.delete("file[]");
      formData.delete("title");
      formData.delete("description");
      formData.delete("price");
      formData.delete("ownerId");
      formData.delete("availableQuantity");
      formData.delete("labelId");

      return router.push(`http://localhost:3000/product/${productId}`);
    }
    return toast.error("Failed to add a product");
  };
  return (
    <div className="min-h-[90vh] my-20 w-full  flex justify-center items-center">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="flex flex-col xl:flex-row w-full mx-4 md:w-3/4 lg:w-2/3 xl:w-[80%] bg-stone-300 rounded-xl xl:pb-8"
      >
        <div className="xl:w-1/2">
          <h1 className="px-3 py-3 pt-6 text-xl font-bold text-center xl:text-3xl xl:pt-10 ">
            File Upload
          </h1>
          <div className="grid grid-cols-3 gap-3 p-3 xl:px-8 *:cursor-pointer *:h-44 md:*:h-64 xl:*:h-80 *:rounded-xl items-center place-content-center ">
            <NewImage />
            <NewImage />
            <NewImage />
            <NewImage />
            <NewImage />
            <NewImage />
          </div>
        </div>
        <div className="xl:flex xl:flex-col xl:items-center xl:justify-center xl:*:w-[90%] xl:*:mx-8  xl:w-1/2 xl:min-h-full">
          <div className="grid grid-cols-1 mx-4 xl:mx-8 place-items-center">
            <h1 className="py-3 text-xl font-bold xl:text-3xl xl:py-6 ">
              Gallery Information
            </h1>
            <label
              className="w-full px-4 py-2 text-lg font-semibold"
              htmlFor="title"
            >
              Title
            </label>
            <input
              ref={titleRef}
              type="text"
              placeholder="Title"
              name="title"
              id="title"
              className="w-full p-2 px-4 font-semibold text-white rounded-lg md:p-3 xl:text-lg xl:p-4 focus:text-black bg-stone-400 focus:bg-stone-300 focus:placeholder:text-black placeholder:text-white placeholder:font-semibold"
            />
            <label
              className="w-full px-4 py-2 text-lg font-semibold"
              htmlFor="description"
            >
              Description
            </label>
            <input
              ref={descriptionRef}
              type="text"
              placeholder="Description"
              name="description"
              id="description"
              className="w-full p-2 px-4 font-semibold text-white rounded-lg md:p-3 xl:text-lg xl:p-4 focus:text-black bg-stone-400 focus:bg-stone-300 focus:placeholder:text-black placeholder:text-white placeholder:font-semibold"
            />
            <label
              className="w-full px-4 py-2 text-lg font-semibold"
              htmlFor="price"
            >
              Price
            </label>
            <input
              ref={priceRef}
              type="text"
              placeholder="Price"
              name="price"
              id="price"
              className="w-full p-2 px-4 font-semibold text-white rounded-lg md:p-3 xl:text-lg xl:p-4 focus:text-black bg-stone-400 focus:bg-stone-300 focus:placeholder:text-black placeholder:text-white placeholder:font-semibold"
            />
            <label
              className="w-full px-4 py-2 text-lg font-semibold"
              htmlFor="availabelQuantity"
            >
              Availabel Quantity
            </label>
            <input
              ref={availabelQuantityRef}
              type="text"
              placeholder="Price"
              name="availabelQuantityRef"
              id="availabelQuantityRef"
              className="w-full p-2 px-4 font-semibold text-white rounded-lg md:p-3 xl:text-lg xl:p-4 focus:text-black bg-stone-400 focus:bg-stone-300 focus:placeholder:text-black placeholder:text-white placeholder:font-semibold"
            />
            <label
              className="w-full px-4 py-2 text-lg font-semibold"
              htmlFor="genre"
            >
              Label
            </label>
            <SelectGenre
              genreValue={genreValue}
              setGenreValue={setGenreValue}
            />
            <input
              type="submit"
              value={"Submit"}
              onClick={handleSubmit}
              className="p-2 px-4 my-3 font-semibold text-white rounded-lg bg-stone-400 focus:bg-stone-300 focus:placeholder:text-black placeholder:text-white placeholder:font-semibold"
            />

            {/* description,title,price,genre */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default page;
