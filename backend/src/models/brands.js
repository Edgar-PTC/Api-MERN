/*
    name
    slogan
    address
    isActive
*/

import {Schema,model} from "mongoose";

const brandSchema = new Schema({
    name: {
        type: String
    },
    slogan: {
        type: String
    },
    address: {
        type: String
    },
    isActive: {
        type: Boolean
    },
}, {
    timestamps: true,
    strict: true
});

export default model("Brands", brandSchema);