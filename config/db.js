import mongoose from "mongoose";

const dbConnect = process.env.MONGO_URL

export const dbConnection = () => {
    mongoose.connect(dbConnect).then(() => {
        console.log("Database is connected!")
    })
}