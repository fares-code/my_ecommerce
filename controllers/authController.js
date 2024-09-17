import usermodel from "../models/usermodel.js";
import { hashPassword, comparePassword } from '../helpers/authHelper.js';
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, answer, address, role, phone } = req.body;
    // Validation
    if (!name) return res.status(400).send({ message: 'Name is required' });
    if (!email) return res.status(400).send({ message: 'Email is required' });
    if (!password) return res.status(400).send({ message: 'Password is required' });
    if (!address) return res.status(400).send({ message: 'Address is required' });
    if (!phone) return res.status(400).send({ message: 'Phone is required' });
    if (!answer) return res.status(400).send({ message: 'answer is required' });

    // Check if user exists
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: 'You are already registered. Please log in.'
      });
    }

    // Register user
    const hashUserPassword = await hashPassword(password);
    const user = await new usermodel({
      name,
      email,
      password: hashUserPassword,
      address,
      role,
      phone,
      answer
    }).save();

    res.status(201).send({
      success: true,
      message: 'User registered successfully',
      user
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error in registration',
      error
    });
  }
};
//login post
export const loginControllers = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: 'Invalid Email or Password'
      });
    }
    // Check if user not  exists
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered"
      });
    }
    // Match password
    const match = await comparePassword(user.password, password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: 'Invalid password'
      });
    }
    // Generate JWT token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        answer:user.answer,
      },
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in login',
      error
    });
  }
};
export const testcontroller=(req,res)=>{res.send('protect api')
}//FORGOT PASSWORD
export const forgotpasswordcontroller= async (req,res)=>{
  const { email,answer,newpassword}= req.body;
if(!email){
  res.status(400).send({
    message:"Email is Requierd"
  })
}
if(!answer){
  res.status(400).send({
    message:"Answer is Requierd"
  })
}
if(!newpassword){
  res.status(400).send({
    message:"New Password is Requierd"
  })
}
//check if user found
const user= await usermodel.findOne({email,answer});

if(!user){
  res.status(404).send({
    success:false,
    message:"Wrong Email or Password"
  })
}
const hashNewPassword = await hashPassword(newpassword);
await usermodel.findByIdAndUpdate(user._id,{password:hashNewPassword});
res.status(200).send({
  success:true,
  message:"Password was Reset Successfly"
})
}
export const getUser = async (req, res) => {
  try {
    const user_id = req.user._id; // Make sure req.user is properly set

    
    // Check if user_id is valid (if necessary)
    if (!user_id) {
      return res.status(400).send({
        success: false,
        message: 'Invalid user ID'
      });
    }

    const user = await usermodel.findById(user_id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).send({
      success: true,
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Failed to retrieve user',
      error
    });
  }
};

export const UpdateUserController = async (req, res) => {
  try {
    const { name, password, email, phone, address, answer } = req.body;

    // Find user by ID
    const user = await usermodel.findById(req.user._id);

    // Check if password exists and is at least 6 characters long
    if (password && password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long." });
    }

    // Hash the password if provided
    const hashedPassword = password ? await hashPassword(password) : undefined;

    // Update user details
    const updateUser = await usermodel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        email: email || user.email,
        phone: phone || user.phone,
        address: address || user.address,
        answer: answer || user.answer,
      },
      { new: true }
    );

    // Send success response
    res.status(200).send({
      success: true,
      message: "User updated successfully.",
      updatedUser: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Something went wrong while updating the profile.",
    });
  }
};
