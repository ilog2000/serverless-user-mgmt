const fs = require('fs');
const util = require('util');
const glob = util.promisify(require('glob'));
const readFile = util.promisify(fs.readFile);

async function getPublicFiles() {
	const filePaths = await glob('../../public/**/*.*');
	const filePromises = filePaths.map((filePath) => {
		return readFile(filePath);
	});
	return Promise.all(filePromises)
		.then((fileContents) => {
			return fileContents.map((contents, i) => {
				return {
					contents,
					name: filePaths[i].replace('../../public/', '')
				}
			})
		});
}

function getContentType(filename) {
	if (filename.match(/\.html/)) {
		return 'text/html';
	}
	if (filename.match(/\.png/)) {
		return 'image/png';
	}
	if (filename.match(/\.jpg/)) {
		return 'image/jpeg';
	}
	if (filename.match(/\.ico/)) {
		return 'image/x-icon';
	}
	if (filename.match(/\.js/)) {
		return 'text/javascript';
	}
	if (filename.match(/\.css/)) {
		return 'text/css';
	}
	return 'text/plain';
}

module.exports = {
	getPublicFiles,
	getContentType
}
