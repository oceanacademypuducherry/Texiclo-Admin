import { MdDelete } from "react-icons/md";
import { FC } from "react";
import { HiPencilAlt } from "react-icons/hi";

interface BannerProps {
  image: string | File | null;
  onUpdate: () => void;
  onDelete: () => void;
}

export const Banner: FC<BannerProps> = ({ image, onDelete, onUpdate }) => {
  return (
    <div className="group relative w-full p-2">
      <div className="relative mx-auto h-[200px] max-w-full overflow-hidden rounded-md">
        <img
          src={typeof image === "string" ? image : ""}
          className="h-full w-full rounded-md object-cover"
          alt="banner"
        />

        {/* Hover buttons with backdrop blur */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/30 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={onUpdate}
            className="flex items-center gap-2 rounded-md bg-blue-600 p-2 font-medium text-white hover:bg-blue-500"
          >
            <HiPencilAlt />
            Update
          </button>

          <button
            onClick={onDelete}
            className="bg-primary flex items-center gap-2 rounded-md p-2 font-medium text-black hover:bg-red-600 hover:text-white"
          >
            <MdDelete />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
