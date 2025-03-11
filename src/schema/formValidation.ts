import { z } from "zod";

export const formSchema = z.object({
  fields: z
    .array(
      z.object({
        input: z.string().min(1, { message: "Input is required" }),
        select: z.string().min(1, { message: "Selection is required" }),
      })
    )
    .min(1),
});
