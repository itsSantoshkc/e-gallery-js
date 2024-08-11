"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import DeleteAccount from "./DeleteAccount";

const page = (props) => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [prevEmail, setprevEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleSubmit = async (e) => {
    //post the data
    // check if email ,password and everything
    e.preventDefault();
    if (
      name === "" ||
      gender === "" ||
      birthDate === "" ||
      address === "" ||
      state === "" ||
      phone === ""
    ) {
      return toast.error("Fields cannot be empty");
    }

    if (phone.length < 10) {
      return toast.error(
        "Please! Make sure you have entered correct phone number"
      );
    }
    const userDetails = {
      userId: userId,
      name: name,
      phone: phone,
      gender: gender,
      birthDate: birthDate,
      address: address,
      province: state,
    };
    console.log(userDetails);
    const response = await fetch("http://localhost:3000/api/user", {
      method: "PATCH",
      body: JSON.stringify(userDetails),
    });

    const responseData = await response.json();
    if (response.status === 200) {
      setIsEdit(!isEdit);
      return toast.success("User details changes successfully");
    }
    return toast.error(responseData.message);
  };

  const getUserData = async () => {
    if (userId === undefined || userId === null) {
      return;
    }
    const response = await fetch("http://localhost:3000/profile/api", {
      method: "post",
      body: JSON.stringify({ id: userId }),
    });
    // console.log(await response.json());
    const { name, email, gender, image, phone, birthDate, address, province } =
      await response.json();
    setName(name);
    setprevEmail(email);
    setGender(gender);
    setPhone(phone);
    setBirthDate(birthDate.slice(0, 10));
    setAvatar(image);

    address ? setAddress(address) : setAddress("");
    province ? setState(province) : setState("");
  };

  useEffect(() => {
    getUserData();
  }, [session?.user.id]);
  if (session === undefined) {
    return (
      <div className="flex items-center justify-center w-full h-full overflow-hidden">
        <div className="loader "></div>
      </div>
    );
  }
  return (
    <>
      <div>
        <div className="flex flex-col items-center justify-center py-5 mt-5">
          <h1 className="w-full mb-5 text-2xl font-bold text-center lg:text-4xl md:text-3xl">
            Profile Settings
          </h1>

          <div className=" bg-stone-200 relative rounded-xl w-[90%] flex flex-col  md:w-5/6 xl:w-4/6  2xl:w-1/2    px-2 mt-5">
            {!isEdit && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="absolute cursor-pointer top-5 right-5">
                    <span
                      onClick={() => setIsEdit(!isEdit)}
                      className="text-2xl "
                    >
                      <FaEdit />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit Profile</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            <form
              onSubmit={handleSubmit}
              className="grid content-center grid-cols-1 gap-5 pb-16 md:gap-10 md:grid-cols-2"
            >
              <div className="flex flex-col items-center justify-center p-5 md:col-start-2 md:col-span-1 md:row-span-5">
                <img
                  className="object-cover w-48 h-48 border rounded-full cursor-pointer hover:opacity-90"
                  src={avatar !== null ? avatar : "/defaultProfilePicture.jpg"}
                  alt={name}
                />
              </div>
              {isEdit && (
                <>
                  <h1 className="col-span-2 p-2 my-5 text-2xl font-bold text-center md:text-3xl lg:col-span-1 md:row-span-2">
                    Personal Information
                  </h1>
                  <div className="flex items-center col-span-2 mx-4 font-semibold transition-colors duration-500 bg-white cursor-pointer md:col-span-1 rounded-xl">
                    <label className="w-1/5 px-2 text-sm text-center md:text-base ">
                      Name
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setName(e.target?.value)}
                      className="w-4/5 h-16 px-4 text-sm border-l border-stone-300 rounded-r-xl sm:text-base"
                      value={name}
                    />
                  </div>
                  <div className="flex items-center col-span-2 mx-4 font-semibold transition-colors duration-500 bg-white cursor-pointer md:col-span-1 rounded-xl">
                    <label className="w-1/5 px-2 text-sm text-center md:text-base ">
                      Gender
                    </label>
                    <Select defaultValue={gender} onValueChange={setGender}>
                      <SelectTrigger className="w-4/5 h-16 px-4 text-sm border-l border-stone-300 rounded-r-xl sm:text-base">
                        <SelectValue placeholder="Select a Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup className=" *:text-sm rounded-xl sm:*:text-base">
                          <SelectLabel>Gender</SelectLabel>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Others">Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center col-span-2 mx-4 font-semibold transition-colors duration-500 bg-white cursor-pointer md:col-span-1 rounded-xl">
                    <label className="w-1/5 px-1 text-sm text-center md:px-2 md:text-base ">
                      Birth
                    </label>
                    <input
                      type="date"
                      onChange={(e) => {
                        setBirthDate(e.target.value);
                      }}
                      className="w-4/5 h-16 px-4 text-sm border-l border-stone-300 rounded-r-xl sm:text-base"
                      value={birthDate}
                    />
                  </div>
                  <div className="flex items-center col-span-2 mx-4 font-semibold transition-colors duration-500 bg-white cursor-pointer md:col-span-1 rounded-xl">
                    <label className="w-1/5 px-1 text-sm text-center md:px-2 md:text-base ">
                      Phone
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-4/5 h-16 px-4 text-sm border-l border-stone-300 rounded-r-xl sm:text-base"
                      value={phone}
                    />
                  </div>
                  <div className="flex items-center justify-between h-16 col-span-2 px-4 mx-4 font-semibold transition-colors duration-500 cursor-pointer bg-stone-300 md:col-span-1 hover:bg-stone-100 rounded-xl">
                    <h1 className="text-sm md:text-base">Email</h1>
                    <div className="flex items-center h-full text-sm sm:text-base ">
                      <h2 className="mx-1 ">{prevEmail}</h2>
                      <MdOutlineKeyboardArrowRight className="text-3xl" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between h-16 col-span-2 px-4 mx-4 font-semibold transition-colors duration-500 cursor-pointer md:col-span-1 bg-stone-300 hover:bg-stone-100 rounded-xl">
                    <h1 className="text-sm md:text-base">Change Password </h1>
                    <MdOutlineKeyboardArrowRight className="text-3xl " />
                  </div>
                  <h1 className="w-full text-2xl font-bold text-center md:text-3xl md:col-span-2">
                    Shipping Address
                  </h1>
                  <div className="flex items-center col-span-2 mx-4 font-semibold transition-colors duration-500 bg-white cursor-pointer md:col-span-1 rounded-xl">
                    <label className="w-1/5 px-2 text-center ">Province</label>
                    <Select defaultValue={state} onValueChange={setState}>
                      <SelectTrigger className="w-4/5 h-16 px-4 text-sm border-l border-stone-300 rounded-r-xl sm:text-base">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup className=" *:text-sm rounded-xl sm:*:text-base">
                          <SelectLabel>Province</SelectLabel>
                          <SelectItem value="Province 1">Province 1</SelectItem>
                          <SelectItem value="Madhesh Pradesh">
                            Madhesh Pradesh
                          </SelectItem>
                          <SelectItem value="Bagmati">Bagmati</SelectItem>
                          <SelectItem value="Gandaki">Gandaki</SelectItem>
                          <SelectItem value="Lumbini">Lumbini</SelectItem>
                          <SelectItem value="Karnali">Karnali</SelectItem>
                          <SelectItem value="Sudurpaschim">
                            Sudurpaschim
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center col-span-2 mx-4 font-semibold transition-colors duration-500 bg-white cursor-pointer md:col-span-1 rounded-xl">
                    <label className="w-1/5 px-2 text-center ">Address</label>
                    <input
                      type="text"
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-4/5 h-16 px-4 text-sm border-l border-stone-300 rounded-r-xl sm:text-base"
                      value={address}
                    />
                  </div>
                </>
              )}
              {!isEdit && (
                <>
                  <h1 className="p-2 my-5 text-2xl font-bold text-center md:text-3xl md:row-span-2">
                    Personal Information
                  </h1>
                  <div className="flex items-center justify-between h-16 px-4 mx-4 font-semibold transition-colors duration-500 cursor-pointer bg-stone-300 hover:bg-stone-100 rounded-xl">
                    <h1 className="text-base sm:text-lg ">Name</h1>
                    <div className="flex items-center h-full text-sm sm:text-base ">
                      <h2 className="mx-1">{name}</h2>
                      <MdOutlineKeyboardArrowRight className="text-3xl" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between h-16 px-4 mx-4 font-semibold transition-colors duration-500 cursor-pointer bg-stone-300 hover:bg-stone-100 rounded-xl">
                    <h1 className="text-base sm:text-lg">Gender </h1>
                    <div className="flex items-center h-full text-sm sm:text-base ">
                      <h2 className="mx-1">{gender}</h2>
                      <MdOutlineKeyboardArrowRight className="text-3xl" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between h-16 px-4 mx-4 font-semibold transition-colors duration-500 cursor-pointer bg-stone-300 hover:bg-stone-100 rounded-xl">
                    <h1 className="text-base sm:text-lg">Birth Date </h1>
                    <div className="flex items-center h-full text-sm sm:text-base ">
                      <h2 className="mx-1">{birthDate}</h2>
                      <MdOutlineKeyboardArrowRight className="text-3xl" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between h-16 px-4 mx-4 font-semibold transition-colors duration-500 cursor-pointer bg-stone-300 md:col-span-1 hover:bg-stone-100 rounded-xl">
                    <h1 className="text-base sm:text-lg">Phone</h1>
                    <div className="flex items-center h-full text-sm sm:text-base ">
                      <h2 className="mx-1">+977 {phone}</h2>
                      <MdOutlineKeyboardArrowRight className="text-3xl" />
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="flex items-center justify-between h-16 px-4 mx-4 font-semibold transition-colors duration-500 cursor-pointer bg-stone-300 md:col-span-1 hover:bg-stone-100 rounded-xl">
                        <h1 className="text-base sm:text-lg">Email</h1>
                        <div className="flex items-center h-full text-sm sm:text-base ">
                          <h2 className="mx-1 ">{prevEmail}</h2>
                          <MdOutlineKeyboardArrowRight className="text-3xl" />
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] sm:h-[400px] bg-stone-300 text-stone-800">
                      <DialogHeader>
                        <DialogTitle>Change Email</DialogTitle>
                        <DialogDescription className="text-stone-700">
                          Make changes to your Email here. Click save when
                          you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-2 py-2">
                        <div className="grid items-center grid-cols-4 ">
                          <label
                            htmlFor="curretn-email"
                            className="col-span-4 px-2 font-semibold text-bg"
                          >
                            Current Email Address
                          </label>
                          <input
                            type="email"
                            placeholder="Enter your current email address"
                            id="current-email"
                            value={prevEmail}
                            onChange={(e) => setprevEmail(e.target.value)}
                            className="h-12 col-span-4 px-4 border rounded-xl"
                          />
                        </div>
                        <div className="grid items-center grid-cols-4 ">
                          <label
                            id="new-email"
                            className="col-span-4 px-2 font-semibold text-bg"
                          >
                            New Email Address
                          </label>
                          <input
                            id="new-email"
                            type="email"
                            placeholder="Enter your new email address"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="h-12 col-span-4 px-4 border rounded-xl "
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <button
                          className="px-2 py-4 font-semibold text-white transition-colors duration-300 bg-stone-500 rounded-xl sm:py-0 hover:bg-stone-400"
                          type="submit"
                        >
                          Save changes
                        </button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="flex items-center justify-between h-16 px-4 mx-4 font-semibold transition-colors duration-500 cursor-pointer bg-stone-300 hover:bg-stone-100 rounded-xl">
                        <h1 className="text-base sm:text-lg">
                          Change Password
                        </h1>
                        <MdOutlineKeyboardArrowRight className="text-3xl" />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] sm:h-[400px] bg-stone-300 text-stone-800">
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription className="text-stone-700">
                          Make changes to your password here. Click save when
                          you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-2 py-2">
                        <div className="grid items-center grid-cols-4 ">
                          <label
                            htmlFor="old-password"
                            className="col-span-4 px-2 font-semibold text-bg"
                          >
                            Current password
                          </label>
                          <input
                            placeholder="Enter your old password"
                            id="old-password"
                            type="password"
                            onChange={(e) => setOldPassword(e.target.value)}
                            value={oldPassword}
                            className="h-12 col-span-4 px-4 border rounded-xl"
                          />
                        </div>
                        <div className="grid items-center grid-cols-4 ">
                          <label
                            htmlFor="new-password"
                            className="col-span-4 px-2 font-semibold text-bg"
                          >
                            New Password
                          </label>
                          <input
                            type="password"
                            id="new-password"
                            placeholder="Enter your new password "
                            onChange={(e) => setNewPassword(e.target.value)}
                            value={newPassword}
                            className="h-12 col-span-4 px-4 border rounded-xl "
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <button
                          className="px-2 py-4 font-semibold text-white transition-colors duration-300 bg-stone-500 rounded-xl sm:py-0 hover:bg-stone-400"
                          type="submit"
                        >
                          Save changes
                        </button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <div className="flex items-center justify-around h-16 px-4 mx-4 my-5 text-lg md:col-span-2">
                    <DeleteAccount userId={userId} />
                  </div>
                  <h1 className="w-full text-2xl font-bold text-center md:text-3xl md:col-span-2">
                    Shipping Address
                  </h1>

                  <div className="flex items-center justify-between h-16 px-4 mx-4 font-semibold transition-colors duration-500 cursor-pointer bg-stone-300 hover:bg-stone-100 rounded-xl">
                    <h1 className="text-base sm:text-lg">State</h1>
                    <div className="flex items-center h-full text-sm sm:text-base ">
                      <h2 className="mx-1">{state}</h2>
                      <MdOutlineKeyboardArrowRight className="text-3xl" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between h-16 px-4 mx-4 font-semibold transition-colors duration-500 cursor-pointer bg-stone-300 md:col-span-1 hover:bg-stone-100 rounded-xl">
                    <h1 className="text-base sm:text-lg">Address</h1>
                    <div className="flex items-center h-full text-sm sm:text-base">
                      <h2 className="mx-1">{address}</h2>
                      <MdOutlineKeyboardArrowRight className="text-3xl" />
                    </div>
                  </div>
                </>
              )}

              {isEdit && (
                <div className="flex items-center justify-center w-full col-span-2 px-4 border ">
                  <button
                    type="submit"
                    className="p-4 px-10 font-semibold text-white transition-colors duration-500 sm:p-4 sm:px-16 rounded-xl bg-stone-500 hover:bg-stone-400"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
