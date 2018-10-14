function statusSuccess(ctx, data) {
	ctx.status = 200;
	ctx.body = {
		status: 'success',
		statusCode: 200,
		data: data
	};
}

function statusError(ctx, status, err) {
	ctx.status = status;
	ctx.body = {
		status: 'error',
		statusCode: status,
		message: err.message
	};
}

module.exports = {
	statusSuccess,
	statusError
}