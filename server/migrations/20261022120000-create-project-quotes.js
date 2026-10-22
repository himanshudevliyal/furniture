"use strict";

import { DataTypes } from "sequelize";
import constants from "../app/lib/constants/index.js";

export async function up({ context: queryInterface }) {
  await queryInterface.sequelize.transaction(async (t) => {
    await queryInterface.createTable(
      constants.models.PROJECT_QUOTE_TABLE,
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: true },
        company: { type: DataTypes.STRING, allowNull: false },
        message: { type: DataTypes.TEXT, allowNull: true },
        // Category the visitor was looking at (hero slide) when asking for a quote.
        category: { type: DataTypes.STRING, allowNull: true },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "pending",
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      { transaction: t },
    );

    await queryInterface.addIndex(
      constants.models.PROJECT_QUOTE_TABLE,
      ["email"],
      { transaction: t },
    );
    await queryInterface.addIndex(
      constants.models.PROJECT_QUOTE_TABLE,
      ["status"],
      { transaction: t },
    );
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable(constants.models.PROJECT_QUOTE_TABLE);
}
