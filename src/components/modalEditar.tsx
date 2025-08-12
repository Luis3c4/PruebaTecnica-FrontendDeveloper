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
  onSave: (updatedDonation: Omit<Donation, "id">) => void;
  isLoading?: boolean;
}
function ModalEditar({
  isOpen,
  onClose,
  donation,
  onSave,
  isLoading = false,
}: EditDonationModalProps) {
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    amount: 0,
    message: ""
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || 0 : value
    }));
  };
  const handleSave = () => {
    if (donation) {
      onSave(editForm);
    }
  };
  const handleClose = () => {
    onClose();
    // Reset form when closing
    setEditForm({
      name: "",
      email: "",
      amount: 0,
      message: ""
    });
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Donación</DialogTitle>
            <DialogDescription>
              Modifica los datos de la donación aquí. Haz click en guardar
              cuando termines.
            </DialogDescription>
          </DialogHeader>

          {donation && (
            <div className="grid gap-4 py-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Nombre completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="correo@ejemplo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Cantidad
                </label>
                <input
                  type="number"
                  name="amount"
                  value={editForm.amount}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  value={editForm.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Mensaje opcional..."
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Guardando..." : "Guardar cambios"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ModalEditar;
