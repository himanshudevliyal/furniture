"use strict";

import { DataTypes } from "sequelize";
import constants from "../app/lib/constants/index.js";

// Product page FAQ section: [{ question, answer }]
export async function up({ context: queryInterface }) {
  await queryInterface.addColumn(constants.models.PRODUCT_TABLE, "faqs", {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: [],
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.removeColumn(constants.models.PRODUCT_TABLE, "faqs");
}
