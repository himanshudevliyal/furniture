"use client";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import config from "@/config";
import axios from "axios";
import { FileIcon, Loader2, UploadIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Uploads a single file (any type - pdf, zip, image, etc.) to the server and
// hands back the resulting URL string via onUploaded. Used for product
// fields that store a plain "file path" string (models_3d[].file,
// downloads[].file, materials item image, etc.)
export default function FileUrlUploader({
  value,
  onUploaded,
  accept,
  label = "Upload file",
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        `${config.api_base}${endpoints.files.upload}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );
      const url = response.data?.path?.[0];
      onUploaded(url);
    } catch (err) {
      setError(err?.response?.data?.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    if (value) {
      try {
        await http().delete(`${endpoints.files.getFiles}?file_path=${value}`);
      } catch (err) {
        console.error(err);
      }
    }
    onUploaded("");
  };

  return (
    <div className="flex items-center gap-2">
      {value ? (
        <div className="border-input flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
          <FileIcon className="size-4 shrink-0" />
          <a
            href={`${config.file_base}/${value}`}
            target="_blank"
            rel="noreferrer"
            className="max-w-48 truncate hover:underline"
          >
            {value.split("/").pop()}
          </a>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="size-5"
            onClick={handleRemove}
            aria-label="Remove file"
          >
            <XIcon className="size-3.5" />
          </Button>
        </div>
      ) : (
        <label className="border-input hover:bg-accent/50 flex cursor-pointer items-center gap-2 rounded-md border border-dashed px-3 py-2 text-sm">
          {isUploading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <UploadIcon className="size-4" />
          )}
          {isUploading ? "Uploading..." : label}
          <input
            type="file"
            accept={accept}
            className="sr-only"
            onChange={handleChange}
            disabled={isUploading}
          />
        </label>
      )}
      {error && <span className="text-destructive text-xs">{error}</span>}
    </div>
  );
}
