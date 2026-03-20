/*
    name
    email
    password
    isVerified
*/

import { Schema, model } from "mongoose";

const branchSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    isVerified: {
        type: Boolean
    }
},{
    timestamps: true,
    strict: false
});

export default model("Admins", branchSchema);