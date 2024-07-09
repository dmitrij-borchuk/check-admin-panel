import { fetchUtils } from "react-admin";
import { authProvider } from "../../authProvider";
import restDataProvider from "../../dataProviders/restDataProvider";

export function buildPaginatedDataProvider(organization: string | null) {
  const httpClient: typeof fetchUtils.fetchJson = async (
    url: string,
    options
  ) => {
    const headers = new Headers(options?.headers);
    if (!organization) {
      throw new Error("Organization not set");
    }
    headers.set("x-organization", organization);
    return await fetchUtils.fetchJson(url, {
      ...options,
      user: {
        authenticated: true,
        token: (await authProvider.getJWTToken()) || undefined,
      },
      headers,
    });
  };

  return restDataProvider(import.meta.env.VITE_REST_URL, httpClient);
}
