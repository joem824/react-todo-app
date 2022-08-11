import React from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Switch = ({ currentMode, setMode }) => {
  const toggleClass = " transform translate-x-7";
  return (
    <div
      className="md:w-14 md:h-7 w-16 h-9 pl-1 flex items-center border-2 border-solid dark:bg-gray-400 dark:border-none rounded-full cursor-pointer"
      onClick={setMode}
    >
      {/* Switch */}
      <div
        className={
          "md:w-6 md:h-6 h-7 w-7 rounded-full shadow-md transform duration-300 ease-in-out" +
          (currentMode === "Light" ? null : toggleClass)
        }
      >
        {currentMode === "Dark" ? (
            <MdDarkMode className="text-gray-900 w-full h-full text-xl" />
        ) : (
            <MdLightMode className="text-gray-900 w-full h-full text-xl" />
        )}
      </div>
    </div>
  );
};

export default Switch;
