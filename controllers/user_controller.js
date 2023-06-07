import express from "express";
import User from "../models/user.js";
import { v4 as uuidv4 } from 'uuid';

export const register = async (req, res) => {
    try {
        const { name, number, email, password, confirmpassword } = req.body;
        if (!name) return res.send("name is require");
        if (!number) return res.send("number is require");
        if (!email) return res.send("email is require");
        if (!password) return res.send("password is require");
        if (!confirmpassword) return res.send("confirm password is require");
        if (password.length <= 8 && confirmpassword.length <= 8) return res.send("password & confirm password should be minimum of 8 digit");
        if (password != confirmpassword) return res.send("password not matched");

        var otpfornumber = uuidv4();
        var otpforemail = uuidv4();

        const response = await User.find({ email }).exec();

        if (response.length) {
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
        return res.send("registered successfully");

    } catch (error) {
        return res.send(error);
    }
}



export const update_user = async (req, res) => {
    try{
        const {email, name} = req.body;
        if(!email) return res.send("email is require");
        if(!name) return res.send("name is require");

        const response = await User.findOneAndUpdate({email}, {name}).exec();

        // if(!response.length) return res.send("email not found");

        return res.send("user update successfully");
    
    }catch(err) {
        return res.send(err);
    }
}



export const check_register = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email) return res.send("email is require");
        if (!otp) return res.send("otp is require");

        const check = await User.find({ email: email }).exec();
        if (check.length) {
            if (check[0].otpforemail == otp) {
                return res.send("registration success")
            } else {
                return res.send("wrong otp");
            }
        } else {
            return res.send("user not found")
        }
    } catch (err) {
        return res.send(err);
    }
}

export const check_number = async (req, res) => {
    try {
        const { number, otp } = req.body;
        if (!number) return res.send("number is require");
        if (!otp) return res.send("otp is require");

        const check_number_available = await User.find({ number: number }).exec();

        if (check_number_available.length) {
            if (check_number_available[0].otpfornumber == otp) {
                return res.send("registration success");
            } else {
                return res.send("wrong otp");
            }
        } else {
            return res.send("number is not registered");
        }
    } catch (err) {
        return res.send(err);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) return res.send("email is require");
        if (!password) return res.send("password is require");

        const response = await User.find({ email: email }).exec();

        if (response.length) {
            if (password === response[0].password) {
                return res.send("login success");
            } else {
                return res.send("wrong password");
            }
        } else {
            return res.send("user not found")
        }
    } catch (err) {
        return res.send(err);
    }
}

export const login_with_number = async (req, res) => {
    try {
        const { number, otp } = req.body;
        if (!number) return res.send("number is require");
        if (!otp) return res.send("otp is require");

        const check_isNumberRegister = await User.find({ number: number }).exec();
        if (check_isNumberRegister.length) {
            if (check_isNumberRegister[0].otpfornumber == otp) {
                return res.send("logged in successfull");
            } else {
                return res.send("wrong otp");
            }
        } else {
            return res.send("number not registered");
        }
    } catch (err) {
        return res.send(err);
    }
}

export const login_with_email = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email) return res.send("email is require");
        if (!otp) return res.send("otp is require");

        const check_isEmailRegister = await User.find({ email: email }).exec();
        if (check_isEmailRegister.length) {
            if (check_isEmailRegister[0].otpforemail == otp) {
                return res.send("logged in with email is successfull");
            } else {
                return res.send("wrong otp");
            }
        } else {
            return res.send("email not found in data")
        }
    } catch (err) {
        return res.send(err);
    }
}

export const addproduct_whenEmailRegister = async (req, res) => {
    try {
        const { email, name, brand, price, image } = req.body;
        if (!email) return res.send("email is require");
        if (!name) return res.send("name is requirw");
        if (!brand) return res.send("brand is require");
        if (!price) return res.send("price is require");
        if (!image) return res.send("image is require");

        const isEmailAvailable = await User.find({ email: email }).exec();
        if (!isEmailAvailable.length) return res.send("email not available");
            const productadd =  {
                name: name,
                brand: brand,
                price: price,
                image: image
            } 
            isEmailAvailable[0].productList.push(productadd);
            await isEmailAvailable[0].save();
            return res.send("product added successfully into your profile");

        
    } catch (err) {
        return res.send(err);
    }
}

export const remove_ProductList = async (req, res) => {
    try{
        const {email} = req.body;

        if(!email) return res.send("email is require");


        // const response = await User.find({email}).exec();

        // if(!response.length) return res.send("email not found in DB");

        // response[0].productList = undefined; 
       
        //  await response[0].save();


        const response = await User.findOneAndUpdate({email:email}, {productList:[]}).exec();
        
        // await response.save();
        
        return res.send("product removed successfully");

    }catch(err){
        return res.send(err);
    }
}
