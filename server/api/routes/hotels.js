const express = require('express')
const HotelModel = require('../models/Hotel')

const router = express.Router()

//get all hotels
router.get('/', async (req, res) => {
    try {
        const hotels = await HotelModel.find()
        res.status(200).json(hotels)
    } catch (err) {
        res.status(500).json(err)
    }
})

//get single hotel
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const hotel = await HotelModel.findById(id)
        res.status(200).json(hotel)
    } catch (err) {
        res.status(500).json(err)
    }
})

//create new hotel
router.post('/', async (req, res) => {
    const newHotel = new HotelModel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        res.status(500).json(error)
    }
})

//update hotel
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updatedHotel = await HotelModel.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json(updatedHotel)
    } catch (err) {
        res.status(500).json(err)
    }
})

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