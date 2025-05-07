const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nottificationsa@gmail.com",      // replace with your Gmail
    pass: "gcgjaetypmdxkpcm" // replace with your password or app password
  },
});

exports.sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"AccountLink Notifications" <notificationsa@gmail.com>`,
      to: to,
      subject: subject,
      text: text,
    });
  } catch (err) {
    console.error("Failed to send email:", err);
  }
};
