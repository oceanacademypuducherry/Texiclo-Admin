import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CollectionsData,
  setCollection,
  setCollectionUpdateMode,
  updateCollection,
} from "../redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateCollectionValidation } from "../validation";
import { useDropzone } from "react-dropzone";
import { IoMdCloseCircle } from "react-icons/io";
import { MdClose } from "react-icons/md";

export const UpdateCollectionModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [_uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { isUpdate, collection } = useSelector(
    (state: RootState) => state.collections,
  );

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
  } = useForm<CollectionsData>({
    resolver: yupResolver(updateCollectionValidation),
    defaultValues: {
      name: collection?.name,
      image: collection?.image,
    },
  });

  const handleClose = () => {
    dispatch(setCollectionUpdateMode(false));
    reset(); // Reset form on close
  };

  const handleUpdate: SubmitHandler<CollectionsData> = (newData) => {
    const updatedData = {
      ...newData,
      image: _uploadedFile ? URL.createObjectURL(_uploadedFile) : newData.image,
    };
    dispatch(updateCollection(updatedData));
    console.log("updated", updatedData);
  };

  const onDrop = (acceptedFiles: File[]) => {
    const myImage = acceptedFiles[0];
    setUploadedFile(myImage);
    if (!collection) return;

    // Store only the URL of the image in the state
    const imageUrl = URL.createObjectURL(myImage);
    dispatch(setCollection({ ...collection, image: imageUrl }));
    setValue("image", imageUrl); // Update form with image URL
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  if (!isUpdate) return null;

  return (
    <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <form
        className="relative w-4/5 rounded-lg bg-white p-6 shadow-lg sm:w-1/2 md:w-1/3"
        onSubmit={handleSubmit(handleUpdate)}
      >
        {/* Close Modal Button */}
        <button
          type="button"
          onClick={handleClose}
          className="hover:text-secondary absolute top-2 right-2 text-xl text-red-400"
        >
          <IoMdCloseCircle />
        </button>

        <h3 className="mb-4 text-center text-lg font-bold">
          Update Collection
        </h3>

        {/* Category Name */}
        <div className="mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium">Collection Name</label>
            <input
              type="text"
              {...register("name")}
              defaultValue={collection?.name}
              className="mt-3 w-full rounded-md border p-2"
              placeholder="Enter category name"
              onChange={(e) => {
                if (collection) {
                  dispatch(
                    setCollection({ ...collection, name: e.target.value }),
                  );
                }
                setValue("name", e.target.value);
              }}
            />
            {errors.name && (
              <p className="text-left text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Category Image Upload */}
          <div className="mb-4">
            <label className="mb-3 block text-sm font-medium">
              Collection Image
            </label>

            <div
              {...getRootProps()}
              className="hover:border-primary flex w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-400 p-4"
            >
              <input {...getInputProps()} />
              {!collection?.image ? (
                <div className="text-center text-gray-500">
                  <p>Drag & drop an image here, or click to select an image</p>
                  <p className="mt-2 text-sm text-gray-400">
                    Max file size: 350kb
                  </p>
                </div>
              ) : (
                <div className="relative h-40 w-full">
                  <img
                    src={
                      typeof collection.image === "string"
                        ? collection.image
                        : URL.createObjectURL(collection.image)
                    }
                    alt="Preview"
                    className="h-full w-full rounded-md object-cover"
                  />
                  {/* Remove Uploaded Image */}
                  <button
                    type="button"
                    onClick={() => {
                      {
                        dispatch(setCollection({ ...collection, image: "" }));
                        setUploadedFile(null);
                        setValue("image", "");
                      }
                    }}
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
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-center gap-4">
          <button
            type="submit"
            className="bg-primary text-secondary hover:bg-secondary hover:text-primary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
          >
            Update
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
