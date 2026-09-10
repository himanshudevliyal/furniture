"use strict";
import table from "../../db/models.js";
import slugify from "slugify";
import { StatusCodes } from "http-status-codes";
import { cleanupFiles } from "../../helpers/cleanup-files.js";
import { sequelize } from "../../db/postgres.js";
import { getItemsToDelete } from "../../helpers/filter.js";
import { productSchema } from "../../validation-schema/product-schema.js";

// Flattens every file/image path referenced anywhere in a product record
// (hero images, gallery images, material images, 3D model / download files)
// so we can diff old vs new on update and clean up orphaned uploads.
const extractFilePaths = (product = {}) => {
  const paths = [];

  paths.push(...(product.hero?.images || []));
  paths.push(...(product.gallery?.images || []));

  (product.details?.sections || []).forEach((section) => {
    if (section.image) paths.push(section.image);
  });
  if (product.details?.banner?.image) paths.push(product.details.banner.image);

  (product.materials?.sections || []).forEach((section) => {
    (section.items || []).forEach((item) => {
      if (item.image) paths.push(item.image);
    });
  });

  (product.models_3d || []).forEach((entry) => {
    if (entry.file) paths.push(entry.file);
  });

  (product.downloads || []).forEach((entry) => {
    if (entry.file) paths.push(entry.file);
  });

  return paths;
};

const create = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    req.body.slug = slugify(req.body.title, { lower: true });

    const validateData = productSchema.parse(req.body);
    req.body = { ...req.body, ...validateData };

    await table.ProductModel.create(req, transaction);

    await transaction.commit();

    res.code(StatusCodes.CREATED).send({ status: true, message: "Product created." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const updateById = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const product = await table.ProductModel.getById(req);

    if (!product) {
      return res.code(StatusCodes.NOT_FOUND).send({ message: "Not found" });
    }

    // Lightweight partial update - e.g. the Active/Inactive toggle in the
    // products table only sends `{ is_active }`. Skip full-schema
    // validation in that case (it would fail on missing title/category_id
    // and, worse, re-apply the schema's defaults for every other section
    // like hero/overview/materials, wiping existing content). The full
    // edit form always sends the complete payload, so it goes through the
    // normal validated path below.
    const partialUpdateKeys = ["is_active", "sort_order"];
    const isPartialUpdate = Object.keys(req.body).every((key) =>
      partialUpdateKeys.includes(key),
    );

    if (isPartialUpdate) {
      await table.ProductModel.update(req, 0, transaction);
      await transaction.commit();
      return res.send({ status: true, message: "Product updated." });
    }

    req.body.slug = slugify(req.body.title, {
      lower: true,
      strict: true,
    });

    const validateData = productSchema.parse(req.body);
    req.body = { ...req.body, ...validateData };

    const documentsToDelete = getItemsToDelete(
      extractFilePaths(product),
      extractFilePaths(validateData),
    );

    await table.ProductModel.update(req, 0, transaction);

    await cleanupFiles(documentsToDelete);

    await transaction.commit();

    res.send({ status: true, message: "Product updated." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.ProductModel.getById(req, req.params.id);
    if (!record) {
      return res
        .code(StatusCodes.NOT_FOUND)
        .send({ message: "Product not found!" });
    }

    res.code(StatusCodes.OK).send({ status: true, data: record });
  } catch (error) {
    throw error;
  }
};

const getBySlug = async (req, res) => {
  try {
    const record = await table.ProductModel.getBySlug(req);
    if (!record) {
      return res
        .code(StatusCodes.NOT_FOUND)
        .send({ message: "Product not found!" });
    }

    res.code(StatusCodes.OK).send({ status: true, data: record });
  } catch (error) {
    throw error;
  }
};

const get = async (req, res) => {
  try {
    const data = await table.ProductModel.get(req);

    res.code(StatusCodes.OK).send({ status: true, data: data });
  } catch (error) {
    throw error;
  }
};

const deleteById = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const record = await table.ProductModel.getById(req);
    if (!record) {
      return res
        .code(StatusCodes.NOT_FOUND)
        .send({ message: "Product not found!" });
    }

    await table.ProductModel.deleteById(req, 0, transaction);

    const documentsToDelete = extractFilePaths(record);
    await cleanupFiles(documentsToDelete);

    await transaction.commit();
    res.status(StatusCodes.OK).send(record);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export default {
  create: create,
  updateById: updateById,
  getById: getById,
  get: get,
  deleteById: deleteById,
  getBySlug: getBySlug,
};
