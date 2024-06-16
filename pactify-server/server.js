// Express server connection initialization

import express from "express";
import cors from "cors";
import auth from "./auth/authroute.js";
import { userAuth } from "./auth/auth.js";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import contractRouters from './routes/contract.route.js';
import mongoose from 'mongoose';
import axios from 'axios';
import homeRoutes from './routes/homeRoutes.js';
import Contract from "./models/Contract.js";

axios.defaults.withCredentials = true;
dotenv.config();
const PORT = process.env.PORT || 5050;
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // Enable cookies to be sent with requests
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); // parse cookie to authenticate user

app.use("/api/auth", auth); // assign the "auth" router to any path that begins with /api/auth

// protect /user http path with userAuth function
app.get("/user/*", userAuth, (req, res) => res.send("User Route"));


app.use("/api/contracts", contractRouters);
app.use('/', homeRoutes);

// start the Express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
