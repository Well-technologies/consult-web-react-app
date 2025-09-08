import { configureStore } from "@reduxjs/toolkit";

import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authReducer/authReducer";
import userReducer from "./userReducer/userReducer";

export const store = configureStore({
  reducer: {
    auth: persistReducer(
      {
        key: "auth",
        storage: storage,
        blacklist: ["isFetchingUserDetails"],
      },
      authReducer
    ),
    user: persistReducer(
      {
        key: "user",
        storage: storage,
        blacklist: [],
      },
      userReducer
    ),
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: false, //as we are using Map, it seems to be not serializable, so we have to remove this check here
    });

    if (process.env.NODE_ENV !== "production") {
      return middleware.concat(logger);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return middleware as any;
  },
  devTools: process.env.REACT_APP_ENV === "development",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
