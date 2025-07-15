import { FC } from "react";

export const FilterSkeleton: FC = () => {
  return (
    <div className="w-[170px] animate-pulse">
      {/* Filter Button */}
      <div className="mb-3 h-10 w-full rounded-md bg-gray-300" />

      {/* Filter Container */}
      <div className="flex flex-col gap-4 rounded-md bg-gray-100 p-3">
        {/* Category Section */}
        <div>
          <div className="mb-2 h-4 w-1/2 rounded bg-gray-300" />
          <div className="space-y-2">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-gray-300" />
                <div className="h-3 w-3/4 rounded bg-gray-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Collection Section */}
        <div>
          <div className="mb-2 h-4 w-2/3 rounded bg-gray-300" />
          <div className="space-y-2">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-gray-300" />
                <div className="h-3 w-2/3 rounded bg-gray-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="mt-3 h-8 w-full rounded bg-gray-300" />
    </div>
  );
};
