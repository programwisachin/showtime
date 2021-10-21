const express = require('express')
const app = express()
const connectToMongo = require('./db')
const port = 5000

connectToMongo()  //Connecting to the database 

app.use(express.json())
app.use('/auth',require('./routes/auth'))  //Handling routes/paths

app.listen(port,()=>{
    console.log(`App running on localhost:${port}`)
})