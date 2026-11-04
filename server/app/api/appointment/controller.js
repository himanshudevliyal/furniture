"use strict";
import table from "../../db/models.js";
import { StatusCodes } from "http-status-codes";
import {
  appointmentSchema,
  appointmentSlotBlockSchema,
  appointmentStatusSchema,
} from "../../validation-schema/appointment-schema.js";
import {
  SLOT_TIMES,
  addDays,
  buildAvailability,
  isValidDate,
  isValidSlotTime,
  lastBookableDate,
  nowInIndia,
  timeLabel,
} from "../../helpers/appointment-slots.js";
import { longDate, notifyForm } from "../../services/form-mail.js";

const MAX_RANGE_DAYS = 62;

const SLOT_MESSAGES = {
  booked: "Sorry, this time slot has just been booked. Please choose another time.",
  blocked: "This time slot is not available. Please choose another time.",
  past: "This time slot has already passed. Please choose another time.",
  closed: "We are closed on the selected day. Please choose another date.",
};

const isUniqueError = (error) => error?.name === "SequelizeUniqueConstraintError";

// Slot grid for [from, to]; defaults to today .. last bookable date.
const availability = async (query, withDetails) => {
  const { today } = nowInIndia();
  const from = isValidDate(query.from) ? query.from : today;
  let to = isValidDate(query.to) ? query.to : lastBookableDate();
  if (to < from) to = from;
  if (to > addDays(from, MAX_RANGE_DAYS)) to = addDays(from, MAX_RANGE_DAYS);

  const [blocks, bookings] = await Promise.all([
    table.AppointmentSlotBlockModel.getInRange(from, to),
    table.AppointmentModel.getBookingsInRange(from, to),
  ]);

  return {
    from,
    to,
    today,
    last_bookable_date: lastBookableDate(),
    slot_times: SLOT_TIMES.map((time) => ({ time, label: timeLabel(time) })),
    days: buildAvailability({ from, to, blocks, bookings, withDetails }),
  };
};

// Status of one slot right now ("available", "booked", ...).
const slotStatus = async (date, time) => {
  if (!isValidDate(date) || !isValidSlotTime(time)) return "invalid";
  const { days } = await availability({ from: date, to: date }, false);
  return days[0]?.slots.find((s) => s.time === time)?.status || "invalid";
};

// ---------------------------------------------------------------------------
// Public
// ---------------------------------------------------------------------------

const create = async (req, res) => {
  try {
    const body = appointmentSchema.parse(req.body);

    const status = await slotStatus(body.booking_date, body.booking_time);
    if (status === "invalid") {
      return res
        .code(StatusCodes.BAD_REQUEST)
        .send({ status: false, message: "Please choose a valid date and time." });
    }
    if (status !== "available") {
      return res
        .code(StatusCodes.CONFLICT)
        .send({ status: false, message: SLOT_MESSAGES[status] || SLOT_MESSAGES.blocked });
    }

    let record;
    try {
      record = await table.AppointmentModel.create(body);
    } catch (error) {
      // Two people picked the same slot at the same moment.
      if (isUniqueError(error)) {
        return res
          .code(StatusCodes.CONFLICT)
          .send({ status: false, message: SLOT_MESSAGES.booked });
      }
      throw error;
    }

    const when = `${longDate(body.booking_date)}, ${timeLabel(body.booking_time)}`;
    const business = body.for_business === "yes" ? "Yes" : body.for_business === "no" ? "No" : "";
    notifyForm({
      form: "Book Your Slot",
      summary: `${body.name} – ${when}`,
      replyTo: body.email,
      rows: [
        ["Date & time", `${when} (IST)`],
        ["Name", body.name],
        ["Phone", body.phone],
        ["Email", body.email],
        ["Address", body.address],
        ["Special requests", body.message],
        ["Buying for business", business],
        ["Company", body.company],
        ["Units", body.units],
      ],
      ack: {
        message: `Hi ${body.name}, your slot is booked. Our team will call you to confirm your visit.`,
        rows: [["Date & time", `${when} (IST)`]],
      },
    });

    res
      .code(StatusCodes.CREATED)
      .send({ status: true, message: "Appointment booked.", data: record });
  } catch (error) {
    throw error;
  }
};

