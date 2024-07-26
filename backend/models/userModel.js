const mongoose=require ("mongoose");
const userModel= new mongoose.Schema ({
    name: {
        type:String,
        required:true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    age:{
        type:Number,
    },
},{timestamps: true});

//create smodel
const User=mongoose.model('User',userModel)
module.exports=User;



























