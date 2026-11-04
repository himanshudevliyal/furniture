"use strict";
import constants from "../../lib/constants/index.js";
import { DataTypes, QueryTypes } from "sequelize";

// Visit/meeting bookings from the "Book an Appointment" form.
// One active booking per slot; cancelled bookings free the slot again.
let AppointmentModel = null;

export const APPOINTMENT_STATUSES = ["pending", "confirmed", "completed", "cancelled"];

const init = async (sequelize) => {
  AppointmentModel = sequelize.define(
    constants.models.APPOINTMENT_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: true },
      company: { type: DataTypes.STRING, allowNull: true },
      message: { type: DataTypes.TEXT, allowNull: true }, // special requests
      address: { type: DataTypes.STRING, allowNull: true },
      for_business: { type: DataTypes.STRING, allowNull: true }, // "yes" | "no"
      units: { type: DataTypes.STRING, allowNull: true }, // e.g. "11-50"
      // India time, "YYYY-MM-DD" and "HH:MM"
      booking_date: { type: DataTypes.DATEONLY, allowNull: false },
      booking_time: { type: DataTypes.STRING(5), allowNull: false },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [{ fields: ["booking_date"] }, { fields: ["status"] }],
    },
  );

  return AppointmentModel;
};

const SELECT_FIELDS = `a.id, a.name, a.phone, a.email, a.company, a.message,
  a.address, a.for_business, a.units,
  to_char(a.booking_date, 'YYYY-MM-DD') AS booking_date, a.booking_time,
  a.status, a.created_at, a.updated_at`;

const create = async (body, transaction) => {
  const data = await AppointmentModel.create(
    {
      name: body.name,
      phone: body.phone,
      email: body.email || null,
      company: body.company || null,
      message: body.message || null,
      address: body.address || null,
      for_business: body.for_business || null,
      units: body.units || null,
      booking_date: body.booking_date,
      booking_time: body.booking_time,
    },
    { transaction },
  );
  return data.dataValues;
};

const get = async (req) => {
  const where = [];
  const params = {};

  const search = req.query.search || req.query.q;
  if (search) {
    where.push(`(a.name ILIKE :search OR a.email ILIKE :search OR a.phone ILIKE :search OR a.company ILIKE :search)`);
    params.search = `%${search}%`;
  }
  if (req.query.status) {
    where.push(`a.status = :status`);
    params.status = req.query.status;
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const appointments = await AppointmentModel.sequelize.query(
    `SELECT ${SELECT_FIELDS}
     FROM ${constants.models.APPOINTMENT_TABLE} a
     ${whereClause}
     ORDER BY a.booking_date DESC, a.booking_time DESC
     LIMIT :limit OFFSET :offset`,
    { replacements: { ...params, limit, offset }, type: QueryTypes.SELECT },
  );
  const count = await AppointmentModel.sequelize.query(
    `SELECT COUNT(a.id)::integer AS total FROM ${constants.models.APPOINTMENT_TABLE} a ${whereClause}`,
    { replacements: params, type: QueryTypes.SELECT, plain: true },
  );

  return { appointments, total: count?.total || 0, page, limit };
};

const getById = async (id) => {
  const rows = await AppointmentModel.sequelize.query(
    `SELECT ${SELECT_FIELDS} FROM ${constants.models.APPOINTMENT_TABLE} a WHERE a.id = :id`,
    { replacements: { id }, type: QueryTypes.SELECT },
  );
  return rows[0] || null;
};

// Active (not cancelled) bookings between two dates, for the slot grid.
const getBookingsInRange = async (from, to) => {
  return await AppointmentModel.sequelize.query(
    `SELECT id, name, phone, to_char(booking_date, 'YYYY-MM-DD') AS booking_date, booking_time
     FROM ${constants.models.APPOINTMENT_TABLE}
     WHERE booking_date BETWEEN :from AND :to AND status <> 'cancelled'`,
    { replacements: { from, to }, type: QueryTypes.SELECT },
  );
};

const update = async (id, values) => {
  return await AppointmentModel.update(values, { where: { id } });
};

const deleteById = async (id) => {
  return await AppointmentModel.destroy({ where: { id } });
};

export default {
  init: init,
  create: create,
  get: get,
  getById: getById,
  getBookingsInRange: getBookingsInRange,
  update: update,
  deleteById: deleteById,
};
