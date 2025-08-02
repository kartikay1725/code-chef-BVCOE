// /pages/api/send-email.js (for Next.js)
// or use in Express: app.post('/send-email', async (req, res) => {...})

import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' })
  }

  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    // Gmail transporter setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yourgmail@gmail.com',       // your Gmail address
        pass: 'your_app_password',         // your generated Gmail App Password
      },
    })

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'devangshukla119@gmail.com',
      subject: `New Message From: ${name} | ${subject}`,
      text: `
You have a new message from your website contact form:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
    }

    await transporter.sendMail(mailOptions)

    return res.status(200).json({ message: 'Email sent successfully' })
  } catch (error) {
    console.error('Email error:', error)
    return res.status(500).json({ message: 'Failed to send email', error: error.message })
  }
}
