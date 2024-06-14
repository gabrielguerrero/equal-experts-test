import { type ReactElement, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { api, getBaseUrl } from "equal-experts/trpc/react";
import { httpLink } from "@trpc/client";
import SuperJSON from "superjson";
import { render, type RenderOptions } from "@testing-library/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
});
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpLink({
          url: getBaseUrl() + "/api/trpc",
          transformer: SuperJSON,
        }),
      ],
    }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </api.Provider>
    </QueryClientProvider>
  );
};

export const customRender = async (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};
export * from "@testing-library/react";
export { customRender as render };
