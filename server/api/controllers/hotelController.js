const HotelModel = require("../models/Hotel");
const createError = require("../utils/error");

const createHotel = async (req, res, next) => {
  const newHotel = new HotelModel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await HotelModel.find();
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

const getHotelById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const hotel = await HotelModel.findById(id);
    if (!hotel) return next(createError(404, "hotel not found"));

    res.status(200).json(hotel);
  } catch (err) {
    if (err.name === "CastError") {
      return next(createError(404, "hotel not found"));
    }
    next(err);
  }
};

const updateHotel = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedHotel = await HotelModel.findByIdAndUpdate(id, req.body, {new: true,});
    if (!updatedHotel) return next(createError(404, "hotel not found"));

    res.status(200).json(updatedHotel);
  } catch (err) {
    if (err.name === "CastError") {
      return next(createError(404, "hotel not found"));
    }
    next(err);
  }
};

const deleteHotel = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleted = await HotelModel.findByIdAndDelete(id);
    if (!deleted) return next(createError(404, "hotel not found"));
    
    res.status(200).json({ message: "hotel successfully deleted" });
  } catch (err) {
    if (err.name === "CastError") {
      return next(createError(404, "hotel not found"));
    }
    next(err);
  }
};

module.exports = {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
};
