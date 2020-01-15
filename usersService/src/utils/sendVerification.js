import nodemailer from 'nodemailer'
import ejs from 'ejs'
import path from 'path'

async function mailer(name, code, email) {

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 25,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    let emailTemplatePath =
        path.join(__dirname, '../../asset/email/email.ejs')

    ejs.renderFile(emailTemplatePath, { name, code },
        (err, data) => {
            if (err) {
                console.log(err)
                return
            }
            const mailOptions = {
                from: `"Tamam" <${process.env.EMAIL}>`,
                to: email,
                subject: 'Account Verification',
                html: data
            }
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err)
                    return
                }
            })
        })
}

export { mailer }
