"use strict";

import { DataTypes } from "sequelize";
import constants from "../app/lib/constants/index.js";

// "Book an Appointment": bookings (one active booking per slot) and the
// days/slots the owner switches off.
const SLOT_INDEX = "appointments_active_slot_unique";

const timestamps = {
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
};

export async function up({ context: queryInterface }) {
  await queryInterface.sequelize.transaction(async (t) => {
    const appointments = constants.models.APPOINTMENT_TABLE;

    await queryInterface.createTable(
      appointments,
      {
        id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
        name: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: true },
        company: { type: DataTypes.STRING, allowNull: true },
        message: { type: DataTypes.TEXT, allowNull: true },
        booking_date: { type: DataTypes.DATEONLY, allowNull: false },
        booking_time: { type: DataTypes.STRING(5), allowNull: false },
        // pending | confirmed | completed | cancelled
        status: { type: DataTypes.STRING, allowNull: false, defaultValue: "pending" },
        ...timestamps,
      },
      { transaction: t },
    );
    await queryInterface.addIndex(appointments, ["booking_date"], { transaction: t });
    await queryInterface.addIndex(appointments, ["status"], { transaction: t });
    // A cancelled booking frees its slot, so only active ones must be unique.
    await queryInterface.addIndex(appointments, ["booking_date", "booking_time"], {
      name: SLOT_INDEX,
      unique: true,
      where: { status: { [queryInterface.sequelize.Sequelize.Op.ne]: "cancelled" } },
      transaction: t,
    });

    await queryInterface.createTable(
      constants.models.APPOINTMENT_SLOT_BLOCK_TABLE,
      {
        id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
        date: { type: DataTypes.DATEONLY, allowNull: false },
        // NULL = the whole day is off
        time: { type: DataTypes.STRING(5), allowNull: true },
        reason: { type: DataTypes.STRING, allowNull: true },
        ...timestamps,
      },
      { transaction: t },
    );
    await queryInterface.addIndex(constants.models.APPOINTMENT_SLOT_BLOCK_TABLE, ["date"], {
      transaction: t,
    });
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.sequelize.transaction(async (t) => {
    await queryInterface.dropTable(constants.models.APPOINTMENT_SLOT_BLOCK_TABLE, { transaction: t });
    await queryInterface.dropTable(constants.models.APPOINTMENT_TABLE, { transaction: t });
  });
}
