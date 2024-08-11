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

const page = (props) => {
  const { data: session } = useSession();
  const [gender, setGender] = useState("");
  const [state, setState] = useState("");
  const tabContainer = useRef(null);
  const BirthRef = useRef(null);
  const PhoneRef = useRef(null);
  const AddressRef = useRef(null);

  //Swiping error can be fixed with fixed width in every media screen

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDetails = {
      userId: session?.user.id,
      birthDate: BirthRef.current.value,
      gender: gender,
      phone: PhoneRef.current.value,
      province: state,
      address: AddressRef.current.value,
    };

    if (
      userDetails.gender === "" ||
      userDetails.birthDate === "" ||
      userDetails.address === "" ||
      userDetails.province === "" ||
      userDetails.phone === ""
    ) {
      return toast.error("Fields cannot be empty");
    }

    const response = await fetch("http://localhost:3000/api/user", {
      method: "post",
      body: JSON.stringify(userDetails),
    });

    const responseData = await response.json();
    if (response.status === 200) {
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
          className="flex items-center w-full transition-transform duration-300 -translate-x-0"
        >
          <div className="flex flex-col items-center justify-center w-full h-full min-w-full ">
            <h1 className="mb-4 text-2xl font-bold">Basic Details</h1>
            <div className="flex justify-center items-center flex-col w-[80%] ">
              <div className="flex flex-col w-full">
                <label
                  className="px-3 pt-3 pb-1 font-semibold lg:pb-2 lg:text-lg"
                  htmlFor="birth-date"
                >
                  Birth Date
                </label>
                <input
                  ref={BirthRef}
                  type="date"
                  name="birth-date"
                  id="birth-date"
                  className="h-10 px-3 font-semibold rounded-xl md:h-12 lg:h-14"
                />
              </div>
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
              <div className="flex flex-col w-full">
                <label
                  className="px-3 pt-3 pb-1 font-semibold lg:pb-2 lg:text-lg"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  ref={PhoneRef}
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone number"
                  className="h-10 px-3 font-semibold rounded-xl md:h-12 lg:h-14"
                />
              </div>
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
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  ref={AddressRef}
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