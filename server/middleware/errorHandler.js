async function errorHandler(ctx, next) {
  try {
    await next();
    if (ctx.status === 404) ctx.throw(404);
  } catch (err) {
    ctx.status = err.statusCode || err.status || 501; // 501 Not Implemented
    if (ctx.status === 204) return;
    ctx.body = {
      status: 'error',
      statusCode: ctx.status,
      message: err.message,
    };
    if (process.env.NODE_ENV !== 'production') {
      const stackTrace = err.stack.split('\n').map((line) => line.trim());
      const errorDetails = stackTrace[0].split(':')[0];
      if (err.originalError) ctx.body.errorDetails = err.originalError.message;
      else ctx.body.errorDetails = errorDetails;
      ctx.body.stackTrace = stackTrace;
    }
    ctx.app.emit('error', err, ctx);
  }
}

module.exports = errorHandler;
