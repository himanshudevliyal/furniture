"use strict";
import constants from "../../lib/constants/index.js";
import sequelizeFwk, { QueryTypes } from "sequelize";
const { DataTypes } = sequelizeFwk;

let UserQueryModel = null;

const init = async (sequelize) => {
  UserQueryModel = sequelize.define(
    constants.models.QUERY_TABLE,
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // address: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  return UserQueryModel;
};

const create = async (req) => {
  return await UserQueryModel.create({
    name: req.body.name,
    email: req.body.email,
    // address: req.body.address,
    phone: req.body.phone,
    subject: req.body.subject,
    message: req.body.message,
  });
};

const get = async (req) => {
  const whereConditions = [];
  const queryParams = {};

  // -----------------------------
  // SEARCH
  // -----------------------------

  const search = req.query.search || req.query.q;

  if (search) {
    whereConditions.push(`
      (
        uq.name ILIKE :search
        OR uq.email ILIKE :search
        OR uq.phone ILIKE :search
        OR uq.subject ILIKE :search
        OR uq.message ILIKE :search
      )
    `);

    queryParams.search = `%${search}%`;
  }

  // -----------------------------
  // SORTING
  // -----------------------------

  const sortField = req.query.order_by || "created_at";

  const sortDirection =
    req.query.order_direction?.toUpperCase() === "ASC" ? "ASC" : "DESC";

  const allowedSortFields = {
    created_at: "uq.created_at",
    name: "uq.name",
    email: "uq.email",
    subject: "uq.subject",
  };

  const orderByClause = allowedSortFields[sortField]
    ? `${allowedSortFields[sortField]} ${sortDirection}`
    : "uq.created_at DESC";

  // -----------------------------
  // PAGINATION
  // -----------------------------

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  // -----------------------------
  // WHERE CLAUSE
  // -----------------------------

  const whereClause =
    whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";

  // -----------------------------
  // MAIN QUERY
  // -----------------------------

  const query = `
    SELECT
      uq.id,
      uq.name,
      uq.email,
      uq.phone,
      uq.subject,
      uq.message,
      uq.created_at,
      uq.updated_at
    FROM ${constants.models.QUERY_TABLE} uq
    ${whereClause}
    ORDER BY ${orderByClause}
    LIMIT :limit OFFSET :offset
  `;

  // -----------------------------
  // COUNT QUERY
  // -----------------------------

  const countQuery = `
    SELECT COUNT(uq.id)::integer AS total
    FROM ${constants.models.QUERY_TABLE} uq
    ${whereClause}
  `;

  // -----------------------------
  // EXECUTION
  // -----------------------------

  const queries = await UserQueryModel.sequelize.query(query, {
    replacements: {
      ...queryParams,
      limit,
      offset,
    },
    type: QueryTypes.SELECT,
    raw: true,
  });

  const count = await UserQueryModel.sequelize.query(countQuery, {
    replacements: queryParams,
    type: QueryTypes.SELECT,
    plain: true,
  });

  return {
    queries,
    total: count?.total || 0,
    page,
    limit,
  };
};

const getById = async (req, id) => {
  return await UserQueryModel.findOne({
    where: {
      id: req.params.id || id,
    },
  });
};

const deleteById = async (req, id) => {
  return await UserQueryModel.destroy({
    where: { id: req.params.id || id },
  });
};

export default {
  init: init,
  create: create,
  get: get,
  getById: getById,
  deleteById: deleteById,
};
