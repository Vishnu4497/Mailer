var fastify = require("fastify");
var nodemailer = require('nodemailer')
const path = require('path')


var app = fastify();

app.register(require('fastify-static'), {
  root: path.join(__dirname)
})

 
app.get("/", function (req, res){
     res.sendFile(__dirname+"/demo.html");
 });
 
 app.get("/getemail", function (req, res){
     var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: req.query.sendermail,
            pass: req.query.sendermailpassword
        }
        });
    
        var mailOptions = {
        from: req.query.sendermail,
        to: req.query.recievermail,
        subject: req.query.sub,
        text: req.query.message
        };
    
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.res);
        }
        })
        res.send("Mail Sent Succesfully")
 });
 
 //start the server
 app.listen(8080);
 
 console.log("Mailer at http://localhost:8080");