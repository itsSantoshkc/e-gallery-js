"use client";

import { useState } from "react";
import { BiSort } from "react-icons/bi";

// import Product from "./product";
import { useSession } from "next-auth/react";
import Product from "./product";

export default function Home() {
  const [position, setPosition] = useState("A-Z");
  const { data: session } = useSession();

  if (session === undefined) {
    return (
      <div className="flex items-center justify-center w-full h-full overflow-hidden">
        <div className="loader "></div>
      </div>
    );
  }

  return (
    <main className="h-screen ">
      <div className="mt-10 md:mt-0">
        <h1 className="h-full my-3 text-3xl font-bold text-center md:text-4xl md:my-10 lg:my-20 lg:text-5xl">
          Discover Artworks
        </h1>
      </div>
      <div className="flex items-center justify-center">
        {/* <div className="flex items-center justify-center  h-16 w-[90%] md:w-[95%] mx-6 my-2  lg:w-5/6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center justify-around p-2 text-3xl border cursor-pointer border-stone-500 md:mx-4 rounded-xl">
                <div className=" w-[20%] hidden mx-2 text-xl md:block">
                  Sort
                </div>
                <BiSort />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 border">
              <DropdownMenuLabel className="text-xl text-center">
                Sort
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem value="A-Z">
                  Sort By A-Z
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="likes">
                  Sort By Likes
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="price">
                  Sort By Pirce
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent> */}
        {/* </DropdownMenu> */}

        {/* <div className="z-0 w-full h-full ml-2 overflow-hidden md:w-full md:ml-1 md:text-xl">
            <SlidingTab />
          </div> */}
        {/* </div> */}
      </div>
      <Product />
    </main>
  );
}
