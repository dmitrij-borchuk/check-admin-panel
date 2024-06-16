import { fetchUtils } from "react-admin";
import { authProvider } from "./authProvider";
import restDataProvider from "./dataProviders/restDataProvider";

// TODO: implement switching organizations
const currentOrg = "organizationOne";
const httpClient: typeof fetchUtils.fetchJson = async (
  url: string,
  options
) => {
  const headers = new Headers(options?.headers);
  headers.set("x-organization", currentOrg);
  return await fetchUtils.fetchJson(url, {
    ...options,
    user: {
      authenticated: true,
      token: (await authProvider.getJWTToken()) || undefined,
    },
    headers,
  });
};
export const dataProvider = restDataProvider(
  import.meta.env.VITE_REST_URL,
  httpClient
);
