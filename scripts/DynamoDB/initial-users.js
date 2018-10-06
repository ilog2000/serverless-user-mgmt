const bcrypt = require('bcryptjs');

const imgURL = '/img';

// UUID v1 (time based) was used to generate IDs
const usersData = [{
	id: 'fae0fb30-c6ec-11e8-9bd5-e358ca4b1f07',
	email: 'darth.vader@gmail.com',
	password_hash: generateHash('anakin'),
	first_name: 'Darth',
	last_name: 'Vader',
	role: 'admin',
	picture: `${imgURL}/darth-vader.png`,
	active: true
}, {
	id: 'faf2fc90-c6ec-11e8-9bd5-e358ca4b1f07',
	email: 'luke.skywalker@yahoo.com',
	password_hash: generateHash('last jedi'),
	first_name: 'Luke',
	last_name: 'Skywalker',
	role: 'developer',
	picture: `${imgURL}/luke-skywalker.png`,
	active: true
}, {
	id: 'fb012d60-c6ec-11e8-9bd5-e358ca4b1f07',
	email: 'leia.organa@outlook.com',
	password_hash: generateHash('princess'),
	first_name: 'Leia',
	last_name: 'Organa',
	role: 'editor',
	picture: `${imgURL}/leia-organa.png`,
	active: true
}]

function generateHash(password) {
	const salt = bcrypt.genSaltSync();
	const hash = bcrypt.hashSync(password, salt);
	return hash;
}

function getInitialUsers() {
	return Promise.resolve(usersData);
}

module.exports = {
	getInitialUsers
}