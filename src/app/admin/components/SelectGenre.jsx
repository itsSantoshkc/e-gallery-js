"use client";
import React, { useState, useEffect } from "react";
import { getLabels } from "../new-product/actions";
import { useSession } from "next-auth/react";

const SelectGenre = (props) => {
  const { status } = useSession();
  const [genresOption, setGenresOption] = useState([]);
  const handleChange = (e) => {
    e.preventDefault();
    const selectedValue = e.target.value;
    props.setGenreValue(() => selectedValue);
  };

  const getLabelData = async () => {
    const labelData = await getLabels();
    setGenresOption(labelData);
  };

  useEffect(() => {
    getLabelData();
  }, [status]);

  return (
    <select
      onChange={handleChange}
      value={props.genreValue}
      className="w-full p-2 px-4 font-semibold text-white rounded-lg md:p-3 xl:text-lg xl:p-4 focus:text-black bg-stone-400 focus:bg-stone-300 focus:placeholder:text-black placeholder:text-white placeholder:font-semibold"
      name="cars"
      id="cars"
    >
      {genresOption.map((genre, idx) => (
        <option key={genre.id} value={genre.id}>
          {genre.label}
        </option>
      ))}
    </select>
  );
};

export default SelectGenre;
