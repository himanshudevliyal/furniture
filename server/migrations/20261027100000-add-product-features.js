"use strict";

import { DataTypes } from "sequelize";
import constants from "../app/lib/constants/index.js";

// Product page "Features & Options" section:
// { heading, items: [{ title, description, image }] }
export async function up({ context: queryInterface }) {
  await queryInterface.addColumn(constants.models.PRODUCT_TABLE, "features", {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {},
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.removeColumn(constants.models.PRODUCT_TABLE, "features");
}
