const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Repository = require('../db/repository.js');
const config = require('../config.js');
const { statusSuccess, statusError } = require('../helpers/set-status.js');

const repo = new Repository('users');

module.exports = {

	async postRegister(ctx) {
		const user = ctx.request.body;

		// console.log(JSON.stringify(user, null, 2));

		if (!user.email || !user.password) {
			statusError(ctx, 200, "Email & password cannot be empty");
			return;
		}

		const salt = bcrypt.genSaltSync();
		const hash = bcrypt.hashSync(user.password, salt);
		user.password_hash = hash;
		delete user.password;
		user.picture = `${config.app.imgURL}/unknown.png`;
		user.role = 'none';
		user.active = false;

		try {
			const newUser = await repo.put(user);
			statusSuccess(ctx, newUser);
		}
		catch (err) {
			statusError(ctx, 500, err);
		}
	},

	async postLogin(ctx) {
		const user = ctx.request.body;

		// console.log(JSON.stringify(user, null, 2));

		if (!user.email || !user.password) {
			statusError(ctx, 200, 'Email & password cannot be empty');
			return;
		}

		try {
			const result = await repo.findByField('email', user.email);
			if (result.Items.length === 0) {
				statusError(ctx, 200, 'Invalid credentials');
				return;
			}

			const dbUser = result.Items[0];
			const valid = await bcrypt.compare(user.password, dbUser.password_hash);
			if (!valid) {
				statusError(ctx, 200, 'Invalid credentials');
				return;
			}

			const token = jwt.sign(
				{ id: dbUser.id },
				process.env.JWT_SECRET,
				{ expiresIn: process.env.JWT_EXPIRE }
			);

			statusSuccess(ctx, { token });
		} catch (err) {
			statusError(ctx, 500, err);
		}
	},

	async postRefreshToken(ctx) {
		const auth = ctx.request.headers['authorization'];
		if (!auth) {
			statusError(ctx, 200, 'Invalid access token');
			return;
		}
		const parts = auth.split(' ');
		if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
			statusError(ctx, 200, 'Invalid access token');
			return;
		}

		try {
			const decoded = jwt.decode(parts[1]);
			const id = decoded.id;
			const user = await repo.getById(id);
			if (!user) {
				statusError(ctx, 200, 'Invalid access token');
				return;
			}

			const token = jwt.sign(
				{ id },
				process.env.JWT_SECRET,
				{ expiresIn: process.env.JWT_EXPIRE }
			);

			statusSuccess(ctx, { token });
		} catch (err) {
			statusError(ctx, 500, err);
		}
	},

	async postChangePassword(ctx) {
		const { id, oldpassword, newpassword } = ctx.request.body;

		if (!id || !oldpassword || !newpassword) {
			statusError(ctx, 200, 'Invalid parameters');
			return;
		}

		try {
			const result = await repo.getById(id);
			if (!result.Item) {
				statusError(ctx, 200, 'Invalid parameters');
				return;
			}

			const dbUser = result.Item;
			const valid = await bcrypt.compare(oldpassword, dbUser.password_hash);
			if (!valid) {
				statusError(ctx, 200, 'Invalid parameters');
				return;
			}

			const salt = bcrypt.genSaltSync();
			const hash = bcrypt.hashSync(newpassword, salt);
			const expression = 'set password_hash = :hash';
			const values = { ':hash': hash };
			const result2 = await repo.update(id, expression, values);

			statusSuccess(ctx, result2);
		} catch (err) {
			statusError(ctx, 500, err);
		}
	},

}