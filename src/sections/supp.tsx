import { useDonations } from "@/hooks/useDonations";
import type { Donation } from "@/types/donation";
import { useState } from "react";

function Supp() {
  const { donations, loadingDonations, fetchError, handleCreate, handleUpdate, handleDelete } = useDonations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDonation, setEditingDonation] = useState<Donation | null>(null);
  const handleEditClick = (donation: Donation) => {
    setEditingDonation(donation);
    setIsModalOpen(true);
  };
  return (
    <div className="max-w-5xl mx-auto">
     
    </div>
  );
}

export default Supp;
