import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { addBanner, BannersData, setBanner, setBannerAdd } from "../redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { addBannerValidation } from "../validation";
import { useDropzone } from "react-dropzone";
import { IoMdCloseCircle } from "react-icons/io";
import { MdClose } from "react-icons/md";

export const AddBannerModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAdd } = useSelector((state: RootState) => state.banners);
  const [image, setImage] = useState<File | null>(null);

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<BannersData>({
    resolver: yupResolver(addBannerValidation),
  });

  const handleAdd: SubmitHandler<BannersData> = (newData) => {
    console.log(newData);
    dispatch(addBanner(newData));
    handleClose();
  };
  const handleClose = () => {
    dispatch(setBannerAdd(false));
    dispatch(setBanner(null));
    setImage(null);
  };
  // Handle image upload with react-dropzone
  const onDrop = (acceptedFiles: File[]) => {
    const myImage = acceptedFiles[0];
    setImage(myImage); // store File locally
    setValue("image", myImage);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
  });
  if (!isAdd) return null;

  return (
    <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(handleAdd)}
        className="relative w-4/5 rounded-lg bg-white p-6 shadow-lg sm:w-1/2 md:w-1/3"
      >
        {/* Cancel Icon */}
        <button
          onClick={handleClose}
          type="button"
          className="hover:text-secondary absolute top-2 right-2 text-xl text-red-400"
        >
          <IoMdCloseCircle />
        </button>

        <h3 className="mb-4 text-center text-lg font-bold">Add Banner</h3>

        <div className="mt-4">
          {/* Category Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Please Enter a postion
            </label>
            <input
              type="number"
              {...register("position")}
              className="mt-3 w-full rounded-md border p-2"
              placeholder="Enter position number"
            />
            {errors.position && (
              <p className="text-left text-xs text-red-500">
                {errors.position.message}
              </p>
            )}
          </div>

          {/* Collection Image Upload with Dropzone */}
          <div className="mb-4">
            <label className="mb-3 block text-sm font-medium">
              Banner Image
            </label>

            <div
              {...getRootProps()}
              className="hover:border-primary flex w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-400 p-4"
            >
              <input {...getInputProps()} />
              {!image ? (
                <div className="text-center text-gray-500">
                  <p>Drag & drop an image here, or click to select an image</p>
                  <p className="mt-2 text-sm text-gray-400">
                    Max file size: 350kb
                  </p>
                </div>
              ) : (
                <div className="relative h-40 w-full">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="h-full w-full rounded-md object-cover"
                  />
                  <button
                    onClick={() => setImage(null)} // Clear image preview
                    className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white"
                  >
                    <MdClose />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {errors.image && (
          <p className="text-left text-xs text-red-500">
            {errors.image.message}
          </p>
        )}

        <div className="mt-4 flex justify-center gap-4">
          <button
            type="submit"
            className="bg-primary text-secondary hover:bg-secondary hover:text-primary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
          >
            Add
          </button>
          <button
            onClick={handleClose}
            type="button"
            className="bg-primary text-secondary hover:bg-secondary hover:text-primary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
