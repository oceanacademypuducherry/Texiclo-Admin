import { useState, JSX } from "react";
import ImageCropper from "./ImageCropper";

interface UseImageCropperReturn {
  cropImageFromFile: (file: File, onCrop: (croppedFile: File) => void) => void;
  CropperModal: JSX.Element | null;
}

const dataURLToFile = (dataUrl: string, filename: string): File => {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
};

export const useImageCropper = (): UseImageCropperReturn => {
  const [currentBase64, setCurrentBase64] = useState<string | null>(null);
  const [onCropCallback, setOnCropCallback] = useState<
    ((file: File) => void) | null
  >(null);

  const cropImageFromFile = (
    file: File,
    onCrop: (croppedFile: File) => void,
  ) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setCurrentBase64(e.target?.result as string);
      setOnCropCallback(() => onCrop);
    };
    reader.readAsDataURL(file);
  };

  const handleCropped = (file: File) => {
    if (onCropCallback) {
      // const file = dataURLToFile(base64, "cropped.jpg");
      onCropCallback(file);
    }
    setCurrentBase64(null);
    setOnCropCallback(null);
  };

  const handleCancel = () => {
    setCurrentBase64(null);
    setOnCropCallback(null);
  };

  const CropperModal = currentBase64 ? (
    <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="max-w-full rounded bg-white p-4 shadow-md">
        <ImageCropper
          currentImage={currentBase64}
          onImageCropped={handleCropped}
          onCancel={handleCancel}
        />
      </div>
    </div>
  ) : null;

  return {
    cropImageFromFile,
    CropperModal,
  };
};
