import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { IoMdCloseCircle } from "react-icons/io";
import { DELETE_BANNER, GET_BANNERS } from "../service";
import { closeDeleteModal } from "../redux";
import { showError, showSuccess } from "../../../utils";

export const DeleteBannerModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { modals, selectedId } = useSelector(
    (state: RootState) => state.banners,
  );

  const handleClose = () => {
    dispatch(closeDeleteModal());
  };

  const handleConfirm = async () => {
    try {
      if (selectedId) {
        await dispatch(DELETE_BANNER(selectedId)).unwrap();
        await dispatch(GET_BANNERS());
        dispatch(closeDeleteModal());
        showSuccess("Banner Deleted Successfully");
      }
    } catch (error) {
      showError("Failed to delete banner");
    }
  };

  if (!modals.isDeleteOpen) return null;

  return (
    <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="relative w-4/5 rounded-lg bg-white p-10 sm:w-1/2 md:w-1/3 lg:w-1/4">
        <button
          onClick={handleClose}
          className="hover:text-secondary absolute top-2 right-2 text-xl text-red-500"
        >
          <IoMdCloseCircle />
        </button>

        <h2 className="text-secondary mb-4 text-center text-lg font-bold sm:text-xl md:text-xl">
          Are you sure you want to delete this banner?
        </h2>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={handleConfirm}
            className="bg-primary text-secondary hover:text-primary hover:bg-secondary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
          >
            Yes
          </button>
          <button
            onClick={handleClose}
            className="bg-primary text-secondary hover:text-primary hover:bg-secondary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
