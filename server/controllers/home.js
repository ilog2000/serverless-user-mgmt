const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Repository = require('../db/repository.js');
const config = require('../config.js');
const { statusSuccess } = require('../helpers/set-status.js');

const repo = new Repository('users');

module.exports = {

	async postRegister(ctx) {
		const user = ctx.request.body;

		if (!user.email || !user.password) {
			ctx.throw(400, 'Email & password cannot be empty');
		}

		const salt = bcrypt.genSaltSync();
		const hash = bcrypt.hashSync(user.password, salt);
		user.password_hash = hash;
		delete user.password;
		user.picture = `${config.app.imgURL}/unknown.png`;
		user.role = 'none';
		user.active = false;

		const newUser = await repo.put(user);
		statusSuccess(ctx, newUser);
	},

	async postLogin(ctx) {
		const user = ctx.request.body;

		if (!user.email || !user.password) {
			ctx.throw(400, 'Email & password cannot be empty');
		}

		const result = await repo.findByField('email', user.email);
		if (result.Items.length === 0) {
			ctx.throw(400, 'Invalid credentials');
		}

		const dbUser = result.Items[0];
		const valid = await bcrypt.compare(user.password, dbUser.password_hash);
		if (!valid) {
			ctx.throw(400, 'Invalid credentials');
		}

		const token = jwt.sign(
			{ id: dbUser.id },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRE }
		);

		statusSuccess(ctx, { token });
	},

	async postRefreshToken(ctx) {
		const auth = ctx.request.headers['authorization'];
		if (!auth) {
			ctx.throw(400, 'Invalid access token');
		}
		const parts = auth.split(' ');
		if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
			ctx.throw(400, 'Invalid access token');
		}

		const decoded = jwt.decode(parts[1]);
		const id = decoded.id;
		const user = await repo.getById(id);
		if (!user) {
			ctx.throw(400, 'Invalid access token');
		}

		const token = jwt.sign(
			{ id },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRE }
		);

		statusSuccess(ctx, { token });
	},

	async postChangePassword(ctx) {
		const { id, oldpassword, newpassword } = ctx.request.body;

		if (!id || !oldpassword || !newpassword) {
			ctx.throw(400, 'Invalid parameters');
		}

			const result = await repo.getById(id);
			if (!result.Item) {
				ctx.throw(400, 'Invalid parameters');
			}

			const dbUser = result.Item;
			const valid = await bcrypt.compare(oldpassword, dbUser.password_hash);
			if (!valid) {
				ctx.throw(400, 'Invalid parameters');
			}

			const salt = bcrypt.genSaltSync();
			const hash = bcrypt.hashSync(newpassword, salt);
			const expression = 'set password_hash = :hash';
			const values = { ':hash': hash };
			const result2 = await repo.update(id, expression, values);

			statusSuccess(ctx, result2);
	},

}