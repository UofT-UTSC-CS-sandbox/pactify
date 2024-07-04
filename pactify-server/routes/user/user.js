import User from "../../models/user.js";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
const JWT_SECRET =
    "934a9c82fb55edf39a8fd98fa2f0686e9ab8819fadc064d31f623fbd26349a26a85af0"; // secret string

// middleware function to authorize jwt
const userAuth = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res
            .status(401)
            .json({
                message: "Not authorized, token not available!"
            });
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decodedToken.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ message: "Not authorized", error: error.message });
    }
};

const getUserData = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming the user ID is passed as a route parameter
        const user = await User.findById(userId).select(
            "firstName lastName email password"
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving user data",
            error: error.message,
        });
    }
};

const updateUserName = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming the user ID is available in req.user.id
        const { firstName, lastName } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { firstName, lastName },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating user data", error: error.message });
    }
};

//Update user email
const updateUserEmail = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming the user ID is available in req.user.id
        const { email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { email },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating user data", error: error.message });
    }
};

const deleteUser = async (req, res, next) => {
    await User.findById(req.user.id)
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

export { userAuth, getUserData, updateUserName, updateUserEmail, deleteUser };