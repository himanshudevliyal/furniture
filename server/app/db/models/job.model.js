"use strict";
import constants from "../../lib/constants/index.js";
import { DataTypes, QueryTypes } from "sequelize";

let JobModel = null;

const init = async (sequelize) => {
  JobModel = sequelize.define(
    constants.models.JOB_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      department: { type: DataTypes.STRING, allowNull: true },
      location: { type: DataTypes.STRING, allowNull: true },
      // Full-time | Part-time | Contract | Internship
      job_type: { type: DataTypes.STRING, allowNull: true },
      experience: { type: DataTypes.STRING, allowNull: true },
      salary: { type: DataTypes.STRING, allowNull: true },
      openings: { type: DataTypes.INTEGER, allowNull: true },
      // Rich text (HTML) from the dashboard editor.
      description: { type: DataTypes.TEXT, allowNull: true },
      // Inactive jobs are hidden from the website.
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [{ fields: ["is_active"] }],
    },
  );

  return JobModel;
};

const EDITABLE_FIELDS = [
  "title",
  "department",
  "location",
  "job_type",
  "experience",
  "salary",
  "openings",
  "description",
  "is_active",
];

const pickFields = (body) =>
  Object.fromEntries(
    EDITABLE_FIELDS.filter((key) => body[key] !== undefined).map((key) => [
      key,
      body[key],
    ]),
  );

const create = async (req) => {
  const data = await JobModel.create(pickFields(req.body));
  return data.dataValues;
};

const update = async (req, id) => {
  return await JobModel.update(pickFields(req.body), {
    where: { id: req?.params?.id || id },
  });
};

// onlyActive = true for the public website.
const get = async (req, { onlyActive = false } = {}) => {
  const whereConditions = [];
  const queryParams = {};

  if (onlyActive) {
    whereConditions.push(`j.is_active = true`);
  } else if (req.query.status === "active") {
    whereConditions.push(`j.is_active = true`);
  } else if (req.query.status === "inactive") {
    whereConditions.push(`j.is_active = false`);
  }

  const search = req.query.search || req.query.q;
  if (search) {
    whereConditions.push(`
      (
        j.title ILIKE :search
        OR j.department ILIKE :search
        OR j.location ILIKE :search
      )
    `);
    queryParams.search = `%${search}%`;
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || (onlyActive ? 100 : 10);
  const offset = (page - 1) * limit;

  const whereClause = whereConditions.length
    ? `WHERE ${whereConditions.join(" AND ")}`
    : "";

  const query = `
    SELECT j.*,
      (
        SELECT COUNT(ja.id)::integer
        FROM ${constants.models.JOB_APPLICATION_TABLE} ja
        WHERE ja.job_id = j.id
      ) AS applications_count
    FROM ${constants.models.JOB_TABLE} j
    ${whereClause}
    ORDER BY j.created_at DESC
    LIMIT :limit OFFSET :offset
  `;

  const countQuery = `
    SELECT COUNT(j.id)::integer AS total
    FROM ${constants.models.JOB_TABLE} j
    ${whereClause}
  `;

  const jobs = await JobModel.sequelize.query(query, {
    replacements: { ...queryParams, limit, offset },
    type: QueryTypes.SELECT,
    raw: true,
  });

  const count = await JobModel.sequelize.query(countQuery, {
    replacements: queryParams,
    type: QueryTypes.SELECT,
    plain: true,
  });

  return { jobs, total: count?.total || 0, page, limit };
};

const getById = async (req, id) => {
  return await JobModel.findOne({
    where: { id: req?.params?.id || id },
    raw: true,
  });
};

const deleteById = async (req, id) => {
  return await JobModel.destroy({ where: { id: req?.params?.id || id } });
};

export default {
  init: init,
  create: create,
  update: update,
  get: get,
  getById: getById,
  deleteById: deleteById,
};
