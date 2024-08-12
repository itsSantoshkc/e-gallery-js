import React, { MutableRefObject, useState } from "react";
import { IoMdEye } from "react-icons/io";

const PasswordInput = (props) => {
  const [showPassword, setshowPassword] = useState(false);
  return (
    <div className="relative flex items-center w-full h-12 rounded-xl">
      <input
        ref={props.passwordRef}
        type={showPassword ? "text" : "password"}
        name={props.name}
        id={props.name}
        className="w-full h-full px-3 rounded-xl"
        placeholder={props.placeholder}
      />
      <IoMdEye
        className="absolute text-xl cursor-pointer right-5"
        onClick={() => setshowPassword(!showPassword)}
      />
    </div>
  );
};

export default PasswordInput;
