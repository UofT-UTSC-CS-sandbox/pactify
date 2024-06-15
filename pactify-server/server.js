// Express server connection initialization

import express from "express";
import db from "./db/connection.js";
import cors from "cors";
import auth from "./auth/authroute.js";
import { userAuth } from "./auth/auth.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser()); // parse cookie to authenticate user
app.use("/api/auth", auth); // assign the "auth" router to any path that begins with /api/auth

// protect /user http path with userAuth function
app.get("/user", userAuth, (req, res) => res.send("User Route"));

// start the Express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// close the server if there's an unexpected error
process.on("unhandledRejection", (err) => {
    console.log(`An error occurred: ${err.message}`);
    server.close(() => process.exit(1));
});
