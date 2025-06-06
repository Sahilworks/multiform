import * as React from "react";
import { cn } from "@/lib/utils";
import { Upload, X, FileText, Image } from "lucide-react";
import { Button } from "./button";

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  onFileChange: (files: File[]) => void;
  files: File[];
  className?: string;
  label?: string;
  description?: string;
  maxSize?: number; // in MB
}

export function FileUpload({
  accept = "*/*",
  multiple = false,
  onFileChange,
  files,
  className,
  label = "Upload file",
  description = "Click to upload or drag and drop",
  maxSize = 10,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const fileArray = Array.from(selectedFiles);
    const validFiles = fileArray.filter((file) => {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is ${maxSize}MB`);
        return false;
      }
      return true;
    });

    if (multiple) {
      onFileChange([...files, ...validFiles]);
    } else {
      onFileChange(validFiles.slice(0, 1));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFileChange(newFiles);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <Image className="w-5 h-5" />;
    }
    return <FileText className="w-5 h-5" />;
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragOver
            ? "border-doc-primary bg-doc-primary/5"
            : "border-gray-300 hover:border-doc-primary",
          files.length > 0 && "border-doc-primary",
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p className="text-sm font-medium text-doc-text">{label}</p>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
        <p className="text-xs text-gray-400 mt-2">
          Maximum file size: {maxSize}MB
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {getFileIcon(file)}
                <div>
                  <p className="text-sm font-medium text-doc-text">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
