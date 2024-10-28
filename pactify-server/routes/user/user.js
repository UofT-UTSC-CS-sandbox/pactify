import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import Contract from "../../models/Contract.js";
import mongoose from "mongoose";
import { response } from "express";
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


const getUserContracts = async (req, res, next) => {
    try {
      // Fetch all contracts with pagination
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 8;
  
      // Query contracts by userId and sort by updatedAt in descending order
      const contracts = await Contract.find({ 'userId': new mongoose.Types.ObjectId(req.user.id) })
        .sort({ updatedAt: -1 }) // Sort by updatedAt in descending order
        .skip(startIndex)
        .limit(limit);
  
      // Get total count for pagination purposes
      const totalContracts = await Contract.countDocuments({ 'userId': new mongoose.Types.ObjectId(req.user.id) });
  
      // Respond with the contracts and total count
      res.status(200).json({ contracts, totalContracts });
  
    } catch (error) {
      console.error('Error fetching contracts:', error);
      res.status(500).json({ message: error.message });
    }
  };

const uploadContractUser = async (req, res) => {
    try {

        const userId = req.user.id;
        const key = '${userId}/';
        const contract = await Contract.create({
            'userId': new mongoose.Types.ObjectId(req.user.id),
            'title': "filler",
            'thumbnail': "https://via.placeholder.com/200"
        });
    } catch (error) {
        console.error('Error uploading file to DB', error);
        res.status(500).json({ message: error.message });
    }
}


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
            res.status(200).json({ message: "User successfully deleted", id: req.user.id }),
        )
        .catch((error) =>
            res
                .status(500)
                .json({ message: "An error occurred", error: error.message })
        );
};

const getUserSignature = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('signature');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ signature: user.signature });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
}

const updateUserSignature = async (req, res) => {
    try {
        const userId = req.user.id;
        const { signature } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { signature },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'Signature updated successfully', signature: user.signature });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
}


export { userAuth, getUserData, updateUserName, updateUserEmail, deleteUser, getUserContracts, getUserSignature, updateUserSignature };
