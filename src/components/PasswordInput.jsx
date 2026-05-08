import React, { forwardRef, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const PasswordInput = forwardRef((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex items-center w-full h-12 rounded-xl">
      <input
        ref={ref}
        type={showPassword ? "text" : "password"}
        name={props.name}
        id={props.name}
        className="w-full h-full px-3 rounded-xl"
        placeholder={props.placeholder}
      />

      {!showPassword ? (
        <IoMdEye
          className="absolute text-xl cursor-pointer right-5"
          onClick={() => setShowPassword(true)}
        />
      ) : (
        <IoMdEyeOff
          className="absolute text-xl cursor-pointer right-5"
          onClick={() => setShowPassword(false)}
        />
      )}
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
