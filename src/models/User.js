const mon = require('mongoose')

const UserSchema = mon.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String
})

const UserModel = mon.model('User',UserSchema);

module.exports = UserModel