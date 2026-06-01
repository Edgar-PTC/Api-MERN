/*
    name,
    phone,
    image,
    public_id
*/

import { Schema, model } from "mongoose"

const ProviderModel = new Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    image: {
        type: String
    },
    public_id: {
        type: String
    }
}, {
    timestamps: true,
    new: false
})

export default model("Providers", ProviderModel);