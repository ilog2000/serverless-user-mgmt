require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const jwt = require('koa-jwt');
const cors = require('@koa/cors');
const compose = require('koa-compose');
const routerHome = require('./routes/home.js');
const routerApiUsers = require('./routes/users.js');
const errorHandler = require('./middleware/errorHandler.js');

const app = new Koa();

app.use(
	compose([
		logger(),
		errorHandler,
		cors({ origin: '*' }),
		bodyParser(),
		jwt({ secret: process.env.JWT_SECRET }).unless({ path: [/^\/$/, /^\/public/, /^\/register/, /^\/login/, /^\/ping/] }),
		routerHome.routes(),
		routerHome.allowedMethods(),
		routerApiUsers.routes(),
		routerApiUsers.allowedMethods(),
	])
)

module.exports = app;
