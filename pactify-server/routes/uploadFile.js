import express from 'express';
import { userAuth } from "./user/user.js"
import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import Contract from '../models/Contract.js';
import mongoose from 'mongoose';
dotenv.config({ path: '../config.env' });

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

        let thumbnail = '';
        const randomInt = Math.floor(Math.random() * 4) + 1;

        // Perform an action based on the random integer
        switch(randomInt) {
            case 1:
                thumbnail = 'https://i.postimg.cc/8P9zfDFn/Screenshot-2024-08-05-023205.png';
                break;
            case 2:
                thumbnail = 'https://i.postimg.cc/wMRnCK67/Screenshot-2024-08-05-023940.png';
                break;
            case 3:
                thumbnail = 'https://i.postimg.cc/4dHggHPf/Screenshot-2024-08-05-024653.png'
                break;
            case 4:
                thumbnail = 'https://i.postimg.cc/qM09m5PM/Screenshot-2024-08-05-024901.png'
                break;
            default:
                console.log("Unexpected value.");
        }

        const createdContract = await Contract.create({
            userId: new mongoose.Types.ObjectId(folderPrefix),
            title: fileName,
            status: 'draft',
            thumbnail: thumbnail
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

        // Find the contract document and update the UpdatedAt field
        await Contract.findOneAndUpdate(
            { userId: new mongoose.Types.ObjectId(folderPrefix), _id: fileName },
            { $set: { updatedAt: new Date() } }
        );
        console.log('File updated successfully');

        res.status(200).json({ message: 'File uploaded successfully', data: uploadResult });
    } catch (error) {
        console.log('Error uploading file:', error);
        res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
});


export default router;