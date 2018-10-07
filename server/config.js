// Back end configuration

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
		imgURL: 'http://serverless-user-mgmt.s3-website.us-east-1.amazonaws.com'
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