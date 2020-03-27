const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASSWORD
    }
})

module.exports = {
    sendEmail: function(toEmail, subject, type, content){
        var mailOptions = {
            from: process.env.GMAIL_ACCOUNT,
            to: toEmail,
            subject: subject,
            text: content
        }
        if(type === 'html'){
            delete mailOptions.text
            mailOptions.html = content
        }
        transporter.sendMail(mailOptions, function(err, info){
            if(err) {
                console.log(err)
            } else {
                console.log('Email sent: ' + info.response)
            }
        })
    }
} 

