"use strict";
import constants from "../../lib/constants/index.js";
import { DataTypes, Deferrable, QueryTypes } from "sequelize";
import { toPgArray } from "../../helpers/to-pg-array.js";

let ProductModel = null;

const init = async (sequelize) => {
  ProductModel = sequelize.define(
    constants.models.PRODUCT_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Product exist with this title.",
        },
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      // Single primary image used on product cards/listings. Distinct from
      // hero.images[]/gallery.images[] which are for the detail page.
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      short_description: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: constants.models.CATEGORY_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
        onDelete: "CASCADE",
      },

      sub_category_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: constants.models.SUB_CATEGORY_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
        onDelete: "SET NULL",
      },

      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      sort_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      content: { type: DataTypes.TEXT },

      // ===== Rich content sections (see product-schema.js for shape) =====
      hero: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      overview: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      details: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      materials: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      specifications: {
        type: DataTypes.JSONB,
        defaultValue: [],
      },
      models_3d: {
        type: DataTypes.JSONB,
        defaultValue: [],
      },
      downloads: {
        type: DataTypes.JSONB,
        defaultValue: [],
      },
      gallery: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },

      meta_title: { type: DataTypes.TEXT },
      meta_description: { type: DataTypes.TEXT },
      meta_keywords: { type: DataTypes.TEXT },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        { fields: ["title"] },
        { fields: ["slug"] },
        { fields: ["category_id"] },
      ],
    },
  );

  return ProductModel;
};

const create = async (req, transaction) => {
  const options = {};
  if (transaction) options.transaction = transaction;

  const data = await ProductModel.create(
    {
      slug: req.body.slug,
      title: req.body.title,
      thumbnail: req.body.thumbnail,
      short_description: req.body.short_description,
      content: req.body.content,
      category_id: req.body.category_id,
      sub_category_id: req.body.sub_category_id || null,
      is_active: req.body.is_active,
      sort_order: req.body.sort_order,
      hero: req.body.hero,
      overview: req.body.overview,
      details: req.body.details,
      materials: req.body.materials,
      specifications: req.body.specifications,
      models_3d: req.body.models_3d,
      downloads: req.body.downloads,
      gallery: req.body.gallery,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keywords: req.body.meta_keywords,
    },
    options,
  );

  return data.dataValues;
};

const update = async (req, id, transaction) => {
  const options = {
    where: { id: req?.params?.id || id },
    returning: true,
    raw: true,
  };

  if (transaction) options.transaction = transaction;

  return await ProductModel.update(
    {
      slug: req.body.slug,
      title: req.body.title,
      thumbnail: req.body.thumbnail,
      short_description: req.body.short_description,
      content: req.body.content,
      category_id: req.body.category_id,
      sub_category_id: req.body.sub_category_id || null,
      is_active: req.body.is_active,
      sort_order: req.body.sort_order,
      hero: req.body.hero,
      overview: req.body.overview,
      details: req.body.details,
      materials: req.body.materials,
      specifications: req.body.specifications,
      models_3d: req.body.models_3d,
      downloads: req.body.downloads,
      gallery: req.body.gallery,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keywords: req.body.meta_keywords,
    },
    options,
  );
};

const get = async (req) => {
  const whereConditions = [];
  const queryParams = {};
  const q = req.query.q ? req.query.q : null;
  if (q) {
    whereConditions.push(
      `(prd.title ILIKE :query OR prd.short_description ILIKE :query)`,
    );
    queryParams.query = `%${q}%`;
  }

  const categories = req.query?.category
    ? req.query.category?.split(".")
    : null;

  if (categories && categories?.length) {
    whereConditions.push("prd.category_id = ANY(:categories)");
    queryParams.categories = toPgArray(categories);
  }

  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : null;
  const offset = (page - 1) * limit;

  let whereClause = "";
  if (whereConditions.length) {
    whereClause = `WHERE ${whereConditions.join(" AND ")}`;
  }

  const query = `
  SELECT
      prd.id, prd.slug, prd.title, prd.thumbnail, prd.short_description,
      prd.created_at, prd.category_id, prd.sub_category_id, prd.is_active, prd.sort_order,
      cat.title AS category_title, cat.slug AS category_slug,
      sc.title AS sub_category_title, sc.slug AS sub_category_slug
    FROM ${constants.models.PRODUCT_TABLE} prd
    LEFT JOIN ${constants.models.CATEGORY_TABLE} cat ON cat.id = prd.category_id
    LEFT JOIN ${constants.models.SUB_CATEGORY_TABLE} sc ON sc.id = prd.sub_category_id
    ${whereClause}
    ORDER BY prd.sort_order ASC, prd.created_at DESC
    LIMIT :limit OFFSET :offset
  `;

  const countQuery = `
  SELECT
     COUNT(prd.id) OVER()::integer as total
    FROM ${constants.models.PRODUCT_TABLE} prd
    ${whereClause}
  `;

  const products = await ProductModel.sequelize.query(query, {
    replacements: { ...queryParams, limit, offset },
    type: QueryTypes.SELECT,
    raw: true,
  });

  const count = await ProductModel.sequelize.query(countQuery, {
    replacements: { ...queryParams },
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
  });

  return { products, total: count?.total ?? 0 };
};

const getById = async (req, id) => {
  const query = `
    SELECT
      prd.*,
      cat.title AS category_title,
      cat.slug AS category_slug,
      sc.title AS sub_category_title,
      sc.slug AS sub_category_slug
    FROM ${constants.models.PRODUCT_TABLE} prd
    LEFT JOIN ${constants.models.CATEGORY_TABLE} cat ON cat.id = prd.category_id
    LEFT JOIN ${constants.models.SUB_CATEGORY_TABLE} sc ON sc.id = prd.sub_category_id
    WHERE prd.id = :id;
  `;

  return await ProductModel.sequelize.query(query, {
    replacements: {
      id: req.params?.id || id,
    },
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
  });
};

const getBySlug = async (req, slug) => {
  const query = `
    SELECT
      prd.*,
      cat.title AS category_title,
      cat.slug AS category_slug,
      sc.title AS sub_category_title,
      sc.slug AS sub_category_slug
    FROM ${constants.models.PRODUCT_TABLE} prd
    LEFT JOIN ${constants.models.CATEGORY_TABLE} cat ON cat.id = prd.category_id
    LEFT JOIN ${constants.models.SUB_CATEGORY_TABLE} sc ON sc.id = prd.sub_category_id
    WHERE prd.slug = :slug;
  `;

  return await ProductModel.sequelize.query(query, {
    replacements: {
      slug: req.params?.slug || slug,
    },
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
  });
};

const deleteById = async (req, id, transaction) => {
  const options = { where: { id: req.params?.id || id } };
  if (transaction) options.transaction = transaction;

  return await ProductModel.destroy(options);
};

const getProductByCategory = async () => {
  const query = `
    SELECT 
      c.title AS category_name,
      COUNT(p.id)::int AS product_count
    FROM ${constants.models.PRODUCT_TABLE} p
    JOIN ${constants.models.CATEGORY_TABLE} c ON c.id = p.category_id
    GROUP BY c.title
    ORDER BY product_count DESC;
  `;

  return await ProductModel.sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
};

export default {
  init: init,
  create: create,
  update: update,
  getById: getById,
  getBySlug: getBySlug,
  get: get,
  deleteById: deleteById,
  getProductByCategory: getProductByCategory,
};
