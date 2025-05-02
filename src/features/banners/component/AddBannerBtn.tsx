import { BsCloudUpload } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { setBanner, setBannerAdd } from "../redux";
import { BannerData } from "../data/bannerdata";

export const AddBannerBtn = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = () => {
    dispatch(setBannerAdd(true));
    const newPosition = BannerData.length + 1;
    dispatch(setBanner({ id: "", image: null, position: newPosition }));
  };

  return (
    <button
      onClick={handleAdd}
      className="text-secondary flex w-full max-w-md cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-300 bg-[#F0F0F0] p-4 text-center font-semibold transition-all duration-300 hover:shadow-lg sm:flex-row sm:p-6"
    >
      <div className="flex items-center justify-center">
        <IoMdAdd className="mr-2 text-xl sm:text-2xl md:text-3xl" />
        <span className="text-base sm:text-lg md:text-xl">Add Banner</span>
      </div>

      <BsCloudUpload className="mt-3 text-3xl text-gray-600 sm:mt-0 sm:ml-4 sm:text-4xl md:text-5xl" />
    </button>
  );
};
