const AWS = require('aws-sdk');
const uuidv1 = require('uuid/v1');
const config = require('../config.js');

class Repository {
	constructor(tableName) {
		this.tableName = tableName;
		AWS.config.update(config.aws);
		this.client = new AWS.DynamoDB.DocumentClient();
	}

	async put(item) {
		if (!item.id) item.id = uuidv1();
		const params = {
			TableName: this.tableName,
			Item: item
		};
		return this.client.put(params).promise();
	}

	async update(id, expression, values, names) {
		const params = {
			TableName: this.tableName,
			Key: { id },
			UpdateExpression: expression,
			ExpressionAttributeValues: values,
			ReturnValues: 'UPDATED_NEW'
		};
		if (names) params.ExpressionAttributeNames = names;
		return this.client.update(params).promise();
	}

	// Example how to update an item in users table
	// --------------------------------------------
	// async update(item) {
	// 	const params = {
	// 		TableName: this.tableName,
	// 		Key: { id },
	// 		UpdateExpression: 'set #role = :role, active = :active',
	// 		ExpressionAttributeValues: { ':role': item.role, ':active': item.active },
	// 		ExpressionAttributeNames: { '#role': 'role' },
	// 		ReturnValues: 'UPDATED_NEW'
	// 	};
	// 	return this.client.update(params).promise();
	// }

	async getAll() {
		const params = {
			TableName: this.tableName
		};
		return this.client.scan(params).promise();
	}

	async getById(id) {
		const params = {
			TableName: this.tableName,
			Key: { id }
		}
		return this.client.get(params).promise();
	}

	async findById(id) {
		const params = {
			TableName: this.tableName,
			KeyConditionExpression: 'id = :id',
			ExpressionAttributeValues: { ':id': id }
		}
		return this.client.query(params).promise();
	}

	async findByField(name, value) {
		const params = {
			TableName: this.tableName,
			IndexName: name + 'Index',
			KeyConditionExpression: `${name} = :val`,
			ExpressionAttributeValues: { ':val': value }
		}
		return this.client.query(params).promise();
	}

	async delete(id) {
		const params = {
			TableName: this.tableName,
			Key: { id }
		}
		return this.client.delete(params).promise();
	}

}

module.exports = Repository;