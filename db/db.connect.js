const mongoose = require('mongoose')
require('dotenv').config()

const mongoURI = process.env.MONGODB

const initializeDatabase = async() => {
await mongoose
.connect(mongoURI)
.then(() => {
    console.log("Connected to database.")
}).catch((error) => console.log("Error to connecting db.",error))

}
module.exports = {initializeDatabase}