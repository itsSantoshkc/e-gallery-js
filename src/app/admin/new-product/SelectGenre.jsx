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
import React, { ChangeEvent, useState } from "react";

const SelectGenre = (props) => {
  const genresOption = [
    "Abstract",
    "Impressionism",
    "Expressionism",
    "Realism",
    "Surrealism",
    "Cubism",
    "Fauvism",
    "Baroque",
    "Rococo",
    "Neoclassicism",
    "Romanticism",
    "Dadaism",
    "Pop Art",
    "Minimalism",
    "Post-Impressionism",
    "Art Nouveau",
    "Art Deco",
    "Gothic Art",
    "Symbolism",
    "Conceptual Art",
    "Photorealism",
    "Futurism",
    "Op Art",
    "Street Art",
    "Naive Art",
  ];

  const [genres, setGenres] = useState([]);
  const [genreValue, setGenreValue] = useState("");
  //If the value alread consist on the badge select others
  const handleChange = (e) => {
    e.preventDefault();
    const selectedValue = e.target.value;
    setGenreValue(() => selectedValue);
    if (selectedValue === "") {
      return;
    }
    if (genres.length >= 3) {
      let newGenre = genres;
      newGenre.pop();
      newGenre.unshift(selectedValue);
      setGenres(() => [...newGenre]);
      return;
    }
    console.log(selectedValue);
    setGenres(() => [selectedValue, ...genres]);
  };

  return (
    <ul className="flex w-full">
      {genres.map((genre, idx) => (
        <li className="p-2 px-4 mx-2 font-semibold text-center text-white bg-indigo-600 cursor-pointer  h-1/2 rounded-xl">
          {genre.length > 5 ? genre.slice(0, 5) + "...." : genre}
        </li>
      ))}
      <select
        onChange={handleChange}
        onSelect={() => console.log("Selected")}
        value={genreValue}
        className="w-full p-2 px-4 font-semibold text-white rounded-lg md:p-3 xl:text-lg xl:p-4 focus:text-black bg-stone-400 focus:bg-stone-300 focus:placeholder:text-black placeholder:text-white placeholder:font-semibold"
        name="cars"
        id="cars"
      >
        {genresOption.map((genre, idx) => (
          <option key={idx} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </ul>
  );
};

export default SelectGenre;
