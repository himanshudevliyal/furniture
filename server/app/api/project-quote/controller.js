"use strict";
import table from "../../db/models.js";
import { StatusCodes } from "http-status-codes";
import {
  projectQuoteSchema,
  projectQuoteUpdateSchema,
} from "../../validation-schema/project-quote-schema.js";

const create = async (req, res) => {
  try {
    req.body = projectQuoteSchema.parse(req.body);

    const record = await table.ProjectQuoteModel.create(req);

    res
      .code(StatusCodes.CREATED)
      .send({ status: true, message: "Quote request submitted.", data: record });
  } catch (error) {
    throw error;
  }
};

const get = async (req, res) => {
  try {
    const data = await table.ProjectQuoteModel.get(req);
    res.code(StatusCodes.OK).send({ status: true, data: data });
  } catch (error) {
    throw error;
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.ProjectQuoteModel.getById(req);
    if (!record) {
      return res
        .code(StatusCodes.NOT_FOUND)
        .send({ status: false, message: "Quote request not found!" });
    }

    res.code(StatusCodes.OK).send({ status: true, data: record });
  } catch (error) {
    throw error;
  }
};

const updateStatus = async (req, res) => {
  try {
    const record = await table.ProjectQuoteModel.getById(req);
    if (!record) {
      return res
        .code(StatusCodes.NOT_FOUND)
        .send({ status: false, message: "Quote request not found!" });
    }

    const allowedStatuses = ["pending", "contacted", "closed"];
    if (!allowedStatuses.includes(req.body.status)) {
      return res.code(StatusCodes.BAD_REQUEST).send({
        status: false,
        message: `status must be one of: ${allowedStatuses.join(", ")}`,
      });
    }

    await table.ProjectQuoteModel.update(req);
    res.code(StatusCodes.OK).send({ status: true, message: "Status updated." });
  } catch (error) {
    throw error;
  }
};

const update = async (req, res) => {
  try {
    const record = await table.ProjectQuoteModel.getById(req);
    if (!record) {
      return res
        .code(StatusCodes.NOT_FOUND)
        .send({ status: false, message: "Quote request not found!" });
    }

    req.body = projectQuoteUpdateSchema.parse(req.body);

    await table.ProjectQuoteModel.update(req);
    res.code(StatusCodes.OK).send({ status: true, message: "Quote request updated." });
  } catch (error) {
    throw error;
  }
};

const deleteById = async (req, res) => {
  try {
    const record = await table.ProjectQuoteModel.getById(req);
    if (!record) {
      return res
        .code(StatusCodes.NOT_FOUND)
        .send({ status: false, message: "Quote request not found!" });
    }

    await table.ProjectQuoteModel.deleteById(req);
    res
      .code(StatusCodes.OK)
      .send({ status: true, message: "Quote request deleted." });
  } catch (error) {
    throw error;
  }
};

export default {
  create: create,
  get: get,
  getById: getById,
  update: update,
  updateStatus: updateStatus,
  deleteById: deleteById,
};
