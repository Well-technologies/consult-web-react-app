import { useDispatch } from "react-redux";

import { createClient } from "@/api";
import { ClientType, ServiceConfigType } from "@/api/index.types";
import { UseClientProps } from "./useClient.types";
import { useCustomSelector } from "../useCustomSelector/useCustomSelector";
import { useQueryClient } from "@tanstack/react-query";
import { getDefaultEnvironmentByType } from "@/config/config.utils";
import { EnvironmentType } from "@/config/config.types";

export const useClient = ({serviceConfigType, clientType}: UseClientProps) => {
const queryClient = useQueryClient();
  const token = useCustomSelector(rootState => rootState.auth.token);
  const dispatch = useDispatch();

  const axiosInstance = createClient({
    previousToken: token,
    dispatch,
    type: clientType || ClientType.JSON,
    serviceConfig: getDefaultEnvironmentByType(EnvironmentType.Staging),
    serviceConfigType: serviceConfigType || ServiceConfigType.Core,
    queryClient,
  });
  return axiosInstance;
};
