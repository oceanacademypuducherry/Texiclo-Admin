import { IoMdCloseCircle } from "react-icons/io";

export const AddGsmModal = () => {
  return (
    <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <form className="relative w-4/5 rounded-lg bg-white p-6 shadow-lg sm:w-1/2 md:w-1/3">
        {/* Cancel Icon */}
        <button
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
              className="mt-3 w-full rounded-md border p-2"
              placeholder="Enter GSM"
            />
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
