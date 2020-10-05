import nodemailer from 'nodemailer'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendEmail = async (options: any) => {
  // 1). Create a transporter: TODO with gmail
  const transporter = nodemailer.createTransport({
    // service: 'Gmail',
    // auth: {
    //   user: process.env['EMAIL_USER'] as string,
    //   password: process.env['EMAIL_PASSWORD'] as string
    // }
    //ACTIVATE IN GMAIL 'LESS SECURE APP' OPTION
  })
  // 2). Define the email options
  const mailOptions = {
    from: 'Martina <martina@test.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  }
  // 3). Send the email
  await transporter.sendMail(mailOptions)
}
