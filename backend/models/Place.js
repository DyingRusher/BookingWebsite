// const mon = require('mongoose')
import mongoose, { mongo } from 'mongoose'
const PlaceSchema = mongoose.Schema({
    owner:{type:mon.Schema.Types.ObjectId,ref:'User'}, // id of user and poplulate method i think
    title:String,
    address:String,
    images:[String],
    des:String,
    perks:[String],
    extraInfo:String,
    checkIn:Number,
    checkOut:Number,
    maxGuest:Number
}) 

const PlaceModel = mongoose.model('Place',PlaceSchema)
module.exports = PlaceModel