import productModel from "../models/productModel.js";
import categorymodel from "../models/categorymodel.js";
import slugify from "slugify"
import fs from "fs"
import braintree from 'braintree';
import ordersModel from "../models/ordersModel.js";
import dotenv from "dotenv"

//dotenv
dotenv.config()
//paymeny gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTRE_PUPLIC_KEY,
    privateKey: process.env.BRAINTRE_PRIVITE_KEY,
  });



//Create Product
export const CreateProduct = async (req, res) => {
    try {
        const { name, des, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // Validation
        if (!name) return res.status(400).send({ message: "Name is Required" });
        if (!des) return res.status(400).send({ message: "Description is Required" });
        if (!price) return res.status(400).send({ message: "Price is Required" });
        if (!category) return res.status(400).send({ message: "Category is Required" });
        if (!quantity) return res.status(400).send({ message: "Quantity is Required" });
        if (!shipping) return res.status(400).send({ message: "Shipping is Required" });
        if (!photo) return res.status(400).send({ message: "Photo is Required" });
        if (photo.size > 1000000) return res.status(400).send({ message: "Photo should be less than 1MB" });

        // Create product
        const products = new productModel({ ...req.fields, slug: slugify(name) });

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();

        res.status(201).send({
            success: true,
            message: "New Product Was Created",
            products
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error While Creating Product"
        });
    }
};

export const GetProducts=async (req,res)=>{
    try {
        const products = await productModel.find({}).limit(12).sort({createdAt:-1}).populate("category");

        res.status(200).send({
            success:true,
            countOfProducts:products.length,
            message:"All products",
            products
        })







    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error WHile get all products"
        })
    }
}
export const GetSinglProduct=async (req,res)=>{
 
    try {
      const oneProduct= await productModel.findOne({ slug:req.params.slug }).populate("category");
      

        res.status(200).send({
            success:true,
           
            message:"One Product",
            oneProduct
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error WHile get One Product"
        })
    }
}
export const GetPhotId = async (req, res) => {
    try {
      const productPhoto = await productModel.findById(req.params.pid).select('photo');
      if (productPhoto && productPhoto.photo && productPhoto.photo.data) {
        res.set("Content-type", productPhoto.photo.contentType);
        return res.status(200).send(productPhoto.photo.data);
      } else {
        return res.status(404).send({ success: false, message: "Photo not found" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error while getting the product photo"
      });
    }
  };
  
export const DeletProduct= async (req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success:true,
           
            message:"One Product Deleted"
            
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error WHile get One Product"
        })
    }
    }

export const UpdateProduct=async (req,res)=>{
    try {
        const {name,des,price,category,quantity,shipping} = req.fields;
        const {photo}= req.files;
        // vaidation
        switch (true) {
            case !name:
                return res.status(500).send({ message: "Name is Required" });
         
            case !des:
                return res.status(500).send({ message: "Description is Required" });
            case !price:
                return res.status(500).send({ message: "Price is Required" });
            case !category:
                return res.status(500).send({ message: "Category is Required" });
            case !quantity:
                return res.status(500).send({ message: "Quantity is Required" });
            case !shipping:
                return res.status(500).send({ message: "Shipping is Required" });
            case !photo:
                return res.status(500).send({ message: "Photo is Required" });
            case photo.size > 1000000:
                return res.status(500).send({ message: "Photo should be less than 2MB" });
        }
console.log(req.fields);
const products = await productModel.findByIdAndUpdate(req.params.pid,{
    ...req.fields,slug:slugify(name)
},{new:true})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        console.log(products);
        res.status(201).send({
            success:true,
            message:"Updated Product successfly",
            products
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error WHile Update Product"
        })
        
    }
}


