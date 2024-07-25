import express from "express";
import { dbConnection } from "./config/db.js";

// create express app
const app = express();

// use middlewares
app.use(express.json());

// call database
dbConnection ();

// connect server
const port = 3000
app.listen(port, () => {
    console.log(`App is connected to ${port}`)
});