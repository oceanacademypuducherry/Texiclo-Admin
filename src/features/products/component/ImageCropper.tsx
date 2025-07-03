import React, { useState, useRef, useCallback, useEffect } from "react";
import { Upload, Crop, X, RotateCw } from "lucide-react";

interface ImageCropperProps {
  onImageCropped: (croppedImage: File) => void;
  currentImage?: string;
  onCancel?: () => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  onImageCropped,
  currentImage,
  onCancel,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    currentImage || null,
  );
  const [cropArea, setCropArea] = useState({ x: 50, y: 50, size: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (currentImage) {
      setSelectedImage(currentImage);
      setRotation(0);
    }
  }, [currentImage]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - cropArea.x,
      y: e.clientY - cropArea.y,
    });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      const newX = Math.max(
        0,
        Math.min(e.clientX - dragStart.x, rect.width - cropArea.size),
      );
      const newY = Math.max(
        0,
        Math.min(e.clientY - dragStart.y, rect.height - cropArea.size),
      );
      setCropArea((prev) => ({ ...prev, x: newX, y: newY }));
    },
    [isDragging, dragStart, cropArea.size],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((prev) => {
      const newScale = prev - e.deltaY * 0.001;
      return Math.min(Math.max(newScale, 0.5), 3);
    });
  };

  const cropImage = () => {
    if (!selectedImage || !canvasRef.current || !imageRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = 320;
      canvas.height = 320;

      const rect = imageRef.current!.getBoundingClientRect();
      const scaleX = img.width / (rect.width / scale);
      const scaleY = img.height / (rect.height / scale);

      const sourceX = cropArea.x * scaleX;
      const sourceY = cropArea.y * scaleY;
      const sourceSize = cropArea.size * Math.min(scaleX, scaleY);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (rotation !== 0) {
        ctx.translate(160, 160);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-160, -160);
      }

      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceSize,
        sourceSize,
        0,
        0,
        320,
        320,
      );

      // ✅ Convert base64 to File
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });
          onImageCropped(file); // ✅ return File object
        },
        "image/jpeg",
        0.9,
      );
    };

    img.src = selectedImage;
  };

  return (
    <div className="w-[400px] space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Crop Image</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setRotation((prev) => (prev + 90) % 360)}
            className="rounded p-2 hover:bg-gray-100"
          >
            <RotateCw className="h-5 w-5 text-gray-600" />
          </button>
          <button onClick={onCancel} className="rounded p-2 hover:bg-red-100">
            <X className="h-5 w-5 text-red-500" />
          </button>
        </div>
      </div>

      <div
        className="relative mx-auto h-[350px] w-[350px] overflow-hidden"
        onWheel={handleWheel}
      >
        {/* IMAGE */}
        <img
          ref={imageRef}
          src={selectedImage || ""}
          alt="crop"
          className="h-full w-full rounded object-contain transition-transform duration-150"
          style={{
            transform: `rotate(${rotation}deg) scale(${scale})`,
            transformOrigin: "center center",
          }}
          draggable={false}
        />

        {/* BLURRED OVERLAY OUTSIDE CROP */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <div
            className="absolute bg-black/35 backdrop-blur-sm"
            style={{ top: 0, left: 0, right: 0, height: cropArea.y }}
          />
          <div
            className="absolute bg-black/35 backdrop-blur-sm"
            style={{
              top: cropArea.y + cropArea.size,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          <div
            className="absolute bg-black/35 backdrop-blur-sm"
            style={{
              top: cropArea.y,
              left: 0,
              width: cropArea.x,
              height: cropArea.size,
            }}
          />
          <div
            className="absolute bg-black/35 backdrop-blur-sm"
            style={{
              top: cropArea.y,
              left: cropArea.x + cropArea.size,
              right: 0,
              height: cropArea.size,
            }}
          />
        </div>

        {/* DRAGGABLE CROP BOX */}
        <div
          onMouseDown={handleMouseDown}
          className="absolute z-20"
          style={{
            left: cropArea.x,
            top: cropArea.y,
            width: cropArea.size,
            height: cropArea.size,
            border: "2px solid #3b82f6",
            backgroundColor: "rgba(59,130,246,0.2)",
            cursor: "move",
          }}
        >
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={cropImage}
          className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Crop className="h-4 w-4" />
          Crop
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default ImageCropper;
