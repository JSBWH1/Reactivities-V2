import { z } from "zod"; 

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type LoginSchema = z.infer<typeof loginSchema>;








// import { z } from "zod"; 

// export const loginSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6),
// });

// export type LoginSchema = z.infer<typeof loginSchema>;