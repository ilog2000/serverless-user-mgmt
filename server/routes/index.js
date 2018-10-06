const compose = require('koa-compose');
const routerHome = require('./home.js');
const routerApiUsers = require('./users.js');

const routerMiddleware = compose([
	routerHome.routes(),
	routerHome.allowedMethods(),
	routerApiUsers.routes(),
	routerApiUsers.allowedMethods(),
])

module.exports = routerMiddleware;