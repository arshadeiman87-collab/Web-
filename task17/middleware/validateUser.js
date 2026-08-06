import { z } from "zod";

const userSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  email: z
    .string()
    .email("Invalid email"),

  age: z
    .number()
    .min(18, "Age must be at least 18")
});

export const validateUser = (req, res, next) => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.issues
    });
  }

  req.body = result.data;
  next();
};