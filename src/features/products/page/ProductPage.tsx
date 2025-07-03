import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app";
import { setProducts } from "../redux";

export const ProductPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();

  const { allProducts, selectedCategories, selectedCollections, searchQuery } =
    useSelector((state: RootState) => state.product);

  // useEffect(() => {
  //   if (allProducts.length == 0) {
  //     dispatch(setProducts(ProductsData));
  //   }
  // }, [allProducts.length,dispatch]);

  // ✅ Filter and search logic
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const matchesCollection =
      selectedCollections.length === 0 ||
      selectedCollections.includes(product.collectionType);

    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesCollection && matchesSearch;
  });

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
          <FilterComponent isVisible={false} isSidenav={false} />
        </div>

        <div className="flex w-full flex-col">
          <SearchComponent />
          {filteredProducts.length === 0 ? (
            <p className="py-6 text-center text-lg text-gray-600">
              No products found.
            </p>
          ) : (
            <div className="grid justify-center gap-6 p-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductComponent
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  prices={product.prices}
                  discount={product.discount}
                  variants={product.variants}
                  type={product.collectionType}
                />
              ))}
            </div>
          )}
          {/* <div className="grid justify-center gap-6 p-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

            {ProductsData.map((product) => (
              <ProductComponent
                id={product.id}
                key={product.id}
                title={product.title}
                prices={product.prices}
                discount={product.discount}
                variants={product.variants}
                type={product.collectionType}
              />
            ))}
          </div> */}
        </div>
      </div>

      {/* Slide-in Filter Sidebar for small screens */}
      {showFilter && (
        <MobileFilterSidebar onClose={() => setShowFilter(false)} />
      )}
    </PlaceHolder>
  );
};
