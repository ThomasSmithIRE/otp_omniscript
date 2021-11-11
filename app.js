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
var email;

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);

app.get('/', function (req, res) {
    res.render('contact');
});

app.post('/send', function (req, res) {
    console.log('Req1: ' + JSON.stringify(req.body));

    var bodyAsString = JSON.stringify(req.body).replace('":""}', '').replace('{"', '');
    console.log('Body: ' + bodyAsString);

    const bodyAsObject = JSON.parse(bodyAsString);

    email = bodyAsObject.email;
    console.log('Email: ' + JSON.stringify(email));

    /*var mailOptions = {
        from: '"Spooky SF 👻" <otptesting82@gmail.com>',
        to: email,
        subject: "OTP Verification",
        html: "<h3>OTP for verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);

        res.render('otp');
    });*/
});

app.post('/defaultSend', function (req, res) {
    var mailOptions = {
        from: '"Spooky SF 👻" <otptesting82@gmail.com>',
        to: "engineertsmith@gmail.com", //to: req.body.email,
        subject: "OTP Verification",
        html: "<h3>OTP for verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);

        res.render('otp');
    });
});

app.post('/verify', function (req, res) {
    res.send("Verification Complete.");
    /*if (req.body.otp == otp) {
        res.send("Verification Complete");
    }
    else {
        res.render('otp', { msg: 'OTP is incorrect' });
    }*/
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`app is live at ${PORT}`);
})