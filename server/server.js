require('dotenv').config();
const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');
const router = require('./routes');

const app = new Koa();

function consoleError(status, err) {
	console.error(status, err.message);
	if (err.originalError) console.log('Error details:', err.originalError.message);
	console.log(err.stack);
}

// error handling
app.use(async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		ctx.status = err.status || 500;
		switch (ctx.status) {
			case 204: // No Content
				break;
			case 401: // Unauthorized
			case 403: // Forbidden
			case 404: // Not Found
			case 406: // Not Acceptable
			case 409: // Conflict
				consoleError(ctx.status, err);
				ctx.body = {
					status: 'error',
					message: err.message
				};
				break;
			case 500: // Internal Server Error
			default:
				consoleError(ctx.status, err);
				ctx.body = {
					status: 'error',
					message: err.message
				};
				if (process.env.NODE_ENV !== 'production') {
					if (err.originalError) ctx.body.details = err.originalError.message;
					ctx.body.stack = err.stack;
				}
				ctx.app.emit('error', err, ctx); // github.com/koajs/koa/wiki/Error-Handling
				break;
		}
	}
});
if (process.env.NODE_ENV !== 'production') {
	app.use(logger());
}
app.use(serve(path.join(__dirname, '../public')));
app.use(bodyParser());
app.use(jwt({ secret: process.env.JWT_SECRET })
	.unless({ path: [/^\/$/, /^\/public/, /^\/register/, /^\/login/, /^\/ping/] }));

app.use(router);

app.listen(process.env.PORT, (err) => {
	if (err) console.log(err);
	console.log(`The server is running on port ${process.env.PORT}`);
});

module.exports = app;
