"use strict";
import constants from "../../lib/constants/index.js";
import table from "../../db/models.js";
import { userQuerySchema } from "../../validation-schema/user-query-schema.js";
import { notifyForm } from "../../services/form-mail.js";

const { NOT_FOUND } = constants.http.status;

const create = async (req, res) => {
  try {
    const validatedData = userQuerySchema.parse(req.body);

    await table.QueryModel.create(req);

    const q = validatedData;
    notifyForm({
      form: "Contact Enquiry",
      summary: [q.name, q.subject].filter(Boolean).join(" – ") || q.phone,
      replyTo: q.email,
      rows: [
        ["Name", q.name],
        ["Email", q.email],
        ["Phone", q.phone],
        ["Reason", q.reason],
        ["Subject", q.subject],
        ["Message", q.message],
        ["Attachment", q.attachment ? `https://api.natrajfurniture.com/${String(q.attachment).replace(/^\/+/, "")}` : ""],
      ],
      ack: {
        message: `Hi${q.name ? ` ${q.name}` : ""}, thank you for contacting Natraj Office Furniture. We have received your message and will reply soon.`,
        rows: [["Subject", q.subject]],
      },
    });

    res.send({ status: true, message: "Query sent." });
  } catch (error) {
    throw error;
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.QueryModel.getById(req, req.params.id);

    if (!record) {
      return res
        .code(NOT_FOUND)
        .send({ status: false, message: "Query not found!" });
    }

    res.send({ status: true, data: record });
  } catch (error) {
    throw error;
  }
};

const get = async (req, res) => {
  try {
    const queries = await table.QueryModel.get(req);
    res.send({ status: true, data: queries });
  } catch (error) {
    throw error;
  }
};

const update = async (req, res) => {
  try {
    const record = await table.QueryModel.getById(req, req.params.id);

    if (!record) {
      return res
        .code(NOT_FOUND)
        .send({ status: false, message: "Query not found!" });
    }

    req.body = userQuerySchema.omit({ attachment: true }).parse(req.body);

    await table.QueryModel.update(req, req.params.id);
    res.send({ status: true, message: "Query updated." });
  } catch (error) {
    throw error;
  }
};

const deleteById = async (req, res) => {
  try {
    const record = await table.QueryModel.getById(req, req.params.id);

    if (!record)
      return res
        .code(NOT_FOUND)
        .send({ status: false, message: "Query not found!" });

    await table.QueryModel.deleteById(req, req.params.id);
    res.send({ status: true, message: "Query deleted." });
  } catch (error) {
    throw error;
  }
};

export default {
  create: create,
  get: get,
  update: update,
  deleteById: deleteById,
  getById: getById,
};
