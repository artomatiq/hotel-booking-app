const HotelModel = require('../models/Hotel')

const createHotel = async (req, res, next) => {
    const newHotel = new HotelModel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        next(err)
    }
} 

const getAllHotels = async (req, res, next) => {
    try {
        const hotels = await HotelModel.find()
        res.status(200).json(hotels)
    } catch (err) {
        next(err)
    }
}

const getHotelById = async (req, res, next) => {
    try {
        const id = req.params.id
        const hotel = await HotelModel.findById(id)
        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    }
}

const updateHotel = async (req, res, next) => {
    try {
        const id = req.params.id
        const updatedHotel = await HotelModel.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json(updatedHotel)
    } catch (err) {
        next(err)
    }
}

const deleteHotel = async (req, res, next) => {
    try {
        const id = req.params.id
        await HotelModel.findByIdAndDelete(id)
        res.status(200).json({message: 'hotel successfully deleted'})
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createHotel,
    getAllHotels,
    getHotelById,
    updateHotel,
    deleteHotel
}