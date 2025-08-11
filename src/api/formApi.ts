import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
type DonationBase = {
  name: string;
  email: string;
  amount: number;
  message: string;
};
type Donation = DonationBase & {
  id: string;
};
export const formApi = createApi({
  reducerPath: "formApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
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
    deleteDonation: builder.mutation<void, string>({
      query: (id) => ({
        url: `/donations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Donation"],
    }),
    updateDonation: builder.mutation<DonationBase, Donation>({
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
