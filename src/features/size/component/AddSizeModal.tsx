import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addSizeValidation } from "../validation";
import { setSizeAdd } from "../redux";
import { AppDispatch } from "../../../app";
import { ADD_SIZE, GET_SIZE } from "../service";
import { showError, showSuccess } from "../../../utils";

export const AddSizeModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addSizeValidation),
  });
  const onSubmit = async (data: { size: string }) => {
    const label = data.size.toString();
    try {
      await dispatch(ADD_SIZE(label)).unwrap();
      await dispatch(GET_SIZE());
      dispatch(setSizeAdd(false));
      showSuccess("Size Added successfully");
      reset();
    } catch (err: any) {
      showError("Failed To add Size");
    }
  };

  const handleClose = () => {
    dispatch(setSizeAdd(false));
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

        <h3 className="mb-4 text-center text-lg font-bold">Create Size</h3>

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
