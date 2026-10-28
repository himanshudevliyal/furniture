"use strict";
import constants from "../../lib/constants/index.js";
import { DataTypes, QueryTypes } from "sequelize";

let ProjectQuoteModel = null;

const init = async (sequelize) => {
  ProjectQuoteModel = sequelize.define(
    constants.models.PROJECT_QUOTE_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      // Category the visitor was looking at (hero slide) when asking for a quote.
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending", // pending | contacted | closed
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [{ fields: ["email"] }, { fields: ["status"] }],
    },
  );

  return ProjectQuoteModel;
};

const create = async (req) => {
  const data = await ProjectQuoteModel.create({
    name: req.body.name,
    email: req.body.email || null,
    phone: req.body.phone || null,
    company: req.body.company || null,
    message: req.body.message || null,
    category: req.body.category || null,
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
        pq.name ILIKE :search
        OR pq.email ILIKE :search
        OR pq.phone ILIKE :search
        OR pq.company ILIKE :search
        OR pq.category ILIKE :search
      )
    `);
    queryParams.search = `%${search}%`;
  }

  if (req.query.status) {
    whereConditions.push(`pq.status = :status`);
    queryParams.status = req.query.status;
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const whereClause = whereConditions.length
    ? `WHERE ${whereConditions.join(" AND ")}`
    : "";

  const query = `
    SELECT pq.*
    FROM ${constants.models.PROJECT_QUOTE_TABLE} pq
    ${whereClause}
    ORDER BY pq.created_at DESC
    LIMIT :limit OFFSET :offset
  `;

  const countQuery = `
    SELECT COUNT(pq.id)::integer AS total
    FROM ${constants.models.PROJECT_QUOTE_TABLE} pq
    ${whereClause}
  `;

  const quotes = await ProjectQuoteModel.sequelize.query(query, {
    replacements: { ...queryParams, limit, offset },
    type: QueryTypes.SELECT,
    raw: true,
  });

  const count = await ProjectQuoteModel.sequelize.query(countQuery, {
    replacements: queryParams,
    type: QueryTypes.SELECT,
    plain: true,
  });

  return {
    project_quotes: quotes,
    total: count?.total || 0,
    page,
    limit,
  };
};

const getById = async (req, id) => {
  return await ProjectQuoteModel.findOne({
    where: { id: req?.params?.id || id },
    raw: true,
  });
};

// Updates only the editable fields present in req.body.
const EDITABLE_FIELDS = [
  "name",
  "email",
  "phone",
  "company",
  "message",
  "category",
  "status",
];

const update = async (req, id) => {
  const values = Object.fromEntries(
    EDITABLE_FIELDS.filter((key) => req.body[key] !== undefined).map((key) => [
      key,
      // Blank optional fields are stored as NULL, not "".
      req.body[key] === "" ? null : req.body[key],
    ]),
  );

  return await ProjectQuoteModel.update(values, {
    where: { id: req?.params?.id || id },
  });
};

const deleteById = async (req, id) => {
  return await ProjectQuoteModel.destroy({
    where: { id: req?.params?.id || id },
  });
};

export default {
  init: init,
  create: create,
  get: get,
  getById: getById,
  update: update,
  deleteById: deleteById,
};
