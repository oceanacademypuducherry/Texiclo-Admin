import { useDispatch, useSelector } from "react-redux";
import { PlaceHolder } from "../../shared";
import {
  AddBannerBtn,
  AddBannerModal,
  Banner,
  DeleteBannerModal,
} from "../component";
import { BannerData } from "../data/bannerdata";
import { AppDispatch, RootState } from "../../../app/store";
import {
  setBanner,
  setBannerAdd,
  setBannerDelete,
  setBannerId,
} from "../redux";

export const BannerPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAdd } = useSelector((state: RootState) => state.banners);

  const handleDelete = (id: string) => {
    dispatch(setBannerDelete(true));
    dispatch(setBannerId(id));
  };

  const handleAdd = () => {
    dispatch(setBannerAdd(true));
    const newPosition = BannerData.length + 1; // or any other logic to generate the position
    dispatch(setBanner({ id: "", image: null, position: newPosition }));
  };

  const sortedBanners = [...BannerData].sort((a, b) => a.position - b.position);

  return (
    <PlaceHolder>
      <DeleteBannerModal />

      {isAdd && <AddBannerModal />}
      <div className="flex flex-col items-center">
        <div className="p-6">
          {sortedBanners.map((banner) => (
            <Banner
              key={banner.id}
              image={banner.image}
              title={banner.title}
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
