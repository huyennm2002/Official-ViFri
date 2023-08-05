import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import fs from 'fs';
import util from 'util';
import sharp from 'sharp';

const unlinkFile = util.promisify(fs.unlink);
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const s3Url = process.env.AWS_S3_URL;

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
})

//upload function
const uploadFileS3 = (file, key) => {
    const uploadParams = new PutObjectCommand({
        Bucket: bucketName,
        Body: file,
        Key: key,
    })
    return s3.send(uploadParams)
}

//downloadFile
const downloadFileS3 = (fileKey) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }
    return s3.getObject(downloadParams).createReadStream();
}

const handleUploadFile = async (file, key) => {
    try {
        const compressedFile = await sharp(file.path).jpeg({ quality: 70 }).toBuffer();
        await uploadFileS3(compressedFile, key);
        await unlinkFile(file.path);
        const fileUrl = s3Url + key;
        return fileUrl;
    } catch(e) {
        return '';
    }
}

export { handleUploadFile, downloadFileS3 }