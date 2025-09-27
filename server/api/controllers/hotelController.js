const HotelModel = require('../models/Hotel')

const createHotel = async (req, res, next) => {
    const newHotel = new HotelModel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        next(error)
    }
} 

const getAllHotels = async (req, res, next) => {
    try {
        const hotels = await HotelModel.find()
        res.status(200).json(hotels)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    createHotel,
    getAllHotels
}