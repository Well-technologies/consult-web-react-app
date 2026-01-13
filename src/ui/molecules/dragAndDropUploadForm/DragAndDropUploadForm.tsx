import clsx from "clsx";
import { ChangeEvent, useState } from "react";

// import { ClientType } from "@/api/index.types";
import { useClient } from "@/hooks/useClient/useClient";
import { useMediaUpload } from "@/hooks/useMediaUpload/useMediaUpload";
import { FormLabel } from "@/ui/atoms/formLabel/FormLabel";

import { DragAndDrop } from "../dragAndDrop/DragAndDrop";
import { DragAndDropUploadFormProps } from "./DragAndDropUploadForm.types";

export const DragAndDropUploadForm = ({
  label,
  setValue,
  name,
  register,
  helperText,
  error,
  value,
  uploadConfig: { endpoint, formDataKey, dropzoneOptions },
  ...props
}: DragAndDropUploadFormProps) => {
  const client = useClient({});
  register(name);

  const [uploadedFileUrl, setUploadedFileUrl] = useState("");

  const { mutate } = useMediaUpload({
    onSuccess: ({ data }) => {
      const key = Object.keys(data)[0];
      const fileURL = data[key][0];
      setValue(name, fileURL);
      setUploadedFileUrl("");
    },
  });

  const uploadBill = (file: File) => {
    const formData = new FormData();
    formData.append(formDataKey, file);
    mutate({
      client,
      endpoint,
      formData,
    });
  };

  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files?.length) return;
    const file = event.target.files[0];
    const fileLocalURL = URL.createObjectURL(file);
    setUploadedFileUrl(fileLocalURL);
    uploadBill(file);
  };

  const onRemoveFile = () => {
    setUploadedFileUrl("");
    setValue(name, "");
  };

  return (
    <div className={clsx("flex flex-col")}>
      {label && <FormLabel label={label} {...props} />}

      <DragAndDrop
        {...props}
        onChange={(e) => onFileUpload(e)}
        onRemoveFile={onRemoveFile}
        uploadedFileUrl={value || uploadedFileUrl || ""}
        dropzoneOptions={dropzoneOptions}
      />
      {error && helperText && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
          {helperText}
        </p>
      )}
    </div>
  );
};
