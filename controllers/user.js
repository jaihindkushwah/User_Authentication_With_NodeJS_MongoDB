const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
const {genRandomToken}=require('../utils/genRandomBytes');
const {sendVerificationToken}=require('../utils/sendVerificationToken');

const registerUser=async(req,res)=>{
    try {
        const {email,password,name}=req.body;
        if(!email || !password || !name){
            return res.status(400).json({message:"Please fill all the fields"})
        }
        const user= await User.findOne({email});
        
        if(user){
            return res.status(409).json({"message":"user is already exists"})
        }
        
        const salt= bcrypt.genSaltSync(10);
        const hashedPassword= bcrypt.hashSync(password.toString(),salt);

        const data= User({email,name,password:hashedPassword});
        const jwtToken=jwt.sign({email:data.email},genRandomToken());

        data.verificationToken=jwtToken;
        const newData=await data.save();

       await sendVerificationToken(email,jwtToken);
        
        

        res.status(201).json({message:"Account successfully created",data:newData});
    } catch (error) {
        res.status(500).json({message:"failed to registered"})
    }
}
const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"Please fill all the fields"})
        }
        const user= await User.findOne({email});

        if(!user){
            return res.status(404).json({"message":"user not exists"})
        }
        const isPasswordMatched=bcrypt.compareSync(password,user.password);
        if(!isPasswordMatched){
            return res.status(401).json({"message":"password not matched"})
        }
        const headerToken=jwt.sign({id:user._id},process.env.JWT_KEY,{expiresIn:'10d'});

        // res.cookie("authToken",headerToken,{httpOnly:true,maxAge: 2 * 60 * 60 * 1000})
        // .status(200)
        // .json({message:"Login successfully",data:user});
        res.header('Authorization', `Bearer ${headerToken}`).json({ message: 'Login successful', headerToken });

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"failed to Login"})
        
    }

}

const verifyUser=async(req,res)=>{
    try {
        const token=req.params.token;
        if(!token){
            return res.status(502).json({message:"Invalid token verification"})
        }
        const user= await User.findOne({verificationToken:token});
        if(!user){
            return res.status(502).json({message:"Invalid token verification"})
        }
        user.verificationToken=undefined;
        user.isVerified=true;
        await user.save();
        res.status(200).json({message:"Account verified successfully"})
    } catch (error) {
        res.status(500).json({message:"Error to verify"}) 
    }
}
const userProfile=async(req,res)=>{
    const id=res.userId;
    try {
        const user= await User.findById(id,'-password');
        res.status(200).json({message:'found user',user}); 
    } catch (error) {
        res.status(500).json({message:'Error to find the User'})
    }
    
}
const changeUserPassword=async(req,res)=>{
    try {
        const { oldPassword,newPassword}=req.body;
        if(!oldPassword || !newPassword){
            return res.status(400).json({message:"Please fill all the fields"})
        }
        const id=res.userId;
        const user= await User.findById(id);
        
        const isPasswordMatched=bcrypt.compareSync(oldPassword,user.password);
        if(!isPasswordMatched){
            return res.status(401).json({"message":"old password not matched"})
        }
        
        const salt= bcrypt.genSaltSync(10);
        const hashedPassword= bcrypt.hashSync(newPassword.toString(),salt);
        
        user.password=hashedPassword;
        await user.save();
        res.status(201).json({message:"Successfully updated your password"})
    } catch (error) {
        res.status(500).json({message:"Failed to update the password"})
    }

}

const forgetUserPassword=async(req,res)=>{

}

module.exports = {
    registerUser,loginUser,verifyUser,userProfile,forgetUserPassword,changeUserPassword
};
