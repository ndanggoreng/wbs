const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());

const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB

app.post("/api/send-email", upload.single("attachment"), async (req, res) => {
  const { name, branch, department, date, amount, incident } = req.body;
  const file = req.file;

  const transporter = nodemailer.createTransport({
    host: "mail.hikjateng.co.id",
    port: 465,
    auth: {
      user: "wbshikjateng@hikjateng.co.id",
      pass: "Hikjateng27",
    },
  });

  const mailOptions = {
    from: "your@email.com",
    to: "wbshikjateng@hikjateng.co.id",
    subject: "Kirim Data Komplain",
    text: `
      Name: ${name}
      Branch: ${branch}
      Department: ${department}
      Date: ${date}
      Amount: ${amount}
      Incident: ${incident}
    `,
    attachments: file
      ? [
          {
            filename: file.originalname,
            content: file.buffer,
          },
        ]
      : [],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send("Email failed");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));