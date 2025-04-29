import { PRODUCT2 } from "../../../assets";
import { PlaceHolder } from "../../shared";
import { ProductComponent } from "../component";

export const ProductPage = () => {
  return (
    <PlaceHolder>
      <div>
        {/* product Page */}
        <ProductComponent
          image={PRODUCT2}
          title="t-shirts"
          price={200}
          discount={2}
        />
      </div>
    </PlaceHolder>
  );
};
