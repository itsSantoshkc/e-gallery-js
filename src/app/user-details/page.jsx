"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";

import { MdDelete } from "react-icons/md";

const page = (props) => {
  const { data: session, update } = useSession();
  const [gender, setGender] = useState("");
  const [state, setState] = useState("");
  const tabContainer = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const birthDateRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const profilePictureRef = useRef(null);
  const containerRef = useRef(null);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = session?.user.id;
    const name = firstNameRef.current?.value + " " + lastNameRef.current?.value;
    const birthDate = birthDateRef.current?.value;
    const userGender = gender;
    const phone = phoneRef.current?.value;
    const province = state;
    const address = addressRef.current?.value;

    // if (
    //   name === "" ||
    //   userGender === "" ||
    //   birthDate === "" ||
    //   address === "" ||
    //   province === "" ||
    //   phone === ""
    // ) {
    //   return toast.error("Fields cannot be empty");
    // }

    const formData = new FormData();
    formData.set("userId", userId);
    formData.set("name", name);
    formData.set("birthDate", birthDate);
    formData.set("gender", userGender);
    formData.set("phone", phone);
    formData.set("province", province);
    formData.set("address", address);
    if (profilePictureRef.current?.files !== null) {
      formData.set("profilePic", profilePictureRef.current?.files[0]);
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/user`, {
      method: "post",
      body: formData,
    });

    const responseData = await response.json();
    if (response.status === 200) {
      await update({
        name: name,
        image: responseData.image,
      });
      return router.push("/");
    }
    return toast.error(responseData.message);
  };

  const handleNext = (index) => {
    console.log(tabContainer.current?.clientWidth);
    if (tabContainer.current) {
      tabContainer.current.style.transform = `translateX(-${
        tabContainer.current?.clientWidth * index
      }px)`;
    }
  };
  const handleBack = (index) => {
    console.log(tabContainer.current?.clientWidth);
    if (tabContainer.current) {
      tabContainer.current.style.transform = `translateX(-${
        tabContainer.current?.clientWidth * index
      }px)`;
    }
  };

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
    let imageElement = labelElement?.firstElementChild;
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
  const handleDelete = () => {
    if (containerRef.current === null) {
      return;
    }
    let mainContainer = containerRef.current;
    let labelElement = mainContainer?.firstElementChild;
    let imageElement = labelElement?.firstElementChild;
    let inputElement = labelElement?.lastElementChild;
    let deleteIcon = mainContainer?.lastElementChild;

    console.log(deleteIcon);

    if (imageElement === null || imageElement === undefined) {
      return;
    }
    if (deleteIcon === null || deleteIcon === undefined) {
      return;
    }
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
    <div className="h-full max-w-[100vw] w-full flex text-stone-600 justify-center items-center">
      <div className=" flex overflow-hidden flex-col sm:w-3/4 sm:px-5 md:w-[768px] py-5 w-full  mx-4 rounded-xl bg-stone-200 ">
        <h1 className="w-full pt-3 mt-4 text-3xl font-bold text-center">
          User Details
        </h1>

        <div className="py-1">
          <h2 className="font-semibold text-center ">
            *Please provide your valid information
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          method="post"
          ref={tabContainer}
          encType="multipart/form-data"
          className="flex items-center w-full transition-transform duration-300 -translate-x-0"
        >
          <div className="flex flex-col items-center justify-center w-full h-full min-w-full ">
            <h1 className="mb-4 text-2xl font-bold">Basic Details</h1>
            <div className="flex justify-center items-center flex-col w-[80%] ">
              <div className="flex flex-col w-full">
                <label
                  className="px-3 pt-3 pb-1 font-semibold lg:pb-2 lg:text-lg"
                  htmlFor="first-name"
                >
                  First Name
                </label>
                <input
                  ref={firstNameRef}
                  placeholder="Enter your first name"
                  type="text"
                  name="first-name"
                  id="first-name"
                  className="h-10 px-3 font-semibold rounded-xl md:h-12 lg:h-14"
                />
              </div>
              <div className="flex flex-col w-full">
                <label
                  className="px-3 pt-3 pb-1 font-semibold lg:pb-2 lg:text-lg"
                  htmlFor="last-name"
                >
                  Last Name
                </label>
                <input
                  ref={lastNameRef}
                  placeholder="Enter your last name"
                  type="text"
                  name="last-name"
                  id="last-name"
                  className="h-10 px-3 font-semibold rounded-xl md:h-12 lg:h-14"
                />
              </div>
              <div className="flex flex-col w-full">
                <label
                  className="px-3 pt-3 pb-1 font-semibold lg:pb-2 lg:text-lg"
                  htmlFor="birth-date"
                >
                  Birth Date
                </label>
                <input
                  ref={birthDateRef}
                  type="date"
                  name="birth-date"
                  id="birth-date"
                  className="h-10 px-3 font-semibold rounded-xl md:h-12 lg:h-14"
                />
              </div>
              <div className="flex flex-col items-center justify-center w-full py-4">
                <button
                  className="bg-stone-600 font-semibold flex items-center justify-center *:mx-2 lg:text-lg text-white h-12 px-3 py-3 rounded-xl w-1/2"
                  type="button"
                  onClick={() => handleNext(1)}
                >
                  Next <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full min-w-full ">
            <div className="flex items-center w-[80%] mb-2">
              <div
                className="flex  text-lg font-semibold cursor-pointer items-center hover:text-stone-500 justify-center *:mx-2 lg:text-lg"
                onClick={() => handleBack(0)}
              >
                <FaArrowLeft /> Back
              </div>
            </div>

            <div className="flex justify-center items-center flex-col w-[80%] ">
              <h1 className="mb-4 text-xl font-semibold">
                Press on icon to upload profile picture
              </h1>
              <div
                ref={containerRef}
                className="relative flex flex-col items-center justify-center rounded-full w-72 h-72 "
              >
                <label
                  className="flex items-center justify-center w-full h-full text-5xl rounded-full cursor-pointer "
                  htmlFor="profilePicture"
                >
                  <img
                    className="hidden object-cover w-full h-full min-w-full min-h-full rounded-full "
                    src=""
                  />
                  <CgProfile className="text-[17.75rem]" />
                  <input
                    ref={profilePictureRef}
                    onChange={handleFileChange}
                    type="file"
                    name="profilePicture"
                    id="profilePicture"
                    hidden
                  />
                </label>
                <MdDelete
                  onClick={handleDelete}
                  className="absolute top-0 right-[30px] text-red-500 text-5xl transition-colors hidden hover:text-red-400 duration-300  p-1 rounded-full bg-white"
                />
              </div>

              <div className="flex flex-col items-center justify-center w-full py-4">
                <button
                  type="button"
                  className="bg-stone-600 font-semibold flex items-center justify-center *:mx-2 lg:text-lg text-white h-12 px-3 py-3 rounded-xl w-1/2"
                  onClick={() => handleNext(2)}
                >
                  Next <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full min-w-full ">
            <div className="flex items-center w-[80%] mb-2">
              <div
                className="flex  text-lg font-semibold cursor-pointer items-center hover:text-stone-500 justify-center *:mx-2 lg:text-lg"
                onClick={() => handleBack(1)}
              >
                <FaArrowLeft /> Back
              </div>
            </div>

            <div className="flex justify-center items-center flex-col w-[80%] ">
              <div className="flex flex-col w-full">
                <label
                  className="px-3 pt-3 pb-1 font-semibold lg:pb-2 lg:text-lg"
                  htmlFor=""
                >
                  Gender
                </label>
                <Select defaultValue={gender} onValueChange={setGender}>
                  <SelectTrigger className="h-10 px-3 font-semibold rounded-xl md:h-12 lg:h-14">
                    <SelectValue placeholder="Select a Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className=" rounded-xl">
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Others">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col w-full">
                <label
                  className="px-3 pt-3 pb-1 font-semibold lg:pb-2 lg:text-lg"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  ref={phoneRef}
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone number"
                  className="h-10 px-3 font-semibold rounded-xl md:h-12 lg:h-14"
                />
              </div>

              <div className="flex flex-col items-center justify-center w-full py-4">
                <button
                  type="button"
                  className="bg-stone-600 font-semibold flex items-center justify-center *:mx-2 lg:text-lg text-white h-12 px-3 py-3 rounded-xl w-1/2"
                  onClick={() => handleNext(3)}
                >
                  Next <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full min-w-full ">
            <div className="flex items-center w-[80%] mb-2">
              <div
                className="flex  text-lg font-semibold cursor-pointer items-center hover:text-stone-500 justify-center *:mx-2 lg:text-lg"
                onClick={() => handleBack(2)}
              >
                <FaArrowLeft /> Back
              </div>
            </div>

            <div className="flex justify-center items-center flex-col w-[80%] ">
              <div className="flex flex-col w-full">
                <label
                  className="px-3 pt-3 pb-1 font-semibold lg:pb-2 lg:text-lg"
                  htmlFor=""
                >
                  Province
                </label>
                <Select defaultValue={state} onValueChange={setState}>
                  <SelectTrigger className="h-10 px-3 font-semibold rounded-xl md:h-12 lg:h-14">
                    <SelectValue placeholder="Select a Province" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className=" rounded-xl">
                      <SelectLabel>Province</SelectLabel>
                      <SelectItem value="Province 1">Province 1</SelectItem>
                      <SelectItem value="Madhesh Pradesh">
                        Madhesh Pradesh
                      </SelectItem>
                      <SelectItem value="Bagmati">Bagmati</SelectItem>
                      <SelectItem value="Gandaki">Gandaki</SelectItem>
                      <SelectItem value="Lumbini">Lumbini</SelectItem>
                      <SelectItem value="Karnali">Karnali</SelectItem>
                      <SelectItem value="Sudurpaschim">Sudurpaschim</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col w-full">
                <label
                  className="px-3 pt-3 pb-1 font-semibold lg:pb-2 lg:text-lg"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  ref={addressRef}
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter your address"
                  className="h-10 px-3 font-semibold rounded-xl md:h-12 lg:h-14"
                />
              </div>
              <div className="flex flex-col items-center justify-center w-full py-4">
                <button
                  className="bg-stone-600 font-semibold flex items-center justify-center *:mx-2 lg:text-lg text-white h-12 px-3 py-3 rounded-xl w-1/2"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
