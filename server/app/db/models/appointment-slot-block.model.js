"use strict";
import constants from "../../lib/constants/index.js";
import { DataTypes, QueryTypes } from "sequelize";

// Days or single time slots the owner has switched off for appointment bookings.
// time = null means the whole day is off.
let AppointmentSlotBlockModel = null;

const init = async (sequelize) => {
  AppointmentSlotBlockModel = sequelize.define(
    constants.models.APPOINTMENT_SLOT_BLOCK_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [{ fields: ["date"] }],
    },
  );

  return AppointmentSlotBlockModel;
};

// Blocks between two dates (inclusive), dates as "YYYY-MM-DD" strings.
const getInRange = async (from, to) => {
  return await AppointmentSlotBlockModel.sequelize.query(
    `SELECT id, to_char(date, 'YYYY-MM-DD') AS date, time, reason
     FROM ${constants.models.APPOINTMENT_SLOT_BLOCK_TABLE}
     WHERE date BETWEEN :from AND :to
     ORDER BY date, time NULLS FIRST`,
    { replacements: { from, to }, type: QueryTypes.SELECT },
  );
};

const findOne = async (date, time) => {
  return await AppointmentSlotBlockModel.findOne({
    where: { date, time: time ?? null },
    raw: true,
  });
};

const create = async ({ date, time, reason }) => {
  const data = await AppointmentSlotBlockModel.create({
    date,
    time: time ?? null,
    reason: reason || null,
  });
  return data.dataValues;
};

const getById = async (id) => {
  return await AppointmentSlotBlockModel.findOne({ where: { id }, raw: true });
};

const deleteById = async (id) => {
  return await AppointmentSlotBlockModel.destroy({ where: { id } });
};

export default {
  init: init,
  getInRange: getInRange,
  findOne: findOne,
  create: create,
  getById: getById,
  deleteById: deleteById,
};
