import { DropzoneOptions } from "react-dropzone";

export type DragAndDropProps = React.InputHTMLAttributes<HTMLInputElement> & {
  containerClassName?: string;
  error?: boolean;
  variantType?: DragAndDropVariant;
  uploadedFileUrl: string;
  dropzoneOptions: DropzoneOptions;
  onRemoveFile: () => void;
};

export enum DragAndDropVariant {
  Standard = "Standard",
  Error = "Error",
}
