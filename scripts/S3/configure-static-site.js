const AWS = require('aws-sdk');
const config = require('../aws-config.js');

AWS.config.update(config.aws_remote_config);

const s3 = new AWS.S3();

function configureS3Site (bucketName) {
	const params = {
		Bucket: bucketName,
		WebsiteConfiguration: {
			IndexDocument: {
				Suffix: 'index.html'
			},
			ErrorDocument: {
				Key: 'index.html'
			},
		}
	}

	return s3.putBucketWebsite(params).promise();
}

(async function() {
	try {
		const result = await configureS3Site(config.s3_config.bucketName);
		console.log(result);
	}
	catch (err) {
		console.error(err);
	}
})();