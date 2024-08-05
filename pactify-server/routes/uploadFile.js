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

router.post('/', async (req, res) => {
    try {
        const { fileName, content } = req.body;
        const folderPrefix = req.user.id;
        
        if (!fileName || !content) {
            return res.status(400).json({ message: 'File name and content are required' });
        }

        const existingContract = await Contract.findOne({
            userId: new mongoose.Types.ObjectId(folderPrefix),
            title: fileName
        });

        if (existingContract) {
            return res.status(400).json({ message: 'Already exists, choose a different name' });
        }

        const createdContract = await Contract.create({
            userId: new mongoose.Types.ObjectId(folderPrefix),
            title: fileName,
            status: 'draft',
            thumbnail: 'https://via.placeholder.com/200'
        });

        const contract_id = createdContract._id;

        const s3 = new AWS.S3();
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${folderPrefix}/${contract_id}`,
            Body: content
        };

        const uploadPromise = () => {
            return new Promise((resolve, reject) => {
                s3.upload(params, (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
            });
        };

        const uploadResult = await uploadPromise();

        res.status(200).json({ message: 'File uploaded successfully', data: uploadResult });
    } catch (error) {
        console.log('Error uploading file:', error);
        res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
});

router.post('/aws', async (req, res) => {
    try {
        const { fileName, content } = req.body;
        const folderPrefix = req.user.id;
        
        if (!fileName || !content) {
            return res.status(400).json({ message: 'File name and content are required' });
        }

        const s3 = new AWS.S3();
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${folderPrefix}/${fileName}`,
            Body: content
        };

        const uploadPromise = () => {
            return new Promise((resolve, reject) => {
                s3.upload(params, (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
            });
        };

        const uploadResult = await uploadPromise();

        res.status(200).json({ message: 'File uploaded successfully', data: uploadResult });
    } catch (error) {
        console.log('Error uploading file:', error);
        res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
});


export default router;