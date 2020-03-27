const confirmPassword = async (req, res, next) => {
    try {
        if(req.body.password !== req.body.confirmPassword) {
            throw new Error('Password does not match')
        }
        next()
    } catch(e) {
        req.session.errors = {
            input: {
                passwordConfirmation: {
                    message: "Confirm password does not match"
                }
            }
        }
        req.session.input = req.body
        res.redirect('back')
    }
}

module.exports = confirmPassword