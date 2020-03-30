const User = require("../../db/model/User");
const random = require("../../helper/random")

module.exports = {
	findByEmail: async function (email) {
		const user = await User.findOne({ email })

		if (!user) {
			throw new Error('Unable to find user')
		}

		return user
	},
	findByResetToken: async function (resetToken) {
		const user = await User.findOne({ pswResetToken: resetToken })
		if (!user) {
			throw new Error('Unable to find user')
		}

		return user
	},
	all: async function () {
		try {
			const users = await User.find()
			return users
		} catch (e) {
			throw new Error("Unable to get all users")
		}
	},
	allExt: async function () {
		var users = await User.aggregate([
			{
				$lookup: {
					from: "roles",
					localField: "roles.roleId",
					foreignField: "_id",
					as: "roles"
				}
			}
		]);
		/* hide sensitive information */
		users.forEach(user => {
			delete user.password
			delete user.authTokens
		});
		return users
	},
	create: async function (params) {
		try {
			const fields = paramsFilter(params)
			const user = new User(fields)
			await user.save()
			return { user, success: true }
		} catch (error) {
			return { error, success: false }
		}
	},
	signin: async function (email, password) {
		try {
			const user = await User.findByCredentials(email, password)
			return user
		} catch (e) {
			return null
		}
	},
	createPasswordResetLink: async function (user) {
		user.pswResetToken = random.generateStr(50)
		await user.save()

		return user.pswResetToken
	},
	resetPassword: async function (user, password) {
		user.password = password
		delete user.pswResetToken
		await user.save()
	}
};

function paramsFilter(params) {
	var fields = {}
	const accpeted = ["username", "email", "password"]
	accpeted.forEach(param => {
		if (params[param]) {
			fields[param] = params[param]
		}
	})
	return fields
}