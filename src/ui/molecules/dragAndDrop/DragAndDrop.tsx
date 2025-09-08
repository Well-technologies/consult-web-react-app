import * as React from "react";
import { FileRejection, useDropzone } from "react-dropzone";

import CloseIcon from "@/assets/icons/close_icon.png";
import PDFIcon from "@/assets/icons/pdf_icon.png";
import { cn } from "@/lib/utils";

import { DragAndDropProps, DragAndDropVariant } from "./DragAndDrop.types";
import { getColorByVariant } from "./DragAndDrop.utils";

export const DragAndDrop = ({
  containerClassName,
  variantType = DragAndDropVariant.Standard,
  dropzoneOptions,
  uploadedFileUrl,
  onRemoveFile,
  ...props
}: DragAndDropProps) => {
  const [error, setError] = React.useState<string | null>(null);

  const onDrop = React.useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setError(null);
      // Check for rejected files
      if (rejectedFiles.length > 0) {
        setError("Only Images and PDF files are allowed.");
        return;
      }

      if (props.onChange) {
        const fileEvent = {
          target: { ...props, files: acceptedFiles },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        props.onChange(fileEvent);
      }
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    ...dropzoneOptions,
  });

  const variant = getColorByVariant(variantType);

  return (
    <>
      {uploadedFileUrl ? (
        <div
          className={cn(
            "flex relative flex-col justify-center w-full h-48 border-2  rounded-lg cursor-pointer bg-white dark:bg-secondary-700"
          )}
        >
          {uploadedFileUrl.endsWith(".pdf") ? (
            <img
              className="w-full h-full rounded-lg object-contain py-6 cursor-alias"
              onClick={() => window.open(uploadedFileUrl, "_blank")}
              src={PDFIcon}
              alt="pdfIcon"
            />
          ) : (
            <img
              className="w-full h-full rounded-lg object-cover cursor-alias"
              onClick={() => window.open(uploadedFileUrl, "_blank")}
              src={uploadedFileUrl}
              alt="UploadedFile"
            />
          )}

          {!props.disabled ? (
            <button
              onClick={onRemoveFile}
              className="absolute cursor-pointer top-1 right-1 w-8 h-8 rounded-full bg-white border-2 border-secondary opacity-50 "
            >
              <img
                className="w-full h-full p-1 "
                src={CloseIcon}
                alt="closeIcon"
              />
            </button>
          ) : null}
        </div>
      ) : (
        <div
          {...getRootProps({
            className: cn(
              "flex relative flex-col justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-white dark:bg-secondary-700 dark:hover:bg-secondary-800 dark:bg-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-600",
              isDragActive
                ? `border-${variant}-500 bg-secondary-50`
                : `border-${variant}-300`,
              containerClassName
            ),
          })}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className={`w-8 h-8 mb-4 text-${variant}-500 dark:text-${variant}-400`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p
              className={`mb-2 text-xs px-2 text-center md:text-sm text-${variant}-500 dark:text-${variant}-400`}
            >
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p
              className={`text-xs text-${variant}-500 dark:text-${variant}-400`}
            >
              Images or PDF
            </p>
          </div>
        </div>
      )}
      {error && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </>
  );
};
