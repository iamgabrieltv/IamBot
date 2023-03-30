const fs = require('fs');

let hungyLevel = parseInt(fs.readFileSync('hungyLevel.txt', 'utf8'));

module.exports = {
	getLevel: function () {
		return hungyLevel;
	},
	update: function () {
		const hour = new Date().getHours();
		if (hour >= 8 && hour < 21 && hungyLevel >= 10) {
			hungyLevel = hungyLevel - 10;
			fs.writeFileSync('hungyLevel.txt', hungyLevel.toString());
		} else return;
	},
	updatePlus: function () {
		if (hour >= 8 && hour < 21 && hungyLevel >= 10) {
			hungyLevel = hungyLevel + 10;
			fs.writeFileSync('hungyLevel.txt', hungyLevel.toString());
		} else return;
	},
};
