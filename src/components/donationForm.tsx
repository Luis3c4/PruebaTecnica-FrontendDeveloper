import { useDonationsForm } from "@/hooks/useDonationForm";
import type { Support,Donation } from "@/types/donation";
import { useEffect } from "react";
import FormField from "./formField";
import { Button } from "./ui/button";

  interface DonationFormProps {
    onSubmit: (data: Support) => Promise<Donation | void>;
    isLoading?: boolean;
    initialData?: Partial<Support>;
    submitButtonText?: string;
  }
function DonationForm({
  onSubmit,
  isLoading = false,
  initialData,
  submitButtonText = "Enviar",
}: DonationFormProps) {
    const {formData,setFormData, validationErrors, handleSubmit, handleChange} = useDonationsForm(onSubmit);
    // Efecto para cargar datos iniciales
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <FormField
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
        error={validationErrors.name}
      />
      <FormField
        name="email"
        type="email"
        placeholder="Correo"
        value={formData.email}
        onChange={handleChange}
        error={validationErrors.email}
      />
      <FormField
        name="amount"
        type="number"
        placeholder="Cantidad"
        value={formData.amount}
        onChange={handleChange}
        error={validationErrors.amount}
      />
      <FormField
        name="message"
        as="textarea"
        placeholder="Mensaje opcional"
        value={formData.message}
        onChange={handleChange}
        error={validationErrors.message}
      />
      <Button
        type="submit"
        disabled={isLoading}
        className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
      >
        {isLoading ? "Enviando..." : submitButtonText}
      </Button>
    </form>
  );
}

export default DonationForm;
