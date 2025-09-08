import { ClientType } from "./index.types";

export const getContentTypeByApiClientType = (type: ClientType) => {
  switch (type) {
    case ClientType.JSON:
      return "application/json";

    case ClientType.FormData:
      return "multipart/form-data";

    default:
      return "application/json";
    // Accept: "application/json, text/plain, */*",
  }
};
