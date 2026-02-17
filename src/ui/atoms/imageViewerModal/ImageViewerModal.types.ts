export interface ImageViewerModalProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
  showThumbnails?: boolean;
}

export interface ImageData {
  url: string;
  alt?: string;
}
