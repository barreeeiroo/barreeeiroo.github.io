import { defineCollection, z } from 'astro:content';

const workCollection = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    order: z.number(),
  }),
});

const featuredProjectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    technologies: z.array(z.string()),
    image: z.string(),
    githubUrl: z.string().optional(),
    externalUrl: z.string().optional(),
    order: z.number(),
  }),
});

export const collections = {
  work: workCollection,
  'featured-projects': featuredProjectsCollection,
};
