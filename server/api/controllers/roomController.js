const RoomModel = require("../models/Room");
const HotelModel = require("../models/Hotel");
const createError = require("../utils/error");

const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new RoomModel(req.body);

  try {
    const savedRoom = await newRoom.save();
    const hotel = await HotelModel.findByIdAndUpdate(hotelId, {
      $push: { rooms: savedRoom._id },
    });
    if (!hotel) return next(createError(404, "Hotel not found"));

    res.status(201).json(savedRoom);
  } catch (err) {
    if (err.name === "CastError") {
      return next(createError(404, "hotel not found"));
    }
    next(err);
  }
};

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await RoomModel.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

const getRoomById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const room = await RoomModel.findById(id);
    if (!room) return next(createError(404, `room not found`))
    res.status(200).json(room);
  } catch (err) {
    if (err.name === "CastError") {
      return next(createError(404, "room not found"));
    }
    next(err);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedRoom = await RoomModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedRoom) return next(createError(404, `no room with id ${id}`));

    res.status(200).json(updatedRoom);
  } catch (err) {
    if (err.name === "CastError") {
      return next(createError(404, "room not found"));
    }
    next(err);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleted = await RoomModel.findByIdAndDelete(id);
    if (!deleted) return next(createError(404, `no room with id ${id}`))

    res.status(200).json({ message: "room successfully deleted" });
  } catch (err) {
    if (err.name === "CastError") {
      return next(createError(404, "room not found"));
    }
    next(err);
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};
