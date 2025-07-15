import { FC } from "react";

export const ProductSkeleton: FC = () => {
  return (
    <div className="w-[220px] animate-pulse rounded-xl border border-gray-200 p-3 shadow">
      {/* Image */}
      <div className="mx-auto mb-2 h-[160px] w-[160px] rounded-md bg-gray-200" />

      {/* Color Dots */}
      <div className="mb-1 flex items-center gap-1 px-1">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="h-4 w-4 rounded-full border border-gray-300 bg-gray-300"
          />
        ))}
        <div className="h-4 w-6 rounded bg-gray-300" />
      </div>

      {/* Title */}
      <div className="mb-1 h-4 w-3/4 rounded bg-gray-300 px-1" />
      {/* Type */}
      <div className="mb-2 h-3 w-1/2 rounded bg-gray-200 px-1" />

      {/* Price */}
      <div className="mt-1 flex items-center gap-2 px-1">
        <div className="h-4 w-16 rounded bg-gray-300" />
        <div className="h-3 w-10 rounded bg-gray-200" />
        <div className="h-3 w-8 rounded bg-green-200" />
      </div>
    </div>
  );
};
