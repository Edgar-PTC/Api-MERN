/*
    name
    lastname
    email
    password
    birthday
    status
    isVerified
    loginAttemps
    timeOut
*/

import { Schema, model } from "mongoose";

const clientSchema = new Schema({
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    birthday: {
        type: Date
    },
    status: {
        type: Boolean
    },
    isVerified: {
        type: Boolean
    },
    loginAttemps: {
        type: Number
    },
    timeOut: {
        type: Date
    }
},{
    timestamps: true,
    new: false
});

export default model("Clients", clientSchema);