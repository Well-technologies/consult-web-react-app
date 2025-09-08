import {
  QueryClientProvider,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query";

import { ReactQueryControllerProps } from "./ReactQueryController.types";

const queryCache = new QueryCache();
const queryClient = new QueryClient({ queryCache });

export const ReactQueryController = ({
  children,
}: ReactQueryControllerProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
