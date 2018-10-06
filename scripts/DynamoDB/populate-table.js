const AWS = require('aws-sdk');
const config = require('./config.js');
const init = require('./initial-users.js');

const isDev = process.env.NODE_ENV !== 'production';

if (isDev) {
	console.log('DEV');
	AWS.config.update(config.aws_local_config);
} else {
	console.log('PROD');
	AWS.config.update(config.aws_remote_config);
}

const client = new AWS.DynamoDB.DocumentClient();

function populateTable(tableName, data) {
	const params = {
		RequestItems: {
			[tableName]: data.map(item => {
				return {
					PutRequest: {
						Item: item
					}
				}
			})
		}
	}

	return client.batchWrite(params).promise();
}

(async function () {
	try {
		const users = await init.getInitialUsers();
		const result = await populateTable('users', users);
		console.log(result);
	} catch (err) {
		console.error(err);
	}
})();