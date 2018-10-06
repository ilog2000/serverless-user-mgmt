function statusSuccess(ctx, data) {
	ctx.status = 200;
	ctx.body = {
		status: 'success',
		data: data
	};
}

function statusError(ctx, status, err) {
	ctx.status = status;
	ctx.body = {
		status: 'error',
		message: err.message
	};
}

module.exports = {
	statusSuccess,
	statusError
}