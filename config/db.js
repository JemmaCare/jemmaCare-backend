import mongoose from "mongoose";


const dbConnect = process.env.MONGO_URL

export const dbConnection = async () => {

    try {
     await mongoose.connect(dbConnect)
     console.log('Database connected successfully')
    } catch (error) {
     console.log(error)
    }
 }