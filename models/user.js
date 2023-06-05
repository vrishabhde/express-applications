import mongoose from "mongoose";
import { Schema } from "mongoose";


const newUser = new Schema({
    name: String,
    number: Number,
    email: String,
    password: String,
    otpfornumber: String,
    otpforemail: String
})


export default mongoose.model("User", newUser) 
