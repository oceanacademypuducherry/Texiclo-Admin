import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { setIsDelete } from "../redux";
import { DELETE_CATEGORY, GET_CATEGORY } from "../service";
import { showError, showSuccess } from "../../../utils";

export const DeleteConfirmationModal = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isDelete, id, isLoading } = useSelector(
    (state: RootState) => state.categories,
  );

  const handleClose = () => {
    dispatch(setIsDelete(false));
  };
  const handleConfirm = async () => {
    console.log("Category ID to delete:", id);
    if (id) {
      try {
        await dispatch(DELETE_CATEGORY(id)).unwrap();
        showSuccess("Category Deleted Successfully");
        await dispatch(GET_CATEGORY());
        handleClose();
      } catch (error) {
        console.error("failed to delete category", error);
        showError("Failed to delete Category");
      }
    }
  };

  if (!isDelete) return null;

  return (
    <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="relative w-4/5 rounded-lg bg-white p-10 sm:w-1/2 md:w-1/3 lg:w-1/4">
        {/* Cancel Icon */}
        <button
          onClick={handleClose}
          className="hover:text-secondary absolute top-2 right-2 text-xl text-red-500"
        >
          <IoMdCloseCircle />
        </button>

        <h2 className="text-secondary mb-4 text-center text-lg font-bold sm:text-xl md:text-xl">
          Are you sure you want to delete?
        </h2>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-primary text-secondary hover:text-primary hover:bg-secondary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
          >
            Yes
          </button>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="bg-primary text-secondary hover:text-primary hover:bg-secondary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
