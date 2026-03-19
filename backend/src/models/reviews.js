import express from "express";
import mongoose, {Schema, model} from "mongoose";
import Employee from "../models/employees.js"
import Product from "../models/products.js"

/*
    employeeId
    productId
    rating
    comment
*/

const reviewSchema = new Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Employee
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product
    },
    rating: {
        type: Number
    },
    comment: {
        type: String
    }
},{
    timestamps: true,
    strict: false
})

export default model("Reviews", reviewSchema)