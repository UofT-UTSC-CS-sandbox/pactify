import express from 'express';
import { userAuth } from "./user/user.js"
import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import Contract from '../models/Contract.js';
import mongoose from 'mongoose';

dotenv.config({path: '../config.env'});

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const router = express.Router();
router.use(userAuth);

router.delete('/', async(req, res) => {
    try{

        const {contractId} = req.query;
        const folderPrefix = req.user.id;
        const s3 = new AWS.S3();
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key:`${folderPrefix}/${contractId}`
        }; 

        const deleteFromDB = await Contract.deleteOne({ _id: new mongoose.Types.ObjectId(contractId)});
        if (!deleteFromDB.deletedCount) {
            console.log("Contract not found in DB");
            return res.status(404).json({ message: 'Contract not found in DB' });
        }

        const deletePromise = () => {
            s3.deleteObject(params, function(err, data) {
                if (err) {
                  console.log("Error", err);
                } else {
                  console.log("Success", data);
                }
              });
        };
        const deleteResult = await deletePromise();
        res.status(200).json({ message: 'Contract deleted' });
    } catch (error) {     
        console.error('Error deleting file:', error);
        res.status(500).json({ message: 'Error deleting file' });
    }
        
});

export default router;