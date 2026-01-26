import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader } from "@/ui/atoms/loader/Loader";
import { NotFound } from "@/ui/molecules/notFound/NotFound";

interface PrescriptionViewerProps {
  url?: string | null;
}

export const PrescriptionViewer = ({ url }: PrescriptionViewerProps) => {
  const { t } = useTranslation();
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) {
      setBlobUrl(null);
      return;
    }

    let active = true;
    let createdUrl: string | null = null;

    const fetchPdf = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch PDF");
        }
        const blob = await response.blob();
        
        if (!active) return;

        // Ensure it's treated as a PDF if possible by creating a new Blob with the specific type
        const file = new Blob([blob], { type: "application/pdf" });
        createdUrl = URL.createObjectURL(file);
        
        if (active) {
          setBlobUrl(createdUrl);
        }
      } catch (err) {
        console.error("Error loading prescription:", err);
        if (active) {
          setError(true);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    fetchPdf();

    return () => {
      active = false;
      // If we created a URL in this effect run, revoke it
      if (createdUrl) {
        URL.revokeObjectURL(createdUrl);
      }
      // Also potentially revoke reading from state if needed, but local var handles the immediate run
    };
  }, [url]);

  if (!url) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 bg-gray-50 rounded-md p-4">
        <NotFound text={t("global.text.notFound", { text: "Prescription" })} />
      </div>
    );
  }

  if (isLoading) {
    return (
        <div className="w-full h-[600px] flex items-center justify-center bg-gray-50 rounded-md">
            <Loader isMaxSize={false} isFullHeight isFullWidth />
        </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] text-red-500 gap-4 bg-gray-50 rounded-md p-4">
        <p>{t("consultation.details.errorLoadingPrescription", "Failed to load prescription.")}</p>
        <button 
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
            onClick={() => window.open(url, "_blank")}
        >
            {t("consultation.details.downloadDirectly", "Download Directly")}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] bg-gray-100 rounded-md overflow-hidden">
      {blobUrl && (
        <iframe
          src={blobUrl}
          className="w-full h-full border-none"
          title="Prescription PDF"
        />
      )}
    </div>
  );
};
