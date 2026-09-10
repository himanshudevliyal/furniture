import { z } from "zod";

// ---- Reusable sub-schemas (mirrors app/validation-schema/product-schema.js on the server) ----

export const heroSchema = z.object({
  heading: z.string().optional().default(""),
  subheading: z.string().optional().default(""),
  descriptions: z.array(z.string().min(1, "Required")).optional().default([]),
  images: z.array(z.string()).optional().default([]),
});

export const featuresSchema = z.object({
  heading: z.string().optional().default(""),
  list: z.array(z.string().min(1, "Required")).optional().default([]),
});

export const overviewSchema = z.object({
  heading: z.string().optional().default(""),
  descriptions: z.array(z.string().min(1, "Required")).optional().default([]),
  features: featuresSchema.optional().default({ heading: "", list: [] }),
});

export const detailSectionSchema = z.object({
  heading: z.string().min(1, "Heading is required"),
  descriptions: z.array(z.string().min(1, "Required")).optional().default([]),
  image: z.string().optional().default(""),
  has_features: z.boolean().optional().default(false),
  features: featuresSchema.optional().default({ heading: "", list: [] }),
});

export const detailsBannerSchema = z.object({
  image: z.string().optional().default(""),
});

export const detailsSchema = z.object({
  sections: z.array(detailSectionSchema).optional().default([]),
  banner: detailsBannerSchema.optional().default({ image: "" }),
});

export const materialItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  image: z.string().optional().default(""),
});

export const materialSectionSchema = z.object({
  heading: z.string().min(1, "Heading is required"),
  items: z.array(materialItemSchema).optional().default([]),
});

export const materialsSchema = z.object({
  sections: z.array(materialSectionSchema).optional().default([]),
});

export const specificationSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
});

export const fileEntrySchema = z.object({
  title: z.string().min(1, "Title is required"),
  file: z.string().min(1, "File is required"),
  fileType: z.string().optional().default(""),
});

export const gallerySchema = z.object({
  heading: z.string().optional().default(""),
  images: z.array(z.string()).optional().default([]),
});

// ---- Main product schema ----

export const productBaseSchema = z.object({
  category_id: z.string().uuid("Category is required."),
  sub_category_id: z
    .union([z.string().uuid("Invalid sub category"), z.literal("")])
    .nullish(),

  title: z.string().min(1, "Title is required"),

  short_description: z.string().optional(),
  content: z.string().optional(),

  is_active: z.boolean().optional().default(true),
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

export const productCreateSchema = productBaseSchema;
export const productUpdateSchema = productBaseSchema;
export const productFormSchema = productBaseSchema;
