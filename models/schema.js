import { Schema, model } from "mongoose";
const schemas = new Schema({
    name: {
        type: String,
        required: true,
        // remove space
        trim :true,
        unique:[true,"must be unique"],
        minlength :[3,"too short"]
    },
    age: String,
    slug:{
        type:String,
        lowercase:[true]
    },
    image:{
        type:String
    }

}, { timestamps: [true] });

export default model('models', schemas)