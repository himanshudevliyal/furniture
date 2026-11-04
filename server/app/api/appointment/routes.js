"use strict";
import controller from "./controller.js";
import { requireRecaptcha } from "../../helpers/recaptcha.js";

// Admin (behind the JWT hook in routes/v1/index.js).
export default async function routes(fastify, options) {
  fastify.get("/manage/slots", {}, controller.manageSlots);
  fastify.post("/manage/slot-blocks", {}, controller.createSlotBlock);
  fastify.delete("/manage/slot-blocks/:id", {}, controller.deleteSlotBlock);

  fastify.get("/", {}, controller.get);
  fastify.get("/:id", {}, controller.getById);
  fastify.put("/:id/status", {}, controller.updateStatus);
  fastify.delete("/:id", {}, controller.deleteById);
}

// Website.
export async function appointmentPublicRoutes(fastify, options) {
  fastify.post("/", { preHandler: requireRecaptcha }, controller.create);
  fastify.get("/slots", {}, controller.slots);
}
