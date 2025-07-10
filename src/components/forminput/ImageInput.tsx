"use client";

import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Props = {
  label?: string;
  multiple?: boolean;
  value?: File[] | File | null;
  onChange?: (files: File[] | File | null) => void;
};

const ImageUploader: React.FC<Props> = ({
  label = "Upload Image",
  multiple = false,
  value,
  onChange,
}) => {
  const [previews, setPreviews] = React.useState<string[]>([]);

  const filesArray = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : value
        ? [value]
        : [],
    [value]
  );

  React.useEffect(() => {
    const urls = filesArray.map((file) => URL.createObjectURL(file));
    setPreviews(urls);

    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [value, filesArray]);

  const onDrop = (acceptedFiles: File[]) => {
    if (multiple) {
      const newFiles = (value instanceof Array ? value : []).concat(acceptedFiles);
      onChange?.(newFiles);
    } else {
onChange?.(acceptedFiles[0]);

    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": []
    },
    multiple,
  });

  const removeImage = (index: number) => {
    if (multiple && Array.isArray(value)) {
      const newFiles = [...value];
      newFiles.splice(index, 1);
      onChange?.(newFiles);
    } else {
      onChange?.(null);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label className="text-sm text-slate-700 dark:text-white">{label}</Label>
      )}

      <div
        {...getRootProps()}
        className={cn(
          "w-full border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors",
          "bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-slate-600",
          isDragActive && "border-purple-500 bg-purple-50 dark:bg-slate-700"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-gray-300">
          <ImagePlus className="w-8 h-8" />
          <p className="text-sm">{multiple ? "Upload Images" : "Upload Image"}</p>
          <p className="text-xs text-gray-400">(JPG, PNG — Max 2MB)</p>
        </div>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {previews.map((src, idx) => (
            <div key={idx} className="relative group">
              <Image
                src={src}
                alt={`Preview ${idx}`}
                width={400}
                height={400}
                className="w-full h-32 object-cover rounded-md shadow"
              />
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(idx);
                }}
                className="absolute top-2 right-2 p-1 rounded-full bg-white dark:bg-slate-900 text-red-600 hover:bg-red-100 dark:hover:bg-red-800 shadow transition"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ImageUploader.displayName = "ImageUploader";

export default React.memo(ImageUploader);
