import { useForm } from "react-hook-form";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addGsmValidation } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { setGsmAdd } from "../redux";
import { AppDispatch } from "../../../app";
import { ADD_GSM, GET_GSM } from "../service";
import { showError, showSuccess } from "../../../utils";

export const AddGsmModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addGsmValidation),
  });
  const onSubmit = async (data: { gsm: number }) => {
    const value = data.gsm.toString();
    try {
      await dispatch(ADD_GSM(value)).unwrap();
      await dispatch(GET_GSM());
      dispatch(setGsmAdd(false));
      showSuccess("GSM added successfully!");
      reset();
    } catch (err: any) {
      console.error("Failed to add GSM", err.message || err);
      showError("Failed to add GSM.");
    }
  };

  const handleClose = () => {
    dispatch(setGsmAdd(false));
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

        <h3 className="mb-4 text-center text-lg font-bold">Create GSM</h3>

        <div className="mt-4">
          <div className="mb-4">
            {/* <label className="block text-sm font-medium">GSM Value</label> */}
            <input
              type="number"
              {...register("gsm")}
              className="mt-3 w-full rounded-md bg-gray-100 p-2"
              placeholder="Enter GSM"
            />
            {errors.gsm && (
              <p className="mt-1 text-sm text-red-500">{errors.gsm.message}</p>
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
