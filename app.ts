import * as dotenv from "dotenv";

dotenv.config({path: __dirname + '/.env', debug: true});

import http from "http";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './src/routes/userRoutes';
import houseRoutes from "./src/routes/houseRoutes";

const app = express();
const port = 3000;

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/houses', houseRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI ?? "mongodb://localhost:27017", {}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

module.exports = app;