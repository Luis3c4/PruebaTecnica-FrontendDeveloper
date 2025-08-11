import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = "https://rickandmortyapi.com/api";
type Character = {
    id: number;
    name: string;
    image: string;
    status: string;
    species: string;
    gender: string;
    location: { name: string };
    origin: { name: string };
  };
type CharactersResponse = {
  count:number,
  pages:number,
  next:string | null,
  prev:string | null,
  results: Character[];
};
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getCharacters: builder.query<CharactersResponse, number>({
      query: (pages) => `/character?page=${pages}`,
    }),
    getCharactersByName: builder.query<CharactersResponse, string>({
      query: (name) => `/character/?name=${name}`,
    }),
    getCharacterById: builder.query<Character, number>({
      query:(id) => `/character/${id}`,
    })
  }),
});
export const { useGetCharactersQuery, useGetCharactersByNameQuery, useGetCharacterByIdQuery } = postApi;
