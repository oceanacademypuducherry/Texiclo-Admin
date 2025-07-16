import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDropzone } from "react-dropzone";
import { IoMdCloseCircle } from "react-icons/io";
import { MdClose } from "react-icons/md";

import { UPDATE_BANNER } from "../service";
import { BannersData, closeUpdateModal } from "../redux";
import { addBannerValidation } from "../validation";

export const UpdateBannerModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { modals, selectedBanner } = useSelector(
    (state: RootState) => state.banners,
  );
  const [image, setImage] = useState<File | string | null>(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<BannersData>({
    resolver: yupResolver(addBannerValidation),
    defaultValues: {
      position: selectedBanner?.position || 1,
    },
  });

  useEffect(() => {
    if (selectedBanner?.image) {
      setImage(selectedBanner.image);
      setValue("position", selectedBanner.position);
    }
  }, [selectedBanner, setValue]);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setImage(file);
    setValue("image", file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const handleClose = () => {
    dispatch(closeUpdateModal());
    setImage(null);
  };

  const handleUpdate: SubmitHandler<BannersData> = (data) => {
    if (!image || !selectedBanner?.id) return;

    dispatch(
      UPDATE_BANNER({
        id: selectedBanner.id,
        position: data.position,
        image: image,
      }),
    );
    handleClose();
  };

  if (!modals.isUpdateOpen || !selectedBanner) return null;

  return (
    <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="relative w-4/5 rounded-lg bg-white p-6 shadow-lg sm:w-1/2 md:w-1/3"
      >
        <button
          onClick={handleClose}
          type="button"
          className="hover:text-secondary absolute top-2 right-2 text-xl text-red-400"
        >
          <IoMdCloseCircle />
        </button>

        <h3 className="mb-4 text-center text-lg font-bold">Update Banner</h3>

        {/* <div className="mb-4">
          <label className="block text-sm font-medium">Position</label>
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
        </div> */}

        <div className="mb-4">
          <label className="mb-3 block text-sm font-medium">
            Update Banner Image
          </label>
          <div
            {...getRootProps()}
            className="hover:border-primary flex w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-400 p-4"
          >
            <input {...getInputProps()} />
            {!image ? (
              <div className="text-center text-gray-500">
                <p>Drag & drop an image here, or click to select one</p>
              </div>
            ) : (
              <div className="relative h-40 w-full">
                <img
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt="Preview"
                  className="h-full w-full rounded-md object-cover"
                />
                <button
                  onClick={() => setImage(null)}
                  type="button"
                  className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white"
                >
                  <MdClose />
                </button>
              </div>
            )}
          </div>
          {errors.image && (
            <p className="text-left text-xs text-red-500">
              {errors.image.message}
            </p>
          )}
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <button
            type="submit"
            className="bg-primary text-secondary hover:bg-secondary hover:text-primary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
          >
            Update
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
