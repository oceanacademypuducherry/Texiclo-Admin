import { useState } from "react";
import { PlaceHolder } from "../../shared";
import {
  FilterComponent,
  MobileFilterSidebar,
  ProductComponent,
  SearchComponent,
} from "../component";
import { ProductsData } from "../data/productData";


export const ProductPage = () => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <PlaceHolder>
      {/* Filter button for small screens */}
      <div className="flex justify-start px-4 md:hidden">
        <button
          className="bg-primary tetx-secondary hover:text-primary hover:bg-secondary mt-4 mb-2 rounded px-4 py-2 font-medium"
          onClick={() => setShowFilter(true)}
        >
          Filter
        </button>
      </div>

      {/* Main layout */}
      <div className="md:mt[50px] mt-[10px] flex gap-20 p-3 md:gap-10">
        <div className="hidden md:block">
          <FilterComponent />
        </div>

        <div className="flex w-full flex-col">
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

      {/* Slide-in Filter Sidebar for small screens */}
      {showFilter && (
        <MobileFilterSidebar onClose={() => setShowFilter(false)} />
      )}
    </PlaceHolder>
  );
};
