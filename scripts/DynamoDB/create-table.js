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

function createTableWithNumericId(tableName) {
	// IMPORTANT !!!
	// Only key fields, sortable fields, indexes, and constraints are defined here.
	const params = {
		TableName: tableName,
		KeySchema: [
			{ AttributeName: 'id', KeyType: 'HASH' }
		],
		AttributeDefinitions: [
			{ AttributeName: 'id', AttributeType: 'S' },
			{ AttributeName: 'email', AttributeType: 'S' }
		],
		GlobalSecondaryIndexes: [
			{
				IndexName: 'emailIndex',
				KeySchema: [
					{ AttributeName: 'email', KeyType: 'HASH' }
				],
				Projection: { ProjectionType: 'ALL' },
				ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
			}
		],
		ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 }
	}

	return dynamo.createTable(params).promise();
} 


(async function() {
	try {
		const result = await createTableWithNumericId('users');
		console.log(result);
	}
	catch (err) {
		console.error(err);
	}
})();