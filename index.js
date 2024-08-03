import express from "express";
import { dbConnection } from "./config/db.js";
import { userRouter } from "./routes/user_routes.js";
import cors from "cors";
import expressOasGenerator from "@mickeymond/express-oas-generator";
import mongoose from "mongoose";
import { articleRouter } from "./routes/article_routes.js";
import { patientResponseRouter } from "./routes/patient_routes.js";
import { therapistProfileRouter } from "./routes/therapist_routes.js";

// create express app
const app = express();

// use middlewares
app.use(cors())
app.use(express.json());


// use routes
app.use('/api/v1', userRouter);
app.use('/api/v1', articleRouter);
app.use('/api/v1', patientResponseRouter);
app.use('/api/v1', therapistProfileRouter);


// handle responses
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['auth', 'therapistProfile','patientResponse' , 'articles', 'appointment'],
    mongooseModels: mongoose.modelNames(),
});

// handle requests
expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));


// connect to database
dbConnection();

// connect server
const port = 3000
app.listen(port, () => {
    console.log(`App is connected to port ${port}`)
});