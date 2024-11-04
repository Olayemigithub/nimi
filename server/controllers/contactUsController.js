// contactUsController.js
import { createTransport } from 'nodemailer';

export async function sendContactMessage(req, res) {
    const { name, email, message } = req.body;
    try {
        const transporter = createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.SUPPORT_EMAIL,
            subject: `Contact Us Message from ${name}`,
            text: message,
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send message' });
    }
}
