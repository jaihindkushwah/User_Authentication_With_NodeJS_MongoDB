const  mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    pic:{
        type:String,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verificationToken:{
        type:String
    },
    phoneNo:{
        type:String,
    },
    address:[{
        houseNo:String,
        landMark:String,
        city:String,
        pin_code:String,
        country:{
            type:String,
            default:"India"
        }

    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
});
const User=mongoose.model("user",userSchema);
module.exports=User;