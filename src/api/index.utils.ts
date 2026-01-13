import { CreateAxiosDefaults } from 'axios';

import {
  ClientType,
  GetClientConfigProps,
  ServiceConfigType,
} from './index.types';

export const getContentTypeByApiClientType = (type: ClientType) => {
  switch (type) {
    case ClientType.JSON:
      return 'application/json';

    case ClientType.FormData:
      return 'multipart/form-data';

    default:
      return 'application/json';
  }
};

export const getClientConfig = ({
  serviceConfigType,
  serviceConfig,
  previousToken,
  type,
}: GetClientConfigProps): CreateAxiosDefaults => {
  const defaultHeaders = {
    'Content-Type': getContentTypeByApiClientType(type),
  };

  switch (serviceConfigType) {
    case ServiceConfigType.Core:
      const { api: mainAPI } = serviceConfig?.core;
      return {
        baseURL: mainAPI,
        headers: {
          ...defaultHeaders,
          Channel: 'app',
          ...(previousToken && {
            Authorization: `Bearer ${previousToken}`,
          }),
        },
      };

    case ServiceConfigType.Consult:
      const { api: consultAPI } = serviceConfig?.consult;
      return {
        baseURL: consultAPI,
        headers: {
          ...defaultHeaders,
          Channel: 'app',
          ...(previousToken && {
            Authorization: `Bearer ${previousToken}`,
          }),
        },
      };

    default:
      return {
        headers: {
          ...defaultHeaders,
        },
      };
  }
};

export const convertObjectToFormData = (data: Record<string, unknown>) => {
  console.log(data)
  const formData = new FormData();
  // Object.entries(data).map(([key, value]) => {
  //   formData.append(key, value);
  // });
  return formData;
};
