import nodemailer from 'nodemailer';

export default nodemailer.createTransport(process.env.MAILER_URL);
