import DonationGrid from "@/components/contend/donationGrid";
import SupportHeader from "@/components/contend/supportHeader";
import DonationForm from "@/components/donationForm";
import EditDonationModal from "@/components/EditDonationModal";
import { useDonations } from "@/hooks/useDonations";
import type { Donation } from "@/types/donation";
import { useState } from "react";

function Supp() {
  const {
    donations,
    loadingDonations,
    fetchError,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useDonations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDonation, setEditingDonation] = useState<Donation | null>(null);

  const handleEditClick = (donation: Donation) => {
    setEditingDonation(donation);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDonation(null);
  };
  const handleSaveEdit = async (updatedData: Omit<Donation, "id">) => {
    if (editingDonation) {
      await handleUpdate(editingDonation.id, updatedData);
    }
  };
  return (
    <div className="max-w-5xl mx-auto">
      <div className="px-4 lg:px-0">
        <SupportHeader />
      </div>

      <div className="max-w-2xs mx-auto mt-8">
        <DonationForm onSubmit={handleCreate} />
      </div>

      <EditDonationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        donation={editingDonation}
        onSave={handleSaveEdit}
      />

      <DonationGrid
        donations={donations}
        loading={loadingDonations}
        error={fetchError}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Supp;
