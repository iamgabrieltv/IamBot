const fs = require('fs');

function hour() {
 return new Date().getHours()
}

let hungyLevel = parseInt(fs.readFileSync('hungyLevel.txt', 'utf8'));

module.exports = {
	getLevel: function () {
		return hungyLevel;
	},
	update: function () {
		if (hour() >= 8 && hour() < 21 && hungyLevel >= 10) {
			hungyLevel = hungyLevel - 10;
			fs.writeFileSync('hungyLevel.txt', hungyLevel.toString());
		} else return;
	},
	updatePlus: function () {
		if (hour() >= 8 && hour() < 21 && hungyLevel < 100) {
			hungyLevel = hungyLevel + 10;
			fs.writeFileSync('hungyLevel.txt', hungyLevel.toString());
		} else return;
	},
};
