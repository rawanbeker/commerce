import mongoose, { Schema, model } from "mongoose";
const subCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: [true, "must be unique"],
        minlength: [3, "too short"]
    },
    age: String,
    slug: {
        type: String,
        lowercase: [true]
    },
    category:{
        type: mongoose.Schema.ObjectId,
        ref:"models",
        required: [true, "must be belong to category"]
    }
},{timestamps:[true]});

export default model('subcategory', subCategorySchema)