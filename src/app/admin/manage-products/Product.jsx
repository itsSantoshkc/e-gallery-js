import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

const Product = (props) => {
  return (
    <div className="relative flex h-full p-4 my-4 border rounded-xl">
      <div className="flex items-center w-full">
        <div className="w-40 h-40 overflow-hidden min-w-40 min-h-40 rounded-xl md:w-32 md:h-32">
          <img
            className="object-cover min-w-full min-h-full transition-all duration-300 cursor-pointer hover:rounded-xl hover:scale-110 rounded-xl"
            src={props.image}
            alt={props.title}
          />
        </div>
        <div className="p-4 lg:min-w-[70%]">
          <Link href={`/admin/manage-products/${props.id}`}>
            <h1 className="text-xl font-bold transition-colors duration-300 cursor-pointer hover:text-indigo-400 md:text-2xl text-gray-950">
              {props.title}
            </h1>
          </Link>
          <p className="mt-2 text-sm text-justify text-gray-500 md:text-base">
            {props.description}
          </p>
          <h1 className="mt-2 w-[15%] text-sm text-nowrap font-semibold text-justify lg:text-xl md:text-base">
            Rs. {props.price}
          </h1>
        </div>
        <div className="min-w-[15%] max-w-[15%] h-full flex justify-center items-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div>
                <MdDelete className="text-3xl text-red-500 cursor-pointer" />
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this product and remove products data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => props.handleDelete(props.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <Link href={`/admin/manage-products/${props.id}`}>
        <span className="absolute p-2 transition-colors duration-300 rounded-full cursor-pointer hover:text-white hover:bg-stone-400 top-2 right-2">
          <MdEdit className="text-2xl " />
        </span>
      </Link>
    </div>
  );
};

export default Product;
