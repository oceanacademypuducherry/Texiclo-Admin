import { useEffect, useState } from "react";
import { Pagination, PlaceHolder } from "../../shared";
import {
  AddProductBtn,
  FilterComponent,
  FilterSkeleton,
  MobileFilterSidebar,
  ProductComponent,
  ProductSkeleton,
  SearchComponent,
} from "../component";

import { TbAdjustmentsAlt } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app";
import { GET_ALL_PRODUCTS, GET_FILTER_OPTIONS } from "../service";
import { useDebounce } from "../hook";

export const ProductPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const {
    products,
    pagination,
    loading,
    error,
    searchQuery,
    selectedCategories,
    selectedCollections,
  } = useSelector((state: RootState) => state.productList);

  const { Filterloading } = useSelector(
    (state: RootState) => state.filteroptions,
  );

  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchQuery, 500);
  const debouncedCategories = useDebounce(selectedCategories, 500);
  const debouncedCollections = useDebounce(selectedCollections, 500);

  useEffect(() => {
    dispatch(GET_FILTER_OPTIONS());
  }, []);

  useEffect(() => {
    dispatch(GET_ALL_PRODUCTS(currentPage));
  }, [
    dispatch,
    currentPage,
    debouncedCollections,
    debouncedCategories,
    debouncedSearch,
  ]);

  const handlePageChange = (page: number) => {
    dispatch(GET_ALL_PRODUCTS(page));
  };

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
          {Filterloading ? (
            <FilterSkeleton />
          ) : (
            <FilterComponent isVisible={false} isSidenav={false} />
          )}
        </div>

        <div className="flex w-full flex-col">
          <SearchComponent />
          {loading ? (
            <div className="grid justify-center gap-6 p-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <p className="py-6 text-center text-lg text-gray-600">
              No products found.
            </p>
          ) : (
            <>
              <div className="grid content-center justify-center gap-6 p-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {products.map((product) => (
                  <ProductComponent
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    prices={{ default: product.price }}
                    discount={product.discountPercentage}
                    colors={product.colors}
                    variantImage={product.variantImage}

                    // defaultGSM={Object.keys(product.prices)[0]}
                  />
                ))}
              </div>

              {/* Pagination Component */}
              {pagination?.totalPages > 1 && (
                <Pagination
                  current={pagination.currentPage}
                  total={pagination.totalPages}
                  onChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* Slide-in Filter Sidebar for small screens */}
      {showFilter && (
        <MobileFilterSidebar onClose={() => setShowFilter(false)} />
      )}
    </PlaceHolder>
  );
};
