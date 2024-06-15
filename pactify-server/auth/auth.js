import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET; // secret string

const register = async (req, res, next) => {
    const { email, password, firstName, lastName } = req.body;
    if (password.length < 6) {
        return res
            .status(400)
            .json({ message: "Password less than 6 characters" });
    }
    bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
            email,
            password: hash,
            firstName,
            lastName,
        })
            .then((user) => {
                res.status(200).json({
                    message: "User successfully created",
                    user,
                });
            })
            .catch((error) =>
                res.status(400).json({
                    message: "User not successful created",
                    error: error.message,
                })
            );
    });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    // Check if email and password is provided
    if (!email || !password) {
        return res.status(400).json({
            message: "Email or password not present",
        });
    }
    // Try to find user in database
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({
                message: "Login not successful",
                error: "User not found",
            });
        } else {
            // comparing given password with hashed password
            bcrypt.compare(password, user.password).then((result) => {
                if (result) {
                    const maxAge = 3 * 60 * 60;
                    // generate JSON web token and return as a cookie
                    const token = jwt.sign(
                        { id: user._id, email, role: user.role },
                        JWT_SECRET,
                        {
                            expiresIn: maxAge, // 3hrs in sec
                        }
                    );
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000, // 3hrs in ms
                    });
                    res.status(201).json({
                        message: "User successfully logged in",
                        user: user._id,
                    });
                } else {
                    res.status(400).json({ message: "Login not successful" });
                }
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        });
    }
};

const deleteUser = async (req, res, next) => {
    const { id } = req.body;
    await User.findById(id)
        .then((user) => user.deleteOne())
        .then((user) =>
            res.status(201).json({ message: "User successfully deleted", user })
        )
        .catch((error) =>
            res
                .status(400)
                .json({ message: "An error occurred", error: error.message })
        );
};

const userAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized" });
            } else {
                if (decodedToken.role !== "Basic") {
                    return res.status(401).json({ message: "Not authorized" });
                } else {
                    next();
                }
            }
        });
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" });
    }
};

export { register, login, deleteUser, userAuth };