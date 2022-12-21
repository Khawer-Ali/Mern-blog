const mongoose = require('mongoose');
require('dotenv').config()
const mongoURI = process.env.MONGO_URI;

const connectToMongo = () => {
   mongoose.connect(mongoURI,() => {
      console.log("Connected to mongo Successfully");
   })
};

module.exports = connectToMongo;