import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

import axios from "axios";

import { onLogOutAction } from "@/store/authReducer/authReducer";

import { ClientType, CreateClientProps } from "./index.types";
import { getClientConfig, getContentTypeByApiClientType } from "./index.utils";
import { store } from "@/store";
import { onRemoveUserDetails } from "@/store/userReducer/userReducer";



export const createClient = ({
  dispatch,
  queryClient,
  ...props
}: CreateClientProps) => {
  const clientConfig = getClientConfig({ ...props });
  const client = axios.create(clientConfig);

  client.interceptors.request.use(config => {
    return config;
  }, Promise.reject);

  client.interceptors.response.use(
    response => response,
    async ({ response }) => {
      if (response.status === 401) {
        dispatch(onLogOutAction());
        dispatch(onRemoveUserDetails());
        queryClient.clear();
      }

      return Promise.reject(response);
    }
  );

  return client;
};

export const getPublicApiClient = () => {
  return axios.create({
    baseURL: store.getState().config.serviceConfig.core.api,
    headers: {
      // 'X-Country-Code': 'BD',
      // 'X-Client-Name': 'WEBSITE',
      // 'X-Request-Id': '124',
      // 'X-Client-Version': '123',
      'Content-Type': getContentTypeByApiClientType(ClientType.JSON),
      Channel: 'app',
    },
  });
};

