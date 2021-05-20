import { S3, SES, SNS } from 'aws-sdk';
import { config } from 'dotenv';
import { StorageType } from '../enums';

config();
const accessConfig = {
    accessKeyId: process.env.AWS_SERVICE_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SERVICE_SECRET_ACCESS_KEY,
    region: process.env.AWS_SERVICE_REGION,
};

export const getNotificationServices = (): any => ({
    ses: new SES(accessConfig),
    sns: new SNS(accessConfig),
});

export const getStorageService = (): any =>
    process.env.STORAGE_TYPE === StorageType.S3.toString() ? new S3(accessConfig) : {};
