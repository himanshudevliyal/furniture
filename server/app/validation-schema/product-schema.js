import { z } from "zod";

// ---- Reusable sub-schemas ----

const heroSchema = z.object({
  heading: z.string().optional(),
  subheading: z.string().optional(),
  descriptions: z.array(z.string()).optional().default([]),
  images: z.array(z.string()).optional().default([]),
});

const featuresSchema = z.object({
  heading: z.string().optional(),
  list: z.array(z.string()).optional().default([]),
});

const overviewSchema = z.object({
  heading: z.string().optional(),
  descriptions: z.array(z.string()).optional().default([]),
  features: featuresSchema.optional(),
});

const detailSectionSchema = z.object({
  heading: z.string().optional(),
  descriptions: z.array(z.string()).optional().default([]),
  image: z.string().optional().default(""),
  has_features: z.boolean().optional().default(false),
  features: featuresSchema.optional(),
});

const detailsBannerSchema = z.object({
  image: z.string().optional().default(""),
});

const detailsSchema = z.object({
  sections: z.array(detailSectionSchema).optional().default([]),
  banner: detailsBannerSchema.optional().default({ image: "" }),
});

const materialItemSchema = z.object({
  title: z.string().optional(),
  image: z.string().optional(),
});

const materialSectionSchema = z.object({
  heading: z.string().optional(),
  items: z.array(materialItemSchema).optional().default([]),
});

const materialsSchema = z.object({
  sections: z.array(materialSectionSchema).optional().default([]),
});

const specificationSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
});

const fileEntrySchema = z.object({
  title: z.string().min(1, "Title is required"),
  file: z.string().min(1, "File is required"),
  fileType: z.string().optional(),
});

const gallerySchema = z.object({
  heading: z.string().optional(),
  images: z.array(z.string()).optional().default([]),
});

// ---- Main product schema ----

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category_id: z.uuid({ message: "Invalid category id" }),
  sub_category_id: z.uuid({ message: "Invalid sub category id" }).nullish(),

  short_description: z.string().optional(),
  content: z.string().optional(),

  is_active: z.coerce.boolean().optional().default(true),
  sort_order: z.coerce.number().int().optional().default(0),

  hero: heroSchema.optional().default({}),
  overview: overviewSchema.optional().default({}),
  details: detailsSchema.optional().default({}),
  materials: materialsSchema.optional().default({}),
  specifications: z.array(specificationSchema).optional().default([]),
  models_3d: z.array(fileEntrySchema).optional().default([]),
  downloads: z.array(fileEntrySchema).optional().default([]),
  gallery: gallerySchema.optional().default({}),

  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  meta_keywords: z.string().optional(),
});
