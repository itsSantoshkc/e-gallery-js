import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";

const OrderTable = (props) => {
  return (
    <TableRow
      className="text-center text-[11px] cursor-pointer hover:bg-stone-200 bg-stone-300 md:text-base"
      key={props.id}
    >
      <TableCell className="font-medium md:text-left ">{props.id}</TableCell>
      <TableCell>{props.paymentStatus}</TableCell>
      <TableCell>{props.paymentStatus}</TableCell>
      <TableCell>{props.paymentMethod}</TableCell>
      <TableCell className="md:text-right">{props.totalAmount}</TableCell>
    </TableRow>
  );
};

export default OrderTable;
