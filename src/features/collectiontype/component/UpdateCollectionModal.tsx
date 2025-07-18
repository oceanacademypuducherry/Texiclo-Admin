import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  setCollection,
  setCollectionUpdateMode,
  resetCollectionState,
} from "../redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateCollectionValidation } from "../validation";
import { useDropzone } from "react-dropzone";
import { IoMdCloseCircle } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { UPDATE_COLLECTION } from "../service";
import { showError, showSuccess } from "../../../utils";

interface UpdateCollectionFormData {
  name: string;
  image?: File | string | undefined;
}

export const UpdateCollectionModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { isUpdate, collection, isLoading } = useSelector(
    (state: RootState) => state.collections,
  );

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
  } = useForm<UpdateCollectionFormData>({
    resolver: yupResolver(updateCollectionValidation),
  });

  useEffect(() => {
    if (collection) {
      reset({
        name: collection.name || "",
        image: collection.image,
      });

      // Reset uploaded file only if new image was received
      if (typeof collection.image === "string") {
        setUploadedFile(null);
      }
    }
  }, [collection?.image, reset]);

  const handleClose = () => {
    dispatch(setCollectionUpdateMode(false));
    dispatch(setCollection({ _id: "", name: "", image: null })); // Fix: use _id
    dispatch(resetCollectionState());
    setUploadedFile(null);
    reset();
  };

  const handleUpdate: SubmitHandler<UpdateCollectionFormData> = async (
    data,
  ) => {
    if (!collection?._id) return; // Fix: use _id

    try {
      await dispatch(
        UPDATE_COLLECTION({
          id: collection._id, // Fix: use _id
          name: data.name,
          image: uploadedFile || data.image,
        }),
      ).unwrap();

      showSuccess("Collection updated successfully!");
      // No need to call handleClose() here as the modal will close automatically
      // when isUpdate becomes false in the Redux state
    } catch (error) {
      console.error("Failed to update collection:", error);
      showError("Failed to update collection");
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];

    if (selectedFile) {
      if (selectedFile.size > 350 * 1024) {
        showError("Image size should not exceed 350KB.");
        return;
      }

      setUploadedFile(selectedFile);
      setValue("image", selectedFile);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const removeImage = () => {
    setUploadedFile(null);
    setValue("image", undefined);
  };

  const getImageSrc = () => {
    if (uploadedFile) {
      return URL.createObjectURL(uploadedFile);
    }
    if (collection?.image && typeof collection.image === "string") {
      return collection.image;
    }
    return null;
  };

  if (!isUpdate || !collection) return null;

  return (
    <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <form
        className="relative w-4/5 rounded-lg bg-white p-6 shadow-lg sm:w-1/2 md:w-1/3"
        onSubmit={handleSubmit(handleUpdate)}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          disabled={isLoading}
          className="hover:text-secondary absolute top-2 right-2 text-xl text-red-400"
        >
          <IoMdCloseCircle />
        </button>

        <h3 className="mb-4 text-center text-lg font-bold">
          Update Collection
        </h3>

        {/* Collection Name */}
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

        {/* Image Upload */}
        <div className="mb-4">
          <label className="mb-3 block text-sm font-medium">
            Collection Image
          </label>

          <div
            {...getRootProps()}
            className="hover:border-primary flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-400 p-4"
          >
            <input {...getInputProps()} disabled={isLoading} />
            {!getImageSrc() ? (
              <div className="text-center text-gray-500">
                <p>Drag & drop an image here, or click to select</p>
                <p className="mt-2 text-sm text-gray-400">
                  Max file size: 350KB
                </p>
              </div>
            ) : (
              <div className="relative h-64 w-full">
                <img
                  src={getImageSrc()!}
                  alt="Preview"
                  className="h-full w-full rounded-md object-contain"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white"
                  disabled={isLoading}
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

        {/* Submit Buttons */}
        <div className="mt-4 flex justify-center gap-4">
          <button
            type="submit"
            className="bg-primary text-secondary hover:bg-secondary hover:text-primary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="bg-primary text-secondary hover:bg-secondary hover:text-primary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
