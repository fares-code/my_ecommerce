import JWT from 'jsonwebtoken';
import usermodel from '../models/usermodel.js';
export const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        // Check if the token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authorization token missing",
            });
        }

        // Verify the token
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        console.log('Authenticated User:', decode);

       
        req.user = decode;

       
        next();

    } catch (error) {
        console.error('Error in requireSignIn middleware:', error);
        res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
export const isAdmin = async (req, res, next) => {
    try {
        const user = await usermodel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(403).json({
                success: false,
                message: 'UnAuthorized You Are not Admin access'
            });
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({
            success: false,
            error,
            message: "Error from admin middleware"
        });
    }
};

export const isUser = async (req, res, next) => {
    try {
        const user = await usermodel.findById(req.user._id);
        if (user.role === 1) {
            return res.status(403).json({
                success: false,
                message: 'UnAuthorized You Are not User access'
            });
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({
            success: false,
            error,
            message: "Error from admin middleware"
        });
    }
};
