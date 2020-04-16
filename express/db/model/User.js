const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uniqueValidator = require('mongoose-unique-validator')
const Role = require('./Role')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Minimum length is 6"],
        maxlength: [500, "Maximum length is 500"],
        trim: true
    },
    authTokens: [{
        type: String,
        required: true
    }],
    pswResetToken: {
        type: String
    },
    roles: [
        {
            type: String,
            required: true,
            ref: "Role"
        }
    ],
    superAdmin: {
        type: Boolean,
        default: false
    },
    locked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

userSchema.methods.toJSON = function () {
    var user = this
    const userObject = user.toObject()

    delete userObject.password

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.authTokens = user.authTokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// catch unqiue error
userSchema.plugin(uniqueValidator, {message: '{PATH} already exists'})

const User = mongoose.model('User', userSchema)

module.exports = User

