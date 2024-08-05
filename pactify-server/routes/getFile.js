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

router.get('/', async(req, res) => {
    try{

        const {contractId} = req.query;
        const folderPrefix = req.user.id;
     
        const s3 = new AWS.S3();
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key:`${folderPrefix}/${contractId}`
        }; 
        console.log(params);
        const downloadPromise = () => {
            return new Promise((resolve, reject) => {
                s3.getObject(params, (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
            });
        };

        const downloadResult = await downloadPromise();
        const content = downloadResult.Body.toString();

        res.status(200).json({ message: { content } });
    } catch (error) {
        console.error('Error getting file:', error);
        res.status(500).json({ message: 'Error getting file' });
    }
});

export default router;
