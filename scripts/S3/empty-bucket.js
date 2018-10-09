const AWS = require('aws-sdk');
const config = require('../aws-config.js');

AWS.config.update(config.aws_remote_config);

const s3 = new AWS.S3();

async function emptyS3Bucket(bucket, dir) {
  const listParams = {
    Bucket: bucket,
    Prefix: dir || ''
  };

  const objects = await s3.listObjectsV2(listParams).promise();

  if (objects.Contents.length === 0) return;

  const deleteParams = {
    Bucket: bucket,
    Delete: { Objects: [] }
  };

  objects.Contents.forEach(({ Key }) => {
    deleteParams.Delete.Objects.push({ Key });
  });

  await s3.deleteObjects(deleteParams).promise();

  if (objects.Contents.IsTruncated) await emptyS3Bucket(bucket, dir);
}


(async function () {
  try {
    const result = await emptyS3Bucket(config.s3_config.bucketName);
    // to empty folder content inside the bucket
    // const result = await emptyS3Bucket(config.s3_config.bucketName, 'img/');
    console.log(result);
  }
  catch (err) {
    console.error(err);
  }
})();