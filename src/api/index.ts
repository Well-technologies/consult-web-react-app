import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

import axios from "axios";

import { onLogOutAction } from "@/store/authReducer/authReducer";
import { onRemoveUserDetails } from "@/store/userReducer/userReducer";

import { ClientType, Tokens } from "./index.types";
import { getContentTypeByApiClientType } from "./index.utils";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "X-Country-Code": "BD",
    "X-Client-Name": "WEBSITE",
    "X-Request-Id": "124",
    "X-Client-Version": "123",
    "Content-Type": getContentTypeByApiClientType(ClientType.JSON),
    Channel: "fhm", // Channel : Flash Health Manager
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response);
  }
);

export const createClient = (
  previousTokens: Tokens,
  dispatch: Dispatch<UnknownAction>,
  type: ClientType
) => {
  const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      ...(previousTokens.accessToken && {
        Authorization: `Bearer ${previousTokens.accessToken}`,
        "X-Country-Code": "LK",
        "X-Client-Name": "WEBSITE",
        "X-Request-Id": "124",
        "X-Client-Version": "123",
        "Content-Type": getContentTypeByApiClientType(type),
        Channel: "fhm", // Channel : Flash Health Manager
      }),
    },
  });

  client.interceptors.request.use((config) => {
    // const headers = new axios.AxiosHeaders();
    // if (previousTokens.accessToken) {
    //   headers.set("Authorization", `Bearer ${previousTokens.accessToken}`);
    // }
    // config.headers = headers;
    return config;
  }, Promise.reject);

  client.interceptors.response.use(
    (response) => response,
    async ({ response }) => {
      if (response.status === 401) {
        dispatch(onLogOutAction());
        dispatch(onRemoveUserDetails());
      }

      return Promise.reject(response);
    }
  );

  return client;
};


export const consultApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "X-Country-Code": "BD",
    "X-Client-Name": "WEBSITE",
    "X-Request-Id": "124",
    "X-Client-Version": "123",
    "Content-Type": getContentTypeByApiClientType(ClientType.JSON),
    Channel: "fhm", // Channel : Flash Health Manager
  },
});

consultApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response);
  }
);

export const createConsultClient = (
  previousTokens: Tokens,
  dispatch: Dispatch<UnknownAction>,
  type: ClientType
) => {
  const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      ...(previousTokens.accessToken && {
        Authorization: `Bearer ${previousTokens.accessToken}`,
        "X-Country-Code": "LK",
        "X-Client-Name": "WEBSITE",
        "X-Request-Id": "124",
        "X-Client-Version": "123",
        "Content-Type": getContentTypeByApiClientType(type),
        Channel: "fhm", // Channel : Flash Health Manager
      }),
    },
  });

  client.interceptors.request.use((config) => {
    // const headers = new axios.AxiosHeaders();
    // if (previousTokens.accessToken) {
    //   headers.set("Authorization", `Bearer ${previousTokens.accessToken}`);
    // }
    // config.headers = headers;
    return config;
  }, Promise.reject);

  client.interceptors.response.use(
    (response) => response,
    async ({ response }) => {
      if (response.status === 401) {
        dispatch(onLogOutAction());
        dispatch(onRemoveUserDetails());
      }

      return Promise.reject(response);
    }
  );

  return client;
};

