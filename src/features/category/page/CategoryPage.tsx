import { PlaceHolder } from "../../shared";
import {
  DeleteConfirmationModal,
  UpdateCategoryModal,
  AddCategoryModal,
  CategoryComponent,
} from "../component";
import { CategoriesData } from "../data/CategoriesData";
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

export const CategoryPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAdd } = useSelector((state: RootState) => state.categories);
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
          className="bg-primary hover:bg-secondary hover:text-primary rounded-xl px-6 py-3 text-sm font-medium sm:text-base lg:text-lg"
        >
          Add Category
        </button>
      </div>

      {/* Product List */}
      <div className="grid justify-center gap-6 p-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {CategoriesData.map((category) => (
          <CategoryComponent
            key={category.id}
            image={category.image}
            title={category.name}
            onDelete={() => handleDelete(category.id)}
            onUpdate={() => handleUpdate(category)}
          />
        ))}
      </div>
    </PlaceHolder>
  );
};
