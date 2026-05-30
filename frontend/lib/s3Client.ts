import { S3Client } from "@aws-sdk/client-s3";

const parspackRegion = process.env.PARSPACK_REGION ?? "us-east-1";

export const s3Client = new S3Client({
  region: parspackRegion,
  endpoint: process.env.PARSPACK_ENDPOINT,
  credentials: {
    accessKeyId: process.env.PARSPACK_ACCESS_KEY as string,
    secretAccessKey: process.env.PARSPACK_SECRET_KEY as string,
  },
  forcePathStyle: true,
});
