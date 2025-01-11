import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';

const handler = async (req, res) => {
    try {
      if(req.method === 'POST'){
        const client = await MongoClient.connect(process.env.MONGO_URL);
        const db = client.db();
        const reportsCollection = db.collection('reports');

        const {userId, name, email, message} = req.body

        console.log("report info: ", userId, name, email, message)

        if (!name || !email || !message) {
            throw Error('يجب ملئ جميع البيانات');
          }

        const report = await reportsCollection.insertOne({userId, name, email, message})
        client.close(); 

        const transporter = nodemailer.createTransport({
          service: 'gmail', 
          auth: {
            user: process.env.COMPANY_EMAIL,
            pass: process.env.COMPANY_EMAIL_PASSWORD, 
          },
        });

        const mailOptions = {
          from: email,
          to: process.env.COMPANY_EMAIL,
          subject: `New Contact Form Submission from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        await transporter.sendMail(mailOptions);

        console.log('Report Added Successfully..');
        res.status(201).json({ report, message: "تم إرسال رسالتكم بنجاح" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(400).json({ message: error.message });
    }
  };

  export default handler;