"use strict";
import table from "../../db/models.js";
import { StatusCodes } from "http-status-codes";
import { cleanupFiles } from "../../helpers/cleanup-files.js";
import fs from "fs";
import path from "path";
import { notifyForm } from "../../services/form-mail.js";
import { RECAPTCHA_MESSAGE, verifyRecaptcha } from "../../helpers/recaptcha.js";
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
    // Multipart, so the reCAPTCHA check runs here (uploaded CV is removed on fail).
    if (!(await verifyRecaptcha(req.body?.recaptcha_token, req.ip))) {
      return badRequest(req, res, RECAPTCHA_MESSAGE);
    }

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

    // CV is attached when the file is on this server's disk.
    const resumePath = path.join(process.cwd(), resume);
    notifyForm({
      form: "Job Application",
      summary: `${body.name}${body.applying_for ? ` – ${body.applying_for}` : ""}`,
      replyTo: body.email,
      rows: [
        ["Applying for", body.applying_for],
        ["Name", body.name],
        ["Email", body.email],
        ["Phone", body.phone],
        ["Experience", body.experience],
        ["Current location", body.current_location],
        ["LinkedIn", body.linkedin],
        ["Message", body.message],
        ["CV", `https://api.natrajfurniture.com/${String(resume).replace(/^\/+/, "")}`],
      ],
      attachments: fs.existsSync(resumePath)
        ? [{ filename: path.basename(resume).replace(/^\d+_/, ""), path: resumePath }]
        : undefined,
      ack: {
        message: `Hi ${body.name}, thank you for applying${body.applying_for ? ` for ${body.applying_for}` : ""}. Our team will review your CV and contact you if your profile matches.`,
      },
    });

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
