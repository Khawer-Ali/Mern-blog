const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://khawer:zE_QDr%402enuDjJC@cluster0.tc5fudf.mongodb.net/test";

const connectToMongo = () => {
   mongoose.connect(mongoURI,() => {
      console.log("Connected to mongo Successfully");
   })
};

module.exports = connectToMongo;