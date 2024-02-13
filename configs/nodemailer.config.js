const nodemailer = require('nodemailer'); 
require("dotenv").config();

const clientURL = process.env.CLIENT_URL

const transporter = nodemailer.createTransport({ 
  service: 'gmail', 
  auth: { 
    type: 'OAuth2', 
    user: process.env.EMAIL_USERNAME, 
    pass: process.env.EMAIL_PASSWORD, 
    clientId: process.env.EMAIL_CLIENT_ID, 
    clientSecret: process.env.EMAIL_CLIENT_SECRET, 
    refreshToken: process.env.EMAIL_REFRESH_TOKEN 
  } 
});

const getMailConfigurations = (toEmail, secretToken) => { 
    return {
        from: process.env.EMAIL_USERNAME, 
        to: toEmail, 
        subject: 'Call Bot Verification Email', 
        html: `<h2>Hi!</h2> <h4>Please click on ${clientURL}/verify/${secretToken} to verify your account.</h4>`
    }
};
    

module.exports = {
    transporter,
    getMailConfigurations,
}