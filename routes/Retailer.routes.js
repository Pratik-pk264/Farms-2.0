const express = require('express');
const router = express.Router();
const Retailerrequirements = require('../models/retailerrequirements');

const dummyid = '64fabc9b8c1234567890abcd';

router.post('/stock',async (req,res) =>{
    try{
        const stockdata = {
            userid : dummyid,
            crop : req.body.crop,
            cropgrade : Number(req.body.cropgrade),
            quantity : Number(req.body.quantity),
            // contactno : req.body.contactno,
            minexpectedprice : Number(req.body.minexpectedprice),

            location: {
                type: "Point",
                coordinates: [77.5946, 12.9716], // Dummy coordinates (Bangalore)
                address: "Dummy Address"
            },
            contactno: "9999999999"


        }

        const newstock = new Retailerrequirements(stockdata);
        const savedstock = await newstock.save();

        res.status(201).json(savedstock);

    }
    catch(err){
        console.error(err);
        res.status(400).json({msg : ' server error'});
    }
});


module.exports = router;