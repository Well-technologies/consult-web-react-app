import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import i18n from "@/i18n/i18n";
import { persistor, store } from "@/store";

import { AppProvidersProps } from "./AppProviders.types";
import { ReactQueryController } from "./reactQueryController/ReactQueryController";

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    // <Suspense fallback={<LogoLoader />}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <Router>
              <ReactQueryController>{children}</ReactQueryController>
            </Router>
          </I18nextProvider>
        </PersistGate>
      </Provider>
    // </Suspense>
  );
};
