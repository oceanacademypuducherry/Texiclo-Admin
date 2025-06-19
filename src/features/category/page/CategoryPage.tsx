import { Pagination, PlaceHolder } from "../../shared";
import {
  DeleteConfirmationModal,
  UpdateCategoryModal,
  AddCategoryModal,
  CategoryComponent,
} from "../component";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import {
  CategoryData,
  setCategory,
  setCategoryId,
  setIsAdd,
  setIsDelete,
  setIsUpdate,
} from "../redux";
import { useEffect, useState } from "react";
import { GET_CATEGORY } from "../service";
import { CollectionSkeleton } from "../../collectiontype";

export const CategoryPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAdd, isLoading, categorys, pagination } = useSelector(
    (state: RootState) => state.categories,
  );
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(GET_CATEGORY(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = (id: string) => {
    dispatch(setIsDelete(true));
    dispatch(setCategoryId(id));
  };

  const handleUpdate = (data: CategoryData) => {
    dispatch(setIsUpdate(true));
    dispatch(setCategory(data));
  };
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    dispatch(setCategory({ id: "", image: null, name: "" }));
  };

  return (
    <PlaceHolder>
      {/* Modals */}
      <DeleteConfirmationModal />
      <UpdateCategoryModal />
      {isAdd && <AddCategoryModal />}
      {/* Header Section */}
      <div className="flex flex-col items-center gap-4 p-4">
        <h1 className="text-secondary text-center text-2xl font-bold">
          Categories
        </h1>
      </div>

      {/* Add Category Button */}
      <div className="mb-4 flex w-full justify-end">
        <button
          onClick={handleAdd}
          className="bg-primary hover:bg-secondary hover:text-primary mr-4 rounded-xl px-6 py-3 text-sm font-medium sm:text-base lg:text-lg"
        >
          Add Category
        </button>
      </div>

      {/* Product List */}
      {isLoading ? (
        <div className="grid justify-items-center gap-6 p-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <CollectionSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid justify-items-center gap-6 p-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
            {categorys && categorys.length > 0 ? (
              categorys.map((category) => (
                <CategoryComponent
                  key={category.id}
                  image={category.image}
                  title={category.name}
                  onDelete={() => category.id && handleDelete(category.id)}
                  onUpdate={() => handleUpdate(category)}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No category found.
              </p>
            )}
          </div>
          <div className="mt-8 flex justify-center">
            <Pagination
              current={pagination.currentPage}
              total={pagination.totalPages}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </PlaceHolder>
  );
};
