import { useDispatch, useSelector } from "react-redux";
import { PlaceHolder } from "../../shared";
import {
  AddBannerBtn,
  AddBannerModal,
  Banner,
  BulkEditModal,
  DeleteBannerModal,
  UpdateBannerModal,
} from "../component";
import { BannerData } from "../data/bannerdata";
import { AppDispatch, RootState } from "../../../app/store";
import {
  BannersData,
  setBanner,
  setBannerAdd,
  setBannerData,
  setBannerDelete,
  setBannerId,
  setBannerUpdate,
  setBulkEdit,
} from "../redux";
import { useEffect } from "react";

export const BannerPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAdd, isBulkEdit, isUpdate, isDelete } = useSelector(
    (state: RootState) => state.banners,
  );
  useEffect(() => {
    dispatch(setBannerData(BannerData)); // ✅ initialize Redux store
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(setBannerDelete(true));
    dispatch(setBannerId(id));
  };
  const handleUpdate = (banner: BannersData) => {
    dispatch(setBanner(banner));
    dispatch(setBannerUpdate(true));
  };
  const handleAdd = () => {
    dispatch(setBannerAdd(true));
    const newPosition = BannerData.length + 1;
    dispatch(setBanner({ id: "", image: null, position: newPosition }));
  };

  const sortedBanners = [...BannerData].sort((a, b) => a.position - b.position);

  return (
    <PlaceHolder>
      {isDelete && <DeleteBannerModal />}
      {isUpdate && <UpdateBannerModal />}
      {isAdd && <AddBannerModal />}
      {isBulkEdit && <BulkEditModal />}
      <div className="flex flex-col items-center">
        <div className="flex w-full justify-end p-4">
          <button
            onClick={() => dispatch(setBulkEdit(true))}
            className="bg-primary text-secondary hover:bg-secondary hover:text-primary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
          >
            Edit Banner
          </button>
        </div>
        <div className="p-6">
          {sortedBanners.map((banner) => (
            <Banner
              key={banner.id}
              image={banner.image}
              title={banner.title}
              onUpdate={() => handleUpdate(banner)}
              onDelete={() => handleDelete(banner.id)}
            />
          ))}
        </div>
        <div>
          <AddBannerBtn />
        </div>
      </div>
    </PlaceHolder>
  );
};
