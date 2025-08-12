import type { Support, Donation } from "@/types/donation";
import type { ValidationErrors } from "@/utils/validation";
import { donationSchema } from "@/utils/validation";
import { useState } from "react";
import { z } from "zod";
export const useDonationsForm = (
  onSubmit: (data: Support) => Promise<void>
) => {
  const [formData, setFormData] = useState<Support>({
    name: "",
    email: "",
    amount: 0,
    message: "",
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const validateForm = (): boolean => {
    try {
      donationSchema.parse(formData);
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: ValidationErrors = {};
        error.issues.forEach((err) => {
          if (err.path.length > 0) {
            const field = err.path[0] as keyof Support;
            errors[field] = err.message;
          }
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };
};
