import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const RecentOrders = (props) => {
  const texts = [
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit eveniet aliquid similique? Quo tempore nostrum doloremque beatae reiciendis quibusdam maxime molestias eveniet natus, accusantium aperiam quia distinctio vel blanditiis veniam?",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit eveniet aliquid similique? Quo tempore nostrum doloremque beatae reiciendis quibusdam maxime molestias eveniet natus, accusantium aperiam quia distinctio vel blanditiis veniam?",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit eveniet aliquid similique? Quo tempore nostrum doloremque beatae reiciendis quibusdam maxime molestias eveniet natus, accusantium aperiam quia distinctio vel blanditiis veniam?",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit eveniet aliquid similique? Quo tempore nostrum doloremque beatae reiciendis quibusdam maxime molestias eveniet natus, accusantium aperiam quia distinctio vel blanditiis veniam?",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit eveniet aliquid similique? Quo tempore nostrum doloremque beatae reiciendis quibusdam maxime molestias eveniet natus, accusantium aperiam quia distinctio vel blanditiis veniam?",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit eveniet aliquid similique? Quo tempore nostrum doloremque beatae reiciendis quibusdam maxime molestias eveniet natus, accusantium aperiam quia distinctio vel blanditiis veniam?",
  ];
  return (
    <div className="flex  justify-center  max-w-full max-h-[88%]">
      <div className="max-w-full max-h-full text-black bg-white">
        <div className="w-full h-full ">
          <ScrollArea className="h-[445px] space-y-0">
            <ul className="flex flex-col items-center bg-black text-white justify-center   *:text-xl">
              {texts.map((text, idx) => (
                <li key={idx} className="px-4 border-b">
                  {text}
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
