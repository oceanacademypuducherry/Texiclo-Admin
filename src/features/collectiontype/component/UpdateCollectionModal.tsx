// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../../app/store";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { setCollection, setCollectionUpdateMode } from "../redux";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { updateCollectionValidation } from "../validation";
// import { useDropzone } from "react-dropzone";
// import { IoMdCloseCircle } from "react-icons/io";
// import { MdClose } from "react-icons/md";
// import { UPDATE_COLLECTION } from "../service";
// import { showError, showSuccess } from "../../../utils";

// interface UpdateCollectionFormData {
//   name: string;
//   image?: File | string | undefined;
// }
// export const UpdateCollectionModal = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [uploadedFile, setUploadedFile] = useState<File | null>(null);
//   const { isUpdate, collection, isLoading } = useSelector(
//     (state: RootState) => state.collections,
//   );

//   const {
//     register,
//     formState: { errors },
//     setValue,
//     handleSubmit,
//     reset,
//   } = useForm<UpdateCollectionFormData>({
//     resolver: yupResolver(updateCollectionValidation),
//   });

//   useEffect(() => {
//     if (collection) {
//       reset({ name: collection.name || "", image: collection?.image });
//       setUploadedFile(null);
//     }
//   }, [collection, reset]);

//   const handleClose = () => {
//     dispatch(setCollectionUpdateMode(false));
//     dispatch(setCollection({ id: "", name: "", image: null }));
//     setUploadedFile(null);
//     reset();
//   };

//   const handleUpdate: SubmitHandler<UpdateCollectionFormData> = async (
//     data,
//   ) => {
//     if (!collection?.id) return;

//     try {
//       const formData = new FormData();
//       formData.append("name", data.name);
//       if (uploadedFile) {
//         formData.append("image", uploadedFile);
//       }

//       await dispatch(
//         UPDATE_COLLECTION({
//           id: collection.id,
//           name: data.name,
//           image: uploadedFile || data.image,
//         }),
//       ).unwrap();
//       showSuccess("Collection updated successfully!");
//       await dispatch(GET_COLLECTIONTYPE());
//       handleClose();
//     } catch (error) {
//       console.error("Failed to update collection:", error);
//       showError("Failed to updated collection");
//     }
//   };

//   const onDrop = (acceptedFiles: File[]) => {
//     const selectedFile = acceptedFiles[0];
//     if (selectedFile) {
//       setUploadedFile(selectedFile);
//       setValue("image", selectedFile);
//       // if (collection) {
//       //   dispatch(setCollection({...collection,image:selectedFile}))
//       // }
//     }
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: { "image/*": [] },
//     maxFiles: 1,
//   });

//   const removeImage = () => {
//     setUploadedFile(null);
//     setValue("image", undefined);
//     // if (collection) {
//     //   dispatch(setCollection({ ...collection, image: null }));
//     // }
//   };

//   const getImageSrc = () => {
//     if (uploadedFile) {
//       return URL.createObjectURL(uploadedFile);
//     }
//     if (collection?.image && typeof collection.image === "string") {
//       return collection.image;
//     }
//     // if (collection?.image instanceof File) {
//     //   return URL.createObjectURL(collection.image);
//     // }
//     // return null;
//   };

//   if (!isUpdate || !collection) return null;

//   return (
//     <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
//       <form
//         className="relative w-4/5 rounded-lg bg-white p-6 shadow-lg sm:w-1/2 md:w-1/3"
//         onSubmit={handleSubmit(handleUpdate)}
//       >
//         {/* Close Modal Button */}
//         <button
//           type="button"
//           onClick={handleClose}
//           disabled={isLoading}
//           className="hover:text-secondary absolute top-2 right-2 text-xl text-red-400"
//         >
//           <IoMdCloseCircle />
//         </button>

//         <h3 className="mb-4 text-center text-lg font-bold">
//           Update Collection
//         </h3>

//         {/* Category Name */}
//         <div className="mt-4">
//           <div className="mb-4">
//             <label className="block text-sm font-medium">Collection Name</label>
//             <input
//               type="text"
//               {...register("name")}
//               // defaultValue={collection?.name}
//               className="mt-3 w-full rounded-md border p-2"
//               placeholder="Enter category name"
//               disabled={isLoading}
//               // onChange={(e) => {
//               //   if (collection) {
//               //     dispatch(
//               //       setCollection({ ...collection, name: e.target.value }),
//               //     );
//               //   }
//               //   setValue("name", e.target.value);
//               // }}
//             />
//             {errors.name && (
//               <p className="text-left text-xs text-red-500">
//                 {errors.name.message}
//               </p>
//             )}
//           </div>

//           {/* Category Image Upload */}
//           <div className="mb-4">
//             <label className="mb-3 block text-sm font-medium">
//               Collection Image
//             </label>

