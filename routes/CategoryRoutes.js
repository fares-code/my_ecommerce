import express from "express"
import {requireSignIn,isAdmin}from  '../middleWares/authmiddleware.js'
import {createCategoryControllers,updateCategoryControllers,deleteCategoryControllers,getSinglCategory,getAllCategories} from '../controllers/cotegryControllers.js'








//routers
const router = express.Router();

//Create Category
router.post("/create-category",requireSignIn,isAdmin,createCategoryControllers)
//Update Category 
router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryControllers)
//Get All Categorys
router.get("/get-categorys",getAllCategories)
//Get single category
router.get("/singl-categors/:slug",getSinglCategory);
//Delete Categor
router.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryControllers)



export default router;