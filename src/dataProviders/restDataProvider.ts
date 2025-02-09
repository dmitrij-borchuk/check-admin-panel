import qs from "query-string";
import { type DataProvider, fetchUtils } from "react-admin";

export default (
  apiUrl: string,
  httpClient = fetchUtils.fetchJson,
): DataProvider => ({
  getList: (resource, params) => {
    const { page = 1, perPage } = params.pagination ?? {};
    const { field, order } = params.sort ?? {};

    const query = {
      page: page - 1,
      pageSize: perPage,
      sort: JSON.stringify([field, order]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${qs.stringify(query)}`;

    return httpClient(url).then(({ json }) => {
      return json;
    });
  },

  getOne: (resource, params) => {
    return httpClient(`${apiUrl}/${resource}/${params.id}`).then(
      ({ json }) => ({
        data: json,
      }),
    );
  },
  getMany: (resource, params) => {
    return Promise.all(
      params.ids.map((id) => httpClient(`${apiUrl}/${resource}/${id}`)),
    ).then((responses) => ({
      data: responses.map(({ json }) => json),
    }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const query = {
      page: page - 1,
      pageSize: perPage,
      sort: JSON.stringify([field, order]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${qs.stringify(query)}`;

    return httpClient(url).then(({ json }) => {
      return json;
    });
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  updateMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: "PUT",
          body: JSON.stringify(params.data),
        }),
      ),
    ).then((responses) => ({ data: responses.map(({ json }) => json.id) })),

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "text/plain",
      }),
    }).then(({ json }) => ({ data: json })),

  deleteMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "text/plain",
          }),
        }),
      ),
    ).then((responses) => ({
      data: responses.map(({ json }) => json.id),
    })),
});
