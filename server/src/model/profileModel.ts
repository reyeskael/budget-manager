import mongoose from "mongoose";

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        middleName: {
            type: String
        }
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const profileModel =  mongoose.model("profile", profileSchema);