import { useDropzone } from "react-dropzone";
import { IoMdCloseCircle } from "react-icons/io";

interface DropzoneFieldProps {
  index: number;
  image: File | string | null;
  onDrop: (files: File[]) => void;
  onRemove: () => void;
}

export const DropzoneField = ({
  index,
  image,
  onDrop,
  onRemove,
}: DropzoneFieldProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop,
  });

  const preview =
    typeof image === "string"
      ? image
      : image instanceof File
        ? URL.createObjectURL(image)
        : null;

  return (
    <div
      {...getRootProps()}
      className="hover:border-primary relative flex w-full max-w-xs cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-400 p-2 transition sm:h-40 sm:w-80"
    >
      <input {...getInputProps()} />
      {preview ? (
        <>
          <img
            src={preview}
            alt={`banner-${index}`}
            className="h-full w-full rounded-md object-cover"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="absolute top-1 right-1 text-xl text-red-600 hover:text-white"
          >
            <IoMdCloseCircle className="rounded-full bg-white" />
          </button>
        </>
      ) : (
        <div className="text-center text-gray-500">
          <p>Drag & drop an image here, or click to select an image</p>
          <p className="mt-2 text-sm text-gray-400">Max file size: 350kb</p>
        </div>
      )}
    </div>
  );
};
