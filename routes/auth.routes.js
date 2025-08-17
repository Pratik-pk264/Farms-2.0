const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jsonwebtoken = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

router.post('/login',async(req,res)=>{

});

router.post('/signup',async(req,res)=>{
    try{
        // sari info nikalo
        const{firstname,lastname,email,password,accounttype,contactno} = req.body;


        // saari info check kro
        if(!firstname ||  !lastname || !email || !password || !accounttype || !contactno){
            return res.status(400).json({
                success : false,
                message : 'All fields are required'
            });
        }

        // check karo already user exist krta hai kya 
        const existing = await User.findOne({email : email});

        if(existing){
            return res.status(400).json({
                success : false,
                message : 'User already exists '
            });
        }

        // auto-hash ke majje lo 

        const newuser = new User({
            firstname,
            lastname,
            email,
            password ,
            accounttype,
            contactno
        });

        const saveuser = await newuser.save();

        const token  = jsonwebtoken.sign({
            userId : saveuser._id,
            email : saveuser.email,
            accounttype : saveuser.accounttype

        },'Pratik',{
            expiresIn : '7d'
        });

        res.status(201).json({
            success : true,
            message : 'User created Successfully',
            token : token,

            user:{
                id : saveuser._id,
                firstname : saveuser.firstname,
                lastname : saveuser.lastname,
                email : saveuser.email,
                accounttype : saveuser.accounttype,
                contactno : saveuser.contactno
            }
        });

    }
    catch(err){
        console.error(err);
        res.status(400).json({msg : " eroror occured"});
    }
});


module.exports = router;