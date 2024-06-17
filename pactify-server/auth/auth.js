import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
const JWT_SECRET =
    "934a9c82fb55edf39a8fd98fa2f0686e9ab8819fadc064d31f623fbd26349a26a85af0"; // secret string

const register = async (req, res, next) => {
    const { email, password, firstName, lastName } = req.body;
    if (password.length < 6) {
        return res
            .status(400)
            .json({ message: "Password less than 6 characters." });
    }
    if (await User.exists({ email: email })) {
        return res.status(400).json({ message: "Email already in use!" });
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
                    
                    
                    
                    res.status(201).json({
                        message: "User successfully logged in",
                        user: user._id,
                        token: token
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

// authorize tokens
const userAuth = async (req, res, next) => {
    const token = req.cookies.jwt;
  
    if (!token) {
      return res.status(401).json({ message: "Not authorized, token not available" });
    }
  
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decodedToken.id).select('-password');
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
  
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized", error: error.message });
    }
  };

export { register, login, deleteUser, userAuth };
