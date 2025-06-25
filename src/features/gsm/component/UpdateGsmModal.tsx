import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateGsmValidation } from "../validation";
import { setGsmUpdate, updateGsm } from "../redux";

export const UpdateGsmModal = () => {
  const dispatch = useDispatch();
  const { gsm } = useSelector((state: RootState) => state.gsm);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      gsm: gsm?.gsm || "",
    },
    resolver: yupResolver(updateGsmValidation),
  });

  const onSubmit = (data: { gsm: number }) => {
    if (gsm) {
      const updatedGsm = {
        ...gsm,
        gsm: Number(data.gsm),
      };
      dispatch(updateGsm(updatedGsm));
      dispatch(setGsmUpdate(false));
      reset();
    }
  };

  const handleClose = () => {
    dispatch(setGsmUpdate(false));
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

        <h3 className="mb-4 text-center text-lg font-bold">Update GSM</h3>

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
