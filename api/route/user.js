const express = require('express');
const route = express.Router();
const User = require('../model/user');
const userVerification=require('../model/UserVerification');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const nodeMailer=require('nodemailer');

//unique string
const {v4: uuidv4}=require('uuid');
const user = require('../model/user');
const transport = nodeMailer.createTransport({
    service:"gmail",
    auth: {
        user:"alifaizan.kgn9654@gmail.com",
        pass: "zuszvknnezeexsjz",
    }
});
transport.verify((err,success)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Ready for message");
        console.log(success);
    }
 })
route.post('/', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        else {

            const user = new User({
                _id: new mongoose.Types.ObjectId,
                MobileNumber: req.body.MobileNumber,
                MailId: req.body.MailId,
                password: hash,
                IsVeried:false
            })

            user.save()
                .then(result => {
                    //handle account verification 
                    sendVerificationEmail(result,res);
                })

                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
        }
    })
});

//send verification mail
const  sendVerificationEmail=({_id,MailId},res)=>{
    // url to be used in the email
    const CurrentUrl="http://localhost:8002"
    const uniqueString=uuidv4()+_id;
    const mailOptions={
        from: "alifaizan.kgn9654@gmail.com",
        to: MailId,
        subject: "Verify your Email",
        html:`<p>Verify your email address to complete the signup and to log in to your account.</p>
        <p> This link 
        <b>expires in 6 hours</b>.</p>Press<a href=${CurrentUrl+"user/Verify/"+_id+"/"+uniqueString}>here</a>
        to proceed.</p>`,
    };

    //hash the unique string 
    const saltRounds=13;
    bcrypt
    .hash(uniqueString,saltRounds)
    .then((hashedUnoqueString)=>{
        //set values in user verification collection 
        
    })
    .catch((error)=>{
        res.status(500).json({
            error:error
        })
    })

}

module.exports=route;