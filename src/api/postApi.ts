import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = "https://rickandmortyapi.com/api";
type Character = {
  results: {
    id: number;
    name: string;
    image: string;
    status: string;
    species: string;
    gender: string;
    location: { name: string };
    origin: { name: string };
  }[];
};
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getCharacters: builder.query<Character, void>({
      query: () => "/character",
    }),
    getCharactersByName: builder.query<Character, string>({
      query: (name) => `/character/?name=${name}`,
    }),
  }),
});
export const { useGetCharactersQuery, useGetCharactersByNameQuery } = postApi;
