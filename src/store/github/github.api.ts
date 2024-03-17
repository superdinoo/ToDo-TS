import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ServerResponse, IUser, IRepo } from "../../models/models";

export const githubApi = createApi({
  reducerPath: "github/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/",
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchUsers: build.query<IUser[], string>({
      query: (search: string) => `search/users?q=${search}&per_page=10`,
      transformResponse: (response: ServerResponse<IUser>) => response.items,
    }),
    getUserRepose: build.query<IRepo[], string>({
      query: (username: string) => ({
        url: `users/${username}/repos`,
      }),
    }),
  }),
});

export const { useSearchUsersQuery, useLazyGetUserReposeQuery } = githubApi;
