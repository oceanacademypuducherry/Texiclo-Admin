import { FC } from "react";
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

type CollectionProps = {
  image: string |File|null;
  title: string;
  onUpdate: () => void;
  onDelete: () => void;
};

export const CollectionComponent: FC<CollectionProps> = ({
  image,
  title,
  onUpdate,
  onDelete,
}) => {
  const getImageSrc = () => {
    if (typeof image === "string") {
      return image;
    }
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    return "/placeholder-image.jpg"; // Fallback image
  };

  return (
    <div className="relative flex w-[300px] flex-col items-center rounded-lg bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-2xl">
      <div className="mb-4">
        <img
          src={getImageSrc()}
          alt={title}
          className="h-48 w-48 rounded-md object-cover"
        />
      </div>
      <div className="flex flex-col items-center text-center">
        <span className="mb-2 text-lg font-semibold">{title}</span>
      </div>

      {/* Hidden buttons, shown on hover */}
      <div className="absolute inset-0 flex items-center justify-center gap-3 bg-white/80 opacity-0 transition-opacity duration-300 hover:opacity-100">
        <button
          onClick={onUpdate}
          className="flex items-center gap-2 rounded-md bg-blue-600 p-2 font-medium text-white hover:bg-blue-500"
        >
          <HiPencilAlt />
          Update
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-2 rounded-md bg-red-600 p-2 font-medium text-white hover:bg-red-500"
        >
          <MdDelete />
          Delete
        </button>
      </div>
    </div>
  );
};
