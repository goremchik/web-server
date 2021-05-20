import { getStorageService } from '../config/aws.config';

export class StorageService {
    bucketName: string;
    initialized = false;
    s3 = getStorageService();

    constructor(bucketName: string) {
        this.bucketName = bucketName;
    }

    async init(): Promise<void> {
        if (this.initialized) return;

        try {
            await this.s3.headBucket({ Bucket: this.bucketName }).promise()
        } catch (err) {
            await this.s3.createBucket({ Bucket: this.bucketName }).promise()
        }
        this.initialized = true;
    }

    async write(Key: string, Body: string): Promise<void> {
        await this.init();
        await this.s3.upload({ Bucket: this.bucketName, Key, Body }).promise();
    }

    async read(Key: string): Promise<any> {
        await this.init();
        const data = await this.s3.getObject({  Bucket: this.bucketName, Key }).promise();
        return data;
    }
}
