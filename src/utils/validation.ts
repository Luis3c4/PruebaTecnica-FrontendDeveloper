import { z } from "zod";

import type { Support } from "@/types/donation";
export type  ValidationErrors = {
  [K in keyof Support]?: string;
};
export const donationSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.email("Correo inválido"),
  amount: z.number().positive("Monto inválido"),
  message: z.string().optional(),
});