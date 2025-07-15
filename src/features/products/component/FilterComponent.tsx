import { TbAdjustmentsAlt } from "react-icons/tb";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {
  resetFilters,
  toggleCategoryFilter,
  toggleCollectionFilter,
} from "../redux";
import { Tooltip } from "react-tooltip";

export const FilterComponent: FC<{
  isVisible: boolean;
  isSidenav?: boolean;
}> = ({ isVisible = false, isSidenav }) => {
  const [isFiltervisible, setIsFilterVisisble] = useState(isVisible);

  const dispatch = useDispatch();
  const { selectedCategories, selectedCollections } = useSelector(
    (state: RootState) => state.productList,
  );
  const { categories, collections } = useSelector(
    (state: RootState) => state.filteroptions,
  );

  const toggleFilter = () => {
    setIsFilterVisisble(!isFiltervisible);
  };

  const handleCategoryChange = (category: string) => {
    dispatch(toggleCategoryFilter(category));
    console.log("Selected Category:", category);
  };

  const handleCollectionChange = (collection: string) => {
    dispatch(toggleCollectionFilter(collection));
    console.log("Selected Collections:", collection);
  };
  const handleReset = () => {
    dispatch(resetFilters());
  };
  return (
    <div className="w-[170px]">
      <button
        disabled={isSidenav}
        onClick={toggleFilter}
        className="bg-primary flex w-full items-center justify-center gap-3 rounded-md p-2"
      >
        <TbAdjustmentsAlt />
        <span className="font-medium">Filter</span>
      </button>

      {isFiltervisible && (
        <div className="bg-LightYellow flex flex-col gap-4 p-3">
          {/* Category Section */}
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">Category</h1>
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category._id}
                  className="flex items-center gap-2 pl-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category._id)}
                    onChange={() => handleCategoryChange(category._id)}
                  />{" "}
                  {category.name}
                </label>
              ))}
            </div>
          </div>

          {/* Collection Type Section */}
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">Collection Type</h1>
            <div className="space-y-2">
              {collections.map((collection) => (
                <label
                  key={collection._id}
                  className="flex items-center gap-2 pl-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedCollections.includes(collection._id)}
                    onChange={() => handleCollectionChange(collection._id)}
                  />{" "}
                  {collection.name}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Reset Filters Button */}
      {(selectedCategories.length > 0 || selectedCollections.length > 0) && (
        <button
          onClick={handleReset}
          disabled={
            selectedCategories.length === 0 && selectedCollections.length === 0
          }
          data-tooltip-id="reset-tooltip"
          data-tooltip-content="Clear all selected filters"
          className="mt-2 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Reset Filters
        </button>
      )}
      <Tooltip id="reset-tooltip" />
    </div>
  );
};
