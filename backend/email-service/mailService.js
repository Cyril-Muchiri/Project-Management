const nodemailer =require('nodemailer');
// const recipient =

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PWD 
    }
});

const mailOptions = {
    from: process.env.EMAIL,
    to: 'cyrilmuchiri11@gmail.com',
    subject: 'Hello from Nodemailer',
    text: 'This is a test email sent from Nodemailer.'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});