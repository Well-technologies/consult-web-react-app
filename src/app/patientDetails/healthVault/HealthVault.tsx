import { useState, useMemo } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { HealthVaultData } from "@/api/patient/patient.types";
import { ImageViewerModal } from "@/ui/atoms/imageViewerModal/ImageViewerModal";
import { Pagination } from "@/ui/atoms/pagination/Pagination";
import { NotFound } from "@/ui/molecules/notFound/NotFound";
import { isPdfDocument } from "@/utils/isPdfDocument";

import { HealthVaultProps } from "./HealthVault.types";

export const HealthVault = ({
  healthData,
  isLoading,
  error,
  pagination,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: HealthVaultProps) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const allImageUrls = useMemo(() => {
    return (
      healthData?.filter((doc) => doc.fileUrl).map((doc) => doc.fileUrl) || []
    );
  }, [healthData]);

  const handleImageClick = (document: HealthVaultData) => {
    const imageIndex = allImageUrls.indexOf(document.fileUrl);
    setSelectedImageIndex(imageIndex);
    setIsImageModalOpen(true);
  };

  if (isLoading) {
    return <div className="p-4">Loading health vault documents...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading health vault documents
      </div>
    );
  }

  if (!healthData || healthData.length === 0) {
    return <NotFound text={"No documents found"} />;
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
          <span className="text-sm text-gray-600">
            {pagination?.total
              ? `Showing ${healthData.length} of ${pagination.total} document${pagination.total !== 1 ? "s" : ""}`
              : `${healthData.length} document${healthData.length !== 1 ? "s" : ""} found`}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {healthData.map((document) => (
            <div key={document.id} className="flex justify-center p-4">
              <button
                onClick={() => handleImageClick(document)}
                className="card bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden w-full aspect-square flex flex-col cursor-pointer"
              >
                <div className="flex-1 bg-gray-100 overflow-hidden relative">
                  {isPdfDocument({ document }) ? (
                    <div className="h-full w-full flex items-center justify-center">
                      <Document
                        file={document.fileUrl}
                        className="h-full w-full object-cover"
                        loading={
                          <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
                          </div>
                        }
                      >
                        <Page
                          pageNumber={1}
                          renderAnnotationLayer={false}
                          renderTextLayer={false}
                        />
                      </Document>
                    </div>
                  ) : (
                    <img
                      className="h-full w-full object-cover"
                      src={document.fileUrl}
                      alt={document.title}
                    />
                  )}
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

        {pagination && (
          <>
            <div className="h-1 bg-gray-100 mt-4" />
            <div className="p-2">
              <Pagination
                count={pagination.lastPage}
                onChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
                page={page}
                pageSize={pageSize}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
