import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { setCollection, setCollectionAddMode } from "../redux";
import { addCollectionValidation } from "../validation";
import { useDropzone } from "react-dropzone";
import { IoMdCloseCircle } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import { ADD_COLLECTION, GET_COLLECTIONTYPE } from "../service";
import { showError, showSuccess } from "../../../utils";

interface AddCollectionFormData {
  name: string;
  image: File;
}

export const AddCollectionModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAdd, isLoading, pagination } = useSelector(
    (state: RootState) => state.collections,
  );
  const [image, setImage] = useState<File | null>(null);

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
  } = useForm<AddCollectionFormData>({
    resolver: yupResolver(addCollectionValidation),
  });

  const handleAdd: SubmitHandler<AddCollectionFormData> = async (formData) => {
    if (!image) return;

    try {
      await dispatch(
        ADD_COLLECTION({
          name: formData.name,
          image: image,
        }),
      ).unwrap();
      await dispatch(GET_COLLECTIONTYPE(pagination.totalPages));
      showSuccess("Collection added successfully!");
      handleClose();
    } catch (error) {
      console.error("Failed to add collection:", error);
      showError("Failed to add collection.");
    }
  };
  const handleClose = () => {
    dispatch(setCollectionAddMode(false));
    dispatch(setCollection(null));
    setImage(null);
    reset();
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
          disabled={isLoading}
          type="button"
          className="hover:text-secondary absolute top-2 right-2 text-xl text-red-400"
        >
          <IoMdCloseCircle />
        </button>

        <h3 className="mb-4 text-center text-lg font-bold">Add Collection</h3>

        <div className="mt-4">
          {/* Category Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Collection Name</label>
            <input
              type="text"
              {...register("name")}
              className="mt-3 w-full rounded-md border p-2"
              placeholder="Enter collection name"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-left text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Collection Image Upload with Dropzone */}
          <div className="mb-4">
            <label className="mb-3 block text-sm font-medium">
              Collection Image
            </label>

            <div
              {...getRootProps()}
              className="hover:border-primary flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-400 p-4"
            >
              <input {...getInputProps()} disabled={isLoading} />
              {!image ? (
                <div className="text-center text-gray-500">
                  <p>Drag & drop an image here, or click to select an image</p>
                  <p className="mt-2 text-sm text-gray-400">
                    Max file size: 350kb
                  </p>
                </div>
              ) : (
                <div className="relative h-64 w-full">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="h-full w-full rounded-md object-contain"
                  />
                  <button
                    onClick={() => {
                      setImage(null);
                      setValue("image", undefined as any);
                    }} // Clear image preview
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
            disabled={isLoading}
            className="bg-primary text-secondary hover:bg-secondary hover:text-primary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
          >
            {isLoading ? "Adding..." : "Add"}
          </button>
          <button
            onClick={handleClose}
            disabled={isLoading}
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
