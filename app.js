"use strict";
const express = require('express');
const nodemailer = require("nodemailer");
const app = express();
const exphbs = require('express-handlebars');

//View Engine
app.engine('handlebars', exphbs({ extname: "hbs", defaultLayout: false, layoutsDir: "views/ " }));
app.set('view engine', 'handlebars');

// create reusable transporter object using the default SMTP transport
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

/*
let info = await transporter.sendMail({
    from: '"Spooky SF 👻" <otptesting82@gmail.com>', // sender address
    to: "engineertsmith@gmail.com", // list of receivers
    subject: "OTP Verification",
    html: "<h3>OTP for verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>"
});

console.log("Message sent: %s", info.messageId);*/

app.get('/', function (req, res) {
    res.render('contact');
});

app.post('/send', function (req, res) {
    //email = req.body.email;

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
    res.send("You has been successfully registered");
    /*if (req.body.otp == otp) {
        res.send("You has been successfully registered");
    }
    else {
        res.render('otp', { msg: 'otp is incorrect' });
    }*/
});

//defining port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`app is live at ${PORT}`);
})