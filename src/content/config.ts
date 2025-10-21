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

const archiveCollection = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.string(),
    title: z.string(),
    github: z.string().optional(),
    external: z.string().optional(),
    mobile: z.string().optional(),
    company: z.string(),
    tech: z.array(z.string()),
  }),
});

export const collections = {
  work: workCollection,
  projects: featuredProjectsCollection,
  archive: archiveCollection,
};
