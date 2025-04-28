import { MdClose } from "react-icons/md"; // Cancel icon
import { IoMdCloseCircle } from "react-icons/io";
import { useDropzone } from "react-dropzone"; // Importing dropzone
import { AppDispatch, RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setIsUpdate } from "../redux";
import { useState } from "react";

export const UpdateCategoryModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [_uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { isUpdate, category } = useSelector(
    (state: RootState) => state.categories,
  );

  const handleClose = () => {
    dispatch(setIsUpdate(false));
  };

  const handleUpdate = () => {
    console.log("updated");
    console.log(category);
  };

  // Handle image upload with react-dropzone
  const onDrop = (acceptedFiles: File[]) => {
    const myImage = acceptedFiles[0];
    setUploadedFile(myImage); // store File locally
    if (!category) return;
    dispatch(setCategory({ ...category, image: URL.createObjectURL(myImage) })); // store preview URL
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
  });
  

  if (!isUpdate) return null;

  return (
    <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="relative w-4/5 rounded-lg bg-white p-6 shadow-lg sm:w-1/2 md:w-1/3">
        {/* Cancel Icon */}
        <button
          onClick={handleClose}
          className="hover:text-secondary absolute top-2 right-2 text-xl text-red-400"
        >
          <IoMdCloseCircle />
        </button>

        <h3 className="mb-4 text-center text-lg font-bold">Update Category</h3>

        <div className="mt-4">
          {/* Category Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Category Name</label>
            <input
              type="text"
              className="mt-3 w-full rounded-md border p-2"
              placeholder="Enter category name"
              value={category?.name}
              onChange={(e)=> category && dispatch(setCategory({...category,name:e.target.value}))}
            />
          </div>

          {/* Category Image Upload with Dropzone */}
          <div className="mb-4">
            <label className="mb-3 block text-sm font-medium">
              Category Image
            </label>

            <div
              {...getRootProps()}
              className="hover:border-primary flex w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-400 p-4"
            >
              <input {...getInputProps()} />
              {!category?.image ? (
                <div className="text-center text-gray-500">
                  <p>Drag & drop an image here, or click to select an image</p>
                  <p className="mt-2 text-sm text-gray-400">
                    Max file size: 5MB
                  </p>
                </div>
              ) : (
                <div className="relative h-40 w-full">
                  <img
                    src={
                      typeof category?.image === "string"
                        ? category?.image
                        : URL.createObjectURL(category?.image)
                    }
                    alt="Preview"
                    className="h-full w-full rounded-md object-cover"
                  />
                  <button className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white">
                    <MdClose />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={handleUpdate}
            className="bg-primary text-secondary hover:bg-secondary hover:text-primary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
          >
            Update
          </button>
          <button
            onClick={handleClose}
            className="bg-primary text-secondary hover:bg-secondary hover:text-primary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
