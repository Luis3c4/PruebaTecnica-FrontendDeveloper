import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
type Donation = {
  id: string;
  name: string;
  email: string;
  amount: number;
  message: string;
};
interface EditDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  donation: Donation | null;
  onSave: (updatedDonation: Omit<Donation, 'id'>) => void;
  isLoading?: boolean;
}
function ModalEditar({ isOpen, onClose, donation, onSave, isLoading = false }:EditDonationModalProps) {
  return (
    <div>
        
    </div>
  );
}

export default ModalEditar;
