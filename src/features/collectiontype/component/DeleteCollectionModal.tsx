import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";

import { setCollectionDeleteMode } from "../redux";
import { IoMdCloseCircle } from "react-icons/io";
import { DELETE_COLLECTION } from "../service";

export const DeleteCollectionModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isDelete, id, isLoading } = useSelector(
    (state: RootState) => state.collections,
  );

  const handleClose = () => {
    dispatch(setCollectionDeleteMode(false));
  };

  const handleConfirm = async () => {
    console.log("Collection ID to delete:", id);
    if (id) {
      try {
        await dispatch(DELETE_COLLECTION(id)).unwrap();
        handleClose();
      } catch (error) {
        console.error("Failed to delete collection:", error);
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
          disabled={isLoading}
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
