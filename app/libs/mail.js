const nodeMailer = require('nodemailer')

async function mailConfig() {
    console.log('in mail config')
    let testAccount = await nodeMailer.createTestAccount();

    let transporter = nodeMailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    })
    console.log('tras ', transporter)
    let info = await transporter.sendMail({
        from: '"itsVGK " <gkrishgkrish@gmail.com>',
        to: 'gkrishgkrish@gmail.com',
        subject: 'hello',
        text: 'hello,this is test mail'
    })

    console.log(' in info ', info)

    console.log('message sent ', info.messageId)

    console.log('preview url ', nodeMailer.getTestMessageUrl(info))

};

module.exports = {
    mailConfig: mailConfig
}