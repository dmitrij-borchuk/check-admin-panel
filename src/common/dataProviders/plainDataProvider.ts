import {
  DataProvider,
  fetchUtils,
  GetOneParams,
  UpdateParams,
} from "react-admin";
import { authProvider } from "../../authProvider";
import { serverUrl } from "../../config";

function makeHttpClient(
  organization: string | null,
): typeof fetchUtils.fetchJson {
  return async (url: string, options) => {
    const headers = new Headers(options?.headers);
    if (organization) {
      headers.set("x-organization", organization);
    }
    return await fetchUtils.fetchJson(url, {
      ...options,
      user: {
        authenticated: true,
        token: (await authProvider.getJWTToken()) || undefined,
      },
      headers,
    });
  };
}

export function buildPlainDataProvider(
  organization: string | null,
): DataProvider {
  const httpClient = makeHttpClient(organization);

  return {
    // get a list of records based on sort, filter, and pagination
    getList: (resource: string) => {
      return httpClient(`${serverUrl}/${resource}`).then((d) => {
        return {
          data: d.json,
          total: d.json.length,
        };
      });
    },
    // get a single record by id
    getOne: (resource: string, { id }: GetOneParams) => {
      return httpClient(`${serverUrl}/${resource}/${id}`).then((d) => {
        return {
          data: d.json,
        };
      });
    },
    // get a list of records based on an array of ids
    getMany: (resource: string) => Promise.resolve({ data: [] }),
    // get the records referenced to another record, e.g. comments for a post
    getManyReference: (resource: string) => Promise.resolve({ data: [] }),
    // create a record
    create: (resource: string) => {
      throw new Error("Not implemented");
    },
    // update a record based on a patch
    update: (resource: string, { id, data }: UpdateParams) => {
      return httpClient(`${serverUrl}/${resource}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }).then((d) => {
        return {
          data: d.json,
        };
      });
    },
    // update a list of records based on an array of ids and a common patch
    updateMany: (resource: string) => {
      throw new Error("Not implemented");
    },
    // delete a record by id
    delete: (resource: string) => {
      throw new Error("Not implemented");
    },
    // delete a list of records based on an array of ids
    deleteMany: (resource: string) => {
      throw new Error("Not implemented");
    },
  };
}
