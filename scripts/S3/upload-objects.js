const AWS = require('aws-sdk');
const publicDir = require('./public-dir.js');

AWS.config.update(config.aws_remote_config);

const s3 = new AWS.S3();

function uploadS3Objects (bucketName, files) {
	const params = {
		Bucket: bucketName,
		ACL: 'public-read'
	}

	const filePromises = files.map((file) => {
		const newParams = Object.assign({}, params, {
			Body: file.contents,
			Key: file.name,
			ContentType: publicDir.getContentType(file.name)
		});

		return s3.putObject(newParams).promise();
	});

	return Promise.all(filePromises);
}

(async function() {
	try {
		const files = await publicDir.getPublicFiles();
		const result = await uploadS3Objects(config.s3_config.bucketName, files);
		console.log(result);
	}
	catch (err) {
		console.error(err);
	}
})();