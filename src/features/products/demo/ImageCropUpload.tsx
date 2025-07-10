import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { ImageSource, Base64Image } from "../redux";
import { fileToBase64Image } from "../../../utils";

interface Props {
  file?: ImageSource | ImageSource[] | null;
  onChange: (file: ImageSource | ImageSource[]) => void;
  label?: string;
  isMultiple?: boolean;
}

export const ImageCropUpload: React.FC<Props> = ({
  file,
  onChange,
  label = "Upload",
  isMultiple = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<HTMLImageElement>(null);

  const [src, setSrc] = useState<string | null>(null);
  const [fileQueue, setFileQueue] = useState<File[]>([]);
  const [croppingFile, setCroppingFile] = useState<File | null>(null);
  const [croppedList, setCroppedList] = useState<Base64Image[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];

    if (!isMultiple) {
      const file = selectedFiles[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        setSrc(reader.result as string);
        setCroppingFile(file);
      };
      reader.readAsDataURL(file);
    } else {
      // Queue the files and start cropping first one
      if (selectedFiles.length > 0) {
        setFileQueue(selectedFiles);
        startCroppingFile(selectedFiles[0]);
      }
    }
  };

  const startCroppingFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setSrc(reader.result as string);
      setCroppingFile(file);
    };
    reader.readAsDataURL(file);
  };

  const handleCrop = async () => {
    const cropper = (cropperRef.current as any)?.cropper;

    if (cropper && croppingFile) {
      cropper.getCroppedCanvas().toBlob(async (blob: Blob | null) => {
        if (blob) {
          const croppedFile = new File([blob], croppingFile.name, {
            type: blob.type,
          });
          const base64Image = await fileToBase64Image(croppedFile);

          if (isMultiple) {
            const remainingQueue = fileQueue.slice(1);

            setCroppedList((prev) => [...prev, base64Image]);
            setFileQueue(remainingQueue);

            if (remainingQueue.length > 0) {
              startCroppingFile(remainingQueue[0]);
            } else {
              // All files cropped
              const existing = Array.isArray(file)
                ? (file as Base64Image[])
                : [];
              onChange([...existing, ...croppedList, base64Image]); // include final one
              resetCropState();
            }
          } else {
            onChange(base64Image);
            resetCropState();
          }
        }
      });
    }
  };

  const resetCropState = () => {
    setSrc(null);
    setCroppingFile(null);
    setFileQueue([]);
    setCroppedList([]);
  };

  const renderPreview = () => {
    if (!file) return null;

    const files = isMultiple ? (file as ImageSource[]) : [file as ImageSource];

    return (
      <div className="mt-2 flex flex-wrap gap-4">
        {files.map((f, idx) => {
          let src: string = "";
          if (typeof f === "string") src = f;
          else if ("base64" in f) src = f.base64;
          else src = URL.createObjectURL(f);
          return (
            <img
              key={idx}
              src={src}
              alt="preview"
              className="h-24 w-24 rounded border object-cover"
            />
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <label className="mb-1 block font-semibold">{label}</label>
      <button
        type="button"
        className="rounded bg-yellow-400 px-4 py-1 font-medium text-black shadow"
        onClick={() => inputRef.current?.click()}
      >
        {label}
      </button>

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        multiple={isMultiple}
        onChange={handleFileChange}
        className="hidden"
      />

      {renderPreview()}

      {src && croppingFile && (
        <div className="mt-4">
          <Cropper
            src={src}
            style={{ height: 300, width: "100%" }}
            initialAspectRatio={1}
            guides
            viewMode={1}
            minCropBoxHeight={50}
            minCropBoxWidth={50}
            background={false}
            responsive
            autoCropArea={1}
            checkOrientation={false}
            ref={cropperRef}
          />
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={handleCrop}
              className="rounded bg-green-600 px-4 py-1 text-white"
            >
              Crop & Save
            </button>
            <button
              type="button"
              onClick={resetCropState}
              className="rounded bg-gray-500 px-4 py-1 text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
