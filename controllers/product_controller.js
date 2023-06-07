import express from "express";
import Product_added from "../models/product.js";

export const addproduct = async (req, res) => {
    try {
        const { name, price, brand, image } = req.body;

        if (!name) return res.send("name is require");
        if (!price) return res.send("price is require");
        if (!brand) return res.send("brand is require");
        if (!image) return res.send("image is require");

        const Allproduct = new Product_added({
            name: name,
            price: price,
            brand: brand,
            image: image
        });
        await Allproduct.save();
        return res.send("product added successfully ");


    } catch (error) {
        return res.send(error);
    }
}

export const get_allproduct = async (req, res) => {
    try {
        const response = await products.find({}).exec();
        if (response) {
            return res.send(response);
        } else {
            return res.send("products not found");
        }
    } catch (err) {
        return res.send(err);
    }
}


// export const product_pagination = async (req, res) => {
//     try {
//         const page = parseInt(req.query.page) || 1;

//         const limit = 2;

//         const forskip = (page-1)*limit;

//         const productList = await products.find({}).skip(forskip).limit(limit).exec();

//         if (response) {
//             return res.send(productList);
//         } else {
//             return res.send("no products found");
//         }
//     } catch (err) {
//         return res.send(err);
//     }
// }


export const product_pagination = async (req, res) => {
    
    try {
        const { page = 1, limit = 5 } = req.body;

        const productList = await Product_added.find({}).skip((page - 1) * limit).limit(limit).exec();

        if (productList) {
            return res.send(productList);
        } else {
            return res.send("no products found");
        }
    } catch (err) {
        return res.send(err);
    }
}
