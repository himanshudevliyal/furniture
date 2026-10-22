"use strict";
import table from "../../db/models.js";
import { StatusCodes } from "http-status-codes";
import { cleanupFiles } from "../../helpers/cleanup-files.js";
import {
  jobApplicationSchema,
  JOB_APPLICATION_STATUSES,
} from "../../validation-schema/job-schema.js";

const RESUME_EXTENSIONS = ["pdf", "doc", "docx"];

const badRequest = async (req, res, message) => {
  if (req.filePaths?.length) await cleanupFiles(req.filePaths);
  return res.code(StatusCodes.BAD_REQUEST).send({ status: false, message });
};

const create = async (req, res) => {
  try {
    const resume = req.body?.resume?.[0];
    if (!resume) {
      return badRequest(req, res, "Please attach your CV.");
    }
    if (req.filePaths.length > 1) {
      return badRequest(req, res, "Only one CV file is allowed.");
    }

    const ext = resume.split(".").pop().toLowerCase();
    if (!RESUME_EXTENSIONS.includes(ext)) {
      return badRequest(req, res, "CV must be a PDF, DOC or DOCX file.");
    }

    const body = jobApplicationSchema.parse(req.body);

    // Applying to a specific opening: it must exist and be active.
    if (body.job_id) {
      const job = await table.JobModel.getById(req, body.job_id);
      if (!job || !job.is_active) {
        return badRequest(req, res, "This position is no longer open.");
      }
      body.applying_for = job.title;
    }

    req.body = { ...body, resume };
    await table.JobApplicationModel.create(req);

    res.code(StatusCodes.CREATED).send({
      status: true,
      message: "Application submitted. We will contact you soon.",
    });
  } catch (error) {
    throw error;
  }
};

const get = async (req, res) => {
  try {
    const data = await table.JobApplicationModel.get(req);
    res.code(StatusCodes.OK).send({ status: true, data: data });
  } catch (error) {
    throw error;
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.JobApplicationModel.getById(req);
    if (!record) {
      return res
        .code(StatusCodes.NOT_FOUND)
        .send({ status: false, message: "Application not found!" });
    }

    res.code(StatusCodes.OK).send({ status: true, data: record });
  } catch (error) {
    throw error;
  }
};

const updateStatus = async (req, res) => {
  try {
    const record = await table.JobApplicationModel.getById(req);
    if (!record) {
      return res
        .code(StatusCodes.NOT_FOUND)
        .send({ status: false, message: "Application not found!" });
    }

    if (!JOB_APPLICATION_STATUSES.includes(req.body?.status)) {
      return res.code(StatusCodes.BAD_REQUEST).send({
        status: false,
        message: `status must be one of: ${JOB_APPLICATION_STATUSES.join(", ")}`,
      });
    }

    await table.JobApplicationModel.updateStatus(req);
    res.code(StatusCodes.OK).send({ status: true, message: "Status updated." });
  } catch (error) {
    throw error;
  }
};

const deleteById = async (req, res) => {
  try {
    const record = await table.JobApplicationModel.getById(req);
    if (!record) {
      return res
        .code(StatusCodes.NOT_FOUND)
        .send({ status: false, message: "Application not found!" });
    }

    await table.JobApplicationModel.deleteById(req);
    if (record.resume) await cleanupFiles([record.resume]);

    res
      .code(StatusCodes.OK)
      .send({ status: true, message: "Application deleted." });
  } catch (error) {
    throw error;
  }
};

export default {
  create: create,
  get: get,
  getById: getById,
  updateStatus: updateStatus,
  deleteById: deleteById,
};
