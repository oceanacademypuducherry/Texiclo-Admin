import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateSizeValidation } from "../validation";
import { setSizeUpdate, updateSize } from "../redux";

export const UpdateSizeModal = () => {
  const dispatch = useDispatch();
  const { size } = useSelector((state: RootState) => state.size);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      size: size?.size || "",
    },
    resolver: yupResolver(updateSizeValidation),
  });

  const onSubmit = (data: { size: string }) => {
    if (size) {
      const updatedSize = {
        ...size,
        size: data.size,
      };
      dispatch(updateSize(updatedSize));
      dispatch(setSizeUpdate(false));
      reset();
    }
  };

  const handleClose = () => {
    dispatch(setSizeUpdate(false));
    reset();
  };

  return (
    <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-11/12 rounded-lg bg-white p-4 shadow-lg sm:w-2/5 md:w-1/4"
      >
        {/* Cancel Icon */}
        <button
          onClick={handleClose}
          type="button"
          className="hover:text-secondary absolute top-2 right-2 text-xl text-red-400"
        >
          <IoMdCloseCircle />
        </button>

        <h3 className="mb-4 text-center text-lg font-bold">Update Size</h3>

        <div className="mt-4">
          <div className="mb-4">
            <input
              type="text"
              {...register("size")}
              className="mt-3 w-full rounded-md bg-gray-100 p-2"
              placeholder="Enter Size"
            />
            {errors.size && (
              <p className="mt-1 text-sm text-red-500">{errors.size.message}</p>
            )}
          </div>
        </div>

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
