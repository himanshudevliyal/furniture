"use strict";
import controller from "./controller.js";

// Admin / Protected routes. Public submit lives in careerPublicRoutes (api/job/routes.js).
export default async function routes(fastify, options) {
  fastify.get("/", {}, controller.get);
  fastify.get("/:id", {}, controller.getById);
  fastify.put("/:id/status", {}, controller.updateStatus);
  fastify.delete("/:id", {}, controller.deleteById);
}
