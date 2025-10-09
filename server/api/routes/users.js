const express = require('express')
const userController = require('../controllers/userController')
const {verifyToken, verifyUser, verifyAdmin} = require('../utils/verifyToken')

const {createUser, getAllUsers, getUserById, updateUser, deleteUser} = userController

const router = express.Router()

//check authentication
router.get('/checkauthentication', verifyToken, (req, res, next) => {
     res.send("Hello, you are logged in!")
})

//check user
router.get('/checkuser/:id', verifyUser, (req, res, next) => {
     res.send("You are authorized as a user!")
})

//check admin
router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
     res.send("You are authorized as an admin!")
})

//get all users
router.get('/', verifyAdmin, getAllUsers)

//get single user
router.get('/:id', getUserById)

//create new user
router.post('/', createUser)

//update user
router.put('/:id', updateUser)

//delete user
router.delete('/:id', deleteUser)

module.exports = router