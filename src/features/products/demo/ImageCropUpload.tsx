/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useRef, useState } from 'react';
// import Cropper from 'react-cropper';
// import 'cropperjs/dist/cropper.css';
// import { ImageSource } from '../redux';
// import { fileToBase64Image } from '../../../utils';


// interface Props {
//   file?: ImageSource | ImageSource[] | null;
//   onChange: (file: ImageSource | ImageSource[]) => void;
//   label?: string;
//   isMultiple?: boolean;
// }

// export const ImageCropUpload: React.FC<Props> = ({
//   file,
//   onChange,
//   label = 'Upload',
//   isMultiple = false,
// }) => {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const cropperRef = useRef<HTMLImageElement>(null);

//   const [src, setSrc] = useState<string | null>(null);
//   const [croppingFile, setCroppingFile] = useState<File | null>(null);
//   const [showCropper, setShowCropper] = useState(false);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     if (selectedFile) {
//       setCroppingFile(selectedFile);
//       const reader = new FileReader();
//       reader.onload = () => {
//         setSrc(reader.result as string);
//         setShowCropper(true);
//       };
//       reader.readAsDataURL(selectedFile);
//     }
//   };

//   const handleCrop = async () => {
//     const cropper = (cropperRef.current as any)?.cropper;
//     if (cropper && croppingFile) {
//       cropper.getCroppedCanvas().toBlob(async (blob: any) => {
//         if (blob) {
//           const croppedFile = new File([blob], croppingFile.name, {
//             type: blob.type,
//           });

//           const base64Image = await fileToBase64Image(croppedFile); // ✅ convert to persistable object

//           if (isMultiple) {
//             const current = Array.isArray(file) ? file.filter(Boolean) : [];
//             onChange([...current, base64Image]); // ✅ append
//           } else {
//             onChange(base64Image);
//           }

//           setShowCropper(false);
//           setSrc(null);
//           setCroppingFile(null);
//         }
//       });
//     }
//   };

//   const renderPreview = () => {
//     if (!file) return null;

//     const files = isMultiple ? (file as ImageSource[]) : [file as ImageSource];

//     return (
//       <div className="flex gap-4 flex-wrap mt-2">
//         {files.map((f, idx) => {
//           let src: string = '';

//           if (typeof f === 'string') {
//             src = f;
//           } else if ('base64' in f) {
//             src = f.base64;
//           } else {
//             src = URL.createObjectURL(f);
//           }

//           return (
//             <img
//               key={idx}
//               src={src}
//               alt="preview"
//               className="w-24 h-24 object-cover border rounded"
//             />
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div>
//       <button
//         type="button"
//         className="bg-yellow-400 text-black font-medium px-4 py-1 rounded shadow"
//         onClick={() => inputRef.current?.click()}
//       >
//         {label}
//       </button>

//       <input
//         type="file"
//         accept="image/*"
//         ref={inputRef}
//         className="hidden"
//         onChange={handleFileChange}
//       />

//       {renderPreview()}

//       {showCropper && src && (
//         <div className="mt-4">
//           <Cropper
//             src={src}
//             style={{ height: 300, width: '100%' }}
//             initialAspectRatio={1}
//             guides
//             viewMode={1}
//             minCropBoxHeight={50}
//             minCropBoxWidth={50}
//             background={false}
//             responsive
//             autoCropArea={1}
//             checkOrientation={false}
//             ref={cropperRef}
//           />
//           <div className="mt-2 flex gap-2">
//             <button
//               type="button"
//               onClick={handleCrop}
//               className="bg-green-500 text-white px-4 py-1 rounded"
//             >
//               Crop & Save
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setShowCropper(false);
//                 setSrc(null);
//                 setCroppingFile(null);
//               }}
//               className="bg-gray-400 text-white px-4 py-1 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
import React, { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { ImageSource, Base64Image } from '../redux';
import { fileToBase64Image } from '../../../utils';


interface Props {
  file?: ImageSource | ImageSource[] | null;
  onChange: (file: ImageSource | ImageSource[]) => void;
  label?: string;
  isMultiple?: boolean;
}

export const ImageCropUpload: React.FC<Props> = ({
  file,
  onChange,
  label = 'Upload',
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

            setCroppedList(prev => [...prev, base64Image]);
            setFileQueue(remainingQueue);

            if (remainingQueue.length > 0) {
              startCroppingFile(remainingQueue[0]);
            } else {
              // All files cropped
              const existing = Array.isArray(file) ? (file as Base64Image[]) : [];
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
      <div className="flex gap-4 flex-wrap mt-2">
        {files.map((f, idx) => {
          let src: string = '';
          if (typeof f === 'string') src = f;
          else if ('base64' in f) src = f.base64;
          else src = URL.createObjectURL(f);
          return (
            <img
              key={idx}
              src={src}
              alt="preview"
              className="w-24 h-24 object-cover border rounded"
            />
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      <button
        type="button"
        className="bg-yellow-400 text-black font-medium px-4 py-1 rounded shadow"
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
            style={{ height: 300, width: '100%' }}
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
              className="bg-green-600 text-white px-4 py-1 rounded"
            >
              Crop & Save
            </button>
            <button
              type="button"
              onClick={resetCropState}
              className="bg-gray-500 text-white px-4 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
