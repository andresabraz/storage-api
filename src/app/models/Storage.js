const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const aws = require('aws-sdk');
const minioClient = require('../../config/minio');

const s3 = new aws.S3();

module.exports = (sequelize, DataTypes) => {
  const Storage = sequelize.define(
    'Storage',
    {
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      key: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    {
      hooks: {
        beforeSave: async (storage) => {
          if (!storage.url) {
            storage.url = `${process.env.APP_URL}:${process.env.PORT}/files/${storage.key}`;
          }
        },
        beforeDestroy: async (storage) => {
          if (process.env.STORAGE_TYPE != 'local') {
            if (process.env.STORAGE_TYPE === 'minio') {
              return minioClient
                .deleteObject({
                  Bucket: process.env.BUCKET_NAME,
                  Key: storage.key,
                })
                .promise();
            }

            if (process.env.STORAGE_TYPE === 's3') {
              return s3
                .deleteObject({
                  Bucket: process.env.BUCKET_NAME,
                  Key: storage.key,
                })
                .promise();
            }
          } else {
            return promisify(fs.unlink)(
              path.resolve(
                __dirname,
                '..',
                '..',
                '..',
                'tmp',
                'uploads',
                storage.key
              )
            );
          }
        },
      },
    }
  );

  return Storage;
};
