import { IoMdCloseCircle } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { colorValidationSchema } from "../validation/colorValidation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addColor, setColorAdd } from "../redux";

export const AddColorModal = () => {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState("#00ff00");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(colorValidationSchema),
    defaultValues: {
      colorName: "",
      selectedColor: "#00ff00",
    },
  });

  const onSubmit = (data: any) => {
    const newColor = {
      id: Date.now().toString(),
      colorName: data.colorName,
      colorValue: data.selectedColor,
    };
    dispatch(addColor(newColor));
    reset();
    dispatch(setColorAdd(false));
  };

  const handleClose = () => {
    dispatch(setColorAdd(false));
    reset();
  };
  return (
    <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-9/12 rounded-lg bg-white p-4 shadow-lg sm:w-2/5 md:max-w-[330px]"
      >
        {/* Cancel Icon */}
        <button
          onClick={handleClose}
          type="button"
          className="hover:text-secondary absolute top-2 right-2 text-xl text-red-400"
        >
          <IoMdCloseCircle />
        </button>

        <h3 className="mb-4 text-center text-lg font-bold">Create Color</h3>

        {/* Color Name Input */}
        <div className="mt-4">
          <div className="mb-1">
            <input
              type="text"
              {...register("colorName")}
              className="w-full rounded-md bg-gray-100 p-2"
              placeholder="Enter Color Name Eg: Green"
            />
            {errors.colorName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.colorName.message}
              </p>
            )}
          </div>
        </div>

        {/* Color Picker */}
        <div className="mt-4">
          <div className="mb-1">
            <div className="flex items-center justify-start gap-4">
              <label className="min-w-[50px] text-lg font-medium">Color</label>
              <input
                type="color"
                className="h-8 w-8 cursor-pointer rounded-full border p-1"
                onChange={(e) => {
                  setSelectedColor(e.target.value);
                  setValue("selectedColor", e.target.value);
                }}
                value={selectedColor}
              />
              <input
                type="text"
                readOnly
                className="text-md max-w-[80px] font-medium focus:outline-none"
                value={selectedColor}
              />
            </div>
            {errors.selectedColor && (
              <p className="mt-1 text-sm text-red-500">
                {errors.selectedColor.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4 flex justify-center gap-4">
          <button
            type="submit"
            className="bg-primary text-secondary hover:bg-secondary hover:text-primary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
