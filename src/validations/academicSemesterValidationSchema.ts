import { z } from "zod";

export const academicSemesterValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  code: z.string({ required_error: "Code is required" }),
  year: z.string({ required_error: "Year is required" }),
  startMonth: z.string({ required_error: "Start month is required" }),
  endtMonth: z.string({ required_error: "End month is required" }),
});
