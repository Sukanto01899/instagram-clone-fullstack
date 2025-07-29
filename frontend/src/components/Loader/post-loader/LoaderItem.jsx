import React from "react";
import Avatar from "../../sub/Avatar";
import { IoIosMore } from "react-icons/io";

const LoaderItem = () => {
  return (
    <div className="pb-4 mb-4 max-w-[560px] mx-auto border border-gray-200 shadow-sm rounded-md">
      <div className="flex items-center justify-between p-3">
        <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-full overflow-hidden flex items-center justify-center text-white text-xs"></div>

        <span className="w-5 h-2 bg-gray-300 animate-pulse"></span>
      </div>

      <div className="w-full object-cover h-[400px] bg-gray-300 animate-pulse"></div>

      <div className="p-3 ml-3 mt-2 h-4 w-44 bg-gray-300 animate-pulse"></div>

      <div className="h-8 bg-gray-300 mx-3 mt-3"></div>
    </div>
  );
};

export default LoaderItem;
