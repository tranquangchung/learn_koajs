const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useCreateIndex: true

};

mongoose.connect(`mongodb://localhost:27017/polyglot_ninja`, options)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('DB connectected');
});

const kittySchema = new mongoose.Schema({
    name: String
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
    const greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
}

const KittenModel = mongoose.model('Kitten', kittySchema);

kittySchema.plugin(mongoosePaginate);
module.exports =  KittenModel;
