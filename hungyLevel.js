let hungyLevel = 100;

module.exports = {
	getLevel: function () {
		return hungyLevel;
	},
	update: function () {
		const hour = new Date().getHours();
		if (hour >= 8 && hour <= 21 && hungyLevel >= 10) {
			hungyLevel = hungyLevel - 10;
		} else return;
	},
	updatePlus: function () {
		hungyLevel = hungyLevel + 10;
		console.log(hungyLevel);
	},
};
