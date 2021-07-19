const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: { type: String, default: ''},
    email: { type: String, default: ''},
    city: { type: String, default: ''},
    created_date: { type: Date, default: Date.now()}
})

const User = mongoose.model('User', UserSchema);

module.exports = User;