import { useEffect, useState, useCallback, useMemo } from "react";

import { cn } from "@/lib/utils";

import { ImageData, ImageViewerModalProps } from "./ImageViewerModal.types";

export const ImageViewerModal = (props: ImageViewerModalProps) => {
  const { isOpen, onClose, initialIndex = 0, showThumbnails = true } = props;

  // Convert string array to ImageData array
  const images: ImageData[] = useMemo(() => {
    if (props.images.length === 0) return [];
    return props.images.map((url) => ({ url }));
  }, [props.images]);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [imageLoading, setImageLoading] = useState<boolean[]>([]);
  const [imageErrors, setImageErrors] = useState<boolean[]>([]);

  // Initialize loading and error states
  useEffect(() => {
    if (images.length > 0) {
      setImageLoading(new Array(images.length).fill(true));
      setImageErrors(new Array(images.length).fill(false));
    }
  }, [images.length]);

  // Reset current index when modal opens or images change
  useEffect(() => {
    if (isOpen && initialIndex >= 0 && initialIndex < images.length) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex, images.length]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleThumbnailClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleImageLoad = useCallback((index: number) => {
    setImageLoading((prev) => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  }, []);

  const handleImageError = useCallback((index: number) => {
    setImageLoading((prev) => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
    setImageErrors((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          event.preventDefault();
          handlePrevious();
          break;
        case "ArrowRight":
          event.preventDefault();
          handleNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrevious]);

  if (!isOpen || images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={onClose}
    >
      {/* Main modal container */}
      <div
        className="relative w-full h-full max-w-7xl max-h-screen p-4 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button and counter */}
        <div className="flex items-center justify-between mb-4 text-white">
          <div className="text-lg font-medium">
            {currentIndex + 1} / {images.length}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Main image container */}
        <div className="flex-1 flex items-center justify-center min-h-0 mb-4">
          <div className="relative max-w-full max-h-full flex items-center justify-center">
            {/* Previous button */}
            {images.length > 1 && (
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                aria-label="Previous image"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}

            {/* Main content - Image or PDF */}
            <div className="relative">
              {imageLoading[currentIndex] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}

              {imageErrors[currentIndex] ? (
                <div className="flex items-center justify-center w-96 h-96 bg-gray-100 text-gray-500">
                  <div className="text-center">
                    <svg
                      className="w-12 h-12 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p>Failed to load image</p>
                  </div>
                </div>
              ) : (
                <img
                  src={currentImage.url}
                  alt={currentImage.alt || `Image ${currentIndex + 1}`}
                  className="max-w-full max-h-[70vh] object-contain"
                  onLoad={() => handleImageLoad(currentIndex)}
                  onError={() => handleImageError(currentIndex)}
                />
              )}
            </div>

            {/* Next button */}
            {images.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                aria-label="Next image"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Thumbnails */}
        {showThumbnails && images.length > 1 && (
          <div className="flex justify-center">
            <div className="flex gap-2 overflow-x-auto max-w-full p-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={cn(
                    "relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all",
                    index === currentIndex
                      ? "border-blue-500 scale-105"
                      : "border-transparent hover:border-white/50"
                  )}
                >
                  <img
                    src={image.url}
                    alt={image.alt || `Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-blue-500/20" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
