const jwt = require('jsonwebtoken');
const Repository = require('../db/repository.js');

const repo = new Repository('users');

function setPermissions(role) {
	switch (role.toLowerCase()) {
		case 'admin':
			return ['C', 'R', 'U', 'D'];
		case 'developer':
			return ['C', 'R', 'U'];
		case 'editor':
			return ['R'];
		case 'none':
		default:
			return [];
	}
}

module.exports = async function (ctx, next) {
	const { authorization } = ctx.header;

	if (!authorization || authorization.split(' ')[0] !== 'Bearer') {
		ctx.throw(401, 'Not authenticated\n');
	}

	try {
		const token = authorization.split(' ')[1];
		const decoded = jwt.decode(token);
		const id = decoded.id;
		const record = await repo.getById(id);
		ctx.user = {
			id: id,
			role: record.Item.role,
			permissions: setPermissions(record.Item.role)
		};
	} catch (err) {
		ctx.throw(401, 'Not authenticated\n');
	}

	return next();
}