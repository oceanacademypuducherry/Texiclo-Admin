export const CollectionSkeleton = () => {
  return (
    <div className="w-[300px] animate-pulse rounded-lg bg-white p-4 shadow">
      <div className="mx-auto mb-4 h-48 w-48 rounded-md bg-gray-300" />
      <div className="mx-auto mb-2 h-5 w-32 rounded bg-gray-300" />
      {/* <div className="mt-4 flex justify-center gap-3">
        <div className="h-9 w-20 rounded-md bg-gray-300" />
        <div className="h-9 w-20 rounded-md bg-gray-300" />
      </div> */}
    </div>
  );
};
