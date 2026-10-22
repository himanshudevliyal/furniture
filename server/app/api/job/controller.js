"use strict";
import table from "../../db/models.js";
import { StatusCodes } from "http-status-codes";
import { jobSchema, jobStatusSchema } from "../../validation-schema/job-schema.js";

const create = async (req, res) => {
  try {
    req.body = jobSchema.parse(req.body);

    const record = await table.JobModel.create(req);

    res
      .code(StatusCodes.CREATED)
      .send({ status: true, message: "Job created.", data: record });
  } catch (error) {
    throw error;
  }
};

const update = async (req, res) => {
  try {
    const record = await table.JobModel.getById(req);
    if (!record) {
      return res
        .code(StatusCodes.NOT_FOUND)
        .send({ status: false, message: "Job not found!" });
    }

    req.body = jobSchema.parse(req.body);

    await table.JobModel.update(req);
    res.code(StatusCodes.OK).send({ status: true, message: "Job updated." });
  } catch (error) {
    throw error;
  }
};

// Toggle visibility on the website.
const updateStatus = async (req, res) => {
  try {
    const record = await table.JobModel.getById(req);
    if (!record) {
      return res
        .code(StatusCodes.NOT_FOUND)
        .send({ status: false, message: "Job not found!" });
    }

    req.body = jobStatusSchema.parse(req.body);

    await table.JobModel.update(req);
    res.code(StatusCodes.OK).send({
      status: true,
      message: req.body.is_active ? "Job activated." : "Job deactivated.",
    });
  } catch (error) {
    throw error;
  }
};

const get = async (req, res) => {
  try {
    const data = await table.JobModel.get(req);
    res.code(StatusCodes.OK).send({ status: true, data: data });
  } catch (error) {
    throw error;
  }
};

const getActive = async (req, res) => {
  try {
    const data = await table.JobModel.get(req, { onlyActive: true });
    res.code(StatusCodes.OK).send({ status: true, data: data });
  } catch (error) {
    throw error;
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.JobModel.getById(req);
    if (!record) {
      return res
        .code(StatusCodes.NOT_FOUND)
        .send({ status: false, message: "Job not found!" });
    }

    res.code(StatusCodes.OK).send({ status: true, data: record });
  } catch (error) {
    throw error;
  }
};

const deleteById = async (req, res) => {
  try {
    const record = await table.JobModel.getById(req);
    if (!record) {
      return res
        .code(StatusCodes.NOT_FOUND)
        .send({ status: false, message: "Job not found!" });
    }

    // Applications are kept (job_id becomes NULL, applying_for keeps the title).
    await table.JobModel.deleteById(req);
    res.code(StatusCodes.OK).send({ status: true, message: "Job deleted." });
  } catch (error) {
    throw error;
  }
};

export default {
  create: create,
  update: update,
  updateStatus: updateStatus,
  get: get,
  getActive: getActive,
  getById: getById,
  deleteById: deleteById,
};
