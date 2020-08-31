const aws = require('aws-sdk');

module.exports = new aws.S3({
  endpoint: process.env.MINIO_ENDPOINT,
  s3ForcePathStyle: true,
  accessKeyId: process.env.MINIO_ACCESS_KEY,
  secretAccessKey: process.env.MINIO_SECRET_KEY,
  sslEnabled: false,
  region: process.env.MINIO_DEFAULT_REGION,
});
