"use strict";
import controller from "./controller.js";

// NOTE: Product create/update no longer accepts multipart file uploads directly.
// Images/files (hero.images, gallery.images, materials.sections[].items[].image,
// models_3d[].file, downloads[].file) are expected to be already-uploaded URLs/paths
// (see /v1/upload_files) referenced inside the JSON body, same pattern used for
// category.picture_urls.
export default async function routes(fastify, options) {
  fastify.post("/", {}, controller.create);
  fastify.put("/:id", {}, controller.updateById);
  fastify.delete("/:id", {}, controller.deleteById);
  fastify.get("/:id", {}, controller.getById);
}

export async function productPublicRoutes(fastify, opt) {
  fastify.get("/get-by-slug/:slug", {}, controller.getBySlug);
  fastify.get("/", {}, controller.get);
}
