import React from "react";

export const ProductDetailSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col items-center justify-center gap-6 xl:flex-row">
      {/* Left: Images Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Thumbnail Skeletons */}
        <div className="flex flex-row justify-center gap-2 pt-2 sm:flex-col sm:justify-start">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-16 w-16 rounded border bg-gray-200" />
          ))}
        </div>

        {/* Main Image Skeleton */}
        <div className="h-80 w-80 rounded-md bg-gray-200 sm:w-96 md:h-96" />
      </div>

      {/* Right: Product Details Skeleton */}
      <div className="flex w-[340px] flex-col justify-center gap-4 sm:w-[400px] md:gap-3 lg:gap-4">
        <div className="h-6 w-2/3 rounded bg-gray-200" /> {/* Title */}
        <div className="h-4 w-full rounded bg-gray-200" /> {/* Description */}
        <div className="h-4 w-5/6 rounded bg-gray-200" />
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        {/* GSM Buttons */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-6 w-12 rounded bg-gray-200" />
          ))}
        </div>
        {/* Color buttons */}
        <div className="flex items-center gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-6 w-6 rounded-full bg-gray-200" />
          ))}
        </div>
        {/* Sizes */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-6 w-10 rounded bg-gray-200" />
          ))}
        </div>
        {/* Prices */}
        <div className="h-6 w-32 rounded bg-gray-200" />
        {/* Buttons */}
        <div className="flex gap-4 pt-2">
          <div className="h-10 w-24 rounded bg-gray-200" />
          <div className="h-10 w-24 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
};
