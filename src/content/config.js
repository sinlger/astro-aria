import { defineCollection, z } from "astro:content";

const postCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		dateFormatted: z.string(),
		keywords: z.string().optional(),
	}),
});

export const collections = {
	post: postCollection,
};
