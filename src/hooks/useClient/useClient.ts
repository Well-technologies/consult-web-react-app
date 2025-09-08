import { useSelector, useDispatch } from "react-redux";

import { createClient } from "@/api";
import { ClientType } from "@/api/index.types";
import { StoreReducerStateTypes } from "@/store/store.types";
import { allReducerStates } from "@/store/store.utils";

export const useClient = (clientType?: ClientType) => {
  const { tokens } = useSelector(
    (rootState) => allReducerStates(rootState as StoreReducerStateTypes).auth
  );

  const dispatch = useDispatch();

  const axiosInstance = createClient(
    tokens,
    dispatch,
    clientType || ClientType.JSON
  );

  return axiosInstance;
};
