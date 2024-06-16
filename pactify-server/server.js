// Express server connection initialization

import express from "express";
import db from "./db/connection.js";
import cors from "cors";
import auth from "./auth/authroute.js";
import { userAuth } from "./auth/auth.js";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser()); // parse cookie to authenticate user
app.use(morgan('combined')); // logging HTTP requests

app.use("/api/auth", auth); // assign the "auth" router to any path that begins with /api/auth

// protect /user http path with userAuth function
app.get("/user", userAuth, (req, res) => res.send("User Route"));

// Login route 
// app.post("/api/auth/login", (req, res) => {
//     const { username, password } = req.body;
//     const token = userAuth(username, password);
//     if (token) {
//         res.cookie('auth_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
//         res.status(200).send("Login successful");
//     } else {
//         res.status(401).send("Invalid credentials");
//     }
// });

// // Logout route example
// app.post("/api/auth/logout", (req, res) => {
//     res.clearCookie('auth_token');
//     res.status(200).send("Logout successful");
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke lmao!');
// });

// // Establishing database connection and starting the server
// db.connect((err) => {
//     if (err) {
//         console.error('Failed to connect to the database:', err);
//         process.exit(1);
//     } else {
//         console.log('Connected to the database');
//         const server = app.listen(PORT, () => {
//             console.log(`Server listening on port ${PORT}`);
//         });

//         // close the server if there's an unexpected error
//         process.on("unhandledRejection", (err) => {
//             console.log(`An error occurred: ${err.message}`);
//             server.close(() => process.exit(1));
//         });
//     }
// });
// start the Express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});