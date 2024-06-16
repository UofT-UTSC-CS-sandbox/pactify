// Express server connection initialization

import express from "express";
import db from "./db/connection.js";
import cors from "cors";
import auth from "./auth/authroute.js";
import { userAuth } from "./auth/auth.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser()); // parse cookie to authenticate user

app.use("/api/auth", auth); // assign the "auth" router to any path that begins with /api/auth

// protect /user http path with userAuth function
app.get("/user/*", userAuth, (req, res) => res.send("User Route"));

// start the Express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
