const mongoose = require('mongoose')
const mongoUri = "mongodb://localhost:27017/showtime?readPreference=primary&appname=MongoDB%20Compass&ssl=false"  //database address

const connectToMongo = ()=>{
    mongoose.connect(mongoUri,()=>{
        console.log("Connected to MongoDB")
    })
}

module.exports = connectToMongo