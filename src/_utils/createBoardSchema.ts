import { z } from 'zod';

export const createBoardSchema = z.object({
  title: z.string(),
  cover: z
    .string()
    .startsWith('https')
    .url({
      message: 'Invalid cover link',
    })
    .or(z.literal('')),
  public: z.boolean(),
  members: z.array(
    z.object({
      name: z.string(),
      user: z.string(),
      password: z.string(),
    }),
  ),
});
