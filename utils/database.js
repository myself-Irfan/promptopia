// connect to db

import mongoose from "mongoose";
let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected...');
        return; 
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            // useNewUrlParser: true, //deprecated
            // useUnifiedTopology: true //deprecated
        })
        isConnected = true;
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error);
    }
}