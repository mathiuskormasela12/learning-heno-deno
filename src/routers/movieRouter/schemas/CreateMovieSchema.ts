import { z } from 'zod';

const CreateMovieSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  releaseDate: z.string(),
  writer: z.string(),
});

export default CreateMovieSchema;
