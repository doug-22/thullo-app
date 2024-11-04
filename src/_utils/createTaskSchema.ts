import { z } from 'zod';

export const createTaskSchema = z
  .object({
    title: z.string().min(1, 'The title is mandatory'),
    description: z.string(),
    remainingTime: z.number().min(1, 'The remaining time is mandatory'),
    owners: z.array(
      z.object({
        name: z.string(),
        user: z.string(),
        password: z.string(),
      }),
    ),
    tags: z.array(
      z.object({
        title: z.string(),
        type: z.string(),
      }),
    ),
  })
  .required();
