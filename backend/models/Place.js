const mongoose = require('mongoose')
// import mongoose from 'mongoose'
const PlaceSchema = mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'}, // id of user and poplulate method i think
    title:String,
    address:String,
    images:[String],
    des:String,
    perks:[String],
    extraInfo:String,
    checkIn:Number,
    checkOut:Number,
    maxGuests:Number,
    price:Number
}) 

const PlaceModel = mongoose.model('Place',PlaceSchema)
module.exports = PlaceModel