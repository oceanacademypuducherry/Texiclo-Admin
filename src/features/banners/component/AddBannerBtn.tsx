import { BsCloudUpload } from "react-icons/bs";

export const AddBannerBtn = () => {
  return (
    <div className="bg-primary text-secondary flex w-full max-w-xs flex-col items-center justify-center gap-2 rounded-md p-4 text-center font-medium transition sm:h-[150px] sm:w-[200px] sm:flex-row sm:justify-evenly">
      <span className="text-lg">Add Banner</span>
      <BsCloudUpload size={40} />
    </div>
  );
};
