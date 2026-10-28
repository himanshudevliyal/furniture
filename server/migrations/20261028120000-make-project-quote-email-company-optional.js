"use strict";

import { DataTypes } from "sequelize";
import constants from "../app/lib/constants/index.js";

// Quote form: only name and phone are required now, so email and company
// can be empty.
export async function up({ context: queryInterface }) {
  await queryInterface.sequelize.transaction(async (t) => {
    for (const column of ["email", "company"]) {
      await queryInterface.changeColumn(
        constants.models.PROJECT_QUOTE_TABLE,
        column,
        { type: DataTypes.STRING, allowNull: true },
        { transaction: t },
      );
    }
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.sequelize.transaction(async (t) => {
    const table = constants.models.PROJECT_QUOTE_TABLE;
    // Fill blanks first so NOT NULL can be restored.
    await queryInterface.sequelize.query(
      `UPDATE ${table} SET email = '' WHERE email IS NULL`,
      { transaction: t },
    );
    await queryInterface.sequelize.query(
      `UPDATE ${table} SET company = '' WHERE company IS NULL`,
      { transaction: t },
    );
    for (const column of ["email", "company"]) {
      await queryInterface.changeColumn(
        table,
        column,
        { type: DataTypes.STRING, allowNull: false },
        { transaction: t },
      );
    }
  });
}
