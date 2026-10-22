"use strict";

import { DataTypes } from "sequelize";
import constants from "../app/lib/constants/index.js";

const timestamps = {
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
};

export async function up({ context: queryInterface }) {
  await queryInterface.sequelize.transaction(async (t) => {
    await queryInterface.createTable(
      constants.models.JOB_TABLE,
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        title: { type: DataTypes.STRING, allowNull: false },
        department: { type: DataTypes.STRING, allowNull: true },
        location: { type: DataTypes.STRING, allowNull: true },
        job_type: { type: DataTypes.STRING, allowNull: true },
        experience: { type: DataTypes.STRING, allowNull: true },
        salary: { type: DataTypes.STRING, allowNull: true },
        openings: { type: DataTypes.INTEGER, allowNull: true },
        description: { type: DataTypes.TEXT, allowNull: true },
        is_active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        ...timestamps,
      },
      { transaction: t },
    );

    await queryInterface.addIndex(constants.models.JOB_TABLE, ["is_active"], {
      transaction: t,
    });

    await queryInterface.createTable(
      constants.models.JOB_APPLICATION_TABLE,
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        job_id: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: constants.models.JOB_TABLE,
            key: "id",
          },
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
        },
        applying_for: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
        experience: { type: DataTypes.STRING, allowNull: true },
        current_location: { type: DataTypes.STRING, allowNull: true },
        linkedin: { type: DataTypes.STRING, allowNull: true },
        message: { type: DataTypes.TEXT, allowNull: true },
        resume: { type: DataTypes.STRING, allowNull: false },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "new",
        },
        ...timestamps,
      },
      { transaction: t },
    );

    for (const field of ["job_id", "status", "email"]) {
      await queryInterface.addIndex(
        constants.models.JOB_APPLICATION_TABLE,
        [field],
        { transaction: t },
      );
    }
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable(constants.models.JOB_APPLICATION_TABLE);
  await queryInterface.dropTable(constants.models.JOB_TABLE);
}
