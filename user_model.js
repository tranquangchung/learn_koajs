const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


// mongoose.connect(`mongodb://localhost:27017/polyglot_ninja`, options)

const UserSchemas = new mongoose.Schema({
    email: { type: String, required: true },
    encryptedPassword: { type: String, required: true },
});

const UserModel = mongoose.model('User', UserSchemas);
module.exports =  UserModel;
