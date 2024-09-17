import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
        unique:true
    },
    slug: {
        type: String,
        lowercase: true,
    }
});

// Exporting the model
export default mongoose.model('Category', categorySchema);
