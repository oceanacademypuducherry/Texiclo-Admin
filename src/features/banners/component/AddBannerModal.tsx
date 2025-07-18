import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addBannerValidation } from "../validation";
import { useDropzone } from "react-dropzone";
import { IoMdCloseCircle } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { closeAddModal } from "../redux";
import { BannersData } from "../redux";
import { ADD_BANNER, GET_BANNERS } from "../service";
import { fileToBase64Image, showError, showSuccess } from "../../../utils";

export const AddBannerModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { modals, selectedBanner, loading } = useSelector(
    (state: RootState) => state.banners,
  );

  const [image, setImage] = useState<File | string | null>(
    selectedBanner?.image ?? null,
  );

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<BannersData>({
    resolver: yupResolver(addBannerValidation),
    defaultValues: {
      position: selectedBanner?.position || 1,
      image: selectedBanner?.image || null,
    },
  });

  const handleAdd: SubmitHandler<BannersData> = async (newData) => {
    try {
      const bannerToAdd: BannersData = {
        _id: newData._id,
        position: newData.position,
        image: image as File,
      };
      await dispatch(ADD_BANNER(bannerToAdd)).unwrap();
      dispatch(GET_BANNERS());
      showSuccess("Banner added Sucessfully");
      dispatch(closeAddModal());
      setImage(null);
    } catch (error) {
      console.error("Failed to add");
      showError("Failed to Banner");
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    const myImage = acceptedFiles[0];
    setImage(myImage);
    setValue("image", myImage);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  if (!modals.isAddOpen) return null;

  return (
    <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(handleAdd)}
        className="relative w-4/5 rounded-lg bg-white p-6 shadow-lg sm:w-1/2 md:w-1/3"
      >
        <button
          onClick={() => dispatch(closeAddModal())}
          type="button"
          className="hover:text-secondary absolute top-2 right-2 text-xl text-red-400"
        >
          <IoMdCloseCircle />
        </button>

        <h3 className="mb-4 text-center text-lg font-bold">Add Banner</h3>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="mb-3 block text-sm font-medium">Banner Image</label>
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
                  src={URL.createObjectURL(image as File)}
                  alt="Preview"
                  className="h-full w-full rounded-md object-cover"
                />
                <button
                  onClick={() => setImage(null)}
                  className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white"
                >
                  <MdClose />
                </button>
              </div>
            )}
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
            {loading ? "Adding..." : "Add"}
          </button>
          <button
            type="button"
            onClick={() => dispatch(closeAddModal())}
            className="bg-primary text-secondary hover:bg-secondary hover:text-primary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
