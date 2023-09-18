require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')

const cors = require('cors')
const app = express()

app.use(cors())

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/jackpot/", routes)

const PORT = process.env.PORT

app.listen(PORT,()=>console.log(`device change service started at ${PORT}`))