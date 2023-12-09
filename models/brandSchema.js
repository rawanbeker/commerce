import { Schema, model } from "mongoose";
const brandSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim :true,
        unique:[true,"must be unique"],
        minlength :[3,"too short"]
    },
    slug:{
        type:String,
        lowercase:[true]
    },
    image:{
        type:String
    }

}, { timestamps: [true] });

export default model('brand', brandSchema)