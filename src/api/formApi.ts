import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
type FormData = {
  name: string;
  email: string;
  amount: number;
  message: string;
  id: number;
};
export const formApi = createApi({
  reducerPath: "formApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  tagTypes: ["Donation"],
  endpoints: (builder) => ({
    getDonations: builder.query<FormData[], void>({
      query: () => "/donations",
      transformResponse: (response: FormData[]) => {
        console.log(response);
        return response;
      },
      providesTags: ["Donation"],
    }),
    createDonation: builder.mutation<FormData, Omit<FormData, "id">>({
      query: (newDonation) => ({
        url: "/donations",
        method: "POST",
        body: newDonation,
      }),
      invalidatesTags: ["Donation"],
    }),
    deleteDonation: builder.mutation<void, number>({
      query: (id) => ({
        url: `/donations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Donation"],
    }),
    updateDonation: builder.mutation<FormData, FormData>({
      query: (donation) => ({
        url: `/donations/${donation.id}`,
        method: "PUT",
        body: donation,
      }),
      invalidatesTags: ["Donation"],
    }),
  }),
});
export const {
  useCreateDonationMutation,
  useDeleteDonationMutation,
  useUpdateDonationMutation,
  useGetDonationsQuery,
} = formApi;
