import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async() => {

    // Show message when connected
    mongoose.connection.on('connected', ()=> {
        console.log("Mongo DB connected");
    })

    // Connect using MongoDB URI from .env
    await mongoose.connect(`${process.env.MONGODB_URI}/e_com`)
}

export default connectDB;