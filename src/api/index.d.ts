import { CreateClientProps } from "./index.types";
export declare const createClient: ({ dispatch, queryClient, ...props }: CreateClientProps) => import("axios").AxiosInstance;
export declare const getPublicApiClient: () => import("axios").AxiosInstance;
