"use strict";
import controller from "./controller.js";
import { requireRecaptcha } from "../../helpers/recaptcha.js";

export default async function routes(fastify, options) {
  fastify.put("/:id", {}, controller.update);
  fastify.delete("/:id", {}, controller.deleteById);
  fastify.get("/:id", {}, controller.getById);
  fastify.get("/", {}, controller.get);
}

export async function queryPublicRoutes(fastify, options) {
  fastify.post("/", { preHandler: requireRecaptcha }, controller.create);
}
