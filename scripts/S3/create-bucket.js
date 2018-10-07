const AWS = require('aws-sdk');
const config = require('../aws-config.js');

AWS.config.update(config.aws_remote_config);

const s3 = new AWS.S3();

function createBucket(bucketName) {
	const params = {
		Bucket: bucketName,
		ACL: 'public-read'
	}

	return s3.createBucket(params).promise();
}

(async function() {
	try {
		const result = await createBucket(config.s3_config.bucketName);
		console.log(result);
	}
	catch (err) {
		console.error(err);
	}
})();