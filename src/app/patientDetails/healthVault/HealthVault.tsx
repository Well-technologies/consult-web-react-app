import { useState, useMemo } from "react";

import { ImageViewerModal } from "@/ui/atoms/imageViewerModal/ImageViewerModal";

import { HealthVaultProps } from "./HealthVault.types";

export const HealthVault = ({ healthData }: HealthVaultProps) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const allImageUrls = useMemo(() => {
    return (
      healthData?.filter((doc) => doc.fileUrl).map((doc) => doc.fileUrl) || []
    );
  }, [healthData]);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsImageModalOpen(true);
  };
  if (!healthData || healthData.length === 0) {
    return (
      <div className="p-4 text-gray-500 text-center">
        No health vault documents found
      </div>
    );
  }

  return (
    <>
      <ImageViewerModal
        images={allImageUrls}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        initialIndex={selectedImageIndex}
        showThumbnails={allImageUrls.length > 1}
      />

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Health Vault</h3>
          <span className="text-sm text-gray-500">
            {healthData.length}{" "}
            {healthData.length === 1 ? "document" : "documents"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {healthData.map((document, index) => (
            <div key={document.id} className="flex justify-center p-4">
              <button
                onClick={() => handleImageClick(index)}
                className="card bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden w-full aspect-square flex flex-col cursor-pointer"
              >
                <div className="flex-1 bg-gray-100 overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={document.fileUrl}
                    alt={document.title}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                    }}
                  />
                </div>
                <div className="p-3 flex-shrink-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate mb-1">
                    {document.title}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {new Date(document.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
