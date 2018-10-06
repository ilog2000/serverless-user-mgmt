const bcrypt = require('bcryptjs');
const Repository = require('../db/repository.js');
const config = require('../config.js');
const { statusSuccess, statusError } = require('../helpers/set-status.js');

const repo = new Repository('users');

module.exports = {

	async getUsers(ctx) {
		if (!ctx.user || !ctx.user.permissions.includes('R')) {
			ctx.throw(403, 'Forbidden\n');
		}

		try {
			const result = await repo.getAll();
			statusSuccess(ctx, result);
		} catch (err) {
			statusError(ctx, 500, err);
		}
	},

	async getUser(ctx) {
		if (!ctx.user || !ctx.user.permissions.includes('R')) {
			ctx.throw(403, 'Forbidden\n');
		}

		const { id } = ctx.params;

		try {
			const result = await repo.getById(id);
			statusSuccess(ctx, result);
		} catch (err) {
			statusError(ctx, 500, err);
		}
	},

	async postUser(ctx) {
		if (!ctx.user || !ctx.user.permissions.includes('C')) {
			ctx.throw(403, 'Forbidden\n');
		}

		const user = ctx.request.body;

		try {
			const salt = bcrypt.genSaltSync();
			const hash = bcrypt.hashSync(user.password, salt);
			user.password_hash = hash;
			delete user.password;
			user.picture = `${config.app.imgURL}/${user.picture}`;

			const result = await repo.put(user);
			statusSuccess(ctx, result);
		}
		catch (err) {
			statusError(ctx, 500, err);
		}
	},

	async putUser(ctx) {
		const { id } = ctx.params;

		if (!ctx.user || (!ctx.user.permissions.includes('U') && ctx.user.id !== id)) {
			ctx.throw(403, 'Forbidden\n');
		}

		const { body } = ctx.request;
		const user = body;

		try {
			const expression = 'set picture = :picture, #role = :role, active = :active';
			const values = { ':picture': user.picture, ':role': user.role, ':active': user.active };
			const names = { '#role': 'role' };
			const result = await repo.update(id, expression, values, names);
			statusSuccess(ctx, result);
		}
		catch (err) {
			statusError(ctx, 500, err);
		}
	},

	async deleteUser(ctx) {
		if (!ctx.user || !ctx.user.permissions.includes('D')) {
			ctx.throw(403, 'Forbidden\n');
		}

		const { id } = ctx.params;

		try {
			const result = await repo.delete(id);
			statusSuccess(ctx, result);
		}
		catch (err) {
			statusError(ctx, 500, err);
		}
	}

}