import { TbAdjustmentsAlt } from "react-icons/tb";
import { CategoriesData } from "../../category/data/CategoriesData";
import { CollectionData } from "../../collectiontype/data/CollectionData";

export const FilterComponent = () => {
  return (
    <div className="max-w-[170px]">
      <div className="bg-primary flex w-full items-center justify-center gap-3 rounded-md p-2">
        <TbAdjustmentsAlt />
        <span>Filter</span>
      </div>

      <div className="bg-LightYellow flex flex-col gap-4 p-3">
        {/* Category Section */}
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">Category</h1>
          <div className="space-y-2">
            {CategoriesData.map((category) => (
              <label key={category.id} className="flex items-center gap-2 pl-2">
                <input type="checkbox" /> {category.name}
              </label>
            ))}
          </div>
        </div>

        {/* Collection Type Section */}
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">Collection Type</h1>
          <div className="space-y-2">
            {CollectionData.map((collection) => (
              <label
                key={collection.id}
                className="flex items-center gap-2 pl-2"
              >
                <input type="checkbox" /> {collection.name}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
