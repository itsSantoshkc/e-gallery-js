"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { getLabels } from "@/app/action";

const SlidingTab = (props) => {
  const [leftButton, setLeftButton] = useState(false);
  const [rightButton, setRightButton] = useState(true);
  const [labels, setLabels] = useState([]);

  const tabContainer = useRef(null);

  const handleIcons = (scrollValue) => {
    if (tabContainer.current !== null) {
      const maxScrollable =
        tabContainer.current?.scrollWidth - tabContainer.current?.clientWidth;
      if (scrollValue !== null && scrollValue <= 0) {
        setLeftButton(false);
        setRightButton(true);
      } else if (
        scrollValue !== null &&
        scrollValue > 0 &&
        scrollValue < maxScrollable
      ) {
        setLeftButton(true);
        setRightButton(true);
      } else {
        setLeftButton(true);
        setRightButton(false);
      }
    }
  };

  const handleTabClick = (e, id) => {
    const tabNode = tabContainer.current;
    const tabs = tabNode?.querySelectorAll("li");

    if (
      e.target.classList.contains("bg-stone-500") ||
      e.target.classList.contains("text-white")
    ) {
      e.target.classList.toggle("bg-stone-500");
      e.target.classList.toggle("text-white");
      props.setFilterValue(null);
    } else {
      tabs?.forEach((tab) => {
        if (
          tab.classList.contains("bg-stone-500") ||
          tab.classList.contains("text-white")
        ) {
          tab.classList.toggle("bg-stone-500");
          tab.classList.toggle("text-white");
        }
      });
      e.target.classList.toggle("bg-stone-500");
      e.target.classList.toggle("text-white");
      props.setFilterValue(() => id);
    }
  };

  const handleLeftClick = () => {
    const scrollvalue = () =>
      tabContainer.current !== null
        ? (tabContainer.current.scrollLeft -= 300)
        : null;

    if (scrollvalue !== null) {
      handleIcons(scrollvalue());
    }
  };

  const handleRightClick = () => {
    const scrollvalue = () =>
      tabContainer.current !== null
        ? (tabContainer.current.scrollLeft += 300)
        : null;

    handleIcons(scrollvalue());
  };

  const getLabelData = async () => {
    const labelData = await getLabels();
    setLabels(labelData);
  };

  useEffect(() => {
    getLabelData();
  }, [props.status]);

  return (
    <div className="w-full h-full ">
      <div className="relative flex items-center justify-between w-full h-full px-2 ">
        {leftButton && (
          <span className="absolute left-0 flex items-center justify-center w-16 h-full bg-gradient-to-r from-white via-white">
            <span
              onClick={handleLeftClick}
              className="p-1 text-2xl text-black transition-colors duration-500 border rounded-full cursor-pointer hover:bg-stone-500 hover:text-white "
            >
              <FaAngleLeft />
            </span>
          </span>
        )}
        <ul
          ref={tabContainer}
          className="container flex w-full h-full overflow-hidden scroll-smooth "
        >
          {labels !== null &&
            labels?.map(({ id, label }) => (
              <li
                onClick={(e) => handleTabClick(e, id)}
                key={id}
                className="p-2 m-2 transition-all duration-500 border cursor-pointer whitespace-nowrap hover:bg-stone-500 hover:text-white hover:border-stone-500 rounded-2xl"
              >
                {label}
              </li>
            ))}
        </ul>
        {rightButton && (
          <span className="absolute right-0 flex items-center w-10 h-full bg-gradient-to-l from-white via-white ">
            <span
              onClick={handleRightClick}
              className="p-1 text-2xl transition-colors duration-500 border rounded-full cursor-pointer hover:bg-stone-500 hover:text-white"
            >
              <FaAngleRight />
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default SlidingTab;
