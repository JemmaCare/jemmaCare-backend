import express from "express";
import { dbConnection } from "./config/db.js";
import { userRouter } from "./routes/user_routes.js";

// create express app
const app = express();

// use middlewares
app.use(express.json());


app.use(userRouter);

// call database
dbConnection ();

// connect server
const port = 3000
app.listen(port, () => {
    console.log(`App is connected to ${port}`)
});