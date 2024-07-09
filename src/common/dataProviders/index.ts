import { useMemo } from "react";
import { combineDataProviders } from "react-admin";
import { buildPaginatedDataProvider } from "./paginatedDataProvider";
import { buildPlainDataProvider } from "./plainDataProvider";
import { useOrganization } from "../../organizations/organizationContext";

export function useDataProvider() {
  const { organizationRef } = useOrganization();

  return useMemo(() => {
    return combineDataProviders((resource: string) => {
      const paginatedDataProvider = buildPaginatedDataProvider(
        organizationRef.current
      );
      const plainDataProvider = buildPlainDataProvider(organizationRef.current);
      switch (resource) {
        case "organizations":
          return plainDataProvider;
        default:
          return paginatedDataProvider;
      }
    });
  }, [organizationRef]);
}
