const express = require('express')
const router = express.Router()

const jackpotController = require('../controller/jackpot')

router.post('/', jackpotController.jackpot)
router.post('/draw', jackpotController.initDraw)
router.post('/winner', jackpotController.saveWinner)

module.exports = router