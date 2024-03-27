const express=require("express");

const bcrypt=require("bcrypt");

const {UserModel}=require("../Model/userMode");

const userRouter=express.Router();

userRouter.post("/register",(req,res)=>{

    const {email,pass,confirPass}=req.body;

    try {
        bcrypt.hash(pass,8,async(err,hash)=>{

            if(err){
                res.status(200).json({error:err});
            }else{
                const user=UserModel({email,pass:hash,confirPass:pass});
                await user.save();
                res.status(200).json({mesg:"Ther new user has been resgistered"});
            }
        })
    } catch (error) {
        res.status(200).json({error:err});
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body;

    try {
        const user= await UserModel.findOne({email});

        bcrypt.compare(pass,user.pass,(err,result)=>{

            if(result){
                const token=jwt.sign({userID:user._id},"masai")
                res.status(200).json({mesg:"login in!",token});
            }else{
                res.status(200).json({error:err});
            }
        })

    } catch (error) {
        res.status(200).json({error:err});
    }
})

module.exports={
    userRouter
}