import type { Donation, Support } from "@/types/donation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DonationForm from "./donationForm";

interface EditDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  donation: Donation | null;
  onSave: (updatedDonation: Omit<Donation, "id">) => Promise<void>;
  isLoading?: boolean;
}
function EditDonationModal({
  isOpen,
  onClose,
  donation,
  onSave,
  isLoading = false,
}: EditDonationModalProps) {
    const handleFormSubmit = async (data: Support) => {
    await onSave(data);
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Donación</DialogTitle>
          <DialogDescription>
            Modifica los datos de la donación aquí.
          </DialogDescription>
        </DialogHeader>

        {donation && (
          <DonationForm
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
            initialData={donation}
            submitButtonText="Guardar cambios"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EditDonationModal;
