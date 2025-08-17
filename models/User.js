const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userschema = new mongoose.Schema({
    firstname :{
        type:String,
        trim : true,
        required : true
    },
    lastname :{
        type : String,
        required : true,
        trim : true
    },
    contactno : {
        type : String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    email : {
        type : String,
        required:true,
        unique : true,
        trim : true,
        lowercase : true
    },
    accounttype :{
        type : String , 
        enum : ["Farmer","Retailer","Admin","Consumer"],
        required : true
    },
    profilephoto :{
        type : String,
    },
    transporterdetails:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Transporterdetails"
    },
    allocateddeals : [
        {
            groupid : {
                type : mongoose.Schema.Types.ObjectId,
            },
            totalquantity :{
                type : Number,
            },
            crop :{
                type : String,
            },
            cropGrade:{
                type:String
            },
            numberOfShopkeepers:{
                type:Number
            },
            numberOfConsumers:{
                type:Number
            },
            deliveryDate:{
                type:String
            }
        }
    ]
}, {timestamps:true});

userschema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

userschema.methods.comparePassword = async function (candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
};

const User = mongoose.model('User',userschema);

module.exports = User;