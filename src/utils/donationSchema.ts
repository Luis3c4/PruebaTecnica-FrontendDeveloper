import { z } from "zod";

export const donationSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.email("Correo inválido"),
  amount: z.number().positive("Monto inválido"),
  message: z.string().optional(),
});