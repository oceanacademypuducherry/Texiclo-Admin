import { CiSearch } from "react-icons/ci";

export const SearchComponent = () => {
  return (
    <div className="flex flex-col gap-2 p-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex w-full items-center gap-2 rounded-md border p-2 sm:w-[300px]">
        <CiSearch />
        <input
          type="search"
          placeholder="Search..."
          className="w-full outline-none"
        />
      </div>
      <div>
        <span className="sm:text-md text-sm">Showing 1–12 of 35 results</span>
      </div>
    </div>
  );
};
