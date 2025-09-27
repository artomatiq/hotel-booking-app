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

module.exports = {
    createHotel,

}