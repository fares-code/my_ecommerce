import express from 'express'
import expressformidabel from 'express-formidable'
import {CreateProduct
    ,GetProducts
    ,GetSinglProduct
    ,GetPhotId
    ,DeletProduct
    ,UpdateProduct
    ,productFiltersController
    ,productCountController
    ,productPerPageControler
    ,searchProductController
    ,relatedProductController
    ,productCategoryController,
    braintreeTokenController
    ,braintreePaymentController
    ,GetOrdersController
    ,GetAllOrdersController,GetUpdateOrdersController} from '../controllers/productControllers.js'
import {requireSignIn,isAdmin}from  '../middleWares/authmiddleware.js'

const router = express.Router()

//create gategory
router.post('/create-product',requireSignIn,isAdmin,expressformidabel(),CreateProduct);
router.get('/get-products',GetProducts);
router.get('/get-singProduct/:slug',GetSinglProduct);
router.get('/get-productPhoto/:pid',requireSignIn,GetPhotId);
router.put('/update-product/:pid',requireSignIn,expressformidabel(),isAdmin,UpdateProduct);
router.delete('/delet-product/:pid',requireSignIn,isAdmin,DeletProduct);
//filter Product
router.post('/product-filters',productFiltersController)
//product count
router.get('/product-count',productCountController);
//product per page
router.get('/product-list/:page',productPerPageControler);
//search product 
router.get('/search/:keyword',searchProductController)
//get similar products
router.get('/related-product/:pid/:cid',relatedProductController)

//get product use category
router.get('/product-category/:slug',productCategoryController)
//payment route
//token
router.get("/braintree/token",braintreeTokenController);
//payments
router.post("/braintree/payment",requireSignIn,braintreePaymentController)
//Get Orders
router.get("/orders",requireSignIn,GetOrdersController)
//Get All Orders
router.get("/all-orders",requireSignIn,isAdmin,GetAllOrdersController)
//Update Status Order
router.put("/update-order/:orid",requireSignIn,isAdmin,GetUpdateOrdersController)


export default router