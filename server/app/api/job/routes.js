"use strict";
import { multipartPreHandler } from "../../middlewares/multipart-prehandler.js";
import controller from "./controller.js";
import applicationController from "../job-application/controller.js";

// Admin / Protected routes
export default async function routes(fastify, options) {
  fastify.get("/", {}, controller.get);
  fastify.get("/:id", {}, controller.getById);
  fastify.post("/", {}, controller.create);
  fastify.put("/:id", {}, controller.update);
  fastify.put("/:id/status", {}, controller.updateStatus);
  fastify.delete("/:id", {}, controller.deleteById);
}

// Public routes (website careers page)
export async function careerPublicRoutes(fastify, options) {
  // Only active jobs.
  fastify.get("/jobs", {}, controller.getActive);

  // multipart/form-data with the CV in the "resume" field.
  fastify.post(
    "/apply",
    { preHandler: multipartPreHandler() },
    applicationController.create,
  );
}
