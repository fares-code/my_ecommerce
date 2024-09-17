import express from 'express';
import {requireSignIn,isAdmin,isUser}from  '../middleWares/authmiddleware.js'
import {registerController,loginControllers,testcontroller,forgotpasswordcontroller,getUser,UpdateUserController} from '../controllers/authController.js'

//routes
const router = express.Router();
//routing
//register || method post
router.post('/register',registerController)
//login || post
router.post('/login',loginControllers)
//
router.post('/forgot-password',forgotpasswordcontroller);


//middle wares
router.get('/test',requireSignIn,isAdmin,testcontroller)


router.get('/user-auth',requireSignIn,isUser,(req,res)=>{
   try {
    res.status(200).send({
        ok:true,
        message:"User is auth"
    })
   } catch (error) {
    console.log(error);
    
   }
})
router.get('/Admin-auth',requireSignIn,isAdmin,(req,res)=>{
   try {
    res.status(200).send({
        ok:true,
        message:"User is auth"
    })
   } catch (error) {
    console.log(error);
    
   }
})

router.get('/user',requireSignIn,getUser)
//Update User Profile
router.put('/update',requireSignIn,isUser,UpdateUserController)

export default router;