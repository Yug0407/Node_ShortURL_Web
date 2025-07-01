const mongoose = require("mongoose");

async function connectToMongoDB (url) {
    return mongoose.connect(url)
    .then(()=> console.log("Mongo Connected...!!"))
    .catch((err) => console.log("Error in connection of Mongo :-> ",err));
}

module.exports = {
    connectToMongoDB,
}