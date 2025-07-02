import { useState } from "react";
import { PlaceHolder } from "../../shared";
import {
  AddProductBtn,
  FilterComponent,
  MobileFilterSidebar,
  ProductComponent,
  SearchComponent,
} from "../component";
import { ProductsData } from "../data/productData";
import { TbAdjustmentsAlt } from "react-icons/tb";

export const ProductPage = () => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <PlaceHolder>
      {/* Filter button for small screens */}
      <div className="mt-10 flex items-center justify-between px-4 lg:hidden">
        <button
          className="bg-primary text-secondary hover:text-primary hover:bg-secondary flex items-center gap-1 rounded px-4 py-2 font-medium"
          onClick={() => setShowFilter(true)}
        >
          <TbAdjustmentsAlt />
          Filter
        </button>
        <div>
          <AddProductBtn />
        </div>
      </div>

      {/* Main layout */}
      <div className="md:mt[50px] mt-[10px] flex gap-20 p-3 md:gap-10">
        <div className="mt-4 hidden lg:block">
          <FilterComponent isVisible={ false} isSidenav={false} />
        </div>

        <div className="flex w-full flex-col">
          <SearchComponent />
          <div className="grid justify-center gap-6 p-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {ProductsData.map((product) => (
              <ProductComponent
                id={product.id}
                key={product.id}
                previewImage={product.image}
                title={product.name}
                price={product.price}
                discount={product.discount}
                discountprice={product.discountPrice}
                colors={product.colors}
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
