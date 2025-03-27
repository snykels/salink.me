import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  X, 
  Check, 
  AlertCircle, 
  Image as ImageIcon,
  FileText,
  File
} from "lucide-react";

interface FileUploaderProps {
  onUpload: (files: File[]) => void;
  maxSize?: number; // بالميجابايت
  allowedTypes?: string[]; // مثال: ['image/jpeg', 'image/png']
  multiple?: boolean;
  className?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onUpload,
  maxSize = 5, // 5 ميجابايت افتراضياً
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'],
  multiple = false,
  className = "",
}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [uploadStatus, setUploadStatus] = useState<("idle" | "uploading" | "success" | "error")[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: File[] = [];
    const newPreviews: string[] = [];
    const newProgress: number[] = [];
    const newStatus: ("idle" | "uploading" | "success" | "error")[] = [];
    const newErrors: string[] = [];

    Array.from(selectedFiles).forEach(file => {
      // التحقق من نوع الملف
      if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
        newErrors.push(t("fileUploader.fileTypeError"));
        return;
      }

      // التحقق من حجم الملف
      if (file.size > maxSize * 1024 * 1024) {
        newErrors.push(t("fileUploader.fileSizeError"));
        return;
      }

      newFiles.push(file);
      
      // إنشاء معاينة للصور
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newPreviews.push(e.target.result as string);
            setPreviews([...previews, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      } else {
        newPreviews.push('');
      }
      
      newProgress.push(0);
      newStatus.push("idle");
    });

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setFiles([...files, ...newFiles]);
    setUploadProgress([...uploadProgress, ...newProgress]);
    setUploadStatus([...uploadStatus, ...newStatus]);

    // محاكاة عملية الرفع
    simulateUpload(files.length, newFiles.length);
  };

  const simulateUpload = (startIndex: number, count: number) => {
    const newStatus = [...uploadStatus];
    const newProgress = [...uploadProgress];
    
    for (let i = startIndex; i < startIndex + count; i++) {
      newStatus[i] = "uploading";
    }
    
    setUploadStatus(newStatus);
    
    // محاكاة تقدم الرفع
    const interval = setInterval(() => {
      let allCompleted = true;
      
      setUploadProgress(prev => {
        const updated = [...prev];
        
        for (let i = startIndex; i < startIndex + count; i++) {
          if (updated[i] < 100) {
            updated[i] += Math.random() * 10;
            if (updated[i] > 100) updated[i] = 100;
            allCompleted = false;
          }
        }
        
        return updated;
      });
      
      if (allCompleted) {
        clearInterval(interval);
        
        // تحديث الحالة إلى "نجاح" بعد اكتمال الرفع
        setUploadStatus(prev => {
          const updated = [...prev];
          for (let i = startIndex; i < startIndex + count; i++) {
            updated[i] = "success";
          }
          return updated;
        });
        
        // استدعاء دالة الرفع
        onUpload(files);
      }
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    const newPreviews = [...previews];
    const newProgress = [...uploadProgress];
    const newStatus = [...uploadStatus];
    
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    newProgress.splice(index, 1);
    newStatus.splice(index, 1);
    
    setFiles(newFiles);
    setPreviews(newPreviews);
    setUploadProgress(newProgress);
    setUploadStatus(newStatus);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="h-6 w-6 text-blue-500" />;
    } else if (file.type.includes('pdf')) {
      return <FileText className="h-6 w-6 text-red-500" />;
    } else {
      return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: "idle" | "uploading" | "success" | "error") => {
    switch (status) {
      case "success":
        return <Check className="h-5 w-5 text-green-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Card
        className={`border-2 border-dashed rounded-lg ${
          isDragging ? "border-primary bg-primary/5" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Upload className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">{t("fileUploader.dragAndDrop")}</h3>
          <p className="text-sm text-gray-500 mb-4">{t("fileUploader.or")}</p>
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
          >
            {t("fileUploader.browse")}
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files)}
            multiple={multiple}
            accept={allowedTypes.join(",")}
          />
          <p className="text-xs text-gray-500 mt-4">
            {t("fileUploader.maxSize", { size: `${maxSize}MB` })}
          </p>
        </CardContent>
      </Card>

      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md">
          <ul className="list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-3">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 border rounded-md bg-gray-50"
            >
              <div className="flex-shrink-0">
                {previews[index] ? (
                  <div className="w-12 h-12 rounded-md overflow-hidden bg-white border">
                    <img
                      src={previews[index]}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-md bg-gray-100 border flex items-center justify-center">
                    {getFileIcon(file)}
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <Progress value={uploadProgress[index]} className="h-1.5 mt-2" />
              </div>
              
              <div className="flex items-center gap-2">
                {getStatusIcon(uploadStatus[index])}
                
                <button
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-red-500"
                  disabled={uploadStatus[index] === "uploading"}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
