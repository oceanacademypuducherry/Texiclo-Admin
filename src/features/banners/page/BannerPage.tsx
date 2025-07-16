import { useDispatch, useSelector } from "react-redux";
import { PlaceHolder } from "../../shared";
import {
  AddBannerBtn,
  AddBannerModal,
  Banner,
  BannerSkeleton,
  BulkEditModal,
  DeleteBannerModal,
  UpdateBannerModal,
} from "../component";
import { AppDispatch, RootState } from "../../../app/store";
import { useEffect } from "react";
import {
  openAddModal,
  openBulkEditModal,
  openDeleteModal,
  openUpdateModal,
} from "../redux";
import { GET_BANNERS } from "../service";

export const BannerPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    loading,
    error,
    data: banners,
    modals,
  } = useSelector((state: RootState) => state.banners);

  useEffect(() => {
    dispatch(GET_BANNERS());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(openDeleteModal(id));
  };

  const handleUpdate = (banner: any) => {
    dispatch(openUpdateModal(banner));
  };

  const handleAdd = () => {
    dispatch(openAddModal());
  };

  const sortedBanners = [...banners].sort((a, b) => a.position - b.position);

  return (
    <PlaceHolder>
      {modals.isDeleteOpen && <DeleteBannerModal />}
      {modals.isUpdateOpen && <UpdateBannerModal />}
      {modals.isAddOpen && <AddBannerModal />}
      {modals.isBulkEditOpen && <BulkEditModal />}

      <div className="flex flex-col items-center">
        <div className="flex w-full justify-end p-4">
          <button
            onClick={() => dispatch(openBulkEditModal())}
            className="bg-primary text-secondary hover:bg-secondary hover:text-primary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
          >
            Edit Banners
          </button>
        </div>
        <div className="flex w-full flex-col items-center p-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <BannerSkeleton key={index} />
            ))
          ) : sortedBanners.length === 0 ? (
            <p className="text-center text-gray-500">No banners found.</p>
          ) : (
            sortedBanners.map((banner) => (
              <Banner
                key={banner.id}
                image={banner.image}
                onUpdate={() => handleUpdate(banner)}
                onDelete={() => handleDelete(banner.id!)}
              />
            ))
          )}
        </div>

        <div>
          <AddBannerBtn onClick={handleAdd} />
        </div>
      </div>
    </PlaceHolder>
  );
};
