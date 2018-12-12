const bcrypt = require('bcryptjs');
const Repository = require('../db/repository.js');
const config = require('../config.js');

const repo = new Repository('users');

module.exports = {
  async getUsers(ctx) {
    if (!ctx.user || !ctx.user.permissions.includes('R')) {
      ctx.throw(403, 'Forbidden');
    }

    const result = await repo.getAll();
    ctx.body = result;
  },

  async getUser(ctx) {
    if (!ctx.user || !ctx.user.permissions.includes('R')) {
      ctx.throw(403, 'Forbidden');
    }

    const { id } = ctx.params;

    const result = await repo.getById(id);
    ctx.body = result;
  },

  async postUser(ctx) {
    if (!ctx.user || !ctx.user.permissions.includes('C')) {
      ctx.throw(403, 'Forbidden');
    }

    const user = ctx.request.body;

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(user.password, salt);
    user.password_hash = hash;
    delete user.password;
    user.picture = `${config.app.imgURL}/${user.picture}`;

    const result = await repo.put(user);
    ctx.body = result;
  },

  async putUser(ctx) {
    const { id } = ctx.params;

    if (
      !ctx.user ||
      (!ctx.user.permissions.includes('U') && ctx.user.id !== id)
    ) {
      ctx.throw(403, 'Forbidden');
    }

    const { body } = ctx.request;
    const user = body;

    const expression =
      'set picture = :picture, #role = :role, active = :active';
    const values = {
      ':picture': user.picture,
      ':role': user.role,
      ':active': user.active
    };
    const names = { '#role': 'role' };

    const result = await repo.update(id, expression, values, names);
    ctx.body = result;
  },

  async deleteUser(ctx) {
    if (!ctx.user || !ctx.user.permissions.includes('D')) {
      ctx.throw(403, 'Forbidden');
    }

    const { id } = ctx.params;

    const result = await repo.delete(id);
    ctx.body = result;
  }
};
