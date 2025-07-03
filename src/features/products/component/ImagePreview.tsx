import { MdOutlineCancel } from "react-icons/md";
import { useEffect, useState } from "react";

interface Props {
  image: File | string;
  onRemove: () => void;
}

export const ImagePreview = ({ image, onRemove }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image);
      setPreviewUrl(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else if (typeof image === "string") {
      setPreviewUrl(image);
    } else {
      setPreviewUrl(null);
    }
  }, [image]);

  if (!previewUrl) return null;

  return (
    <div className="relative h-24 w-24">
      <img
        src={previewUrl}
        alt="preview"
        className="h-full w-full rounded object-cover"
      />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-0 right-0 rounded-full bg-white p-1 text-red-600 shadow"
      >
        <MdOutlineCancel size={18} />
      </button>
    </div>
  );
};
