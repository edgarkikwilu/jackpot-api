require("dotenv").config()
const moment = require("moment");
const knex = require("../db/db.js");

const crypto = require('crypto');

exports.jackpot = async(req, res) => {
    const result = await knex("participants").count()
    const inter = result[0]['count(*)']
    const secureRandomIndex = randomBetween(0, inter)

    const winner = await knex("participants").offset(secureRandomIndex).first()
    console.log(winner.phoneNumber)

    res.json({winner})
}

exports.initDraw = async(req,res) => {
  const todayDateStamp = new moment()
  const start = todayDateStamp.startOf('day').toISOString()
  const end = todayDateStamp.endOf('day').toISOString()
  console.log(start)
  console.log(end)
  let draw = await knex('draws')
  .where('created_at', '>=', start)
  .where('created_at', '<=', end)
  .first()

  console.log(draw)

  if(draw == undefined){
    const drawData = {name:"draw"+new Date(),winners:0 }
    draw = await knex("draws").insert(drawData)
    draw = await knex('draws').where('id', draw[0]).first()
  }
  console.log(draw)

  res.json({draw: draw, winners:[]})
}

exports.saveWinner = async(req,res) => {
  console.log(req.body)
  const  {winnerStatus, participantId, drawId} = req.body
  let code = 200
  let message = "Success"

  try {
    await knex("participants").update({status: winnerStatus}).where('id',participantId)
  } catch (error) {
    console.log(error)
    code = 500
    message = "Failed to update winner"
  }

  try {
    await knex("winners").insert({participant_id: participantId,draw_id: drawId})
  } catch (error) {
    console.log(error)
    code = 501
    message = "Failed to map winner"
  }

  res.status(code).send({message: message})
}


function randomBetween(min, max) {
    if (min >= max) {
      throw new Error('Invalid range: min must be less than max');
    }
  
    // Generate a random number between 0 (inclusive) and 1 (exclusive).
    const random = Math.random();
  
    // Scale and shift the random number to your desired range.
    const scaledRandom = random * (max - min) + min;
  
    // Round down to the nearest integer if you want an integer result.
    return Math.floor(scaledRandom);
  }