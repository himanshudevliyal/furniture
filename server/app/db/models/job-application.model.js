"use strict";
import constants from "../../lib/constants/index.js";
import { DataTypes, QueryTypes } from "sequelize";

let JobApplicationModel = null;

const init = async (sequelize) => {
  JobApplicationModel = sequelize.define(
    constants.models.JOB_APPLICATION_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      // Null for a general application (no specific opening).
      job_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: constants.models.JOB_TABLE,
          key: "id",
        },
        onDelete: "SET NULL",
      },
      // Snapshot of the job title, so it survives the job being deleted.
      applying_for: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false },
      experience: { type: DataTypes.STRING, allowNull: true },
      current_location: { type: DataTypes.STRING, allowNull: true },
      linkedin: { type: DataTypes.STRING, allowNull: true },
      message: { type: DataTypes.TEXT, allowNull: true },
      resume: { type: DataTypes.STRING, allowNull: false },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "new", // new | shortlisted | rejected | hired
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        { fields: ["job_id"] },
        { fields: ["status"] },
        { fields: ["email"] },
      ],
    },
  );

  return JobApplicationModel;
};

const create = async (req) => {
  const data = await JobApplicationModel.create({
    job_id: req.body.job_id || null,
    applying_for: req.body.applying_for,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    experience: req.body.experience || null,
    current_location: req.body.current_location || null,
    linkedin: req.body.linkedin || null,
    message: req.body.message || null,
    resume: req.body.resume,
  });

  return data.dataValues;
};

const get = async (req) => {
  const whereConditions = [];
  const queryParams = {};

  const search = req.query.search || req.query.q;
  if (search) {
    whereConditions.push(`
      (
        ja.name ILIKE :search
        OR ja.email ILIKE :search
        OR ja.phone ILIKE :search
        OR ja.applying_for ILIKE :search
      )
    `);
    queryParams.search = `%${search}%`;
  }

  if (req.query.status) {
    whereConditions.push(`ja.status = :status`);
    queryParams.status = req.query.status;
  }

  if (req.query.job_id) {
    whereConditions.push(`ja.job_id = :job_id`);
    queryParams.job_id = req.query.job_id;
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const whereClause = whereConditions.length
    ? `WHERE ${whereConditions.join(" AND ")}`
    : "";

  const query = `
    SELECT ja.*
    FROM ${constants.models.JOB_APPLICATION_TABLE} ja
    ${whereClause}
    ORDER BY ja.created_at DESC
    LIMIT :limit OFFSET :offset
  `;

  const countQuery = `
    SELECT COUNT(ja.id)::integer AS total
    FROM ${constants.models.JOB_APPLICATION_TABLE} ja
    ${whereClause}
  `;

  const applications = await JobApplicationModel.sequelize.query(query, {
    replacements: { ...queryParams, limit, offset },
    type: QueryTypes.SELECT,
    raw: true,
  });

  const count = await JobApplicationModel.sequelize.query(countQuery, {
    replacements: queryParams,
    type: QueryTypes.SELECT,
    plain: true,
  });

  return { job_applications: applications, total: count?.total || 0, page, limit };
};

const getById = async (req, id) => {
  return await JobApplicationModel.findOne({
    where: { id: req?.params?.id || id },
    raw: true,
  });
};

const updateStatus = async (req, id) => {
  return await JobApplicationModel.update(
    { status: req.body.status },
    { where: { id: req?.params?.id || id } },
  );
};

const deleteById = async (req, id) => {
  return await JobApplicationModel.destroy({
    where: { id: req?.params?.id || id },
  });
};

export default {
  init: init,
  create: create,
  get: get,
  getById: getById,
  updateStatus: updateStatus,
  deleteById: deleteById,
};
