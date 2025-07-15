import { CiSearch } from "react-icons/ci";
import { AddProductBtn } from "./AddProductBtn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app";
import { setSearchQuery } from "../redux";

export const SearchComponent = () => {
  const { pagination } = useSelector((state: RootState) => state.productList);
  const dispatch = useDispatch();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const currentPage = pagination.currentPage || 1;
  const limit = 5; // Assuming you're showing 12 products per page
  const total = pagination.totalRecords || 0;

  const start = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, total);

  return (
    <div className="flex flex-col items-center gap-4 p-4 sm:gap-3 sm:p-4 md:flex-row md:items-center md:justify-between">
      {/* Search Box */}
      <div className="flex w-full items-center gap-2 rounded-md border px-3 py-2 sm:w-[300px] md:w-[300px]">
        <CiSearch className="text-lg" />
        <input
          type="search"
          placeholder="Search by product name"
          className="w-full text-sm outline-none sm:text-base"
          onChange={handleSearch}
        />
      </div>

      {/* Result Text */}
      <div className="text-center md:text-left">
        <span className="text-[14px] sm:text-xs md:text-[14px] lg:text-[14px]">
          Showing {start}-{end} of {total} results
        </span>
      </div>

      {/* Add Product Button */}
      <div className="hidden w-full sm:w-auto lg:block">
        <AddProductBtn />
      </div>
    </div>
  );
};
