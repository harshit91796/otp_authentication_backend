const express = require("express");
authRouter = express.Router();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
const jwt = require("jsonwebtoken");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.SERVICEID;
const client = require('twilio')(accountSid, authToken);

app.use(cors());

app.use(express.json());

let OTP ,user;

app.post("/loginOtp", async (req, res) =>{
   const phone = req.body.phoneNumber;
   console.log(phone);
const client = require('twilio')(accountSid, authToken);

client.verify.v2.services(verifySid)
    .verifications
    .create({ to: `${phone}`, channel: 'sms' })
    .then(verification => {
      console.log(verification.sid);
      res.json({ success: true, verificationSid: verification.sid });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ success: false, error: 'Failed to send OTP' });
    });


})

app.post("/verify", async (req, res) => {
    const {phoneNumber} = req.body;
    const code = req.body.otp;
    client.verify.v2.services(verifySid)
    .verificationChecks
    .create({ to: `${phoneNumber}`, code })
    .then(verification_check => {
      console.log(verification_check.status);
      res.json({ success: true, status: verification_check.status });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ success: false, error: 'Failed to verify OTP' });
    });

})


app.listen(3000, () => {
    console.log("Server is running on port 3000");

})