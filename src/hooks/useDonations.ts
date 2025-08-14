import { useCreateDonationMutation, useDeleteDonationMutation, useGetDonationsQuery, useUpdateDonationMutation } from "@/api/formApi";
import type { Support,Donation } from "@/types/donation";
export const useDonations = () => {
  const {
    data: donations = [],
    isLoading: loadingDonations,
    error: fetchError,
  } = useGetDonationsQuery();
  const [createDonation, { isLoading: isCreating, error: createError }] = useCreateDonationMutation();
  const [deleteDonation] = useDeleteDonationMutation();
  const [updateDonation, { isLoading: isUpdating }] = useUpdateDonationMutation();
  const handleCreate = async (data: Support) => {
    return await createDonation(data).unwrap();
  };
  const handleUpdate = async (id: number, data: Omit<Donation, "id">) => {
    return await updateDonation({ id, ...data }).unwrap();
  };
  const handleDelete = async (id: number) => {
    return await deleteDonation(id).unwrap();
  };
  return {
    donations,
    loadingDonations,
    fetchError,
    createDonation,
    isCreating,
    createError,
    deleteDonation,
    updateDonation,
    isUpdating,
    handleCreate,
    handleUpdate,
    handleDelete
  };
};
