const express = require("express")
const router = express.Router()
const taskAPi = require('./task.api')

router.use('/tasks',taskAPi) 

module.exports = router;