import nodemailer from "nodemailer"

const baseURL = process.env.NEXT_PUBLIC_APP_URL
const emailUser = process.env.EMAIL_USER
const emailPass = process.env.EMAIL_PASSWORD

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: emailUser,
    pass: emailPass
  },
  tls: {
    rejectUnauthorized: false
  }
})

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP connection error:", error)
  } else {
    console.log("Server is ready to take our messages")
  }
})

export const sendVerificationEmail = async (
  email: string, 
  token: string
) => {
  const confirmLink = `${baseURL}/new-verification?token=${token}`

  const mailOptions = {
    from: `"Auth Service" <${emailUser}>`,
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
  }
  
  await transporter.sendMail(mailOptions)
}

export const sendPasswordResetEmail = async (
  email: string, 
  token: string
) => {
  const resetLink = `${baseURL}/new-password?token=${token}`

  const mailOptions = {
    from: `"Auth Service" <${emailUser}>`,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
  }

  await transporter.sendMail(mailOptions)
}

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string
) => {
  const mailOptions = {
    from: `"Auth Service" <${emailUser}>`,
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`
  }

  await transporter.sendMail(mailOptions)
}