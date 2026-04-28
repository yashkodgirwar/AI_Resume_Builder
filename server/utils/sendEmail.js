import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // Your email
      pass: process.env.SMTP_PASS, // Your app password
    },
  });

  // Define the email options
  const mailOptions = {
    from: `"AI Resume Builder" <${process.env.SMTP_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html, // Support beautiful HTML templates
  };

  // Actually send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
