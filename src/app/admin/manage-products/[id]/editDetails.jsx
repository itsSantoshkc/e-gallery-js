"use client";
import React, { useState } from "react";
import SelectGenre from "../../components/SelectGenre";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const EditProductDetails = (props) => {
  const [title, settitle] = useState(props.title);
  const [genreValue, setGenreValue] = useState(3);
  const [price, setPrice] = useState(props.price);
  const [description, setDescription] = useState(props.description);

  const handleDescription = (e) => {
    if (description.length <= 500) {
      return setDescription(e.target.value);
    }
    return toast.error("Description cannot be more than 500 characters");
  };

  const handlePrice = (e) => {
    setPrice(parseFloat(e.target.value));
  };

  const updateProductInfo = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}api/admin/product/${props.id}`,
      {
        cache: "no-store",
        method: "PUT",
        body: JSON.stringify({
          name: title,
          description: description,
          price: price,
        }),
      }
    );
    console.log(await response.json());
  };

  return (
    <div className="bg-white  border flex justify-start items-center group flex-col fixed rounded-t-2xl bottom-0 duration-500 transition-all translate-y-[90%]   hover:translate-y-0 md:w-2/3 lg:w-[70%] xl:w-3/5 2xl:w-3/5 w-[90%]">
      <div className="h-2 my-4 bg-black rounded-full cursor-pointer w-44 animate-bounce"></div>
      <div className="flex flex-col items-center justify-center w-full h-full px-4 lg:px-8 xl:px-12">
        <div className="flex flex-col items-center justify-between w-full ">
          <label className="w-full px-2 text-xl font-semibold">Title</label>
          <input
            onChange={(e) => settitle(e.target.value)}
            value={title}
            className="w-full p-2 text-xl font-bold border rounded-xl border-stone-500 lg:text-2xl lg:mt-4"
          />
        </div>
        <label className="w-full px-2 mt-2 text-xl font-semibold">
          Description
        </label>
        <textarea
          rows="4"
          cols="40"
          value={description}
          onChange={handleDescription}
          className="w-full p-2 my-2 text-justify border rounded-xl border-stone-500 xl:text-xl xl:my-4 "
        ></textarea>
        <div className="flex flex-col items-center justify-between w-full ">
          <label className="w-full px-2 text-xl font-semibold">Price</label>
          <input
            onChange={handlePrice}
            type="number"
            value={price}
            className="w-full p-2 text-xl font-bold border appearance-none rounded-xl border-stone-500 lg:text-2xl lg:mt-4cd"
          />
        </div>
        <label className="w-full px-2 mt-2 text-xl font-semibold">Label</label>
        <div className="w-full flex *:mr-2 *:p *:px-2 lg:my-4 my-2 *:border *:rounded-xl">
          <SelectGenre genreValue={genreValue} setGenreValue={setGenreValue} />
        </div>
        <div className="my-2 mb-5" onClick={updateProductInfo}>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default EditProductDetails;
