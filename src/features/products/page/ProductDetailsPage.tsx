import { PlaceHolder } from "../../shared";
import { ProductComponent, ProductDetailComponent } from "../component";
import { ProductsData } from "../data/productData";

export const ProductDetailsPage = () => {
  return (
    <PlaceHolder>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-center font-bold text-2xl">
            View Product
          </h1>
          <ProductDetailComponent />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-center font-bold text-2xl">
            Related Product
          </h1>
          <div className="grid justify-center gap-0 p-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {ProductsData.map((product) => (
              <ProductComponent
                id={product.id}
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
