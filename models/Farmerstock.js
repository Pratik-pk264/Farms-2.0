const mongoose = require('mongoose');

const Farmerstockschema = new mongoose.Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    crop :{
        type : String,
        required : true,
        trim : true
    },
    cropgrade : {
        type : Number,
        enum : [1,2,3,4,5],
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    minexpectedprice : {
        type : Number , 
        required : true
    },
    image :{
        type : String,
        // required : true,
    },

    // THIS IS CRAZYYYYYYY
    location: {
      type: {
          type: String, // GeoJSON type must be "Point".  tells MongoDB that the coordinates field represents a point in space.
          enum: ['Point']
      },
      coordinates: {
          type: [Number], // Array to store [longitude, latitude]
        //   required: true,
          index: '2dsphere' // Enables spatial queries
      },
      address: {
          type: String, // Address provided by user as string
        //   required: true
      },
    },
    contactno : {
        type : String,
        trim : true,
    },
    isfull : {
        type : Boolean,
        trim : true
    },
    sold : {
        type : Boolean,
        default : false
    },
    pendingretailerrequests : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Retailer",
        }
    ],
    shopbuyers : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Retailer"
        }
    ],

    // THIS IS ALSO CRAZYYY
    // directbuyers : [
    //     {
    //         type : mongoose.Schema.Types.objectId,
    //         ref : "Consumerrequirements"
    //     }
    // ]
},{
    timestamps : true
});

const Farmerstock = mongoose.model('Farmerstock',Farmerstockschema);

module.exports = Farmerstock;
