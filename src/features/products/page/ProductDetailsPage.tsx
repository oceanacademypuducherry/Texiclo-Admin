import { PlaceHolder } from "../../shared";
import {
  BackBtn,
  ProductComponent,
  ProductDetailComponent,
} from "../component";
import { ProductsData } from "../data/productData";

export const ProductDetailsPage = () => {
  return (
    <PlaceHolder>
      <div className="mx-4 mt-2">
        <BackBtn />
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-2xl font-bold">View Product</h1>
          <ProductDetailComponent />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-2xl font-bold">Related Product</h1>
          <div className="grid justify-center gap-0 p-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {ProductsData.map((product) => (
              <ProductComponent
                id={product.id}
                key={product.id}
                previewImage={product.image}
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
