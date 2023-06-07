import mongoose from "mongoose";
import { Schema } from "mongoose";

const addproduct = new Schema({
    name: String,
    brand: String,
    price: Number,
    image: String
})


const newUser = new Schema({
    name: String,
    number: Number,
    email: String,
    password: String,
    otpfornumber: String,
    otpforemail: String,
    productList: [addproduct]

})


export default mongoose.model("User", newUser) 
