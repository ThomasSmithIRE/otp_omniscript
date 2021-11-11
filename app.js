"use strict";
const express = require('express');
const nodemailer = require("nodemailer");
var app = express();
var bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ extname: "hbs", defaultLayout: false, layoutsDir: "views/ " }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json()) 

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service : 'Gmail',

    auth: {
        user: 'otptesting82@gmail.com',
        pass: '3Bnt6rdYZ4qI',
    }
});

var otp;

app.get('/', function (req, res) {
    res.render('contact');
});

app.post('/send', function (req, res) {
    // Does not support parallel calls
    // TODO - database
    otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);

    // VIP HTTP request requires tidying up.
    var bodyAsString = JSON.stringify(req.body).replace('":""}', '').replace('{"', '').replace(/\\/g, '');
    const bodyAsObject = JSON.parse(bodyAsString);

    var email = bodyAsObject.email;

    var mailOptions = {
        from: '"OTP Verifier" <otptesting82@gmail.com>',
        to: email,
        subject: "OTP Verification",
        html: "<h3>OTP for verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send("Error: " + error);
            res.sendStatus(406);
        }
        res.send("SUCCESS");
        res.sendStatus(200);
    });
});

app.post('/verify', function (req, res) {
    console.log('Verification Req: ' + JSON.stringify(req.body));
    console.log('OTP Sent: ' + otp);
    // VIP HTTP request requires tidying up.
    // TODO - function
    var bodyAsString = JSON.stringify(req.body).replace('":""}', '').replace('{"', '').replace(/\\/g, '');
    const bodyAsObject = JSON.parse(bodyAsString);

    if (bodyAsObject.otp == otp) {
        res.send("Verification Complete");
    } else {
        res.send("OTP is incorrect.");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`app is live at ${PORT}`);
})