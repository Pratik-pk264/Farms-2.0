const mongoose = require('mongoose');

const requirement = new mongoose.Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    crop : {
        type : String,
        required : true,
        trim : true
    },
    cropgrade : {
        type : Number,
        enum : [1,2,3,4,5],
        required : true
    },
    minexpectedprice : {
        type : Number ,
        required : true
    },
    quantity:{
        type:Number,
        required:true,
    },
    location: {
        type: {
          type: String, // GeoJSON type must be "Point"
          enum: ['Point'],
          required: true,
        },
        coordinates: {
          type: [Number], // [longitude, latitude]
          required: true,
        },
        address:{  //address as a string
            type: String,
            required:true
        },
        landmark:{
            type: String,
            // required:true
        }
    },
    contactNumber:{  //not mandatory -> This will be displayed in BEST DEALS so farmers can contact retailer
        type:String,
        trim:true
    },
    locked:{
        type:Boolean,
        default:false
    }

},
    {timestamps : true}
);

requirement.index({ location: "2dsphere" });

const Retailerrequirements = mongoose.model('Retailerrequirements',requirement);


module.exports = Retailerrequirements;