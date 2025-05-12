import { CiSearch } from "react-icons/ci";
import { AddProductBtn } from "./AddProductBtn";

export const SearchComponent = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-4 sm:gap-3 sm:p-4 md:flex-row md:items-center md:justify-between">
      {/* Search Box */}
      <div className="flex w-full items-center gap-2 rounded-md border px-3 py-2 sm:w-[300px] md:w-[300px]">
        <CiSearch className="text-lg" />
        <input
          type="search"
          placeholder="Search..."
          className="w-full text-sm outline-none sm:text-base"
        />
      </div>

      {/* Result Text */}
      <div className="text-center md:text-left">
        <span className="text-[14px] sm:text-xs md:text-[14px] lg:text-[14px]">
          Showing 1–12 of 35 results
        </span>
      </div>

      {/* Add Product Button */}
      <div className="hidden w-full sm:w-auto lg:block">
        <AddProductBtn />
      </div>
    </div>
  );
};