export const productFiltersController= async (req,res)=>{
    try {
    const {radio,checked}= req.body
    let args ={}
    if(checked.length >0) args.category = checked;
    if(radio.length) args.price = {$gte:radio[0],$lte:radio[1]};
const products = await productModel.find(args);
res.status(200).send({
    success:true,
    message:"Products Filtring was Success",
    products
})
    } catch (error) {
        res.status(400).send(
            {
success:false,
message:"Error while Filter Products",
error

            }
        )
    }
}
export const productCountController = async (req, res) => {
    try {
      const total = await productModel.estimatedDocumentCount(); // Get the total count of documents
      res.status(200).send({
        success: true,
        message: "Successfully retrieved the count of products",
        total
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: "Error in counting products",
        error: error.message // Include error message for more detailed feedback
      });
    }
  };
  
export const productPerPageControler= async (req,res)=>{
    try {
      const perpage=2;
      const page = req.params.page ? req.params.page : 1;
      const products = await productModel.find({}).skip((page-1)*perpage).limit(perpage).sort({createdAt:-1});
      res.status(200).send({
        success:true,
        message:"Product per page",
        products
      })

    } catch (error) {
        res.status(400).send({
            success:false,
            message:"There is error in procucts per page router"
        })
    }
}
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const result = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } }, // Corrected $options
                { des: { $regex: keyword, $options: 'i' } }   // Corrected $options
            ]
        });

        res.status(200).send({
            success: true,
            message: "Search Product success",
            result
        });

    } catch (error) {
        res.status(400).send({
            success: false,
            message: "There is an error in the search Page router",
            error
        });
    }
};
export const relatedProductController = async (req, res) => {
    try {
      const { pid, cid } = req.params;
  
      // Fetch related products in the same category but exclude the current product
      const products = await productModel.find({
        category: cid,
        _id: { $ne: pid },
      })
        .limit(3)
        .populate('category'); // Corrected to populate category field
  
      res.status(200).send({
        success: true,
        message: "Get Related Products",
        products,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: "There is an error in the Related Products",
        error,
      });
    }
  };
  export const productCategoryController = async(req,res)=>{
    try {
       const category = await categorymodel.find({slug:req.params.slug});
       const products = await productModel.find({category}).populate("category")
        res.status(200).send({
          success: true,
          message: "Get Related Products",
          products,
          category
        });
      } catch (error) {
        res.status(400).send({
          success: false,
          message: "There is an error in the Category Products",
          error,
        });
      }
  }
  //braintree gateway api
  // token 
  export const braintreeTokenController=async(req,res)=>{
    try {
        gateway.clientToken.generate({},(error,respnose)=>{
            if(error){
                res.status(500).send(error)
            }else{
               res.send(respnose) 
            }
        })
    } catch (error) {
       console.log(error)
       res.status(400).send({
        message:error
       })
        
    }
  }
  //braintree payent api
  export const braintreePaymentController = async(req,res)=>{
    try {
        const {cart,nonce}=req.body
        let total=0;
        cart.map((i)=>{
return total +=i.price;
        });
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        },
        (error, result) => {
            if (result) {
                // Corrected "prodcuts" to "products"
                const orders = new ordersModel({
                    products:  cart , 
                    payment: result,
                    buyer: req.user._id
                }).save();
        
                res.json({ ok: true });
                console.log('Cart data received:', req.body.cart);

            } else {
                res.status(500).send(error);
            }
        });
        
    } catch (error) {
       console.log(error); 
    }
    
  }

  export const GetOrdersController = async (req,res)=>{
    try {
        const orders = await ordersModel.find({buyer:req.user._id}).populate('products').populate("buyer","name");
        res.json(orders);
    } catch (error) {
        res.status(500).send(error)
    }
  }
  export const GetAllOrdersController = async (req,res)=>{
    try {
        const orders = await ordersModel.find({}).populate('products').populate("buyer","name").sort({createdAt:-1})
        res.json(orders);
    } catch (error) {
        res.status(500).send(error)
    }
  }
  export const GetUpdateOrdersController = async (req,res)=>{
    try {
      const {orid}=req.params;
      const {status}=req.body;
      const orderUpdate= await ordersModel.findByIdAndUpdate(orid,{status},{new:true})
        res.json(orderUpdate);
    } catch (error) {
        res.status(500).send(error)
    }
  }