"use strict";
import controller from "./controller.js";
import { requireRecaptcha } from "../../helpers/recaptcha.js";

export default async function routes(fastify, options) {
  fastify.get("/", {}, controller.get);
  fastify.get("/:id", {}, controller.getById);
  fastify.put("/:id", {}, controller.update);
  fastify.put("/:id/status", {}, controller.updateStatus);
  fastify.delete("/:id", {}, controller.deleteById);
}

export async function projectQuotePublicRoutes(fastify, options) {
  fastify.post("/", { preHandler: requireRecaptcha }, controller.create);
}
