import { BANNER1 } from "../assets";
import { Banner } from "./banners";
import { ProductComponent } from "./products";

export const Checking = () => {
  return (
    <div>
      <ProductComponent />
      <Banner image={BANNER1} title="banner1" />
      {/* <Login /> */}
    </div>
  );
};
