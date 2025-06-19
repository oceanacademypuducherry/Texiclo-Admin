import { useDispatch, useSelector } from "react-redux";
import { Pagination, PlaceHolder } from "../../shared";
import {
  AddCollectionModal,
  CollectionComponent,
  CollectionSkeleton,
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
import { useEffect, useState } from "react";
import { GET_COLLECTIONTYPE } from "../service";

export const CollectionTypePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAdd, collections, isLoading, pagination } = useSelector(
    (state: RootState) => state.collections,
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(GET_COLLECTIONTYPE(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = (id: string) => {
    // console.log(id, "id");
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
          className="bg-primary hover:bg-secondary hover:text-primary mr-4 rounded-xl px-6 py-3 text-sm font-medium sm:text-base lg:text-lg"
        >
          Add Collection
        </button>
      </div>
      {/* collection list */}
      {isLoading ? (
        // <p className="text-center">loading.....</p>
        <div className="grid justify-items-center gap-6 p-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <CollectionSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid justify-items-center gap-6 p-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
            {collections && collections?.length > 0 ? (
              collections.map((collection) => (
                <CollectionComponent
                  key={collection.id}
                  image={collection.image}
                  title={collection.name}
                  onDelete={() => {
                    if (collection.id) handleDelete(collection.id);
                  }}
                  onUpdate={() => handleUpdate(collection)}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No collections found.
              </p>
            )}
          </div>

          {/* <div className="fixed bottom-0 z-40 w-full"> */}
          <div className="mt-8 flex justify-center">
            <Pagination
              current={pagination.currentPage}
              total={pagination.totalPages}
              onChange={handlePageChange}
            />
          </div>
          {/* </div> */}
        </>
      )}
    </PlaceHolder>
  );
};
