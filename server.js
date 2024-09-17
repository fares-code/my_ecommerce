//DIFINE VRIABELS
import express from'express'
import color from'colors'
import morgan from 'morgan';
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js';
import CategoryRoutes from './routes/CategoryRoutes.js';
import ProductRoutes from './routes/ProductRoutes.js';
import cors from 'cors';


 //EXPRESS FUNCTIONS
 const app =express(); 
 //PORT
 const port =process.env.PORT ||4000;
 //connect with database
 connectDB()
 //server
 app.listen(port,()=>{
   console.log(`Your server is running on  ${process.env.DEV_MOD} mode at ${port}`.bgBlue);
   
});
 //middlwares
 app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//APP APIS
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',CategoryRoutes);
app.use('/api/v1/product',ProductRoutes);

//IMPORT env
   dotenv.config();


//routes
 app.get('/',(req,res)=>{
    res.send("<h1>wlecom to ecommerce app</h1>")
 })
 