import {  useState } from "react";
import { MdClose } from "react-icons/md"; // Cancel icon
import { useDropzone } from "react-dropzone"; // Import react-dropzone
import { IoMdCloseCircle } from "react-icons/io";
import { AppDispatch, RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setIsAdd } from "../redux";

export const AddCategoryModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAdd ,category} = useSelector((state: RootState) => state.categories);
  const [image, setImage] = useState<File | null>(null);

 
  
  const handleAdd = () => {
    console.log(category);
    
  };
  const handleClose = () => {
    dispatch(setIsAdd(false));
  };
  // Handle image upload with react-dropzone
  const onDrop = (acceptedFiles: File[]) => {
    const myImage = acceptedFiles[0];
    setImage(myImage); // store File locally
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
  if (!isAdd) return null;

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

        <h3 className="mb-4 text-center text-lg font-bold">Add Category</h3>

        <div className="mt-4">
          {/* Category Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Category Name</label>
            <input
              type="text"
              value={category?.name}
              onChange={(e) => category && dispatch(setCategory({...category,name:e.target.value}))}
              className="mt-3 w-full rounded-md border p-2"
              placeholder="Enter category name"
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
              {!image ? (
                <div className="text-center text-gray-500">
                  <p>Drag & drop an image here, or click to select an image</p>
                  <p className="mt-2 text-sm text-gray-400">
                    Max file size: 5MB
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

        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={handleAdd}
            className="bg-primary text-secondary hover:bg-secondary hover:text-primary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
          >
            Add
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
