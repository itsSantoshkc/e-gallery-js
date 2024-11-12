"use client";
import React, { useEffect, useRef, useState } from "react";
import EditProductDetails from "./editDetails";
import EditImage from "./EditImage";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FaCamera } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const page = ({ params }) => {
  const [productInfo, setProductInfo] = useState(null);
  const imageRef = useRef(null);
  const labelRef = useRef(null);
  const formRef = useRef(null);
  const DialogRef = useRef(null);
  const getProduct = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}api/admin/product/${params.id}`,
      { method: "GET" }
    );
    if (response.status === 200) {
      const responseData = await response.json();
      console.log(responseData);
      setProductInfo(responseData);
    }
  };

  const deleteImage = async (imageSrc) => {
    if (productInfo && productInfo.productImages.length <= 1) {
      return toast.error("Product should contain atleast one image");
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}api/admin/product/${params.id}`,
      {
        method: "DELETE",
        body: JSON.stringify({
          imagePath: imageSrc,
        }),
      }
    );
    if (response.status === 200) {
      toast.success("Image has been delete successfully");
      return getProduct();
    }
    toast.info("Unable to delete Image");
  };

  const uploadNewImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("event", "event.upload.image");
    formData.append("image", imageRef.current.files[0]);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}api/admin/product/${params.id}`,
      {
        method: "POST",
        body: formData,
      }
    );
    formData.delete("event");
    formData.delete("image");
    imageRef.current.files = null;

    if (response.status === 200) {
      DialogRef.current.lastElementChild.click();
      toast.success("Image uploaded successfully");
      return getProduct();
    }
    toast.error("Please! Try again later");
    // console.log(response);
  };

  // const getInfo = () => {
  //   console.log(imageRef.current.value);
  // };

  const handleFileChange = (e) => {
    const acceptableFileTypes = ["image/png", "image/jpeg", "image/jpg"];

    const file = e.target.files;
    if (!file) {
      return toast.info("File not found");
    }
    if (!acceptableFileTypes.includes(file[0].type)) {
      return toast.info("Please Submit Image only");
    }
    if (!labelRef) {
      return;
    }
    let imageElement = labelRef.current.firstElementChild;

    if (imageElement === null || imageElement === undefined) {
      return;
    }

    imageElement.src = URL.createObjectURL(file[0]);
    if (imageElement.classList.contains("hidden")) {
      imageElement.classList.toggle("hidden");
    }

    if (labelRef.current.classList.contains("border-dashed")) {
      labelRef.current.classList.toggle("border-dashed");
      labelRef.current.classList.toggle("border");
    }
  };
  console.log(productInfo && productInfo.productImages);
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="min-h-[95vh] w-full mt-16 flex flex-col justify-center items-center">
      <div className="my-10">
        <h1 className="text-5xl font-semibold">Edit your product</h1>
      </div>
      <div className="flex flex-col items-center justify-center w-2/3 h-full my-10 ">
        <div className="gap-5 px-5 md:gap-0 md:px-0">
          {productInfo &&
            productInfo.productImages.map((image, idx) => (
              <EditImage
                key={idx}
                src={image}
                alt={productInfo.name}
                deleteImage={deleteImage}
              />
            ))}

          {productInfo && productInfo.productImages.length < 6 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-1/2 py-10 text-2xl">Add new image </Button>
              </DialogTrigger>
              <DialogContent className="min-w-[50vw] h-[75vh]" ref={DialogRef}>
                <DialogHeader className="min-h-[95%]">
                  <DialogTitle>Add New Image</DialogTitle>
                  <DialogDescription>
                    Add new image for your product
                  </DialogDescription>
                  <form
                    ref={formRef}
                    onSubmit={uploadNewImage}
                    encType="multipart/form-data"
                    className="flex inset-1 items-center px-2  justify-center w-full h-[50vh] "
                  >
                    <label
                      ref={labelRef}
                      className="flex items-center justify-center w-full h-full text-5xl transition-colors duration-300 border border-dashed cursor-pointer hover:bg-stone-300 rounded-xl border-stone-500 "
                    >
                      <img
                        className="hidden object-cover w-full h-full min-w-full min-h-full rounded-xl"
                        src=""
                      />
                      <input
                        ref={imageRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        type="file"
                        hidden
                      />
                      <FaCamera className="text-6xl" />
                    </label>
                    {/* <button onClick={uploadNewImage}>Get Info</button> */}
                  </form>
                </DialogHeader>

                <DialogFooter>
                  <Button
                    onClick={uploadNewImage}
                    className="w-full mx-20 text-xl py-7"
                    type="submit"
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
        {productInfo && (
          <EditProductDetails
            id={productInfo.id}
            title={productInfo.name}
            description={productInfo.description}
            price={productInfo.price}
          />
        )}
      </div>
    </div>
  );
};

export default page;
