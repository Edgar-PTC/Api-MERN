import express from "express";
import mongoose, {Schema, model} from "mongoose";
import Branches from "../models/branches.js"

/*
    name
    lastName
    salary
    DUI
    phone
    email
    password
    branchId
    isVerified
*/

const employeeSchema = new Schema({
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    salary: {
        type: Number
    },
    DUI: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Branches
    },
    isVerified: {
        type: Boolean
    }
},{
    timestamps: true,
    strict: false
})

export default model("Employees", employeeSchema)