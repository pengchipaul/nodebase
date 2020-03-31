const roleDAC = require("../dac/RoleDAC");

module.exports = {
	all: async function(req, res) {
		try {
			const roles = await roleDAC.all();
			res.json(roles);
		} catch (e) {
			res.status(400).send({ success: false, error: e });
		}
	},
	create: async function(req, res) {
		try {
			const role = await roleDAC.create(req.body);
			res.json({ success: true, role });
		} catch (e) {
			res.status(400).send({ success: false, error: e});
		}
	}
};
