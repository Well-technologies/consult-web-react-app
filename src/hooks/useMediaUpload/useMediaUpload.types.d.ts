import { AxiosInstance } from "axios";
import { CommonSuccessResponse } from "@/api/index.types";
export type UseMediaUploadProps = {
    onSuccess?: (response: MediaUploadResponse) => void;
    onError?: (error: unknown) => void;
};
export type UseMediaUploadMutateProps = {
    client: AxiosInstance;
    endpoint: string;
    formData: FormData;
};
export type MediaUploadResponse = CommonSuccessResponse<MediaUploadResponseData>;
export type MediaUploadResponseData = {
    [key: string]: string[];
};
