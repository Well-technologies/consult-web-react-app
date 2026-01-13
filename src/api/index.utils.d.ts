import { CreateAxiosDefaults } from 'axios';
import { ClientType, GetClientConfigProps } from './index.types';
export declare const getContentTypeByApiClientType: (type: ClientType) => "application/json" | "multipart/form-data";
export declare const getClientConfig: ({ serviceConfigType, serviceConfig, previousToken, type, }: GetClientConfigProps) => CreateAxiosDefaults;
export declare const convertObjectToFormData: (data: Record<string, unknown>) => FormData;
