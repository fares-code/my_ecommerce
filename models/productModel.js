import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    des:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:'Category',
        required:true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    quantity:{
        type:Number,
        required:true
    },
    shipping:{
        type:Boolean,
        required:true
    }
},{timestamps:true});
export default mongoose.model('product',productSchema);