const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = "mongodb://localhost:27017/polyglot_ninja";


module.exports = function (app) {
    MongoClient.connect(MONGO_URL)
        .then((connection) => {
            app.people = connection.collection("people");
            console.log("Database connection established")
        })
        .catch((err) => console.error(err))

};

// module.exports = function (app) {
//     MongoClient.connect(MONGO_URL, (err, client) => {
//         // Client returned
//         app.people = client.db('polyglot_ninja');
//         console.log("Database connection established")
//     });
// }