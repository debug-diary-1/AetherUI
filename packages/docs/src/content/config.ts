import { defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';
import { z } from 'astro:content';

export const collections = {
  docs: defineCollection({ schema: docsSchema() }),
  // Define playground with basic schema
  playground: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      framework: z.string().optional(),
      order: z.number().optional(),
    }),
  }),
};
