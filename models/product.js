import mongoose from "mongoose";
import { Schema } from "mongoose";

const product = new Schema({
    name: String,
    price: Number,
    brand: String,
    image: String
});

export default mongoose.model("Product_added", product);
