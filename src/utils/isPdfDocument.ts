import { HealthVaultData } from "@/api/patient/patient.types";

type isPDFDocumentProps = {
  document?: HealthVaultData;
  url?: string;
};

export const isPdfDocument = ({ document, url }: isPDFDocumentProps) => {
  if (document) {
    return document.fileType.toLowerCase() === "pdf";
  }
  if (url) {
    return url.toLowerCase().includes(".pdf");
  }
  return false;
};
