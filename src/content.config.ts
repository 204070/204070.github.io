import { glob, file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    // Load Markdown and MDX files in the `src/content/blog/` directory.
    loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
    // Type-check frontmatter using a schema
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            // Transform string to Date object
            pubDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            heroImage: image().optional(),
            isDraft: z.boolean().optional(),
        }),
});

const portfolio = defineCollection({
    // Load JSON file for portfolio data
    loader: file("./src/content/portfolio.json"),
    // Type-check data using a schema
    schema: z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        links: z.array(
            z.object({
                type: z.string(),
                label: z.string(),
                url: z.string(),
            })
        ),
        order: z.number().optional(),
    }),
});

export const collections = { blog, portfolio };
