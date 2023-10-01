const mon = require('mongoose')

const bookingSch = new mon.Schema({
    place:{type:mon.Schema.Types.ObjectId,required:true,ref:'Place'}, //for populating place object here
    user:{type:mon.Schema.Types.ObjectId,required:true},
    checkIn:{type:Date,required:true},
    checkOut:{type:Date,required:true},
    fullName:{type:String,required:true},
    phoneNo:{type:String,required:true},
    prize:Number
})

const BookingModel = mon.model('Booking',bookingSch)
module.exports = BookingModel