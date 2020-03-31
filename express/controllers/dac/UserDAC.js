const User = require("../../db/model/User")
const random = require("../../helper/random")
const requestHelper = require("../../helper/request")

const fillable = ["username", "email", "password"]

module.exports = {
	findById: async function(id) {
		const user = await User.findOne({_id: id})
		if(!user) {
			throw new Error('Unable to find user')
		}
		return user
	},
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
		const users = await User.find({superAdmin: false})
		var userData = []
		users.forEach(user => {
			userData.push({
				_id: user._id,
				roles: user.roles,
				locked: user.locked,
				username: user.username,
				email: user.email,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt
			})
		})
		return userData
	},
	create: async function (params) {
		try {
			const fields = requestHelper.filterParams(params, fillable)
			const user = new User(fields)
			await user.save()
			return { user, success: true }
		} catch (error) {
			return { error, success: false }
		}
	},
	signin: async function (email, password) {
		const user = await User.findByCredentials(email, password)
		return user
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