// Which slots can be booked (no customer details).
const slots = async (req, res) => {
  try {
    res.code(StatusCodes.OK).send({ status: true, data: await availability(req.query, false) });
  } catch (error) {
    throw error;
  }
};

// ---------------------------------------------------------------------------
// Admin
// ---------------------------------------------------------------------------

const get = async (req, res) => {
  try {
    res.code(StatusCodes.OK).send({ status: true, data: await table.AppointmentModel.get(req) });
  } catch (error) {
    throw error;
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.AppointmentModel.getById(req.params.id);
    if (!record) {
      return res
        .code(StatusCodes.NOT_FOUND)
        .send({ status: false, message: "Appointment not found!" });
    }
    res.code(StatusCodes.OK).send({ status: true, data: record });
  } catch (error) {
    throw error;
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = appointmentStatusSchema.parse(req.body);
    const record = await table.AppointmentModel.getById(req.params.id);
    if (!record) {
      return res
        .code(StatusCodes.NOT_FOUND)
        .send({ status: false, message: "Appointment not found!" });
    }

    try {
      await table.AppointmentModel.update(req.params.id, { status });
    } catch (error) {
      // Re-opening a cancelled booking whose slot someone else has taken.
      if (isUniqueError(error)) {
        return res.code(StatusCodes.CONFLICT).send({
          status: false,
          message: "This slot has been booked by someone else since this appointment was cancelled.",
        });
      }
      throw error;
    }

    res.code(StatusCodes.OK).send({ status: true, message: "Status updated." });
  } catch (error) {
    throw error;
  }
};

const deleteById = async (req, res) => {
  try {
    const record = await table.AppointmentModel.getById(req.params.id);
    if (!record) {
      return res
        .code(StatusCodes.NOT_FOUND)
        .send({ status: false, message: "Appointment not found!" });
    }
    await table.AppointmentModel.deleteById(req.params.id);
    res.code(StatusCodes.OK).send({ status: true, message: "Appointment deleted." });
  } catch (error) {
    throw error;
  }
};

// Slot grid with who booked each slot and which days/slots are off.
const manageSlots = async (req, res) => {
  try {
    res.code(StatusCodes.OK).send({ status: true, data: await availability(req.query, true) });
  } catch (error) {
    throw error;
  }
};

// Switch a whole day (time empty) or one slot off.
const createSlotBlock = async (req, res) => {
  try {
    const body = appointmentSlotBlockSchema.parse(req.body);
    const time = body.time || null;

    if (!isValidDate(body.date) || (time && !isValidSlotTime(time))) {
      return res
        .code(StatusCodes.BAD_REQUEST)
        .send({ status: false, message: "Invalid date or time." });
    }
    if (await table.AppointmentSlotBlockModel.findOne(body.date, time)) {
      return res.code(StatusCodes.CONFLICT).send({
        status: false,
        message: time ? "This slot is already disabled." : "This day is already disabled.",
      });
    }

    const record = await table.AppointmentSlotBlockModel.create({ ...body, time });
    res.code(StatusCodes.CREATED).send({
      status: true,
      message: time ? "Slot disabled." : "Day disabled.",
      data: record,
    });
  } catch (error) {
    throw error;
  }
};

// Switch a day or slot back on.
const deleteSlotBlock = async (req, res) => {
  try {
    const record = await table.AppointmentSlotBlockModel.getById(req.params.id);
    if (!record) {
      return res.code(StatusCodes.NOT_FOUND).send({ status: false, message: "Not found!" });
    }
    await table.AppointmentSlotBlockModel.deleteById(req.params.id);
    res.code(StatusCodes.OK).send({
      status: true,
      message: record.time ? "Slot enabled." : "Day enabled.",
    });
  } catch (error) {
    throw error;
  }
};

export default {
  create: create,
  slots: slots,
  get: get,
  getById: getById,
  updateStatus: updateStatus,
  deleteById: deleteById,
  manageSlots: manageSlots,
  createSlotBlock: createSlotBlock,
  deleteSlotBlock: deleteSlotBlock,
};
