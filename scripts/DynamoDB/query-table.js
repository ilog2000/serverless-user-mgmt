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

const client = new AWS.DynamoDB.DocumentClient();

// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html
// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.04.html

function getAll(tableName) {
	return client.scan({ TableName: tableName }).promise();
}

function findById(tableName, id) {
	const params = {
		TableName: tableName,
		KeyConditionExpression: 'id = :hkey',
		ExpressionAttributeValues: { ':hkey': id }
	}
	// It's possible to use client.get()
	return client.query(params).promise();
}

(async function () {
	try {
		const result = await getAll('users');
		console.log(result);
		const result2 = await findById('users', 'fae0fb30-c6ec-11e8-9bd5-e358ca4b1f07');
		console.log(result2.Items[0]);
	} catch (err) {
		console.error(err);
	}
})();