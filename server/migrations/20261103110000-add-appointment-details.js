"use strict";

import { DataTypes } from "sequelize";
import constants from "../app/lib/constants/index.js";

// Extra optional details on "Book Your Slot": address, whether it is a
// business purchase, and roughly how many units.
const COLUMNS = ["address", "for_business", "units"];

export async function up({ context: queryInterface }) {
  await queryInterface.sequelize.transaction(async (t) => {
    for (const column of COLUMNS) {
      await queryInterface.addColumn(
        constants.models.APPOINTMENT_TABLE,
        column,
        { type: DataTypes.STRING, allowNull: true },
        { transaction: t },
      );
    }
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.sequelize.transaction(async (t) => {
    for (const column of COLUMNS) {
      await queryInterface.removeColumn(constants.models.APPOINTMENT_TABLE, column, {
        transaction: t,
      });
    }
  });
}
