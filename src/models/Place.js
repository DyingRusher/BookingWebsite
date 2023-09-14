const mon = require('mongoose')

const PlaceSchema = mon.Schema({
    owner:{type:mon.Schema.Types.ObjectId,ref:'User'}, // id of user
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

const PlaceModel = mon.model('Place',PlaceSchema)
module.exports = PlaceModel