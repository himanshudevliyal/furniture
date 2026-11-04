"use strict";

import { DataTypes } from "sequelize";
import constants from "../app/lib/constants/index.js";

// Contact Us form: only the mobile number is required now.
const COLUMNS = {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  subject: DataTypes.STRING,
  message: DataTypes.TEXT,
  reason: DataTypes.STRING,
};

export async function up({ context: queryInterface }) {
  await queryInterface.sequelize.transaction(async (t) => {
    for (const [column, type] of Object.entries(COLUMNS)) {
      await queryInterface.changeColumn(
        constants.models.QUERY_TABLE,
        column,
        { type, allowNull: true },
        { transaction: t },
      );
    }
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.sequelize.transaction(async (t) => {
    const table = constants.models.QUERY_TABLE;
    for (const [column, type] of Object.entries(COLUMNS)) {
      // Fill blanks first so NOT NULL can be restored.
      await queryInterface.sequelize.query(
        `UPDATE ${table} SET ${column} = '' WHERE ${column} IS NULL`,
        { transaction: t },
      );
      await queryInterface.changeColumn(table, column, { type, allowNull: false }, { transaction: t });
    }
  });
}
