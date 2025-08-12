import type { Support } from "@/types/donation";

export type  ValidationErrors = {
  [K in keyof Support]?: string;
};
