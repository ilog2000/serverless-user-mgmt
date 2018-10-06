const env = process.env.NODE_ENV; // 'development' or 'production'

const development = {
	app: {
		imgURL: '/img'
	},
	aws: {
		region: 'local',
		endpoint: 'http://localhost:8000'
	}
};

const production = {
	app: {
		imgURL: '/img'
	},
	aws: {
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_KEY,
		region: 'us-east-1',
	}
};

const config = {
	development,
	production
};

module.exports = config[env];