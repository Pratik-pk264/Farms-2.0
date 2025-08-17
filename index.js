const express = require('express');
const port = 3000;
const app = express();
const mongoose = require('mongoose');
const mongourl = 'mongodb://127.0.0.1:27017/farmsdb';
const farmerroute = require('./routes/Farmer.routes');
const retailerroute = require('./routes/Retailer.routes');
const authroute = require('./routes/auth.routes');

// app.get('/',(req,res)=>{
//     res.send("Hello from the server");
// });

// middleware 
app.use(express.json());
app.use('/Farmer',farmerroute);
app.use('/Retailer',retailerroute);
app.use('/auth',authroute);


mongoose.connect(mongourl).
then(()=>{
    console.log("mongoDB connected successfully");

    app.listen(port,()=>{
        console.log(`Server is 
            running on http://localhost:${port}`)
    });
}).
catch((err)=>{
    console.log("Error while connecting to mongoDB ",err);
})


