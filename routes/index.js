const express = require("express")
const router = express.Router()
const taskAPi = require('./task.api')
const userApi = require('./user.api')

router.use('/tasks',taskAPi) 
router.use('/user',userApi)

module.exports = router;