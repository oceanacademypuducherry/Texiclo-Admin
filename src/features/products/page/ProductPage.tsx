import { PlaceHolder } from "../../shared";
import {
  FilterComponent,
  ProductComponent,
  SearchComponent,
} from "../component";
import { ProductsData } from "../data/productData";

export const ProductPage = () => {
  return (
    <PlaceHolder>
      <div className="mt-[50px] flex gap-20 p-3">
        <FilterComponent />
        <div className="flex flex-col">
          <SearchComponent />
          <div className="grid justify-center gap-6 p-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {ProductsData.map((product) => (
              <ProductComponent
                key={product.id}
                image={product.image}
                title={product.name}
                price={product.price}
                discount={product.discount}
                discountprice={product.discountPrice}
              />
            ))}
          </div>
        </div>
      </div>
    </PlaceHolder>
  );
};
