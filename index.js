import express from "express";
import { dbConnection } from "./config/db.js";
import { userRouter } from "./routes/user_routes.js";
import errorHandler from "errorhandler";
import cors from "cors";
import expressOasGenerator from "@mickeymond/express-oas-generator";
import mongoose from "mongoose";
import { articleRouter } from "./routes/article_routes.js";
import { patientResponseRouter } from "./routes/patient_routes.js";
import { therapistProfileRouter } from "./routes/therapist_routes.js";
import { adminRouter } from "./routes/admin_routes.js";



// create express app
const app = express();

// use middlewares
app.use(cors())
app.use(express.json());
app.use (errorHandler({log: false}));

// Custom middleware to format errors as JSON
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
});


// use routes
app.use('/api/v1', userRouter);
app.use('/api/v1', articleRouter);
app.use('/api/v1', patientResponseRouter);
app.use('/api/v1', therapistProfileRouter);
app.use('/api/v1', adminRouter);


// handle responses
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['auth', 'therapistProfile','patientResponse' , 'articles', 'appointment', 'admin'],
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