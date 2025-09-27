const express = require('express')
const HotelModel = require('../models/Hotel')
const hotelController = require('../controllers/hotelController')


const {createHotel, getAllHotels, getHotelById, updateHotel} = hotelController

const router = express.Router()

//get all hotels
router.get('/', getAllHotels)

//get single hotel
router.get('/:id', getHotelById)

//create new hotel
router.post('/', createHotel)

//update hotel
router.put('/:id', updateHotel)

//delete hotel
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        await HotelModel.findByIdAndDelete(id)
        res.status(200).json({message: 'hotel successfully deleted'})
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router