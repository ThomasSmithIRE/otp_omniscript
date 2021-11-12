// Does not support parallel calls

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
    host: process.env.HOST,
    port: process.env.PORT,
    secure: true,
    service : process.env.SERVICE,

    auth: {
        user: process.env.SOURCE_USERNAME,
        pass: process.env.SOURCE_PASSWORD,
    }
});

var otp;

app.get('/', function (req, res) {
    res.render('contact');
});

app.post('/send', function (req, res) {
    // TODO - database
    otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);

    // VIP HTTP request requires tidying up.
    var bodyAsString = JSON.stringify(req.body).replace('":""}', '').replace('{"', '').replace(/\\/g, '');
    const bodyAsObject = JSON.parse(bodyAsString);

    var email = bodyAsObject.email;

    var mailOptions = {
        from: '"OTP Verifier" <' + process.env.SOURCE_USERNAME + '>',
        to: email,
        subject: "OTP Verification",
        html: "<h3>OTP for verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send("ERROR: " + error);
        }
        res.send("SUCCESS");
    });
});

app.post('/verify', function (req, res) {
    const bodyAsObject = cleanRequestToObject(req.body);

    if (bodyAsObject.otp == otp) {
        res.send("Verification Complete");
    } else {
        res.send("OTP is incorrect.");
    }
});

function cleanRequestToObject(body) {
    // HTTP request requires tidying up.
    var bodyAsString = JSON.stringify(body).replace('":""}', '').replace('{"', '').replace(/\\/g, '');
    return JSON.parse(bodyAsString);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`app is live at ${PORT}`);
})