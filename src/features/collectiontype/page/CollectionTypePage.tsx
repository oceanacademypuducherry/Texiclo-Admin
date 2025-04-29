import { useDispatch, useSelector } from "react-redux";
import { PlaceHolder } from "../../shared";
import {
  AddCollectionModal,
  CollectionComponent,
  DeleteCollectionModal,
  UpdateCollectionModal,
} from "../component";
import { AppDispatch, RootState } from "../../../app/store";
import {
  CollectionsData,
  setCollection,
  setCollectionAddMode,
  setCollectionDeleteMode,
  setCollectionId,
  setCollectionUpdateMode,
} from "../redux";
import { CollectionData } from "../data/CollectionData";

export const CollectionTypePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAdd } = useSelector((state: RootState) => state.collections);
  console.log("sdfsad");
  const handleDelete = (id: string) => {
    dispatch(setCollectionDeleteMode(true));
    dispatch(setCollectionId(id));
  };

  const handleUpdate = (data: CollectionsData) => {
    dispatch(setCollectionUpdateMode(true));
    dispatch(setCollection(data));
  };
  const handleAdd = () => {
    dispatch(setCollectionAddMode(true));
    dispatch(setCollection({ id: "", image: null, name: "" }));
  };

  return (
    <PlaceHolder>
      <DeleteCollectionModal />
      <UpdateCollectionModal />
      {isAdd && <AddCollectionModal />}

      {/* header */}
      <div className="flex flex-col items-center gap-4 p-4">
        <h1 className="text-secondary text-center text-2xl font-bold">
          Collections
        </h1>
      </div>

      {/* Add Category Button */}
      <div className="mb-4 flex w-full justify-end">
        <button
          onClick={handleAdd}
          className="bg-primary hover:bg-secondary hover:text-primary rounded-xl px-6 py-3 text-sm font-medium sm:text-base lg:text-lg"
        >
          Add Collection
        </button>
      </div>
      {/* collection list */}
      <div className="grid justify-center gap-6 p-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {CollectionData.map((collection) => (
          <CollectionComponent
            key={collection.id}
            image={collection.image}
            title={collection.name}
            onDelete={() => handleDelete(collection.id)}
            onUpdate={() => handleUpdate(collection)}
          />
        ))}
      </div>
    </PlaceHolder>
  );
};
