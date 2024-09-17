import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
   products: [{  // Corrected typo: "prodcuts" to "products"
      type: mongoose.Types.ObjectId,
      ref: "product"
   }],
   payment: {},
   buyer: {
      type: mongoose.Types.ObjectId,
      ref: 'users'
   },
   status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"]  // Fixed capitalization for consistency
   }
}, { timestamps: true });

// Exporting the model
export default mongoose.model('Order', OrderSchema);
