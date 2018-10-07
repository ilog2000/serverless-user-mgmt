const AWS = require('aws-sdk');
const config = require('../aws-config.js');

const isDev = process.env.NODE_ENV !== 'production';

if (isDev) {
	console.log('DEV');
	AWS.config.update(config.aws_local_config);
} else {
	console.log('PROD');
	AWS.config.update(config.aws_remote_config);
}

const dynamo = new AWS.DynamoDB();

function deleteTable(tableName) {
	return dynamo.deleteTable({ TableName: tableName }).promise();
}

(async function() {
	try {
		const result = await deleteTable('users');
		console.log(result);
	}
	catch (err) {
		console.error(err);
	}
})();