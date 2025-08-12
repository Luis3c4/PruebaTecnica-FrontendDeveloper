import { useDonationsForm } from "@/hooks/useDonationForm";
import type { Support, Donation } from "@/types/donation";
import { useEffect } from "react";

interface DonationFormProps {
  onSubmit: (data: Support) => Promise<void>;
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
    const {formData, validationErrors, handleSubmit, handleChange} = useDonationsForm(onSubmit);
    // Efecto para cargar datos iniciales
  useEffect(() => {
    if (initialData) {
      //setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);
  return (
    <form>

    </form>
  );
}

export default DonationForm;
