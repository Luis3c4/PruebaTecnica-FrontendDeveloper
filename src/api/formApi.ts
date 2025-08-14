import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
type DonationBase = {
  name: string;
  email: string;
  amount: number;
  message: string;
};
type Donation = DonationBase & {
  id: number;
};
export const formApi = createApi({
  reducerPath: "formApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://x8ki-letl-twmt.n7.xano.io/api:wu6DGMCT",
  }),
  tagTypes: ["Donation"],
  endpoints: (builder) => ({
    getDonations: builder.query<Donation[], void>({
      query: () => "/donations",
      providesTags: ["Donation"],
    }),
    createDonation: builder.mutation<Donation, DonationBase>({
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
    updateDonation: builder.mutation<DonationBase, Donation>({
      query: (donation) => ({
        url: `/donations/${donation.id}`,
        method: "PATCH",
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
