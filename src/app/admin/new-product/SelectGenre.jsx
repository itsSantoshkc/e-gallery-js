"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import React, { ChangeEvent, useState, useEffect } from "react";
import { getLabels } from "./actions";
import { useSession } from "next-auth/react";

const SelectGenre = (props) => {
  // const genresOption = [
  //   "Abstract",
  //   "Impressionism",
  //   "Expressionism",
  //   "Realism",
  //   "Surrealism",
  //   "Cubism",
  //   "Fauvism",
  //   "Baroque",
  //   "Rococo",
  //   "Neoclassicism",
  //   "Romanticism",
  //   "Dadaism",
  //   "Pop Art",
  //   "Minimalism",
  //   "Post-Impressionism",
  //   "Art Nouveau",
  //   "Art Deco",
  //   "Gothic Art",
  //   "Symbolism",
  //   "Conceptual Art",
  //   "Photorealism",
  //   "Futurism",
  //   "Op Art",
  //   "Street Art",
  //   "Naive Art",
  // ];
  const { status } = useSession();

  const [genresOption, setGenresOption] = useState([]);
  //If the value alread consist on the badge select others
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
