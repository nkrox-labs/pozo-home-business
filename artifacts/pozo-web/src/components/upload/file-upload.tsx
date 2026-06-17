import { useState, useRef } from "react";
import { UploadCloud, X, Loader2, ImageIcon, VideoIcon } from "lucide-react";
import { toast } from "sonner";

const CLOUDINARY_CLOUD_NAME = "dw83ygqzn";
const CLOUDINARY_UPLOAD_PRESET = "cotizaciones_unsigned";
const MAX_FILES = 5;
const MAX_SIZE_MB = 20;

interface UploadedFile {
  url: string;
  type: "image" | "video";
  name: string;
}

interface FileUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
}

async function uploadToCloudinary(file: File): Promise<UploadedFile> {
  const isVideo = file.type.startsWith("video/");
  const resourceType = isVideo ? "video" : "image";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
    { method: "POST", body: formData },
  );

  if (!response.ok) {
    throw new Error("Error al subir el archivo");
  }

  const data = await response.json();
  return { url: data.secure_url, type: isVideo ? "video" : "image", name: file.name };
}

export function FileUpload({ value, onChange }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const selected = Array.from(fileList);

    if (files.length + selected.length > MAX_FILES) {
      toast.error(`Máximo ${MAX_FILES} archivos permitidos.`);
      return;
    }

    const tooLarge = selected.find((f) => f.size > MAX_SIZE_MB * 1024 * 1024);
    if (tooLarge) {
      toast.error(`"${tooLarge.name}" supera el límite de ${MAX_SIZE_MB}MB.`);
      return;
    }

    setUploading(true);
    try {
      const uploaded = await Promise.all(selected.map(uploadToCloudinary));
      const newFiles = [...files, ...uploaded];
      setFiles(newFiles);
      onChange(newFiles.map((f) => f.url));
      toast.success(`${uploaded.length} archivo(s) subido(s) correctamente.`);
    } catch (err) {
      toast.error("Error al subir uno o más archivos. Intente nuevamente.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onChange(newFiles.map((f) => f.url));
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-background/50 hover:bg-secondary/20 transition-colors cursor-pointer"
      >
        {uploading ? (
          <Loader2 className="h-10 w-10 text-primary mx-auto mb-3 animate-spin" />
        ) : (
          <UploadCloud className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        )}
        <p className="text-sm text-foreground font-medium">
          {uploading ? "Subiendo archivos..." : "Subir Fotografías o Videos"}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Opcional — Imágenes y videos, hasta {MAX_SIZE_MB}MB cada uno (máx. {MAX_FILES})
        </p>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {files.map((file, index) => (
            <div
              key={file.url}
              className="relative flex items-center gap-2 bg-secondary/40 border border-border rounded-lg px-3 py-2"
            >
              {file.type === "video" ? (
                <VideoIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              ) : (
                <ImageIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              )}
              <span className="text-xs truncate flex-1">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-muted-foreground hover:text-destructive flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
