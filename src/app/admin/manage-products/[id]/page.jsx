import React from "react";
import EditProductDetails from "./editDetails";
import EditImage from "./EditImage";
import { Button } from "@/components/ui/button";

const page = ({ params }) => {
  return (
    <div className="min-h-[95vh] w-full mt-16 flex flex-col justify-center items-center">
      <div className="my-10">
        <h1 className="text-5xl font-semibold">Edit your product</h1>
      </div>
      <div className="flex flex-col items-center justify-center w-2/3 h-full my-10 ">
        <div className="gap-5 px-5 md:gap-0 md:px-0">
          <EditImage
            src={
              "https://images.unsplash.com/photo-1725046908999-195118679132?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={"An Image"}
          />
          <EditImage
            src={
              "https://images.unsplash.com/photo-1725046908999-195118679132?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={"An Image"}
          />
          <EditImage
            src={
              "https://images.unsplash.com/photo-1725046908999-195118679132?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={"An Image"}
          />
          <EditImage
            src={
              "https://images.unsplash.com/photo-1725046908999-195118679132?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={"An Image"}
          />
          <EditImage
            src={
              "https://images.unsplash.com/photo-1725046908999-195118679132?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={"An Image"}
          />
          <div className="flex items-center justify-center w-full h-[50vh] border border-dashed border-stone-500">
            <Button className="w-1/2 py-10 text-2xl">+ Add new image </Button>
          </div>
        </div>

        <EditProductDetails />
      </div>
    </div>
  );
};

export default page;
