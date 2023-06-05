import express from "express";
import User from "../models/user.js";
import {v4 as uuidv4} from 'uuid';

export const register =  async (req, res) => {
    try{
        const { name, number, email, password, confirmpassword } = req.body;
        if(!name) return res.send("name is require");
        if(!number) return res.send("number is require");
        if(!email) return res.send("email is require");
        if(!password) return res.send("password is require");
        if(!confirmpassword) return res.send("confirm password is require");
        if(password.length <= 8 && confirmpassword.length <= 8 ) return res.send("password & confirm password should be minimum of 8 digit");
        if(password != confirmpassword) return res.send("password not matched");

        var otpfornumber = uuidv4();
        var otpforemail = uuidv4();

        const response = await User.find({ email}).exec();

        if(response.length){
            return res.send("email already exist")
        }
        const user = new User({
            name: name,
            number: number,
            email: email,
            password: password,
            otpfornumber: otpfornumber,
            otpforemail: otpforemail
        });
        await user.save();
        return res.send("check your email and number for otp");

    }catch (error) {
        return res.send(error);
    }
}

export const check_register = async (req, res) => {
    try{
        const {email, otp} = req.body; 
        if(!email) return res.send("email is require");
        if(!otp) return res.send("otp is require");

       const check =  await User.find({email:email}).exec();
        if(check.length){
            if(check[0].otpforemail == otp){
                return res.send("registration success")
            }else{
                return res.send("wrong otp");
            }
        }else{
            return res.send("user not found")
        }
    }catch (err) {
        return res.send(err);
    }
}