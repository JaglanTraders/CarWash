var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userListSchema = new Schema({
    id : String,
    email: String,
    role: String,
    name: String,
    password: String,
    mobile : String,
    signUpDate : String,
    tncAccepted : Boolean
});

module.exports = mongoose.model('userList', userListSchema, 'userDetails');