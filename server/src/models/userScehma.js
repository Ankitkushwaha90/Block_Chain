const mongoose = require('mongoose')

const userSchema = mongoose.model('Users', {
    username: String,
    email: String,
    password: String,
    organisation: String,
    role: String  
  
}) 

module.exports = userSchema