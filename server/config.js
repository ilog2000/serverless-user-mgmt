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
		region: 'us-east-1',
	}
};

const config = {
	development,
	production
};

module.exports = config[env];