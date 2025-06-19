import { useState } from "react";
import { MdClose } from "react-icons/md"; 
import { useDropzone } from "react-dropzone"; 
import { IoMdCloseCircle } from "react-icons/io";
import { AppDispatch, RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setIsAdd } from "../redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { addCategoryValidation } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { ADD_CATEGORY, GET_CATEGORY } from "../service";
import { Pagination } from "../../shared";

interface AddCategoryFormData {
  name: string;
  image: File;
}



export const AddCategoryModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAdd ,isLoading ,pagination} = useSelector((state: RootState) => state.categories);
  const [image, setImage] = useState<File|string | null>(null);

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    reset
  } = useForm<AddCategoryFormData>({
    resolver: yupResolver(addCategoryValidation),
  });

  const handleAdd: SubmitHandler<AddCategoryFormData> = async (formData) => {
    if (!image) return;
    try {
      await dispatch(
        ADD_CATEGORY({
          name: formData.name,
          image: image,
        })
      ).unwrap()
      await dispatch(GET_CATEGORY(pagination.totalPages))
      handleClose()
    } catch (error) {
      console.error("failed to add category",error)
    }
  };
  const handleClose = () => {
    dispatch(setIsAdd(false));
    dispatch(setCategory(null));
    setImage(null);
    reset()
  };
  
  const onDrop = (acceptedFiles: File[]) => {
    const myImage = acceptedFiles[0];
    setImage(myImage); 
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

        <h3 className="mb-4 text-center text-lg font-bold">Add Category</h3>

        <div className="mt-4">
          {/* Category Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Category Name</label>
            <input
              type="text"
              {...register("name")}
              className="mt-3 w-full rounded-md border p-2"
              placeholder="Enter category name"
            />
            {errors.name && (
              <p className="text-left text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
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
              <input {...getInputProps()} disabled={isLoading} />
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