//             <div
//               {...getRootProps()}
//               className="hover:border-primary flex w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-400 p-4"
//             >
//               <input {...getInputProps()} disabled={isLoading} />
//               {!getImageSrc() ? (
//                 <div className="text-center text-gray-500">
//                   <p>Drag & drop an image here, or click to select an image</p>
//                   <p className="mt-2 text-sm text-gray-400">
//                     Max file size: 350kb
//                   </p>
//                 </div>
//               ) : (
//                 <div className="relative h-40 w-full">
//                   <img
//                     src={
//                       getImageSrc()!
//                       // typeof collection.image === "string"
//                       //   ? collection.image
//                       //   : URL.createObjectURL(collection.image)
//                     }
//                     alt="Preview"
//                     className="h-full w-full rounded-md object-cover"
//                   />
//                   {/* Remove Uploaded Image */}
//                   <button
//                     type="button"
//                     // onClick={() => {
//                     //   {
//                     //     dispatch(setCollection({ ...collection, image: "" }));
//                     //     setUploadedFile(null);
//                     //     setValue("image", "");
//                     //   }
//                     // }}
//                     onClick={removeImage}
//                     className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white"
//                     disabled={isLoading}
//                   >
//                     <MdClose />
//                   </button>
//                 </div>
//               )}
//             </div>
//             {errors.image && (
//               <p className="text-left text-xs text-red-500">
//                 {errors.image.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="mt-4 flex justify-center gap-4">
//           <button
//             type="submit"
//             className="bg-primary text-secondary hover:bg-secondary hover:text-primary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
//             disabled={isLoading}
//           >
//             {isLoading ? "Updating..." : "Update"}
//           </button>
//           <button
//             type="button"
//             onClick={handleClose}
//             className="bg-primary text-secondary hover:bg-secondary hover:text-primary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  setCollection,
  setCollectionUpdateMode,
  resetCollectionState,
} from "../redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateCollectionValidation } from "../validation";
import { useDropzone } from "react-dropzone";
import { IoMdCloseCircle } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { UPDATE_COLLECTION, GET_COLLECTIONTYPE } from "../service";
import { showError, showSuccess } from "../../../utils";

interface UpdateCollectionFormData {
  name: string;
  image?: File | string | undefined;
}

export const UpdateCollectionModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { isUpdate, collection, isLoading } = useSelector(
    (state: RootState) => state.collections,
  );

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
  } = useForm<UpdateCollectionFormData>({
    resolver: yupResolver(updateCollectionValidation),
  });

  useEffect(() => {
    if (collection) {
      reset({ name: collection.name || "", image: collection.image });
      setUploadedFile(null);
    }
  }, [collection, reset]);

  const handleClose = () => {
    dispatch(setCollectionUpdateMode(false));
    dispatch(setCollection({ id: "", name: "", image: null }));
    dispatch(resetCollectionState());
    setUploadedFile(null);
    reset();
  };

  const handleUpdate: SubmitHandler<UpdateCollectionFormData> = async (
    data,
  ) => {
    if (!collection?.id) return;

    try {
      await dispatch(
        UPDATE_COLLECTION({
          id: collection.id,
          name: data.name,
          image: uploadedFile || data.image,
        }),
      ).unwrap();

      showSuccess("Collection updated successfully!");
      handleClose(); // Only close modal after successful update
    } catch (error) {
      console.error("Failed to update collection:", error);
      showError("Failed to update collection");
      return;
    }

    // Try fetching updated collection list separately
    try {
      await dispatch(GET_COLLECTIONTYPE());
    } catch (error) {
      console.warn("Failed to refresh collection list:", error);
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];

    if (selectedFile) {
      if (selectedFile.size > 350 * 1024) {
        showError("Image size should not exceed 350KB.");
        return;
      }

      setUploadedFile(selectedFile);
      setValue("image", selectedFile);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const removeImage = () => {
    setUploadedFile(null);
    setValue("image", undefined);
  };

  const getImageSrc = () => {
    if (uploadedFile) {
      return URL.createObjectURL(uploadedFile);
    }
    if (collection?.image && typeof collection.image === "string") {
      return collection.image;
    }
    return null;
  };

  if (!isUpdate || !collection) return null;

  return (
    <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <form
        className="relative w-4/5 rounded-lg bg-white p-6 shadow-lg sm:w-1/2 md:w-1/3"
        onSubmit={handleSubmit(handleUpdate)}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          disabled={isLoading}
          className="hover:text-secondary absolute top-2 right-2 text-xl text-red-400"
        >
          <IoMdCloseCircle />
        </button>

        <h3 className="mb-4 text-center text-lg font-bold">
          Update Collection
        </h3>

        {/* Collection Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Collection Name</label>
          <input
            type="text"
            {...register("name")}
            className="mt-3 w-full rounded-md border p-2"
            placeholder="Enter collection name"
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-left text-xs text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="mb-3 block text-sm font-medium">
            Collection Image
          </label>

          <div
            {...getRootProps()}
            className="hover:border-primary flex w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-400 p-4"
          >
            <input {...getInputProps()} disabled={isLoading} />
            {!getImageSrc() ? (
              <div className="text-center text-gray-500">
                <p>Drag & drop an image here, or click to select</p>
                <p className="mt-2 text-sm text-gray-400">
                  Max file size: 350KB
                </p>
              </div>
            ) : (
              <div className="relative h-40 w-full">
                <img
                  src={getImageSrc()!}
                  alt="Preview"
                  className="h-full w-full rounded-md object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white"
                  disabled={isLoading}
                >
                  <MdClose />
                </button>
              </div>
            )}
          </div>
          {errors.image && (
            <p className="text-left text-xs text-red-500">
              {errors.image.message}
            </p>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="mt-4 flex justify-center gap-4">
          <button
            type="submit"
            className="bg-primary text-secondary hover:bg-secondary hover:text-primary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="bg-primary text-secondary hover:bg-secondary hover:text-primary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
