import { IoMdCloseCircle } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { colorValidationSchema } from "../validation/colorValidation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app";
import {
  updateColor,
  resetModalStates,
  clearColor,
  setColorUpdate,
} from "../redux/";

export const UpdateColorModal = () => {
  const dispatch = useDispatch();
  const { color } = useSelector((state: RootState) => state.color);

  const [selectedColor, setSelectedColor] = useState(
    color?.colorValue || "#00ff00",
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(colorValidationSchema),
    defaultValues: {
      colorName: color?.colorName || "",
      selectedColor: color?.colorValue || "#00ff00",
    },
  });

  useEffect(() => {
    reset({
      colorName: color?.colorName || "",
      selectedColor: color?.colorValue || "#00ff00",
    });
    setSelectedColor(color?.colorValue || "#00ff00");
  }, [color, reset]);

  const onSubmit = (data: any) => {
    if (!color?.id) return;

    const updatedData = {
      id: color.id,
      colorName: data.colorName,
      colorValue: selectedColor,
    };

    dispatch(updateColor(updatedData));
    dispatch(resetModalStates());
    dispatch(clearColor());
    reset();
  };
  const handleClose = () => {
    dispatch(setColorUpdate(false));
    reset();
  };
  return (
    <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-9/12 rounded-lg bg-white p-4 shadow-lg sm:w-2/5 md:max-w-[330px]"
      >
        <button
          type="button"
          className="hover:text-secondary absolute top-2 right-2 text-xl text-red-400"
          onClick={handleClose}
        >
          <IoMdCloseCircle />
        </button>

        <h3 className="mb-4 text-center text-lg font-bold">Update Color</h3>

        {/* Color Name */}
        <div className="mt-4">
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

        {/* Color Picker */}
        <div className="mt-4">
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
        </div>

        {/* Submit */}
        <div className="mt-4 flex justify-center gap-4">
          <button
            type="submit"
            className="bg-primary text-secondary hover:bg-secondary hover:text-primary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
