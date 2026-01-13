import { UseMediaUploadMutateProps, UseMediaUploadProps } from "./useMediaUpload.types";
export declare const useMediaUpload: ({ onSuccess, onError }: UseMediaUploadProps) => {
    mutate: ({ client, endpoint, formData }: UseMediaUploadMutateProps) => Promise<import("axios").AxiosResponse<any, any, {}> | null>;
    progress: number;
    error: unknown;
    isLoading: boolean;
};
