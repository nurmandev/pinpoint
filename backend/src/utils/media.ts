// s3Utils.ts
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID || "";
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || "";
const region = process.env.AWS_BUCKET_REGION || "";
const bucket = process.env.AWS_BUCKET_NAME || "";

const s3Client = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});

export const uploadMediaToS3 = async (
  filePath: string,
  fileName: string,
  mediaType: string
): Promise<{ url: string; type: string }> => {
  const fileStream = fs.createReadStream(filePath);
  const key = `${uuidv4()}_${fileName}`;
  const uploadParams = {
    Bucket: bucket,
    Key: key,
    Body: fileStream,
    ContentType: mediaType === "image" ? "image/jpeg" : "video/mp4",
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));

    return { url: key, type: mediaType };
  } catch (err) {
    console.error("Error uploading file to S3:", err);
    throw new Error("Could not upload file to S3");
  } finally {
    // Clean up temporary file
    fs.unlinkSync(filePath);
  }
};

export const deleteMediaFromS3 = async (url: string) => {
  try {
    const deleteParams = {
      Bucket: bucket,
      Key: url,
    };

    await s3Client.send(new DeleteObjectCommand(deleteParams));
    console.log(`Successfully deleted ${url} from S3 bucket: ${bucket}`);
  } catch (error: any) {
    console.error(`Error deleting media from S3: `, error);
    throw new Error(`Could not delete media from S3: ${error.message}`);
  }
};

export const downloadMediaFromS3 = async (key: string) => {
  try {
    const params = {
      Bucket: bucket,
      Key: key as string,
    };

    const command = new GetObjectCommand(params);
    const response = await s3Client.send(command);
    if (!response.Body) {
      throw new Error(`Image not found`);
    }
    const str = await response.Body.transformToByteArray();

    const bodyBuffer = Buffer.from(str);

    return {
      contentType: response.ContentType,
      bodyBuffer,
    };
  } catch (error: any) {
    throw new Error(`Could not download media from S3: ${error.message}`);
  }
};
