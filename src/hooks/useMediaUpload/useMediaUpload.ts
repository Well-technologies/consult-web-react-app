import { useState, useCallback } from "react";

import {
  UseMediaUploadMutateProps,
  UseMediaUploadProps,
} from "./useMediaUpload.types";

export const useMediaUpload = ({ onSuccess, onError }: UseMediaUploadProps) => {
  const [progress, setProgress] = useState<number>(0); // progress (0 to 100)
  const [error, setError] = useState<unknown>(null);

  const mutate = useCallback(
    async ({ client, endpoint, formData }: UseMediaUploadMutateProps) => {
      setProgress(0); // Reset progress at the start
      setError(null);

      try {
        const response = await client.post(endpoint, formData, {
          onUploadProgress: (progressEvent) => {
            const progressPercentage = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setProgress(progressPercentage);
          },
        });

        setProgress(100); // Set progress to 100% on success
        if (onSuccess) onSuccess(response.data);
        return response;
      } catch (err) {
        setProgress(0); // Reset progress on error
        setError(err);
        if (onError) onError(err);
        return null;
      }
    },
    [onSuccess, onError]
  );

  return {
    mutate,
    progress, // Progress percentage (0 to 100)
    error,
    isLoading: progress > 0 && progress < 100, // Derived isLoading state
  };
};
