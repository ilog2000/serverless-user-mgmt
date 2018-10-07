// Front end configuration

const env = process.env.NODE_ENV; // 'development' or 'production'

const development = {
	BASE_API_URL: "http://localhost:3000",
};

const production = {
	BASE_API_URL: "https://qj9dphrpnf.execute-api.us-east-1.amazonaws.com/dev/",
};

const config = {
	development,
	production
};

export default config[env];