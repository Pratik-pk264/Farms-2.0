const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const Farmerstock = require('../models/Farmerstock');

// const dummyid = '64d1f1f1abcd123456789012';

router.post('/poststock',authenticateToken,async (req,res)=>{
    try{
        const stockdata = {
            userid : req.user._id,
            crop : req.body.crop,
            quantity : Number(req.body.quantity),
            cropgrade : Number(req.body.cropgrade),
            minexpectedprice : Number(req.body.minexpectedprice),
            pendingretailerrequests : req.body.pendingretailerrequests,

    location: {
        type: "Point",
        coordinates: [77.5946, 12.9716], // Dummy coordinates (Bangalore)
        address: "Dummy Address"
    },
    contactno: req.user.contactno
        };

        const newstock = new Farmerstock(stockdata);
        const savedstock = await newstock.save();
        // save --> famous question 
        // 1. check all the constraints based on the schema (data integrity)
        // 2. if document id new then genrates a new unique object id
        // 3. then performs insetone / updateone based on document typw 
        // 4. return a promise that resolves a saved document

        res.status(201).json(savedstock);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error : err.message});
    }
});

router.get('/stocks',async (req,res) =>{
    try{
        const stocks = await Farmerstock.find()
        .sort({createdAt:-1});
        res.status(200).json(stocks);
    }
    catch (err){
        console.log('Error :',err);
        res.status(500).json({msg : 'server error'});
    }
});

router.get('/filter',async(req,res) => {

    try{
        const {crop,location} = req.query;
        let filter = {};

        if(crop) filter.crop = crop;
        if(crop.location) filter["location.adress"] = location;

        const stocks  = await Farmerstock.find(filter);

        res.status(200).json(stocks);
    }
    catch(err) {
        console.error(err);
        res.status(400).json({msg : "Error message"});
    }
});


module.exports = router;



